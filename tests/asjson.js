var tape = require("tape");
var protobuf  = require("..");

tape.test("asJSON repeated defaults", function(test) {

    protobuf.load("tests/data/asjson.proto", function(err, root) {
        if (err)
            return test.fail(err.message);
        test.ok(true, "should parse without errors");

        var TestMessage = root.lookup("test.TestRepeatedDefaults");
        var msg1 = TestMessage.create({ aString: 'foo' });

        var defaultsOn = msg1.asJSON({ defaults: true });
        test.equal(defaultsOn.aString, 'foo', "should set aString value");
        test.same(defaultsOn.repeatString, [], "should set repeated default");

        var defaultsOff = msg1.asJSON({ defaults: false });
        test.equal(defaultsOff.aString, 'foo', "should set aString value");
        test.same(defaultsOff.repeatString, undefined, "should not set repeated default");

        test.end();
    });

});
