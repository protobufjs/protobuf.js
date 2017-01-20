var gulp   = require("gulp"),
    bundle = require("./scripts/bundle");

var defaultTask = [];

function defineTask(name, entry, target) {
    gulp.task(name + "-bundle", bundle.bind(this, {
        entry    : entry,
        target   : target
    }));
    gulp.task(name + "-minify" , bundle.bind(this, {
        entry    : entry,
        target   : target,
        compress : true
    }));
    gulp.task(name + "-compress", [ name + "-minify" ], function(callback) {
        bundle.compress(
            target + "/protobuf.min.js",
            target + "/protobuf.min.js.gz",
            callback
        );
    });
    defaultTask.push(name + "-bundle", name + "-minify", name + "-compress");
}

defineTask("full"   , "./src/index"        , "./dist"        );
defineTask("light"  , "./src/index-light"  , "./dist/light"  );
defineTask("minimal", "./src/index-minimal", "./dist/minimal");

gulp.task("default", defaultTask);
