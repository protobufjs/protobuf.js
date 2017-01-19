var fs   = require("fs"),
    path = require("path"),
    vm   = require("vm"),
    long = require("long"),
    tape = require("tape");

var distPath = path.join(__dirname, "..", "..", "dist", "protobuf.min.js");
var dist = fs.readFileSync(distPath).toString("utf8");

tape.test("script tags", function(test) {
    var sandbox;

    var dcodeIO = { Long: long };

    vm.runInNewContext(dist, sandbox = {
        window: {
            dcodeIO: dcodeIO
        },
        dcodeIO: dcodeIO
    });

    test.ok(sandbox.window.protobuf, "should load the library as a global");
    test.ok(sandbox.window.protobuf.util.Long, "should load long.js to util");
    test.end();
});

tape.test("webworkers", function(test) {
    var sandbox;

    var dcodeIO = { Long: long };

    vm.runInNewContext(dist, sandbox = {
        self: {
            dcodeIO: dcodeIO
        },
        dcodeIO: dcodeIO
    });

    test.ok(sandbox.self.protobuf, "should load the library as a global");
    test.ok(sandbox.self.protobuf.util.Long, "should load long.js to util");
    test.end();
});

tape.test("amd loaders", function(test) {
    var sandbox;

    function fakeDefine(deps, init) {
        test.same(deps, [ "long" ], "should request long.js as a dependency");
        test.notOk(sandbox.window.protobuf.util.Long, "should not have loaded long.js before calling the factory function");
        init([ long ]);
    }
    fakeDefine.amd = true;

    vm.runInNewContext(dist, sandbox = {
        define: fakeDefine,
        window: {}
    });

    test.ok(sandbox.window.protobuf, "should load the library as a global");
    test.ok(sandbox.window.protobuf.util.Long, "should have loaded long.js after calling the factory function");
    test.end();

});

// commonjs uses ./src
