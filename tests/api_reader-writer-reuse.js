var tape = require("tape");

var protobuf = require("..");

var proto = "message A {\
    required uint32 a = 1;\
}\
message B {\
    required string b = 1;\
}";

tape.test("reusing", function(test) {
    var root = protobuf.parse(proto).root;

    var A = root.lookup("A"),
        B = root.lookup("B");

    test.test(test.name + " - a writer should write", function(test) {

        var writer = protobuf.Writer.create();

        A.encodeDelimited({
            a: 1
        }, writer);

        B.encodeDelimited({
            b: "a"
        }, writer);

        var buffer = writer.finish();

        test.equal(buffer[0], 2, "length 2");
        test.equal(buffer[1], 8, "id 1, wireType 0");
        test.equal(buffer[2], 1, "number 1");
        test.equal(buffer[3], 3, "length 3");
        test.equal(buffer[4], 10, "id 1, wireType 2");
        test.equal(buffer[5], 1, "length 1");
        test.equal(buffer[6], 97, "string 'a'");

        var reader = protobuf.Reader.create(buffer);

        test.test(test.name + " - and a reader should", function(test) {

            var a = A.decodeDelimited(reader);
            test.deepEqual(a, { a: 1 }, "read back the first message");

            var b = B.decodeDelimited(reader);
            test.deepEqual(b, { b: "a" }, "read back the second message");

            test.equal(reader.pos, reader.len, "consume the reader");

            test.end();
        });

        test.end();
    });

    test.end();
});
