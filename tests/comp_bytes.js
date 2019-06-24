var tape = require("tape");

class CustomBuffer extends Buffer {
    static toCustom(b) {
        b._isCustom = true;
        return b;
    }

    static isCustom(b) {
        return !!b._isCustom;
    }

    static from(...args) {
        return CustomBuffer.toCustom(Buffer.from(...args));
    }

    static alloc(...args) {
        return CustomBuffer.toCustom(Buffer.alloc(...args));
    }

    static allocUnsafe(...args) {
        return CustomBuffer.toCustom(Buffer.allocUnsafe(...args));
    }

    static allocUnsafeSlow(...args) {
        return CustomBuffer.toCustom(Buffer.allocUnsafeSlow(...args));
    }

    slice(...args) {
        return CustomBuffer.toCustom(super.slice(...args));
    }
}

tape.test("configure a custom encoder/decoder for bytes", function(test) {

    var protobuf = require("..");
    var oldBuffer = protobuf.util.Buffer;

    protobuf.util.Buffer = CustomBuffer;
    protobuf.configure();

    var root = protobuf.Root.fromJSON({
        nested: {
            test: {
                nested: {
                    Test: {
                        fields: {
                            data: {
                                type: "bytes",
                                id: 1
                            }
                        }
                    }
                }
            }
        }
    });

    var Test = root.lookup("test.Test");

    var buffer = Test.encode({
        data: Buffer.from('some-data')
    }).finish();
    test.ok(CustomBuffer.isCustom(buffer), "should encode the message with a custom buffer");

    var decoded = Test.decode(buffer);
    test.ok(CustomBuffer.isCustom(decoded.data), "should decode `data` into a custom buffer");

    protobuf.util.Buffer = oldBuffer;
    protobuf.configure();

    test.end();

});
