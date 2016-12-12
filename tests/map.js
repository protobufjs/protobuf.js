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

    var outer = { value: randomMap() };
    var buf = Outer.encode(outer).finish();
    var dec = Outer.decode(buf);

    test.deepEqual(dec, outer, "should decode back the original map");

    test.end();
});
