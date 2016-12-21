var gulp   = require("gulp");

var bundle  = require("./scripts/bundle");

gulp.task("default", [
    "bundle-development", "bundle-production", "gzip-production",
    "bundle-development-runtime", "bundle-production-runtime", "gzip-production-runtime"
]);

gulp.task("bundle-development", bundle.bind(this, true , false));
gulp.task("bundle-production" , bundle.bind(this, false, false));

gulp.task("bundle-development-runtime", bundle.bind(this, true , true));
gulp.task("bundle-production-runtime" , bundle.bind(this, false, true));

gulp.task("gzip-production", [ "bundle-production" ], function(cb) {
    bundle.compress(
        "./dist/protobuf.min.js",
        "./dist/protobuf.min.js.gz",
        cb
    );
});

gulp.task("gzip-production-runtime", [ "bundle-production-runtime" ], function(cb) {
    bundle.compress(
        "./dist/runtime/protobuf.min.js",
        "./dist/runtime/protobuf.min.js.gz",
        cb
    );
});
