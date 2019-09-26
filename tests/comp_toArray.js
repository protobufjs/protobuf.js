var tape = require("tape");

var protobuf = require("..");

var proto = "message Outer {repeated int32 numbers = 1 [(js_use_toArray) = true];}";

function SomeNumbers(numbers) {
    this._numbers = numbers;
}

SomeNumbers.prototype.toArray = function () {
    return this._numbers;
};

var msg = { numbers: new SomeNumbers([1, 2, 3]) };

tape.test("toArray", function(test) {
    var root = protobuf.parse(proto).root,
        Outer = root.lookup("Outer");

    var dec = Outer.decode(Outer.encode(msg).finish());
    test.same(dec, {numbers: [1, 2, 3]}, "should encode and decode back properly");
    test.end();
});
