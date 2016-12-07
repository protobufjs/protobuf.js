var tape = require("tape");

var protobuf = require("..");

tape.test("oneofs", function(test) {

    protobuf.load("tests/data/oneof.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        var Message = root.lookup("Message");
        var message = Message.create({
            str: "a",
            num: 1
        });
        test.equal(message.num, 1, "should initialize the last value");
        test.equal(message.getKind(), "num", "should reference the last value");
        message.setKind('num');
        test.notOk(message.hasOwnProperty('str'), "should delete other values");

        message.str = "a";
        message.setKind('str'); // message.kind = 'str' if IE8 support isn't required

        test.notOk(message.hasOwnProperty('num'), "should delete the previous value");
        test.equal(message.str, "a", "should set the new value");
        test.equal(message.kind, "str", "should reference the new value");
        
        test.end();
    });

});
