"use strict";
module.exports = bundle;

var fs         = require("fs"),
    path       = require("path");

var browserify = require("browserify");

var header     = require("gulp-header");
var gulpif     = require("gulp-if");
var sourcemaps = require("gulp-sourcemaps");
var uglify     = require("gulp-uglify");
var gutil      = require("gulp-util");

var buffer     = require("vinyl-buffer");
var vinylfs    = require("vinyl-fs");
var source     = require("vinyl-source-stream");

var zopfli     = require("node-zopfli");

var pkg = require(path.join(__dirname, "..", "package.json"));

/*eslint-disable no-template-curly-in-string*/
var license = [
    "/*!",
    " * protobuf.js v${version} (c) 2016, daniel wirtz",
    " * compiled ${date}",
    " * licensed under the bsd-3-clause license",
    " * see: https://github.com/dcodeio/protobuf.js for details",
    " */"
].join("\n") + "\n";
/*eslint-enable no-template-curly-in-string*/

var prelude = fs.readFileSync(require.resolve("../lib/prelude.js")).toString("utf8");

/**
 * Bundles the library.
 * @param {Object} options Bundler options
 * @param {string} options.entry Entry file
 * @param {string} options.target Target directory
 * @param {boolean} [options.compress=false] Whether to minify or not
 * @param {string[]} [options.exclude] Excluded source files
 * @returns {undefined}
 */
function bundle(options) {
    if (!options || !options.entry || !options.target)
        throw TypeError("missing options");
    var bundler = browserify({
        entries: options.entry,
        insertGlobalVars: false,
        detectGlobals: false,
        debug: true,
        prelude: prelude,
        preludePath: "./lib/prelude.js"
    })
    .external("long");
    if (options.exclude)
        options.exclude.forEach(bundler.exclude, bundler);
    return bundler
    .plugin(require("browserify-wrap"), {
        // + global object for convenience
        // + undefined var and global strict-mode for uglify
        prefix: "(function(global,undefined){\"use strict\";",
        suffix: "})(typeof window===\"object\"&&window||typeof self===\"object\"&&self||this);"
    })
    .plugin(require("bundle-collapser/plugin"))
    .bundle()
    .pipe(source(options.compress ? "protobuf.min.js" : "protobuf.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(
                gulpif(options.compress, uglify({
                    mangleProperties: {
                        regex: /^_/
                    },
                    mangle: {
                        eval: true,
                        toplevel: false
                    },
                    compress: {
                        unused: true,
                        keep_fargs: false,
                        unsafe: true
                    },
                    output: {
                        max_line_len: 0x7fffffff
                    }
                }))
            )
            .pipe(header(license, {
                date: (new Date()).toUTCString().replace("GMT", "UTC").toLowerCase(),
                version: pkg.version
            }))
    .pipe(sourcemaps.write(".", { sourceRoot: "" }))
    .pipe(vinylfs.dest(options.target))
    .on("log", gutil.log)
    .on("error", gutil.log);
}

/**
 * Compresses a file using zopfli gzip.
 * @param {string} sourceFile Source file
 * @param {string} destinationFile Destination file
 * @param {function(?Error)} callback Node-style callback
 * @returns {undefined}
 */
bundle.compress = function compress(sourceFile, destinationFile, callback) {
    var src = fs.createReadStream(sourceFile);
    var dst = fs.createWriteStream(destinationFile);
    src.on("error", callback);
    dst.on("error", callback);
    dst.on("close", function() {
        callback(null);
    });
    src.pipe(zopfli.createGzip()).pipe(dst);
};
