var gulp    = require("gulp"), 
    gzip    = require('gulp-gzip');

var bundle  = require("./scripts/bundle");

gulp.task("default", [
    "bundle-development", "bundle-production", "gzip-production",
    "bundle-development-runtime", "bundle-production-runtime", "gzip-production-runtime"
]);

gulp.task("bundle-development", bundle.bind(this, true , false));
gulp.task("bundle-production" , bundle.bind(this, false, false));

gulp.task("bundle-development-runtime", bundle.bind(this, true , true));
gulp.task("bundle-production-runtime" , bundle.bind(this, false, true));

gulp.task("gzip-production", [ "bundle-production" ], function() {
    return gulp.src('./dist/protobuf.min.js')
        .pipe(gzip({ gzipOptions: { level: 9 } }))
        .pipe(gulp.dest('./dist'));
});

gulp.task("gzip-production-runtime", [ "bundle-production-runtime" ], function() {
    return gulp.src('./dist/runtime/protobuf.min.js')
        .pipe(gzip({ gzipOptions: { level: 9 } }))
        .pipe(gulp.dest('./dist/runtime'));
});
