var fs   = require("fs"),
    path = require("path"),
    vm   = require("vm"),
    long = require("long"),
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

            var dcodeIO = { Long: long };

            vm.runInNewContext(dist.data, sandbox = {
                window: {
                    dcodeIO: dcodeIO
                },
                dcodeIO: dcodeIO
            });

            test.ok(sandbox.window.protobuf, "should load the library as a global");
            test.ok(sandbox.window.protobuf.util.Long, "should load long.js to util");
            test.end();
        });

        test.test(test.name + " - webworkers", function(test) {
            var sandbox;

            var dcodeIO = { Long: long };

            vm.runInNewContext(dist.data, sandbox = {
                self: {
                    dcodeIO: dcodeIO
                },
                dcodeIO: dcodeIO
            });

            test.ok(sandbox.self.protobuf, "should load the library as a global");
            test.ok(sandbox.self.protobuf.util.Long, "should load long.js to util");
            test.end();
        });

        test.test(test.name + " - amd loaders", function(test) {
            var sandbox;

            function fakeDefine(deps, factory) {
                test.same(deps, [ "long" ], "should request long.js as a dependency");
                test.notOk(sandbox.window.protobuf.util.Long, "should not have loaded long.js before calling the factory function");
                factory(long);
                test.ok(sandbox.window.protobuf.util.Long, "should have loaded long.js after calling the factory function");
            }
            fakeDefine.amd = true;

            vm.runInNewContext(dist.data, sandbox = {
                define: fakeDefine,
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
