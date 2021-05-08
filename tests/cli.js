// A minimal test for pbjs tool targets.

var tape = require("tape");
var path = require("path");
var Module = require("module");
var protobuf = require("..");

function cliTest(test, testFunc) {
    // pbjs does not seem to work with Node v4, so skip this test if we're running on it
    if (process.versions.node.match(/^4\./)) {
        test.end();
        return;
    }

    // Alter the require cache to make the cli/targets/static work since it requires "protobufjs"
    // and we don't want to mess with "npm link"
    var savedResolveFilename = Module._resolveFilename;
    Module._resolveFilename = function(request, parent) { 
      if (request.startsWith("protobufjs")) {
        return request;
      }
      return savedResolveFilename(request, parent);
    };
    require.cache.protobufjs = require.cache[path.resolve("index.js")];

    try {
        testFunc();
    } finally {
        // Rollback all the require() related mess we made
        delete require.cache.protobufjs;
        Module._resolveFilename = savedResolveFilename;
    }
}

tape.test("pbjs generates static code", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/test.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OneofContainer = protobuf.roots.default.OneofContainer;
            var Message = protobuf.roots.default.Message;
            test.ok(OneofContainer, "type is loaded");
            test.ok(Message, "type is loaded");

            // Check that fromObject and toObject work for plain object
            var obj = {
                messageInOneof: {
                    value: 42,
                },
                regularField: "abc",
            };
            var obj1 = OneofContainer.toObject(OneofContainer.fromObject(obj));
            test.deepEqual(obj, obj1, "fromObject and toObject work for plain object");

            // Check that dynamic fromObject and toObject work for static instance
            var root = protobuf.loadSync("tests/data/cli/test.proto");
            var OneofContainerDynamic = root.lookup("OneofContainer");
            var instance = new OneofContainer();
            instance.messageInOneof = new Message();
            instance.messageInOneof.value = 42;
            instance.regularField = "abc";
            var instance1 = OneofContainerDynamic.toObject(OneofContainerDynamic.fromObject(instance));
            test.deepEqual(instance, instance1, "fromObject and toObject work for instance of the static type");

            test.end();
        });
    });
});

tape.test("without null-defaults, absent optional fields have zero values", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OptionalFields = protobuf.roots.default.OptionalFields;
            test.ok(OptionalFields, "type is loaded");

            // Check default values
            var msg = OptionalFields.fromObject({});
            test.equal(msg.a, null, "default submessage is null");
            test.equal(msg.b, "", "default string is empty");
            test.equal(msg.c, 0, "default integer is 0");

            test.end();
        });
    });
});

tape.test("with null-defaults, absent optional fields have null values", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            "null-defaults": true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OptionalFields = protobuf.roots.default.OptionalFields;
            test.ok(OptionalFields, "type is loaded");

            // Check default values
            var msg = OptionalFields.fromObject({});
            test.equal(msg.a, null, "default submessage is null");
            test.equal(msg.b, null, "default string is null");
            test.equal(msg.c, null, "default integer is null");

            test.end();
        });
    });
});
