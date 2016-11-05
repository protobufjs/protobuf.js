var gulp    = require("gulp"), 
    gzip    = require('gulp-gzip');

var bundle  = require("./scripts/bundle");

gulp.task("default", [ "bundle-development", "bundle-production", "gzip-production" ]);

gulp.task("bundle-development", bundle.bind(this, true ));

gulp.task("bundle-production" , bundle.bind(this, false));

gulp.task("gzip-production", [ "bundle-production" ], function() {
    return gulp.src('./dist/protobuf.min.js')
        .pipe(gzip({ gzipOptions: { level: 9 } }))
        .pipe(gulp.dest('./dist'));
});
