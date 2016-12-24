var gulp   = require("gulp");

var bundle  = require("./scripts/bundle");

gulp.task("default", [
    "bundle-development", "bundle-production", "gzip-production",
    "bundle-development-runtime", "bundle-production-runtime", "gzip-production-runtime",
    "bundle-development-noparse", "bundle-production-noparse", "gzip-production-noparse"
]);

// Full build

gulp.task("bundle-development", bundle.bind(this, {
    entry    : "./src",
    target   : "./dist"
}));

gulp.task("bundle-production" , bundle.bind(this, {
    entry    : "./src",
    target   : "./dist",
    compress : true
}));

gulp.task("gzip-production", [ "bundle-production" ], function(callback) {
    bundle.compress(
        "./dist/protobuf.min.js",
        "./dist/protobuf.min.js.gz",
        callback
    );
});

// Minimal runtime

gulp.task("bundle-development-runtime", bundle.bind(this, {
    entry    : "./runtime",
    target   : "./dist/runtime"
}));

gulp.task("bundle-production-runtime" , bundle.bind(this, {
    entry    : "./runtime",
    target   : "./dist/runtime",
    compress : true
}));

gulp.task("gzip-production-runtime", [ "bundle-production-runtime" ], function(callback) {
    bundle.compress(
        "./dist/runtime/protobuf.min.js",
        "./dist/runtime/protobuf.min.js.gz",
        callback
    );
});

// Noparse build

gulp.task("bundle-development-noparse", bundle.bind(this, {
    entry    : "./src",
    target   : "./dist/noparse",
    exclude  : [ "./tokenize", "./parse", "./common" ]
}));

gulp.task("bundle-production-noparse" , bundle.bind(this, {
    entry    : "./src",
    target   : "./dist/noparse",
    exclude  : [ "./tokenize", "./parse", "./common" ],
    compress : true
}));

gulp.task("gzip-production-noparse", [ "bundle-production-noparse" ], function(callback) {
    bundle.compress(
        "./dist/noparse/protobuf.min.js",
        "./dist/noparse/protobuf.min.js.gz",
        callback
    );
});
