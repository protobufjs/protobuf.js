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
