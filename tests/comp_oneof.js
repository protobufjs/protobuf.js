var tape = require("tape");

var protobuf = require("..");

var proto = "syntax = \"proto3\";\
message Message {\
    oneof kind {\
        string str = 1;\
        int32 num = 2;\
        Type enm = 4;\
    }\
    bool other = 3;\
}\
enum Type {\
    ONE = 1;\
    TWO = 2;\
}";

tape.test("oneofs", function(test) {
    var root = protobuf.parse(proto).root;

    var Message = root.lookup("Message");

    var message = Message.create({
        str: "a",
        num: 1,
        other: false
    });

    test.equal(message.num, 1, "should initialize the last value");
    test.equal(message.kind, "num", "should reference the last value");
    
    message.kind = 'num';
    test.notOk(message.hasOwnProperty('str'), "should delete other values");

    message.str = "a";
    message.kind = 'str';

    test.notOk(message.hasOwnProperty('num'), "should delete the previous value");
    test.equal(message.str, "a", "should set the new value");
    test.equal(message.kind, "str", "should reference the new value");

    message.num = 0; // default
    message.kind = 'num';
    test.notOk(message.hasOwnProperty('str'), "should delete the previous value");
    test.equal(message.num, 0, "should set the new value");
    test.equal(message.kind, "num", "should reference the new value");
    test.equal(message.hasOwnProperty("num"), true, "should have the new value on the instance, not just the prototype");

    delete message.other;
    var buf = Message.encode(message).finish();
    test.equal(buf.length, 2, "should write a total of 2 bytes");
    test.equal(buf[0], 16, "should write id 1, wireType 0");
    test.equal(buf[1], 0, "should write a value of 0");

    test.end();

});
