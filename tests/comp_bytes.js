var tape = require("tape");

var protobuf = require("..");

var oldBufferImpl = Buffer.alloc === undefined;

// extends Buffer
(CustomBuffer.prototype = Object.create(Buffer.prototype)).constructor = CustomBuffer;

function CustomBuffer(arg, encodingOrOffset, length) {
    Buffer.call(this, arg, encodingOrOffset, length);
    CustomBuffer.toCustom(this);
}

CustomBuffer.isBuffer = Buffer.isBuffer.bind(Buffer);

CustomBuffer.toCustom = function (b) {
    b._isCustom = true;
    return b;
}

CustomBuffer.isCustom = function (b) {
    return !!b._isCustom;
}

CustomBuffer.from = function (valueOf, encodingOrOffset, length) {
    return CustomBuffer.toCustom(oldBufferImpl
        ?  new Buffer(valueOf, encodingOrOffset, length)
        : Buffer.from(valueOf, encodingOrOffset, length)
    );
}

CustomBuffer.alloc = function (size, fill, encoding) {
    return CustomBuffer.toCustom(oldBufferImpl
        ?  new Buffer(size, fill, encoding)
        : Buffer.alloc(size, fill, encoding)
    );
}

CustomBuffer.allocUnsafe = function (size) {
    return CustomBuffer.toCustom(oldBufferImpl
        ?  new Buffer(size)
        : Buffer.allocUnsafe(size)
    );
}

CustomBuffer.prototype.slice = function (start, end) {
    return CustomBuffer.toCustom(this.slice(start, end));
}

tape.test("configure a custom encoder/decoder for bytes", function(test) {
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
        data: CustomBuffer.from('some-data')
    }).finish();
    test.ok(CustomBuffer.isCustom(buffer), "should encode the message with a custom buffer");

    var decoded = Test.decode(buffer);
    test.ok(CustomBuffer.isCustom(decoded.data), "should decode `data` into a custom buffer");

    protobuf.util.Buffer = oldBuffer;
    protobuf.configure();

    test.end();

});
