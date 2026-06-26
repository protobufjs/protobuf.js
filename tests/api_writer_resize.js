var tape = require("tape");

var protobuf = require("..");

var Writer       = protobuf.Writer,
    BufferWriter = protobuf.BufferWriter,
    Reader       = protobuf.Reader;

// Exercise both the browser (Uint8Array/Array) writer and the node BufferWriter.
var writers = [ [ "Writer", Writer ] ];
if (BufferWriter)
    writers.push([ "BufferWriter", BufferWriter ]);

function toArray(buf) {
    return Array.prototype.slice.call(buf);
}

// builds a length-delimited field 1 carrying `n` distinct raw bytes via fork/ldelim
function ldelimRaw(Ctor, n) {
    var pattern = [];
    for (var i = 0; i < n; ++i)
        pattern.push(i & 255);
    var buf = new Ctor().uint32(10).fork().raw(pattern).ldelim().finish();
    return { buf: buf, pattern: pattern };
}

tape.test("writer resize / reserve-and-move", function(test) {

    writers.forEach(function(entry) {
        var name = entry[0], Ctor = entry[1];

        test.test(name + " - length-delimited reserve vs move boundary", function(test) {
            // 1-byte length (no move), 2-byte length (move by 1), 3-byte length (move by 2)
            [ 0, 1, 127, 128, 200, 16383, 16384, 20000 ].forEach(function(n) {
                var r = ldelimRaw(Ctor, n);
                var reader = Reader.create(r.buf);
                test.equal(reader.uint32(), 10, name + " tag intact for n=" + n);
                var inner = reader.bytes();
                test.equal(inner.length, n, name + " length prefix correct for n=" + n);
                test.same(toArray(inner), r.pattern, name + " content intact after move for n=" + n);
                test.equal(reader.pos, reader.len, name + " fully consumed for n=" + n);
            });
            test.end();
        });

        test.test(name + " - minimal length varint", function(test) {
            // 128 must encode as [0x80, 0x01], never padded by the reservation
            var buf = new Ctor().uint32(10).fork().raw(new Array(128).fill(0)).ldelim().finish();
            test.same(toArray(buf).slice(0, 3), [ 10, 0x80, 0x01 ], name + " 128 -> minimal 2-byte varint");
            test.equal(buf.length, 3 + 128, name + " total length");
            test.end();
        });

        test.test(name + " - nested forks with cascading moves", function(test) {
            var inner = [], outerTail = [];
            for (var i = 0; i < 200; ++i) inner.push((i * 7) & 255);
            for (var j = 0; j < 50; ++j) outerTail.push((j * 3) & 255);
            // outer field 1 { inner field 2 = 200 bytes } + 50 trailing raw bytes
            var buf = new Ctor()
                .uint32(10).fork()
                    .uint32(18).fork().raw(inner).ldelim()
                    .raw(outerTail)
                .ldelim()
                .finish();
            var reader = Reader.create(buf);
            test.equal(reader.uint32(), 10, name + " outer tag");
            var outer = reader.bytes();
            var ri = Reader.create(outer);
            test.equal(ri.uint32(), 18, name + " inner tag");
            test.same(toArray(ri.bytes()), inner, name + " inner content intact");
            test.same(toArray(outer).slice(ri.pos), outerTail, name + " trailing content intact");
            test.end();
        });

        test.test(name + " - string fast path: multi-byte, surrogates, boundary", function(test) {
            var cases = [
                "",
                "abc",
                "ä".repeat(63),   // 126 bytes, 1-byte length, encode-then-measure, no move
                "ä".repeat(64),   // 128 bytes, 2-byte length, encode-then-measure + move
                "€".repeat(50),   // 3-byte chars, 150 bytes, move
                "😀".repeat(32),  // surrogate pairs: 64 units, 128 bytes, move
                "x".repeat(127),  // encode-then-measure, ascii, 1-byte length
                "x".repeat(128),  // precompute branch (>= threshold), ascii
                "y".repeat(5000), // precompute branch, forces buffer growth
                "🎉mixed-ä-€-text".repeat(20)
            ];
            cases.forEach(function(s) {
                var buf = new Ctor().string(s).finish();
                test.equal(Reader.create(buf).string(), s, name + " roundtrips string of " + s.length + " units");
            });
            test.end();
        });

        test.test(name + " - hybrid branches agree with reference bytes", function(test) {
            // a string just below and well above the precompute threshold must both
            // produce [minimal-length-varint][utf8 bytes] identical to a manual encoding
            [ "ä".repeat(60), "ä".repeat(300) ].forEach(function(s) {
                var utf8 = protobuf.util.utf8;
                var byteLen = utf8.length(s);
                var ref = new Ctor().uint32(byteLen).finish();
                var buf = new Ctor().string(s).finish();
                test.same(toArray(buf).slice(0, ref.length), toArray(ref), name + " length prefix matches for " + s.length + " units");
                test.equal(buf.length, ref.length + byteLen, name + " total length matches for " + s.length + " units");
                test.equal(Reader.create(buf).string(), s, name + " roundtrips for " + s.length + " units");
            });
            test.end();
        });

        test.test(name + " - growth across many fields", function(test) {
            var w = new Ctor();
            var n = 5000;
            for (var i = 0; i < n; ++i)
                w.uint32(i);
            var reader = Reader.create(w.finish());
            var ok = true;
            for (var j = 0; j < n; ++j)
                if (reader.uint32() !== j) { ok = false; break; }
            test.ok(ok, name + " all " + n + " varints survive repeated growth");
            test.equal(reader.pos, reader.len, name + " fully consumed");
            test.end();
        });
    });

    test.test("nested message roundtrip exceeding 128 bytes at multiple levels", function(test) {
        var root = protobuf.Root.fromJSON({
            nested: {
                Inner: { fields: { data: { type: "bytes", id: 1 } } },
                Outer: { fields: { inner: { type: "Inner", id: 1 }, tail: { type: "bytes", id: 2 } } }
            }
        });
        var Outer = root.lookupType("Outer");
        var big = new Uint8Array(300), tail = new Uint8Array(200);
        for (var i = 0; i < 300; ++i) big[i] = (i * 5) & 255;
        for (var j = 0; j < 200; ++j) tail[j] = (j * 9) & 255;
        var dec = Outer.decode(Outer.encode({ inner: { data: big }, tail: tail }).finish());
        test.same(toArray(dec.inner.data), toArray(big), "nested bytes intact");
        test.same(toArray(dec.tail), toArray(tail), "tail bytes intact");
        test.end();
    });

    test.end();
});
