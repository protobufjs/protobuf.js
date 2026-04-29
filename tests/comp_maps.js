var tape = require("tape");

var protobuf = require("..");

var root = protobuf.Root.fromJSON({
    nested: {
        Inner: {
            fields: {
                key: {
                    type: "string",
                    id: 1
                },
                values: {
                    rule: "repeated",
                    type: "string",
                    id: 2
                }
            }
        },
        Outer: {
            fields: {
                value: {
                    keyType: "string",
                    type: "Inner",
                    id: 1
                }
            }
        }        
    }
});

var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomString(len) {
    var str = "";
    for (var i = 0; i < len; ++i)
        str += chars.charAt((Math.random() * chars.length)|0);
    return str;
}

function randomMap() {
    var map = {};
    for (var i = 0; i < 10; ++i) {
        var values = [];
        for (var j = 0; j < 10; ++j)
            values.push(randomString(10));
        var key; do { key = randomString(10); } while(map[key]);
        map[key] = {
            key: randomString(10),
            values: values
        };
    }
    return map;
}

tape.test("maps", function(test) {
    var Inner = root.lookup("Inner"),
        Outer = root.lookup("Outer");

    test.test(test.name + " - randomly generated", function(test) {

        var outer = { value: randomMap() };
        var buf = Outer.encode(outer).finish();
        var dec = Outer.decode(buf);

        test.deepEqual(dec, outer, "should decode back the original random map");

        test.end();
    });

    test.test(test.name + " - specifically crafted", function(test) {

        var outer = {
            value: {
                b: {
                    key: "1",
                    values: ["c", "d"]
                },
                a: {
                    key: "2",
                    values: ["a", "b"]
                }
            }
        };

        var buf = Outer.encode(outer).finish();
        verifyEncode(test, buf);

        var dec = Outer.decode(buf);
        test.deepEqual(dec, outer, "should decode back the original map");

        test.end();
    });

    test.test(test.name + " - omitted message value", function(test) {

        var dec = Outer.decode(Uint8Array.of(0x0a, 0x03, 0x0a, 0x01, 0x61));
        test.ok(dec.value.a instanceof Inner.ctor, "should decode an omitted message value as a default message");
        test.deepEqual(
            Array.prototype.slice.call(Outer.encode(dec).finish()),
            [ 0x0a, 0x05, 0x0a, 0x01, 0x61, 0x12, 0x00 ],
            "should re-encode the default message value"
        );

        test.end();
    });

    test.test(test.name + " - special string key", function(test) {

        var map = {};
        Object.defineProperty(map, "__proto__", {
            value: {
                key: "3",
                values: ["x"]
            },
            enumerable: true,
            configurable: true,
            writable: true
        });

        var outer = {
            value: map
        };

        var dec = Outer.decode(Outer.encode(outer).finish());
        test.equal(Object.getPrototypeOf(dec.value), Object.prototype, "should keep the decoded map prototype");
        test.ok(Object.prototype.hasOwnProperty.call(dec.value, "__proto__"), "should decode the key as an own property");
        test.equal(dec.value.__proto__.key, "3", "should decode the key's value");
        test.deepEqual(dec.value.__proto__.values, ["x"], "should decode the key's repeated value");

        var msg = Outer.fromObject(outer);
        test.equal(Object.getPrototypeOf(msg.value), Object.prototype, "should keep the converted map prototype");
        test.ok(Object.prototype.hasOwnProperty.call(msg.value, "__proto__"), "should convert the key as an own property");

        var obj = Outer.toObject(msg);
        test.equal(Object.getPrototypeOf(obj.value), Object.prototype, "should keep the output map prototype");
        test.ok(Object.prototype.hasOwnProperty.call(obj.value, "__proto__"), "should output the key as an own property");
        test.equal(obj.value.__proto__.key, "3", "should output the key's value");
        test.deepEqual(obj.value.__proto__.values, ["x"], "should output the key's repeated value");

        test.end();
    });

    test.test(test.name + " - omitted fields", function(test) {

        var mapRoot = protobuf.Root.fromJSON({
            nested: {
                MapMessage: {
                    fields: {
                        value: {
                            keyType: "int32",
                            type: "string",
                            id: 1
                        }
                    }
                }
            }
        });

        var MapMessage = mapRoot.lookup("MapMessage");

        var value = {
            value: {
                0: ''
            }
        };
        var dec;

        // 1 <chunk> = message(1 <varint> = 0, 2 <chunk> = empty chunk)
        dec = MapMessage.decode(Uint8Array.of(0x0a, 0x04, 0x08, 0x00, 0x12, 0x00));
        test.deepEqual(dec, value, "should correct decode the buffer without omitted fields");

        // 1 <chunk> = message(1 <varint> = 0)
        dec = MapMessage.decode(Uint8Array.of(0x0a, 0x02, 0x08, 0x00));
        test.deepEqual(dec, value, "should correct decode the buffer with omitted value");

        // 1 <chunk> = message(2 <chunk> = empty chunk)
        dec = MapMessage.decode(Uint8Array.of(0x0a, 0x02, 0x12, 0x00));
        test.deepEqual(dec, value, "should correct decode the buffer with omitted key");

        // 1 <chunk> = empty chunk
        dec = MapMessage.decode(Uint8Array.of(0x0a, 0x00));
        test.deepEqual(dec, value, "should correct decode the buffer with both key and value omitted");

        test.end();
    });

    test.test(test.name + " - scalar key roundtrip", function(test) {
        var mapRoot = protobuf.Root.fromJSON({
            nested: {
                MapMessage: {
                    fields: {
                        bools: {
                            keyType: "bool",
                            type: "bool",
                            id: 1
                        },
                        ints: {
                            keyType: "int64",
                            type: "int64",
                            id: 2
                        },
                        uints: {
                            keyType: "uint64",
                            type: "uint64",
                            id: 3
                        },
                        sints: {
                            keyType: "sint64",
                            type: "string",
                            id: 4
                        },
                        fixeds: {
                            keyType: "fixed64",
                            type: "string",
                            id: 5
                        },
                        sfixeds: {
                            keyType: "sfixed64",
                            type: "string",
                            id: 6
                        }
                    }
                }
            }
        });

        var MapMessage = mapRoot.lookup("MapMessage");
        var uint64Max = "18446744073709551615";
        var uintMap = {};
        var fixedMap = {};
        uintMap[uint64Max] = "1";
        fixedMap[uint64Max] = "a";
        var boolBuf = Uint8Array.of(0x0a, 0x04, 0x08, 0x00, 0x10, 0x00);
        var intBuf = MapMessage.encode({ ints: { "-1": "-1" } }).finish();
        var uintBuf = MapMessage.encode({ uints: uintMap }).finish();
        var sintBuf = MapMessage.encode({ sints: { "-1": "a" } }).finish();
        var fixedBuf = MapMessage.encode({ fixeds: fixedMap }).finish();
        var sfixedBuf = MapMessage.encode({ sfixeds: { "-1": "a" } }).finish();
        var longCases = [
            [ "int64", intBuf, { ints: { "-1": "-1" } } ],
            [ "uint64", uintBuf, { uints: uintMap } ],
            [ "sint64", sintBuf, { sints: { "-1": "a" } } ],
            [ "fixed64", fixedBuf, { fixeds: fixedMap } ],
            [ "sfixed64", sfixedBuf, { sfixeds: { "-1": "a" } } ]
        ];

        function toArray(buf) {
            return Array.prototype.slice.call(buf);
        }

        function assertReencode(buf, message) {
            test.deepEqual(toArray(MapMessage.encode(MapMessage.decode(buf)).finish()), toArray(buf), message);
        }

        test.deepEqual(
            toArray(MapMessage.encode({ bools: { "false": false } }).finish()),
            toArray(boolBuf),
            "should encode false boolean keys"
        );
        assertReencode(boolBuf, "should re-encode false boolean keys");

        longCases.forEach(function(testCase) {
            assertReencode(testCase[1], "should re-encode " + testCase[0] + " keys");
            test.equal(
                MapMessage.verify(MapMessage.decode(testCase[1])),
                null,
                "should verify decoded " + testCase[0] + " keys"
            );
            test.deepEqual(
                MapMessage.toObject(MapMessage.decode(testCase[1]), { longs: String }),
                testCase[2],
                "should output " + testCase[0] + " keys as decimal strings"
            );
        });

        test.end();
    });

    test.end();
});

