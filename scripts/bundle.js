module.exports = bundle;

var path       = require('path');

var browserify = require('browserify');

var header     = require('gulp-header');
var gulpif     = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var gutil      = require('gulp-util');

var buffer     = require('vinyl-buffer');
var vinylfs    = require('vinyl-fs');
var source     = require('vinyl-source-stream');

var pkg = require(__dirname + '/../package.json');
var license = [
    "/*!",
    " * protobuf.js v${version} (c) 2016 Daniel Wirtz",
    " * Compiled ${date}",
    " * Licensed under the Apache License, Version 2.0",
    " * see: https://github.com/dcodeIO/protobuf.js for details",
    " */"
].join('\n') + '\n';

function bundle(compress, runtime) {
    var src = runtime
        ? path.join(__dirname, "..", "runtime")
        : path.join(__dirname, "..", "src");
    var dst = runtime
        ? path.join(__dirname, "..", "dist", "runtime")
        : path.join(__dirname, "..", "dist");

    var bundler = browserify({
        entries: src,
        debug: true
    })
    return bundler
    .external("long")
    .external("buffer")
    .exclude("process")
    .exclude("_process")
    .plugin(require('bundle-collapser/plugin'))
    .bundle()
    .pipe(source(compress ? 'protobuf.min.js' : 'protobuf.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(
                gulpif(compress, uglify({
                    mangleProperties: {
                        regex: /^_/
                    }
                }))
            )
            .pipe(header(license, {
                date: (new Date()).toUTCString().replace('GMT', 'UTC'),
                version: pkg.version
            }))
    .pipe(sourcemaps.write('.', { sourceRoot: '' }))
    .pipe(vinylfs.dest(dst))
    .on("log", gutil.log)
    .on("error", gutil.log);
}
