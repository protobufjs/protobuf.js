var tape = require("tape");

var protobuf = require("..");
var pbjs = require("../cli/pbjs");

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

tape.test("reusing with generated static encodeDelimited", function(test) {
    var root = protobuf.parse(proto).root.resolveAll();

    pbjs.generate(root, {
        target: "static",
        root: "test_delimited_writer"
    }, function(err, output) {
        test.error(err, "static code generation worked");

        var staticRoot = new Function("$protobuf", output + "\nreturn $root;")(protobuf); // eslint-disable-line no-new-func
        var writer = protobuf.Writer.create();

        staticRoot.A.encodeDelimited({
            a: 1
        }, writer);

        staticRoot.B.encodeDelimited({
            b: "a"
        }, writer);

        var buffer = writer.finish();
        var reader = protobuf.Reader.create(buffer);

        test.deepEqual(staticRoot.A.decodeDelimited(reader), { a: 1 }, "read back the first message");
        test.deepEqual(staticRoot.B.decodeDelimited(reader), { b: "a" }, "read back the second message");
        test.equal(reader.pos, reader.len, "consume the reader");
        test.end();
    });
});