function verifyEncode(test, buf) {
    test.test(test.name + " - should encode", function(test) {
        test.equal(buf.length, 32, "a total of 30 bytes");

        // first kv:
        /*
            b: {
                key: "1",
                values: ["c", "d"]
            },
        */
        test.equal(buf[ 0], 10, "id 1, wireType 2"); // Outer.value
        test.equal(buf[ 1], 14, "a length of 14");
        test.equal(buf[ 2], 10, "id 1, wireType 2"); //   Outer.value $key
        test.equal(buf[ 3],  1, "a length of 1");
        test.equal(buf[ 4], 98, "'b'");
        test.equal(buf[ 5], 18, "id 2, wireType 2"); //   Outer.value $value
        test.equal(buf[ 6],  9, "a length of 9");
        test.equal(buf[ 7], 10, "id 1, wireType 2"); //     Inner.key
        test.equal(buf[ 8],  1 , "a length of 1");
        test.equal(buf[ 9], 49, "'1'");
        test.equal(buf[10], 18, "id 2, wireType 2"); //     Inner.values (1)
        test.equal(buf[11],  1, "a length of 1");
        test.equal(buf[12], 99, "'c'");
        test.equal(buf[13], 18, "id 2, wireType 2"); //     Inner.values (2)
        test.equal(buf[14],  1, "a length of 1");
        test.equal(buf[15],100, "'d'");

        // second
        test.equal(buf[16], 10, "id 1, wireType 2"); // Outer.value
        // ...

        test.end();
    });
}
