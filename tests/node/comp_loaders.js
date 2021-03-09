var fs   = require("fs"),
    path = require("path"),
    vm   = require("vm"),
    tape = require("tape");

var distPath = path.join(__dirname, "..", "..", "dist");

[
    {
        name: "full",
        data: fs.readFileSync(path.join(distPath, "protobuf.min.js")).toString("utf8")
    },
    {
        name: "light",
        data: fs.readFileSync(path.join(distPath, "light/protobuf.min.js")).toString("utf8")
    },
    {
        name: "minimal",
        data: fs.readFileSync(path.join(distPath, "minimal/protobuf.min.js")).toString("utf8")
    }
]
.forEach(function(dist) {

    tape.test(dist.name + " build", function(test) {

        test.test(test.name + " - script tags", function(test) {
            var sandbox;

            vm.runInNewContext(dist.data, sandbox = {
                window: {
                },
            });

            test.ok(sandbox.window.protobuf, "should load the library as a global");
            test.end();
        });

        test.test(test.name + " - webworkers", function(test) {
            var sandbox;

            vm.runInNewContext(dist.data, sandbox = {
                self: {
                },
            });

            test.ok(sandbox.self.protobuf, "should load the library as a global");
            test.end();
        });

        test.test(test.name + " - amd loaders", function(test) {
            var sandbox;

            vm.runInNewContext(dist.data, sandbox = {
                window: {},
                require: undefined,
                console: console
            });

            test.ok(sandbox.window.protobuf, "should load the library as a global");
            test.end();

        });

    });

});

// commonjs uses ./src
