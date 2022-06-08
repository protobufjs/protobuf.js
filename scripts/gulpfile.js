var gulp   = require("gulp"),
    bundle = require('./bundle'),
    esmBundle = require("./esm-bundle");

function defineTask(name, entry, target, format) {
    if (format === 'cjs') {
        gulp.task(name + "-bundle", bundle.bind(this, {
            entry    : entry,
            target   : target
        }));
        gulp.task(name + "-minify", bundle.bind(this, {
            entry    : entry,
            target   : target,
        }));
    } else if (format === 'es') {
        gulp.task(name + "-bundle", esmBundle.bind(this, {
            entry    : entry,
            target   : target
        }));
        gulp.task(name + "-minify", esmBundle.bind(this, {
            entry    : entry,
            target   : target,
        }));
    }
    gulp.task(name, gulp.series(
        name + "-bundle",
        name + "-minify"
    ), function(done) { done(); });
}

// build es module outputs
defineTask("full-es"   , "../src/index.js"        , "../dist/esm/",        "es");
defineTask("light-es"  , "../src/index-light.js"  , "../dist/esm/light",   "es");
defineTask("minimal-es", "../src/index-minimal.js", "../dist/esm/minimal", "es");

// build cjs outputs
defineTask("full"   , "../src/index"        , "../dist",             "cjs");
defineTask("light"  , "../src/index-light"  , "../dist/light",       "cjs");
defineTask("minimal", "../src/index-minimal", "../dist/minimal",     "cjs");

gulp.task("default", gulp.parallel(
    "full",
    "light",
    "minimal",
    "full-es",
    "light-es",
    "minimal-es"
, function(done) { done(); }));

/* var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function() {
    return gulp
        .src(["../index.d.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            mode: "file",
            theme: "default",
            includeDeclarations: true,
            excludePrivate: true,
            out: "../tsdocs",
            name: "protobuf.js"
        }))
}); */

