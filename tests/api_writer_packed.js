var tape = require("tape");

var protobuf = require("..");

var Writer       = protobuf.Writer,
    BufferWriter = protobuf.BufferWriter,
    Reader       = protobuf.Reader;

var writers = [ [ "Writer", Writer ] ];
if (BufferWriter)
    writers.push([ "BufferWriter", BufferWriter ]);

function toArr(b) { return Array.prototype.slice.call(b); }

// reference encoding: the previous fork + per-element-loop + ldelim approach
function ref(Ctor, scalar, vals) {
    var w = new Ctor().uint32(10).fork();
    for (var i = 0; i < vals.length; ++i) w[scalar](vals[i]);
    return toArr(w.ldelim().finish());
}
// new packed method
function got(Ctor, packed, vals) {
    return toArr(new Ctor().uint32(10)[packed](vals).finish());
}

// [ packed method, scalar method, sample values ]
var cases = [
    [ "uint32s",   "uint32",   [ 0, 1, 127, 128, 16383, 16384, 2097152, 4294967295 ] ],
    [ "int32s",    "int32",    [ 0, 1, -1, 2147483647, -2147483648, 127, 128, -2 ] ],
    [ "sint32s",   "sint32",   [ 0, 1, -1, 63, -64, 64, 1000000, -1000000 ] ],
    [ "bools",     "bool",     [ true, false, true, true, false, true ] ],
    [ "fixed32s",  "fixed32",  [ 0, 1, 4294967295, 123456, 255 ] ],
    [ "sfixed32s", "sfixed32", [ 0, -1, 1, 2147483647, -2147483648 ] ],
    [ "floats",    "float",    [ 0, 1.5, -2.25, 0.125, 100 ] ],
    [ "doubles",   "double",   [ 0, 1.5, -2.25, 204.8, 12345.678 ] ],
    [ "uint64s",   "uint64",   [ 0, 1, 1000, 4294967295, 123456789 ] ],
    [ "int64s",    "int64",    [ 0, 1, 1000, 4294967295, 123456789 ] ],
    [ "sint64s",   "sint64",   [ 0, 1, -1, 1000, -1000, 123456789 ] ],
    [ "fixed64s",  "fixed64",  [ 0, 1, 4294967295, 123456789 ] ],
    [ "sfixed64s", "sfixed64", [ 0, -1, 1, 123456789 ] ]
];

tape.test("packed writer methods", function(test) {
    writers.forEach(function(e) {
        var name = e[0], Ctor = e[1];
        cases.forEach(function(c) {
            var packed = c[0], scalar = c[1], vals = c[2];

            // identical bytes to the fork+loop reference == conformant
            test.same(got(Ctor, packed, vals), ref(Ctor, scalar, vals), name + " " + packed + " matches fork+loop");

            // empty array writes a zero-length packed field (tag + length 0)
            test.same(got(Ctor, packed, []), toArr(new Ctor().uint32(10).fork().ldelim().finish()), name + " " + packed + " empty");

            // large array whose byte length crosses 127->128 (exercises the move path)
            var big = [];
            for (var i = 0; i < 300; ++i) big.push(vals[i % vals.length]);
            test.same(got(Ctor, packed, big), ref(Ctor, scalar, big), name + " " + packed + " large (move path)");
        });
    });
    test.end();
});

tape.test("packed message roundtrip (reflect + static)", function(test) {
    var jsonDescriptor = {
        nested: {
            Packed: {
                fields: {
                    u: { rule: "repeated", type: "uint32",  id: 1, options: { packed: true } },
                    s: { rule: "repeated", type: "sint32",  id: 2, options: { packed: true } },
                    d: { rule: "repeated", type: "double",  id: 3, options: { packed: true } },
                    b: { rule: "repeated", type: "bool",    id: 4, options: { packed: true } },
                    l: { rule: "repeated", type: "sint64",  id: 5, options: { packed: true } }
                }
            }
        }
    };
    var msg = { u: [ 1, 128, 99999 ], s: [ -1, 1, -1000 ], d: [ 1.5, -2.25 ], b: [ true, false, true ], l: [ -1, 1000, -123456789 ] };

    // reflect
    var P = protobuf.Root.fromJSON(jsonDescriptor).lookupType("Packed");
    var dec = P.decode(P.encode(msg).finish());
    test.same(dec.u, msg.u, "reflect uint32");
    test.same(dec.s, msg.s, "reflect sint32");
    test.same(dec.d, msg.d, "reflect double");
    test.same(dec.b, msg.b, "reflect bool");
    test.same(dec.l.map(Number), msg.l, "reflect sint64");

    // static codegen path
    var pbjs = require("../cli/pbjs");
    pbjs.generate(protobuf.Root.fromJSON(jsonDescriptor).resolveAll(), { target: "static", root: "test_packed" }, function(err, output) {
        test.error(err, "static code generation worked");
        var staticRoot = new Function("$protobuf", output + "\nreturn $root;")(protobuf); // eslint-disable-line no-new-func
        var sdec = staticRoot.Packed.decode(staticRoot.Packed.encode(msg).finish());
        test.same(sdec.u, msg.u, "static uint32");
        test.same(sdec.s, msg.s, "static sint32");
        test.same(sdec.d, msg.d, "static double");
        test.same(sdec.b, msg.b, "static bool");
        test.same(sdec.l.map(Number), msg.l, "static sint64");
        test.end();
    });
});
