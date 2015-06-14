/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * ProtoBuf.js Test Suite.
 * @author Daniel Wirtz <dcode@dcode.io>
 */
(function(global) {

    var FILE = "ProtoBuf.js";
    var BROWSER = !!global.window;
    var StdOutFixture = require('fixture-stdout');
    var fixture = new StdOutFixture();

    var ProtoBuf = BROWSER ? global.dcodeIO.ProtoBuf : require(__dirname+"/../dist/"+FILE),
        ByteBuffer = BROWSER ? global.dcodeIO.ByteBuffer : ByteBuffer || require("bytebuffer"),
        util = BROWSER ? null : require("util"),
        fs = BROWSER ? null : require("fs");

        if (typeof __dirname == 'undefined') {
            __dirname = document.location.href.replace(/[\/\\][^\/\\]*$/, "");
        }

    /**
     * Constructs a new Sandbox for module loaders and shim testing.
     * @param {Object.<string,*>} properties Additional properties to set
     * @constructor
     */
    var Sandbox = function(properties) {
        this.ByteBuffer = function() {};
        for (var i in properties) {
            this[i] = properties[i];
        }
        this.console = {
            log: function(s) {
                console.log(s);
            }
        };
    };

    function fail(e) {
        throw(e);
    }

    /**
     * Validates the complexDotProto and complexInline tests.
     * @param {*} test Nodeunit test
     * @param {Object} Game Game namespace
     */
    function validateComplex(test, Game) {
        var Car = Game.Cars.Car,
            Vendor = Car.Vendor,
            Speed = Car.Speed;

        var vendor;
        // Car from class with argument list properties
        var car = new Car(
            "Rusty",
            // Vendor from class with object properties
            vendor = new Vendor({
                "name": "Iron Inc.",
                // Address from object
                "address": {
                    "country": "US"
                },
                "models": ["m1"]
            }),
            // Speed from enum object
            Speed.SUPERFAST
        );
        test.equal(car.model, "Rusty");
        test.equal(car.vendor.name, "Iron Inc.");
        test.equal(car.vendor.address.country, "US");
        test.equal(car.vendor.address.country, car.getVendor().get_address().country);
        var bb = new ByteBuffer(32);
        car.encode(bb);
        test.equal(bb.flip().toString("debug"), "<0A 05 52 75 73 74 79 12 15 0A 09 49 72 6F 6E 20 49 6E 63 2E 12 04 0A 02 55 53 1A 02 6D 31 18 02>");
        var carDec = Car.decode(bb);
        test.equal(carDec.model, "Rusty");
        test.equal(carDec.vendor.name, "Iron Inc.");
        test.equal(carDec.vendor.address.country, "US");
        test.equal(carDec.vendor.address.country, carDec.getVendor().get_address().country);
        test.equal(carDec.vendor.models[0], "m1");
    }

    /**
     * Test suite.
     * @type {Object.<string,function>}
     */
    var suite = {

        "init": function(test) {
            test.ok(typeof ProtoBuf == "object");
            test.ok(typeof ProtoBuf.Reflect == 'object');
            test.ok(typeof ProtoBuf.loadProto == "function");
            test.ok(typeof ProtoBuf.loadProtoFile == "function");
            test.strictEqual(ProtoBuf.loadProto, ProtoBuf.protoFromString);
            test.strictEqual(ProtoBuf.loadProtoFile, ProtoBuf.protoFromFile);
            test.ok(ProtoBuf.ByteBuffer);
            test.done();
        },

        "IS_NODE": function(test) {
            test.ok(ProtoBuf.Util.IS_NODE);
            test.done();
        },

        // Example "A Simple Message" from the protobuf docs
        // https://developers.google.com/protocol-buffers/docs/encoding#simple
        "example1": function(test) {
            try{
                var builder = ProtoBuf.loadProtoFile(__dirname+"/example1.proto");
                var Test1 = builder.build("Test1");
                test.ok(typeof Test1 == 'function');
                var inst = new Test1(150);
                test.ok(inst instanceof ProtoBuf.Builder.Message);
                test.equal(inst.a, 150);
                test.equal(inst.getA(), 150);
                test.equal(inst.get_a(), 150);
                inst.setA(151);
                test.equal(inst.a, 151);
                test.equal(inst.getA(), 151);
                test.equal(inst.get_a(), 151);
                inst.set_a(152);
                test.equal(inst.a, 152);
                test.equal(inst.toString(), ".Test1");
                test.throws(function() {
                    inst.setA(null); // required
                });
                test.throws(function() {
                    inst.setA([]);
                });
                var size = inst.calculate();
                var bb = new ByteBuffer(3);
                inst.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<08 98 01>");
                var instDec = Test1.decode(bb);
                test.equal(instDec.a, 152);

            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Basically the same as example1, but with an unsigned value.
        "example1u": function(test) {
            try{
                var builder = ProtoBuf.loadProtoFile(__dirname+"/example1u.proto");
                var Test1u = builder.build("Test1u");
                test.ok(typeof Test1u == 'function');
                var inst = new Test1u(-1);
                test.strictEqual(inst.a, 4294967295);
                var bb = new ByteBuffer(6);
                var size = inst.calculate();
                inst.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<08 FF FF FF FF 0F>");
                var instDec = Test1u.decode(bb);
                test.strictEqual(instDec.a, 4294967295);

            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Example "Strings" from the protobuf docs
        // https://developers.google.com/protocol-buffers/docs/encoding#types
        "example2": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/example2.proto");
                var Test2 = builder.build("Test2");
                var inst = new Test2("testing");
                var bb = new ByteBuffer(9);
                var size = inst.calculate();
                inst.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<12 07 74 65 73 74 69 6E 67>");
                var instDec = Test2.decode(bb);
                test.equal(instDec.b, "testing");
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Example "Embedded Messages" from the protobuf docs
        // https://developers.google.com/protocol-buffers/docs/encoding#embedded
        "example3": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/example3.proto");
                var root = builder.build();
                var Test1 = root.Test1;
                var Test3 = root.Test3;
                var inst = new Test3(new Test1(150));
                var bb = new ByteBuffer(5);
                test.equal(inst.c.a, 150);
                var size = inst.calculate();
                inst.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<1A 03 08 96 01>");
                var instDec = Test3.decode(bb);
                test.equal(instDec.c.a, 150);
            } catch(e) {
                fail(e);
            }
            test.done();
        },

        "example4": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/example4.proto");
                var Test4 = builder.build("Test4");
                var inst = new Test4([3, 270, 86942]);
                var bb = new ByteBuffer(8);
                test.equal(inst.d.length, 3);
                var size = inst.calculate();
                inst.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<22 06 03 8E 02 9E A7 05>");
                var instDec = Test4.decode(bb);
                test.equal(bb.toString("debug"), "22 06 03 8E 02 9E A7 05|");
                test.equal(instDec.d.length, 3);
                test.equal(instDec.d[2], 86942);
            } catch(e) {
                fail(e);
            }
            test.done();
        },

        "example5": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/example5.proto");
                builder.build();
            } catch(e) {
                fail(e);
            }
            test.done();
        },

        "constructor": function(test) {
            var builder = ProtoBuf.loadProtoFile(__dirname+"/example1.proto");
            var Test1 = builder.build("Test1");
            var t1 = new Test1(123),
                t2 = new Test1({a: 123}),
                t3 = new Test1(t1);
            test.deepEqual(t1, t2);
            test.deepEqual(t2, t3);
            test.done();
        },

        "numberFormats": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/numberformats.proto");
                var Formats = builder.build("Formats");
                test.strictEqual(Formats.DEC, 1);
                test.strictEqual(Formats.HEX, 31);
                test.strictEqual(Formats.OCT, 15);
                var Msg = builder.build("Msg");
                var msg = new Msg();
                test.strictEqual(msg.dec, -1);
                test.strictEqual(msg.hex, -31);
                test.strictEqual(msg.hexUC, 521);
                test.strictEqual(msg.oct, -15);
                test.strictEqual(msg.exp, 0.1e5);
                test.strictEqual(msg.nod, 1.);
                test.strictEqual(msg.exn, 1e8);
                test.strictEqual(msg.sp1, Infinity);
                test.strictEqual(msg.sp2, -Infinity);
                test.ok(isNaN(msg.sp3));
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Check encode/decode against a table of known correct pairs.
        // Note that javascript ArrayBuffer does not support signed Zero or NaN
        // bertdouglas (https://github.com/bertdouglas)
        "float": function(test) {
            try {
                var str_proto = "message Float {"
                    + " required float f = 1;"
                    + "}";
                var builder = ProtoBuf.loadProto(str_proto);
                var root = builder.build();
                var Float = root.Float;

                var in_tolerance = function (reference,actual) {
                    var tol = 1e-6;
                    var scale = 1.0;
                    if (reference != 0.0 ) {
                        scale = reference;
                    };
                    var err = Math.abs(reference - actual)/scale;
                    return err < tol;
                };

                var f_vals = [
                    // hex values are shown here in big-endian following IEEE754 notation
                    // protobuf is little-endian
                    // { f: -0.0 , b: "80 00 00 00" },
                    { f: +0.0 , b: "00 00 00 00" },
                    { f: -1e-10 , b: "AE DB E6 FF" },
                    { f: +1e-10 , b: "2E DB E6 FF" },
                    { f: -2e+10 , b: "D0 95 02 F9" },
                    { f: +2e+10 , b: "50 95 02 F9" },
                    { f: -3e-30 , b: "8E 73 63 90" },
                    { f: +3e-30 , b: "0E 73 63 90" },
                    { f: -4e+30 , b: "F2 49 F2 CA" },
                    { f: +4e+30 , b: "72 49 F2 CA" },
                    { f: -123456789.0 , b: "CC EB 79 A3" },
                    { f: +123456789.0 , b: "4C EB 79 A3" },
                    { f: -0.987654321 , b: "BF 7C D6 EA" },
                    { f: +0.987654321 , b: "3F 7C D6 EA" },
                    { f: -Infinity , b: "FF 80 00 00" },
                    { f: +Infinity , b: "7F 80 00 00" }
                    // { f: -NaN , b: "FF C0 00 00>" },
                    // { f: +NaN , b: "7F C0 00 00" }
                ];

                f_vals.map( function(x) {
                    // check encode
                    var m1 = new Float();
                    var b1 = new ByteBuffer();
                    m1.f = x.f;
                    m1.encode(b1);
                    var q1 = b1.slice(1,5).compact().reverse();
                    test.strictEqual('<' + x.b + '>', q1.toString("debug"));

                    // check decode
                    var b2 = new ByteBuffer();
                    var s1 = x.b + ' 0D';
                    var s2 = s1.split(" ");
                    var s3 = s2.reverse();
                    var i1 = s3.map(function(y) { return parseInt(y,16) } );
                    i1.map(function(y) { b2.writeUint8(y) });
                    b2.limit = b2.offset;
                    b2.offset = 0;
                    var m2 = Float.decode(b2);

                    var s4 = "" + x.f +" " + m2.f;
                    if ( isNaN(x.f) ) {
                        test.ok( isNaN(m2.f), s4 );
                    }
                    else if ( ! isFinite( x.f) ) {
                        test.ok( x.f === m2.f, s4 );
                    }
                    else {
                        test.ok( in_tolerance(x.f, m2.f), s4 );
                    }
                });
            } catch(e) {
                fail(e);
            }
            test.done();
        },

        "bytes": function(test) {
            try {
                var str_proto = "message Test { required bytes b = 1; }";
                var builder = ProtoBuf.loadProto(str_proto);
                var Test = builder.build("Test");
                var bb = new ByteBuffer(4).writeUint32(0x12345678).flip();
                var myTest = new Test(bb);
                test.strictEqual(myTest.b.array, bb.array);
                var bb2 = new ByteBuffer(6);
                var size = myTest.calculate();
                myTest.encode(bb2);
                test.strictEqual(bb2.offset, size);
                test.equal(bb2.flip().toString("debug"), "<0A 04 12 34 56 78>");
                myTest = Test.decode(bb2);
                test.equal(myTest.b.BE().readUint32(), 0x12345678);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "bytesFromFile": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Image { required bytes data = 1; }"),
                    Image = builder.build("Image"),
                    data = fs.readFileSync(__dirname+"/../ProtoBuf.png"),
                    image = new Image({ data: data }),
                    bb = image.encode(),
                    imageDec = Image.decode(bb),
                    dataDec = imageDec.data.toBuffer();
                test.strictEqual(data.length, dataDec.length);
                test.deepEqual(data, dataDec);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "notEnoughBytes": function(test) {
            var builder = ProtoBuf.loadProto("message Test { required bytes b = 1; }");
            var Test = builder.build("Test");
            var bb = new ByteBuffer().writeUint32(0x12345678).flip();
            var encoded = new ByteBuffer(6);
            new Test(bb).encode(encoded);
            test.equal(encoded.flip().toString("debug"), "<0A 04 12 34 56 78>");
            encoded = encoded.slice(0, 5); // chop off the last byte
            var err = null;
            try {
                Test.decode(encoded);
            } catch (caught) {
                err = caught;
            }
            test.ok(err && err.message && err.message.indexOf(": 4 required but got only 3") >= 0);
            test.done();
        },

        "bool": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Test { optional bool ok = 1 [ default = false ]; }"),
                    Test = builder.build("Test"),
                    t =  new Test();
                test.strictEqual(t.ok, null); // Not set as it is optional
                t.setOk(true);
                test.strictEqual(t.ok, true);
                test.strictEqual(Test.decode(t.encode()).ok, true);
                t.setOk(false);
                test.strictEqual(t.ok, false);
                t.setOk(null); // Not set
                test.strictEqual(Test.decode(t.encode()).ok, false); // = default when missing
            } catch (err) {
                fail(err);
            }
            test.done();
        },

        // As mentioned by Bill Katz
        "T139": function(test) {
            try{
                var builder = ProtoBuf.loadProtoFile(__dirname+"/T139.proto");
                var T139 = builder.build("T139");
                test.ok(typeof T139 == 'function');
                var inst = new T139(139,139);
                test.equal(inst.a, 139);
                test.equal(inst.b, 139);
                inst.setA(139);
                inst.setB(139);
                test.equal(inst.a, 139);
                test.equal(inst.b, 139);
                var bb = new ByteBuffer(3);
                inst.encode(bb);
                test.equal(bb.flip().toString("debug"), "<08 8B 01 10 8B 01>");
                var instDec = T139.decode(bb);
                test.equal(instDec.a, 139);
                test.equal(instDec.b, 139);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "emptyDefaultString": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Test1 { required string test = 1 [default = \"\"]; }");
                var Test1;
                test.doesNotThrow(function() {
                    Test1 = builder.build("Test1");
                });
                var test1 = new Test1();
                test.strictEqual(test1.test, "");
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "trailingSemicolon": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Test1 { optional string test = 1; };");
                test.doesNotThrow(function() {
                    var Test1 = builder.build("Test1");
                });
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "inner": {

            "longstr": function(test) {
                try {
                    var builder = ProtoBuf.loadProto("message Test { required Inner a = 1; message Inner { required string b = 1; } }");
                    var Test = builder.build("Test");
                    var t = new Test();
                    var data = "0123456789"; // 10: 20, 40, 80, 160, 320 bytes
                    for (var i=0; i<5; i++) data += data;
                    test.equal(data.length, 320);
                    t.a = new Test.Inner(data);
                    var bb = t.encode();
                    var t2 = Test.decode(bb);
                    test.equal(t2.a.b.length, 320);
                    test.equal(data, t2.a.b);
                } catch (e) {
                    fail(e);
                }
                test.done();
            },

            "multiple": function(test) {
                try {
                    var str = "";
                    for (var i=0; i<200; i++) str += 'a';
                    var builder = ProtoBuf.loadProtoFile(__dirname+"/inner.proto");
                    var fooCls = builder.build("Foo");
                    var barCls = builder.build("Bar");
                    var bazCls = builder.build("Baz");
                    var foo = new fooCls(new barCls(str), new bazCls(str));
                    var fooEncoded = foo.encode();
                    test.doesNotThrow(function() {
                        fooCls.decode(fooEncoded);
                    });
                } catch (e) {
                    fail(e);
                }
                test.done();
            },

            "float": function(test) {
                try {
                    var builder = ProtoBuf.loadProto("message Foo { required Bar bar = 1; } message Bar { required float baz = 1; }");
                    var root = builder.build();
                    var foo = new root.Foo(new root.Bar(4));
                    var bb = foo.encode();
                    var foo2 = root.Foo.decode(bb);
                    test.equal(foo.bar.baz, 4);
                    test.equal(foo2.bar.baz, foo.bar.baz);
                } catch (e) {
                    fail(e);
                }
                test.done();
            }

        },

        "truncated": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Test { required int32 a = 1; required int32 b = 2; }");
                var Test = builder.build("Test");
                var t = new Test(), bb = new ByteBuffer(2);
                t.setA(1);
                try {
                    bb = t.encode(bb).flip();
                    test.ok(false);
                } catch (e) {
                    test.ok(e.encoded);
                    bb = e.encoded.flip();
                    test.equal(bb.toString("debug"), "<08 01>");
                }
                var t2;
                try /* to decode truncated message */ {
                    t2 = Test.decode(bb);
                    test.ok(false); // ^ throws
                } catch (e) {
                    // But still be able to access the rest
                    var t3 = e.decoded;
                    test.strictEqual(t3.a, 1);
                    test.strictEqual(t3.b, null);
                }
                test.strictEqual(t2, undefined);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Options on all levels
        "options": {

            "parse": function(test) {
                try {
                    var parser = new ProtoBuf.DotProto.Parser(ProtoBuf.Util.fetch(__dirname+"/options.proto"));
                    var root = parser.parse();
                    test.equal(root["package"], "My");
                    test.strictEqual(root["options"]["(toplevel_1)"], 10);
                    test.equal(root["options"]["(toplevel_2)"], "Hello world!");
                    test.equal(root["messages"][0]["fields"][0]["options"]["default"], "Max");
                    test.equal(root["messages"][0]["options"]["(inmessage)"], "My.Test")
                } catch (e) {
                    fail(e);
                }
                test.done();
            },

            "export": function(test) {
                try {
                    var builder = ProtoBuf.loadProtoFile(__dirname+"/options.proto");
                    var My = builder.build("My");
                    test.deepEqual(My.$options, {
                        "(toplevel_1)": 10,
                        "(toplevel_2)": "Hello world!"
                    });
                    test.strictEqual(My.$options['(toplevel_1)'], 10);
                    test.deepEqual(My.Test.$options, {
                        "(inmessage)": "My.Test",
                        "(foo.my_option).bar": false
                    });
                } catch (e) {
                    fail(e);
                }
                test.done();
            }
        },

        // Comments
        "comments": function(test) {
            try {
                var tn = new ProtoBuf.DotProto.Tokenizer(ProtoBuf.Util.fetch(__dirname+'/comments.proto'));
                var token, tokens = [];
                do {
                    token = tn.next();
                    tokens.push(token);
                } while (token !== null);
                test.deepEqual(tokens, ['message', 'TestC', '{', 'required', 'int32', 'a', '=', '1', ';', '}', null]);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // A more or less complex proto with type references
        "complexProto": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/complex.proto");
                validateComplex(test, builder.build("Game"));
                var TCars = builder.lookup("Game.Cars");
                test.strictEqual(TCars.fqn(), ".Game.Cars");
            } catch(e) {
                fail(e);
            }
            test.done();
        },

        // The same created without calling upon the parser to do so
        "complexJSON": function(test) {
            try {
                var builder = ProtoBuf.loadJsonFile(__dirname+"/complex.json");
                validateComplex(test, builder.build("Game"));
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Builder reused to add definitions from multiple sources
        "multiBuilder": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/example1.proto");
                ProtoBuf.loadProtoFile(__dirname+"/example2.proto", builder);
                var ns = builder.build();
                test.ok(!!ns.Test1);
                test.ok(!!ns.Test2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Inner messages test
        "inner": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/repeated.proto");
                var root = builder.build(),
                    Outer = root.Outer,
                    Inner = root.Inner;
                // Empty
                var outer = new Outer();
                var bb = new ByteBuffer(1).fill(0).flip();
                outer.encode(bb);
                test.equal(bb.flip().toString("debug"), "|00");
                var douter = Outer.decode(bb);
                test.ok(douter.inner instanceof Array);
                test.equal(douter.inner.length, 0);
                // Multiple
                outer = new Outer({ inner: [new Inner(1), new Inner(2)] });
                bb = new ByteBuffer(8);
                var size = outer.calculate();
                outer.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<0A 02 08 01 0A 02 08 02>");
                douter = Outer.decode(bb);
                test.ok(douter.inner instanceof Array);
                test.equal(douter.inner.length, 2);
                test.equal(douter.inner[0].inner_value, 1);
                test.equal(douter.inner[1].inner_value, 2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Packed vs. not packed repeated fields test
        "packed": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/packed.proto");
                var Message = builder.build("Message");
                // Both empty
                var message = new Message();
                var bb = new ByteBuffer(1).fill(0).flip();
                var size = message.calculate();
                message.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "|00");
                message = Message.decode(bb);
                test.ok(message.a instanceof Array);
                test.equal(message.a.length, 0);
                test.ok(message.b instanceof Array);
                test.equal(message.b.length, 0);
                // Both non-empty
                message = new Message([1,2,3], [1,2,3]);
                size = message.calculate();
                message.encode(bb.resize(11));
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<0A 03 01 02 03 10 01 10 02 10 03>");
                message = Message.decode(bb);
                test.ok(message.a instanceof Array);
                test.equal(message.a.length, 3);
                test.deepEqual(message.a, [1,2,3]);
                test.ok(message.b instanceof Array);
                test.equal(message.b.length, 3);
                test.deepEqual(message.b, [1,2,3]);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Legacy groups test
        "groups": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/groups.proto");
                var root = builder.build();
                var Outer = root.Outer;
                var TOuter = builder.ns.getChild("Outer");
                var TInner = TOuter.getChild("MyInner");
                test.ok(TInner instanceof ProtoBuf.Reflect.Message);
                test.strictEqual(TInner.isGroup, true);
                var Tinner = TOuter.getChild("myinner");
                test.ok(Tinner instanceof ProtoBuf.Reflect.Message.Field);
                test.strictEqual(Tinner.id, 2);
                test.deepEqual(Tinner.options, { "deprecated": true });
                var Inner = root.Outer.MyInner;
                var outer = new Outer("a", [new Inner("hello")], "b", new Inner("world"));
                var bb = new ByteBuffer();
                var size = outer.calculate();
                outer.encode(bb);
                test.strictEqual(bb.offset, size);
                bb.flip().compact();
                var wiredMsg = [
                    "0A", // 1|010 = id 1, wire type 2 (ldelim)
                    "01", // length 1
                    "61", // "a"
                    "13", // 10|011 = id 2, wire type 3 (start group)
                    "1A", // 11|010 = id 3, wire type 2 (ldelim)
                    "05", // length 5
                    "68 65 6C 6C 6F", // "hello"
                    "14", // 10|100 = id 2, wire type 4 (end group)
                    "22", // 100|010 = id 4, wire type 2 (ldelim)
                    "01", // length 1
                    "62", // "b"
                    "2B", // 101|011 = id 5, wire type = 3 (start group)
                    "1A", // 11|010 = id 3, wire type = 2 (ldelim)
                    "05", // length 5
                    "77 6F 72 6C 64", // "world"
                    "2C" // 101|100 = id 5, wire type = 4 (end group)
                ];
                test.equal(bb.toString("debug"), "<" +wiredMsg.join(" ") + ">");
                var douter = Outer.decode(bb);
                test.strictEqual(douter.before, "a");
                test.strictEqual(douter.myinner.length, 1);
                test.strictEqual(douter.myinner[0].a, "hello");
                test.strictEqual(douter.after, "b");
                bb.offset = 0;
                douter = root.OuterSparse.decode(bb);
                test.strictEqual(bb.offset, bb.limit);
                test.strictEqual(douter.before, "a");
                test.strictEqual(douter.after, "b");
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "x64Fixed": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/x64.proto");
                var Test = builder.build("Test");
                var myTest = new Test();
                test.ok(myTest.val instanceof ByteBuffer.Long);
                test.equal(myTest.val.unsigned, false);
                test.equal(myTest.val.toNumber(), -1);
                test.ok(myTest.uval instanceof ByteBuffer.Long);
                test.equal(myTest.uval.unsigned, true);
                test.equal(myTest.uval.toNumber(), 1);
                myTest.setVal(-2);
                myTest.setUval(2);
                var bb = new ByteBuffer(18); // 2x tag + 2x 64bit
                var size = myTest.calculate();
                myTest.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<09 FE FF FF FF FF FF FF FF 11 02 00 00 00 00 00 00 00>");
                //                         ^ wireType=1, id=1         ^ wireType=1, id=2
                myTest = Test.decode(bb);
                test.ok(myTest.val instanceof ByteBuffer.Long);
                test.equal(myTest.val.unsigned, false);
                test.equal(myTest.val.toNumber(), -2);
                test.ok(myTest.uval instanceof ByteBuffer.Long);
                test.equal(myTest.uval.unsigned, true);
                test.equal(myTest.uval.toNumber(), 2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "x64Varint": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/x64.proto");
                var Test = builder.build("Test2");
                var Test = builder.build("Test2");
                var myTest = new Test();
                test.ok(myTest.val instanceof ByteBuffer.Long);
                test.equal(myTest.val.unsigned, false);
                test.equal(myTest.val.toNumber(), -1);
                test.ok(myTest.uval instanceof ByteBuffer.Long);
                test.equal(myTest.uval.unsigned, true);
                test.equal(myTest.uval.toNumber(), 1);
                test.ok(myTest.sval instanceof ByteBuffer.Long);
                test.equal(myTest.sval.unsigned, false);
                test.equal(myTest.sval.toNumber(), -2);

                myTest.setVal(-2);
                myTest.setUval(2);
                myTest.setSval(-3);
                var bb = new ByteBuffer(3+10+2); // 3x tag + 1x varint 10byte + 2x varint 1byte
                var size = myTest.calculate();
                myTest.encode(bb);
                test.strictEqual(bb.offset, size);
                test.equal(bb.flip().toString("debug"), "<08 FE FF FF FF FF FF FF FF FF 01 10 02 18 05>");
                // 08: wireType=0, id=1, 18: wireType=0, id=2, ?: wireType=0, id=3
                myTest = Test.decode(bb);
                test.ok(myTest.val instanceof ByteBuffer.Long);
                test.equal(myTest.val.unsigned, false);
                test.equal(myTest.val.toNumber(), -2);
                test.ok(myTest.uval instanceof ByteBuffer.Long);
                test.equal(myTest.uval.unsigned, true);
                test.equal(myTest.uval.toNumber(), 2);
                test.ok(myTest.sval instanceof ByteBuffer.Long);
                test.equal(myTest.sval.unsigned, false);
                test.equal(myTest.sval.toNumber(), -3);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "keywords": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Reserved { optional string get = 1; }");
                var My = builder.build();
                var myTest = new My.Reserved("a");
                test.doesNotThrow(function() {
                    myTest.encode();
                });
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "imports": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/imports.proto");
                var root = builder.build();
                test.ok(!!root.Test1);
                test.ok(!!root.Test2);
                test.ok(!!root.My.Test3);
                test.notEqual(root.Test2, root.My.Test2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "importExtensions": function(test) {
            var x = "package x; \
            message Test { \
                extensions 1 to 10; \
            } \
            extend Test { \
                optional int32 first_val = 1; \
            }";
            var y = "package y; \
            extend x.Test { \
                optional int32 second_val = 2; \
            }";
            var builder = ProtoBuf.newBuilder();
            ProtoBuf.loadProto(x, builder);
            ProtoBuf.loadProto(y, builder);
            var Test = builder.build('x.Test');
            var inst = new Test();
            test.strictEqual(inst[".x.first_val"], null);
            test.strictEqual(inst[".y.second_val"], null);
            test.done();
        },

        "toplevel": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/toplevel.proto");
                var My = builder.build("My");
                test.ok(!!My.MyEnum);
                test.equal(My.MyEnum.ONE, 1);
                test.equal(My.MyEnum.TWO, 2);
                test.ok(!!My.Test);
                var myTest = new My.Test();
                test.equal(myTest.num, My.MyEnum.ONE);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "importsToplevel": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/imports-toplevel.proto");
                var My = builder.build("My");
                test.ok(!!My.MyEnum);
                test.equal(My.MyEnum1.ONE, 1);
                test.equal(My.MyEnum1.TWO, 2);
                test.ok(!!My.Test1);
                var myTest = new My.Test1();
                test.equal(myTest.num, My.MyEnum.ONE);
                test.equal(myTest.num1, My.MyEnum1.ONE);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "importDuplicate": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/import_a.proto");
                test.doesNotThrow(function() {
                    ProtoBuf.loadProtoFile(__dirname+"/import_b.proto", builder);
                });
                var root = builder.build();
                test.ok(root.A);
                test.ok(root.B);
                test.ok(root.Common);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "importDuplicateDifferentBuilder": function(test) {
            try {
                var builderA = ProtoBuf.loadProtoFile(__dirname+"/import_a.proto");
                var builderB;
                test.doesNotThrow(function() {
                    builderB = ProtoBuf.loadProtoFile(__dirname+"/import_b.proto");
                });
                var rootA = builderA.build();
                var rootB = builderB.build();
                test.ok(rootA.A);
                test.ok(rootB.B);
                test.ok(rootA.Common);
                test.ok(rootB.Common);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "dupimport": function(test) {
            try {
                // Suppress logging result to stdout
                fixture.capture(function() { return false;});
                require(__dirname+"/../cli/pbjs.js").main(["node", "bin/pbjs", __dirname+"/dupimport/main.proto", "--quiet"]);
                fixture.release();
            } catch (e) {
                fixture.release();
                fail(e);
            }
            test.done();
        },

        "field_name_same_as_package": function(test) {
            try {
                fixture.capture(function() { return false;});
                require(__dirname+"/../cli/pbjs.js").main(["node", "bin/pbjs", __dirname+"/field_name_same_as_package/main.proto", "--quiet"]);
                fixture.release();
            } catch (e) {
                fixture.release();
                fail(e);
            }
            test.done();
        },

        "importRoot": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile({
                    root: __dirname,
                    file: "importRoot/file1.proto"
                });
                var Test = builder.build("Test");
                test.ok(new Test() instanceof ProtoBuf.Builder.Message);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "extend": function(test) {
            try {
                var ast = new ProtoBuf.DotProto.Parser(fs.readFileSync(__dirname+"/extend.proto")).parse();
                test.deepEqual(ast,  {
                    "package": null,
                    "messages": [
                        {
                            "ref": "google.protobuf.MessageOptions",
                            "fields": [
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "int32",
                                    "name": "foo",
                                    "id": 1001
                                }
                            ]
                        },
                        {
                            "name": "Foo",
                            "fields": [],
                            "enums": [],
                            "messages": [],
                            "options": {},
                            "extensions": [
                                2,
                                536870911
                            ],
                            "oneofs": []
                        },
                        {
                            "ref": "Foo",
                            "fields":[
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "bar",
                                    "id": 2
                                }
                            ]
                        },
                        {
                            "name": "Bar",
                            "fields": [],
                            "enums": [],
                            "messages": [
                                {
                                    "name": "Foo",
                                    "fields": [],
                                    "enums": [],
                                    "messages": [],
                                    "options": {},
                                    "oneofs": []
                                },
                                {
                                    "ref": ".Foo",
                                    "fields": [
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "Foo",
                                            "name": "foo",
                                            "id": 3
                                        }
                                    ]
                                }
                            ],
                            "options": {},
                            "oneofs": []
                        }
                    ],
                    "enums": [],
                    "imports": [
                        "google/protobuf/descriptor.proto"
                    ],
                    "options": {},
                    "services": []
                });

                var builder = ProtoBuf.loadProtoFile(__dirname+"/extend.proto");
                var TFoo = builder.lookup(".Foo"),
                    TBar = builder.lookup(".Bar"),
                    TBarFoo = builder.lookup(".Bar.Foo"),
                    fields = TFoo.getChildren(ProtoBuf.Reflect.Message.Field);
                test.strictEqual(fields.length, 2);
                test.strictEqual(fields[0].name, ".bar");
                test.strictEqual(fields[0].id, 2);
                test.strictEqual(fields[1].name, ".Bar.foo");
                test.strictEqual(fields[1].id, 3);
                test.deepEqual(TFoo.extensions, [2, ProtoBuf.ID_MAX]); // Defined
                test.deepEqual(TBar.extensions, [ProtoBuf.ID_MIN, ProtoBuf.ID_MAX]); // Undefined
                test.deepEqual(TBar.getChild("foo"), { builder: builder, parent: TBar, name: "foo", field: TFoo.getChild('.Bar.foo') });
                test.strictEqual(TBar.getChildren(ProtoBuf.Reflect.Message.Field).length, 0);
                var root = builder.build();
                test.strictEqual(TFoo.getChild(".Bar.foo").resolvedType, TBarFoo); // .Bar.Foo, not .Foo
                var foo = new root.Foo(),
                    bar = new root.Bar();
                foo['.bar'] = "123";
                foo['.Bar.foo'] = bar;
                test.equal(foo.encode().compact().toString("debug"), "<12 03 31 32 33 1A 00>");
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        // Custom options on all levels
        // victorr (https://github.com/victorr)
        "customOptions": function(test) {
            try {
                var parser = new ProtoBuf.DotProto.Parser(ProtoBuf.Util.fetch(__dirname+"/custom-options.proto"));
                var root = parser.parse();
                test.equal(root["options"]["(my_file_option)"], "Hello world!");
                test.equal(root["messages"][7]["options"]["(my_message_option)"], 1234);
                test.equal(root["messages"][7]["fields"][0]["options"]["(my_field_option)"], 4.5);
                // test.equal(root["services"]["MyService"]["options"]["my_service_option"], "FOO");
                // TODO: add tests for my_enum_option, my_enum_value_option
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "oneofs": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/oneof.proto"),
                    MyOneOf = builder.build("MyOneOf"),
                    TOneOf = builder.lookup(".MyOneOf");
                test.ok(TOneOf.getChild("my_oneof"));
                var myOneOf = new MyOneOf();
                test.strictEqual(myOneOf.my_oneof, null);
                myOneOf.set("id", 1);
                test.strictEqual(myOneOf.my_oneof, "id");
                myOneOf.set("name", "me");
                test.strictEqual(myOneOf.my_oneof, "name");
                test.strictEqual(myOneOf.id, null);
                var bb = myOneOf.encode().compact();
                test.strictEqual(bb.toString("debug"), "<12 02 6D 65>"); // id 2, wt 2, len 2
                myOneOf = MyOneOf.decode(bb);
                test.strictEqual(myOneOf.my_oneof, "name");
                test.strictEqual(myOneOf.name, "me");
                test.strictEqual(myOneOf.id, null);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "services": function(test) {
            try {
                var parser = new ProtoBuf.DotProto.Parser(ProtoBuf.Util.fetch(__dirname+"/custom-options.proto"));
                var root = parser.parse();
                test.deepEqual(root["services"], [{
                    "name": "MyService",
                    "rpc": {
                        "MyMethod": {
                            "request": "RequestType",
                            "response": "ResponseType",
                            "request_stream": false,
                            "response_stream": false,
                            "options": {
                                "(my_method_option).foo": 567,
                                "(my_method_option).bar": "Some string"
                            }
                        }
                    },
                    "options": {
                        "(my_service_option)": "FOO"
                    }
                }]);

                var builder = ProtoBuf.loadProtoFile(__dirname+"/custom-options.proto");
                var root = builder.build(),
                    MyService = root.MyService,
                    RequestType = root.RequestType,
                    ResponseType = root.ResponseType,
                    called = false;

                test.deepEqual(MyService.$options, {
                    "(my_service_option)": "FOO"
                });
                test.deepEqual(MyService.MyMethod.$options, {
                    "(my_method_option).foo": 567,
                    "(my_method_option).bar": "Some string"
                });

                // Provide the service with your actual RPC implementation based on whatever framework you like most.
                var myService = new MyService(function(method, req, callback) {
                    test.strictEqual(method, ".MyService.MyMethod");
                    test.ok(req instanceof RequestType);
                    called = true;

                    // In this case we just return no error and our pre-built response. This must be properly async!
                    setTimeout(callback.bind(this, null, (new ResponseType()).encode() /* as raw bytes for debugging */ ));
                });

                test.deepEqual(myService.$options, MyService.$options);
                test.deepEqual(myService.MyMethod.$options, MyService.MyMethod.$options);

                // Call the service with your request message and provide a callback. This will call your actual service
                // implementation to perform the request and gather a response before calling the callback. If the
                // request or response type is invalid i.e. not an instance of RequestType or ResponseType, your
                // implementation will not be called as ProtoBuf.js handles this case internally and directly hands the
                // error to your callback below.
                myService.MyMethod(new RequestType(), function(err, res) {
                    // We get: err = null, res = our prebuilt response. And that's it.
                    if (err !== null) {
                        fail(err);
                    }
                    test.strictEqual(called, true);
                    test.ok(res instanceof ResponseType);
                    test.done();
                });
                myService.MyMethod(new RequestType().encode(), function(err, res) {
                    // We get: err = null, res = our prebuilt response. And that's it.
                    if (err !== null) {
                        fail(err);
                    }
                    test.strictEqual(called, true);
                    test.ok(res instanceof ResponseType);
                    test.done();
                });
            } catch (e) {
                fail(e);
            }
        },

        // Properly ignore "syntax" and "extensions" keywords
        "gtfs-realtime": function(test) {
            try {
                test.doesNotThrow(function() {
                    ProtoBuf.loadProtoFile(__dirname+"/gtfs-realtime.proto");
                });
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "delimited": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Position { required int32 x = 1; required int32 y = 2; }");
                var Position = builder.build("Position");
                var bb = new ByteBuffer();
                for (var i=0; i<2; i++) {
                    var position = new Position(10,10);
                    position.encodeDelimited(bb);
                }
                bb.flip();
                for (i=0; i<2; i++) {
                    position = Position.decodeDelimited(bb);
                    test.strictEqual(position.x, 10);
                    test.strictEqual(position.y, 10);
                }
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "stringify": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Position { required int32 x = 1; required int64 y = 2; }");
                var Position = builder.build("Position");
                var position = new Position(1, ProtoBuf.Long.fromNumber(2));
                var json = JSON.stringify(position);
                test.strictEqual(json, '{"x":1,"y":{"low":2,"high":0,"unsigned":false}}');
                position = new Position(JSON.parse(json));
                test.strictEqual(position.x, 1);
                test.ok(position.y instanceof ProtoBuf.Long);
                test.deepEqual(position.y, {"low":2,"high":0,"unsigned":false});
                // Also test if this encodes and decodes properly
                position = Position.decode(position.encode());
                test.ok(position.y instanceof ProtoBuf.Long);
                test.deepEqual(position.y, {"low": 2, "high": 0, "unsigned": false });
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "fields": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/optional.proto");
                var Test1 = builder.build("Test1");
                var test1 = new Test1();
                test.strictEqual(test1.a, null);
                test.deepEqual(Object.keys(test1), ['a','b']);
                var bb = test1.encode();
                test1 = Test1.decode(bb);
                test.strictEqual(test1.a, null);
                test.deepEqual(Object.keys(test1), ['a','b']);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "fieldsToCamelCase": function(test) {
            try {
                ProtoBuf.convertFieldsToCamelCase = true;
                var builder = ProtoBuf.loadProtoFile(__dirname+"/camelcase.proto");
                var Test = builder.build("Test"),
                    TTest = builder.lookup("Test");
                var msg = new Test();

                // Reverted collision on 1st
                test.strictEqual(msg.some_field, null);
                test.strictEqual(msg.someField, null);
                test.equal(TTest.getChild("some_field").id, 1);
                test.equal(TTest.getChild("someField").id, 2);


                // Reverted collision on 2nd
                test.strictEqual(msg.aField, null);
                test.strictEqual(msg.a_field, null);
                test.equal(TTest.getChild("aField").id, 3);
                test.equal(TTest.getChild("a_field").id, 4);

                // No collision
                test.strictEqual(msg.itsAField, null);
                test.equal(TTest.getChild("itsAField").id, 5);

                test.ok(typeof msg.set_its_a_field === "function");
                test.ok(typeof msg.setItsAField === "function");

                ProtoBuf.convertFieldsToCamelCase = false;
            } catch (e) {
                ProtoBuf.convertFieldsToCamelCase = false;
                fail(e);
            }
            test.done();
        },

        "setarray": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/setarray.proto");
                var root = builder.build(),
                    Outer = root.Outer,
                    Inner = root.Inner,
                    inners = [];

                // Array of repeated messages
                inners.push(new Inner("a"), new Inner("b"), new Inner("c"));
                var outer = new Outer();
                outer.setInners(inners);
                test.deepEqual(outer.inners, inners);

                // Array of repeated message objects
                inners = [];
                inners.push({ str: 'a' }, { str: 'b' }, { str: 'c' });
                outer.setInners(inners); // Converts
                test.ok(outer.inners[0] instanceof Inner);
                test.deepEqual(outer.inners, inners);
            } catch (e) {
                fail(e);
            }
            test.done();
        },


        // Make sure that our example at https://github.com/dcodeIO/ProtoBuf.js/wiki is not nonsense
        "pingexample": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/PingExample.proto");
                var Message = builder.build("Message");
                var msg = new Message();
                msg.ping = new Message.Ping(123456789);
                var bb = msg.encode();
                test.strictEqual(bb.limit, 7);
                msg = Message.decode(bb);
                test.ok(msg.ping);
                test.notOk(msg.pong);
                test.strictEqual(msg.ping.time, 123456789);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "negInt32": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message Test { required int32 value = 2; }");
                var Test = builder.build("Test");
                var t = new Test(-1);
                var size = t.calculate();
                var bb = t.encode(); // flips
                test.strictEqual(bb.remaining(), size);
                test.strictEqual(bb.toBase64(), "EP///////////wE=");
                t = Test.decode(bb);
                test.strictEqual(t.value, -1);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "negEnumId": function(test) {
            try {
                test.doesNotThrow(function() {
                    var builder = ProtoBuf.loadProtoFile(__dirname+"/negid.proto");
                    var Test = builder.build("Test");
                    test.strictEqual(Test.LobbyType.INVALID, -1);
                    var t = new Test(Test.LobbyType.INVALID);
                    test.strictEqual(t.type, -1);
                    var size = t.calculate();
                    var bb = t.encode(); // flips
                    test.strictEqual(bb.remaining(), size);
                    t = Test.decode(bb);
                    test.strictEqual(t.type, -1);
                });
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "base64": function(test) {
            try {
                var Message = ProtoBuf.loadProto("message Message { required string s = 1; }").build("Message");
                var msg = new Message("ProtoBuf.js");
                var b64 = msg.toBase64();
                test.strictEqual(b64, "CgtQcm90b0J1Zi5qcw==");
                var msg2 = Message.decode64(b64);
                test.deepEqual(msg, msg2);
                msg2 = Message.decode(b64, "base64");
                test.deepEqual(msg, msg2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "hex": function(test) {
            try {
                var Message = ProtoBuf.loadProto("message Message { required string s = 1; }").build("Message");
                var msg = new Message("ProtoBuf.js");
                var hex = msg.toHex();
                test.strictEqual(hex, "0a0b50726f746f4275662e6a73");
                var msg2 = Message.decodeHex(hex);
                test.deepEqual(msg, msg2);
                msg2 = Message.decode(hex, "hex");
                test.deepEqual(msg, msg2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "forwardComp": function(test) {
            try {
                var Message = ProtoBuf.loadProto("message Message { required int32 a = 1; required string b = 2; required float c = 3; }").build("Message");
                var msg = new Message(123, "abc", 0.123);
                var bb = msg.encode();
                Message = ProtoBuf.loadProto("message Message {}").build("Message");
                test.doesNotThrow(function() {
                    Message.decode(bb);
                });
                test.strictEqual(bb.offset, bb.limit);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "tokenizerLine": function(test) {
            try {
                var parser = new ProtoBuf.DotProto.Parser("package test;\n\nmessage Message {\n\trequired string invalid = 1;}ERROR\n"),
                    ast = null, err = null;
                try {
                    ast = parser.parse();
                } catch (caught) {
                    err = caught;
                }
                test.ok(err);
                test.notOk(ast);
                test.ok(err.message.indexOf("line 4:") >= 0);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "excludeFields": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message A { required int32 i = 1; } message B { required A A = 1; }");
                builder.build();
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "proto2jsExtend": function(test) {
            try {
                var builder = ProtoBuf.loadJsonFile(__dirname+"/proto2js/Bar.json");
                builder.build();
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "emptyMessage": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message EmptyMessage {}"),
                    EmptyMessage = builder.build("EmptyMessage");

                var msg = new EmptyMessage(),
                    ab = msg.toArrayBuffer();
                test.strictEqual(ab.byteLength, 0);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "toRaw": function(test) {
            try {
                var builder = ProtoBuf.loadProto("message MyMessage { required int32 a = 1; required int32 b = 2; required bytes c = 3; }"),
                    MyMessage = builder.build("MyMessage");
                var raw = { a: 1, b: 2, c: "YWJj" },
                    myMessage = new MyMessage(raw);
                test.deepEqual(myMessage.c.toBase64(), raw.c);
                test.deepEqual(myMessage.toRaw(true), raw);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "singleQuotedString": function(test) {
            try{
                var builder = ProtoBuf.loadProtoFile(__dirname+"/string_single_quote.proto");
                var TestSingleQuoteString = builder.build("TestSingleQuoteString");
                test.ok(typeof TestSingleQuoteString == 'function');
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "importDuplicateSingleQuote": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/import_a_single_quote.proto");
                test.doesNotThrow(function() {
                    ProtoBuf.loadProtoFile(__dirname+"/import_b.proto", builder);
                });
                var root = builder.build();
                test.ok(root.A);
                test.ok(root.B);
                test.ok(root.Common);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "importStringSuccessively": function(test) {
            try {
                var proto1 = "message A { required string a = 1; };";
                var proto2 = "import \"proto1.proto\"; message B { required A a = 1; };";
                var builder = ProtoBuf.loadProto(proto1, "proto1.proto");
                ProtoBuf.loadProto(proto2, builder, "proto2.proto");
                var root = builder.build();
                test.ok(root.A);
                test.ok(root.B);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "multilineString": function(test) {
            try {
                var proto = "message TestMessage { required string test = 1 [default = \"1\"   \"2\"\n\"3\"];}";
                var builder = ProtoBuf.loadProto(proto, "multilineString.proto");
                var TestMessage = builder.build("TestMessage"),
                    testMessage = new TestMessage();
                test.strictEqual(testMessage.test, "123");
                test.done();
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "packable": function(test) {
            try {
                var proto = 'message Inner { required int32 id=2; }\nmessage Outer { repeated Inner inner = 1 [packed=true]; }';
                var builder = ProtoBuf.loadProto(proto);
                var root = builder.build();
                var inner = new root.Inner(1),
                    outer = new root.Outer(inner);
                var bb = outer.encode().compact();
                test.strictEqual(bb.toDebug(), "<0A 02 10 01>");
                // 0A: wt 2, id 1
                // 02: len 2
                // 10: wt 0, id 2
                // 01: 1
                var outer2 = root.Outer.decode(bb);
                test.strictEqual(outer2.inner.id, 1);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "$type": function(test) {
            var builder = ProtoBuf.loadProto("message Test {}");
            var Test = builder.build("Test"),
                TTest = builder.lookup("Test");
            test.strictEqual(new Test().$type, TTest);
            test.done();
        },

        "descriptor": function(test) {
            try {
                var proto = 'import "./google/protobuf/descriptor.proto";';
                var builder = ProtoBuf.loadProto(proto, "tests/proto.proto");
                var root = builder.build("google.protobuf");
                test.ok(root.FileDescriptorSet);
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "mismatchedNesting": function(test) {
            try {
                var proto = "message Child { optional uint32 foo = 1; } message FakeChild { optional uint32 foo = 1; } message Parent { optional Child child = 1; }";
                var builder = ProtoBuf.loadProto(proto, "tests/mismatchedNesting.proto");
                var root = builder.build();
                var foo = new root.Parent({ child: new root.FakeChild({ foo: 1 })});
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "builderOptions": function(test) {
            try {
                var proto = "message Foo { optional uint32 foo_bar = 1; }";
                var builder = ProtoBuf.newBuilder({
                    convertFieldsToCamelCase: true
                });
                ProtoBuf.loadProto(proto, builder, "tests/builderOptions.proto");
                var Foo = builder.build("Foo");
                test.strictEqual(ProtoBuf.convertFieldsToCamelCase, false);
                test.strictEqual(builder.options.convertFieldsToCamelCase, true);
                var foo = new Foo();
                test.ok(typeof foo.fooBar !== 'undefined');
                test.ok(typeof foo.foo_bar === 'undefined');
                test.done();
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "proto3": function(test) {
            try {
                var builder = ProtoBuf.loadProtoFile(__dirname+"/proto3.proto");
                test.doesNotThrow(function() {
                    ProtoBuf.loadProtoFile(__dirname+"/proto3.proto", builder);
                });
                var root = builder.build();
                test.ok(root.test.Foo.$type.syntax === 'proto3');
            } catch (e) {
                fail(e);
            }
            test.done();
        },

        "proto3DisallowedFeatures": function(test) {
            try {
                // Required field
                var proto = "syntax = \"proto3\"; message Foo { required int32 field = 1; }";
                var builder = ProtoBuf.newBuilder();
                ProtoBuf.loadProto(proto, builder, "tests/proto3DisallowedFeatures.proto");
                test.ok(false);  // ^ should throw
            } catch (e) {
                test.ok(/^Not a valid definition/.test(e.message));
            }

            try {
                // Field with default value
                var proto = "syntax = \"proto3\"; message Foo { int32 field = 1 [default=42]; }";
                var builder = ProtoBuf.newBuilder();
                ProtoBuf.loadProto(proto, builder, "tests/proto3DisallowedFeatures.proto");
                test.ok(false);  // ^ should throw
            } catch (e) {
                test.ok(/^Not a valid definition/.test(e.message));
            }

            try {
                // Message with extension range
                var proto = "syntax = \"proto3\"; message Foo { extensions 100 to max; } ";
                var builder = ProtoBuf.newBuilder();
                ProtoBuf.loadProto(proto, builder, "tests/proto3DisallowedFeatures.proto");
                test.ok(false);  // ^ should throw
            } catch (e) {
                test.ok(/^Not a valid definition/.test(e.message));
            }

            try {
                // Message with extension
                var proto = "syntax = \"proto3\"; message Foo { extensions 100 to max; } " +
                            "message Bar { extend Foo { optional Bar bar = 100; } }";
                var builder = ProtoBuf.newBuilder();
                ProtoBuf.loadProto(proto, builder, "tests/proto3DisallowedFeatures.proto");
                test.ok(false);  // ^ should throw
            } catch (e) {
                test.ok(/^Not a valid definition/.test(e.message));
            }

            try {
                // Enum with non-zero first entry.
                var proto = "syntax = \"proto3\"; enum E { A = 1; B = 2; }";
                var builder = ProtoBuf.newBuilder();
                ProtoBuf.loadProto(proto, builder, "tests/proto3DisallowedFeatures.proto");
                test.ok(false);  // ^ should throw
            } catch (e) {
                test.ok(/^Not a valid definition/.test(e.message));
            }

            try {
                // Proto3 message referring to proto2 enum.
                var proto2 = "syntax = \"proto2\"; enum E { A = 1; B = 2; }";
                var proto3 = "syntax = \"proto3\"; message Test { E enum_field = 1; }";
                var builder = ProtoBuf.newBuilder();
                ProtoBuf.loadProto(proto2, builder, "tests/proto3DisallowedFeatures1.proto");
                ProtoBuf.loadProto(proto3, builder, "tests/proto3DisallowedFeatures3.proto");
                test.ok(false);  // ^ should throw
            } catch (e) {
                test.ok(/^Proto3 message refers to proto2 enum/.test(e.message));
            }

            test.done();
        },

        "proto3FieldPresence": function(test) {
            var proto =
                "syntax = \"proto3\";\n" +
                "message Test {\n" +
                "  int32 field_int32 = 1;\n" +
                "  int64 field_int64 = 2;\n" +
                "  string field_str = 3;\n" +
                "  bytes field_bytes = 4;\n" +
                "  Test field_msg = 5;\n" +
                "  Enum field_enum = 6;\n" +
                "  repeated int32 rpt_int32 = 11;\n" +
                "  repeated int64 rpt_int64 = 12;\n" +
                "  repeated string rpt_str = 13;\n" +
                "  repeated bytes rpt_bytes = 14;\n" +
                "  repeated Test rpt_msg = 15;\n" +
                "  repeated Enum rpt_enum = 16;\n" +
                "}\n" +
                "enum Enum { Default = 0; A = 1; B = 2; }\n";
            var builder = ProtoBuf.newBuilder();
            ProtoBuf.loadProto(proto, builder, "test/proto3FieldPresence.proto");
            var Test = builder.build('Test'),
                Enum = builder.build('Enum');

            var testMsg = new Test();
            test.strictEqual(testMsg.field_int32, 0);
            test.strictEqual(testMsg.field_int64.low, 0);
            test.strictEqual(testMsg.field_int64.high, 0);
            test.strictEqual(testMsg.field_str, "");
            test.strictEqual(testMsg.field_msg, null);
            test.ok(testMsg.field_bytes instanceof ByteBuffer);
            test.strictEqual(testMsg.field_bytes.remaining(), 0);
            test.strictEqual(testMsg.rpt_int32.length, 0);

            // No fields should go on the wire, even though they're set
            var encoded = testMsg.encode();
            test.strictEqual(encoded.remaining(), 0);
            testMsg.field_int32 = 42;
            encoded = testMsg.encode();
            test.strictEqual(encoded.remaining(), 2);
            testMsg.field_int32 = 0;
            encoded = testMsg.encode();
            test.strictEqual(encoded.remaining(), 0);

            // Enum fields should be able to carry arbitrary values.
            testMsg.field_enum = 42;
            test.strictEqual(testMsg.field_enum, 42);
            encoded = testMsg.encode();
            testMsg = Test.decode(encoded);
            test.strictEqual(testMsg.field_enum, 42);

            test.done();
        },

        "mapContainer": function(test) {
            var proto =
                "message Test {\n" +
                "  map<string, int32> map_string_int32 = 1;\n" +
                "  map<string, int64> map_string_int64 = 2;\n" +
                "  map<string, string> map_string_string = 3;\n" +
                "  map<string, Test> map_string_msg = 4;\n" +
                "  map<string, Enum> map_string_enum = 5;\n" +
                "  map<int32, string> map_int32_string = 6;\n" +
                "  map<int64, string> map_int64_string = 7;\n" +
                "  map<bool, string> map_bool_string = 9;\n" +
                "}\n" +
                "enum Enum { Default = 0; A = 1; B = 2; }\n";
            var builder = ProtoBuf.newBuilder();
            ProtoBuf.loadProto(proto, builder, "test/mapContainer.proto");

            var map_string_int32 =
                new ProtoBuf.Map(builder.lookup("Test.map_string_int32"));
            test.strictEqual(map_string_int32.size, 0);
            test.strictEqual(map_string_int32.has("asdf"), false);
            test.strictEqual(map_string_int32.get("asdf"), undefined);
            map_string_int32.set("asdf", 42);
            test.strictEqual(map_string_int32.has("asdf"), true);
            test.strictEqual(map_string_int32.get("asdf"), 42);

            var it = map_string_int32.keys();
            var itVal = it.next();
            test.strictEqual(itVal.done, false);
            test.strictEqual(itVal.value, "asdf");
            itVal = it.next();
            test.strictEqual(itVal.done, true);

            it = map_string_int32.values();
            itVal = it.next();
            test.strictEqual(itVal.done, false);
            test.strictEqual(itVal.value, 42);
            itVal = it.next();
            test.strictEqual(itVal.done, true);

            it = map_string_int32.entries();
            itVal = it.next();
            test.strictEqual(itVal.done, false);
            test.deepEqual(itVal.value, ["asdf", 42]);
            itVal = it.next();
            test.strictEqual(itVal.done, true);

            map_string_int32.set("jkl;", 84);
            test.strictEqual(map_string_int32.has("jkl;"), true);
            test.strictEqual(map_string_int32.has("asdf"), true);
            test.strictEqual(map_string_int32.size, 2);
            map_string_int32.delete("jkl;");
            test.strictEqual(map_string_int32.has("jkl;"), false);
            test.strictEqual(map_string_int32.get("jkl;"), undefined);
            test.strictEqual(map_string_int32.size, 1);

            map_string_int32.clear();
            test.strictEqual(map_string_int32.size, 0);

            try {
                map_string_int32.set("asdf", 42.1);
                test.ok(false); // ^ should throw
            } catch(e) {
                test.ok(e.message.match(/not an integer/));
            }

            try {
                map_string_int32.set(42, 42);
                test.ok(false); // ^ should throw
            } catch(e) {
                test.ok(e.message.match(/not a string/));
            }

            // Test various key types to ensure that value->string->value
            // conversion works.
            var map_int32_string =
                new ProtoBuf.Map(builder.lookup("Test.map_int32_string"));
            test.strictEqual(map_int32_string.size, 0);
            map_int32_string.set(12345678, "asdf");
            test.strictEqual(map_int32_string.size, 1);
            test.strictEqual(map_int32_string.has(12345678), true);
            test.strictEqual(map_int32_string.get(12345678), "asdf");

            var map_int64_string =
                new ProtoBuf.Map(builder.lookup("Test.map_int64_string"));
            test.strictEqual(map_int64_string.size, 0);
            map_int64_string.set("9223372036854775807", "asdf");
            test.strictEqual(map_int64_string.size, 1);
            test.strictEqual(map_int64_string.has("9223372036854775807"), true);
            test.strictEqual(map_int64_string.get("9223372036854775807"), "asdf");

            // Ensure that initialization from a raw object works.
            var map_int32_string =
                new ProtoBuf.Map(builder.lookup("Test.map_int32_string"),
                                 { 42: "asdf" });
            test.strictEqual(map_int32_string.size, 1);
            test.strictEqual(map_int32_string.keys().next().value, 42);

            var map_int64_string =
                new ProtoBuf.Map(builder.lookup("Test.map_int64_string"),
                                 { "9223372036854775807": "asdf" });
            test.strictEqual(map_int64_string.size, 1);
            var i64 = map_int64_string.keys().next().value;
            test.ok(i64 instanceof ProtoBuf.Long);
            test.strictEqual(i64.toString(), "9223372036854775807");

            test.done();
        },

        "mapField": function(test) {
            var proto =
                "message Test {\n" +
                "  map<string, int32> map_string_int32 = 1;\n" +
                "  map<string, int64> map_string_int64 = 2;\n" +
                "  map<string, string> map_string_string = 3;\n" +
                "  map<string, Test> map_string_msg = 4;\n" +
                "  map<string, Enum> map_string_enum = 5;\n" +
                "  map<int32, string> map_int32_string = 6;\n" +
                "  map<int64, string> map_int64_string = 7;\n" +
                "  map<bool, string> map_bool_string = 9;\n" +
                "}\n" +
                "enum Enum { Default = 0; A = 1; B = 2; }\n";
            var builder = ProtoBuf.newBuilder();
            ProtoBuf.loadProto(proto, builder, "test/mapField.proto");
            var Test = builder.build('Test'),
                Enum = builder.build('Enum');

            var testMsg = new Test();
            test.strictEqual(testMsg.map_string_int32.size, 0);
            test.strictEqual(testMsg.map_string_int64.size, 0);
            test.strictEqual(testMsg.map_string_string.size, 0);
            test.strictEqual(testMsg.map_string_msg.size, 0);
            test.strictEqual(testMsg.map_string_enum.size, 0);
            test.strictEqual(testMsg.map_int32_string.size, 0);
            test.strictEqual(testMsg.map_int64_string.size, 0);
            test.strictEqual(testMsg.map_bool_string.size, 0);

            testMsg.$set('map_string_int32', { 'asdf': 42 });

            try {
                testMsg.$set('map_string_int32', { 'asdf': 42.1 });
                test.ok(false); // ^ should throw
            } catch (e) {
                test.ok(e.message.match(/Illegal/));
            }

            test.done();
        },

        "mapEncodeDecode": function(test) {
            var proto =
                "message Test {\n" +
                "  map<string, int32> map_string_int32 = 1;\n" +
                "  map<string, int64> map_string_int64 = 2;\n" +
                "  map<string, string> map_string_string = 3;\n" +
                "  map<string, Test> map_string_msg = 4;\n" +
                "  map<string, Enum> map_string_enum = 5;\n" +
                "  map<int32, string> map_int32_string = 6;\n" +
                "  map<int64, string> map_int64_string = 7;\n" +
                "  map<bool, string> map_bool_string = 9;\n" +
                "}\n" +
                "enum Enum { Default = 0; A = 1; B = 2; }\n";
            var builder = ProtoBuf.newBuilder();
            ProtoBuf.loadProto(proto, builder, "test/mapField.proto");
            var Test = builder.build('Test'),
                Enum = builder.build('Enum');

            var testMsg = new Test();
            testMsg.map_string_int32.set("a", 1);
            testMsg.map_string_int32.set("b", 2);
            testMsg.map_string_int64.set("c", "12345678901234");
            testMsg.map_string_int64.set("d", "98765432109876");
            testMsg.map_string_string.set("e", "asdf");
            testMsg.map_string_string.set("f", "jkl;");
            testMsg.map_string_enum.set("g", Enum.A);
            testMsg.map_string_enum.set("h", Enum.B);
            testMsg.map_int32_string.set(9, "a");
            testMsg.map_int32_string.set(10, "b");
            testMsg.map_int64_string.set("12345678901234", "a");
            testMsg.map_int64_string.set("98765432109876", "b");
            testMsg.map_bool_string.set(false, "a");
            testMsg.map_bool_string.set(true, "b");

            var encoded = testMsg.encode();
            testMsg = Test.decode(encoded);

            test.strictEqual(testMsg.map_string_int32.get("a"), 1);
            test.strictEqual(testMsg.map_string_int32.get("b"), 2);
            test.strictEqual(testMsg.map_string_int64.get("c").toString(), "12345678901234");
            test.strictEqual(testMsg.map_string_int64.get("d").toString(), "98765432109876");
            test.strictEqual(testMsg.map_string_string.get("e"), "asdf");
            test.strictEqual(testMsg.map_string_string.get("f"), "jkl;");
            test.strictEqual(testMsg.map_string_enum.get("g"), Enum.A);
            test.strictEqual(testMsg.map_string_enum.get("h"), Enum.B);
            test.strictEqual(testMsg.map_int32_string.get(9), "a");
            test.strictEqual(testMsg.map_int32_string.get(10), "b");
            test.strictEqual(testMsg.map_int64_string.get("12345678901234"), "a");
            test.strictEqual(testMsg.map_int64_string.get("98765432109876"), "b");
            test.strictEqual(testMsg.map_bool_string.get(false), "a");
            test.strictEqual(testMsg.map_bool_string.get(true), "b");

            test.done();
        },

        "proto3Json": function(test) {
            var proto =
                "message Test {\n" +
                "  int32 optional_int32 = 1;\n" +
                "  int64 optional_int64 = 2;\n" +
                "  string optional_string = 3;\n" +
                "  bytes optional_bytes = 4;\n" +
                "  bool optional_bool = 5;\n" +
                "  Enum optional_enum = 6;\n" +
                "  repeated int32 repeated_int32 = 11;\n" +
                "  repeated int64 repeated_int64 = 12;\n" +
                "  repeated string repeated_string = 13;\n" +
                "  repeated bytes repeated_bytes = 14;\n" +
                "  repeated bool repeated_bool = 15;\n" +
                "  repeated Enum repeated_enum = 16;\n" +
                "  map<string, int32> map_string_int32 = 20;\n" +
                "  map<string, int64> map_string_int64 = 21;\n" +
                "  map<string, string> map_string_string = 22;\n" +
                "  map<string, Enum> map_string_enum = 24;\n" +
                "  map<int32, string> map_int32_string = 25;\n" +
                "  map<int64, string> map_int64_string = 26;\n" +
                "  map<bool, string> map_bool_string = 27;\n" +
                "}\n" +
                "enum Enum { Default = 0; A = 1; B = 2; }\n";
            var builder = ProtoBuf.newBuilder();
            ProtoBuf.loadProto(proto, builder, "test/mapField.proto");
            var Test = builder.build('Test'),
                Enum = builder.build('Enum');

            var testMsg = new Test();
            testMsg.optional_int32 = 1;
            testMsg.optional_int64 = "12345678901234";
            testMsg.optional_string = "hello";
            testMsg.optional_bytes = ProtoBuf.ByteBuffer.fromBinary("\x00\xFF\x80");
            testMsg.optional_bool = true;
            testMsg.optional_enum = Enum.A;
            testMsg.repeated_int32.push(1);
            testMsg.repeated_int64.push("12345678901234");
            testMsg.repeated_string.push("hello");
            testMsg.repeated_bytes.push(ProtoBuf.ByteBuffer.fromBinary("\x00\xFF\x80"));
            testMsg.repeated_bool.push(true);
            testMsg.repeated_enum.push(Enum.A);
            testMsg.map_string_int32.set("a", 1);
            testMsg.map_string_int32.set("b", 2);
            testMsg.map_string_int64.set("c", "12345678901234");
            testMsg.map_string_int64.set("d", "98765432109876");
            testMsg.map_string_string.set("e", "asdf");
            testMsg.map_string_string.set("f", "jkl;");
            testMsg.map_string_enum.set("g", Enum.A);
            testMsg.map_string_enum.set("h", Enum.B);
            testMsg.map_int32_string.set(9, "a");
            testMsg.map_int32_string.set(10, "b");
            testMsg.map_int64_string.set("12345678901234", "a");
            testMsg.map_int64_string.set("98765432109876", "b");
            testMsg.map_bool_string.set(false, "a");
            testMsg.map_bool_string.set(true, "b");

            var jsonObj = JSON.parse(testMsg.encodeJSON());
            test.deepEqual(jsonObj,
                {
                    optional_int32: 1,
                    optional_int64: "12345678901234",
                    optional_string: "hello",
                    optional_bytes: "AP+A",  // base64
                    optional_bool: true,
                    optional_enum: "A",
                    repeated_int32: [1],
                    repeated_int64: ["12345678901234"],
                    repeated_string: ["hello"],
                    repeated_bytes: ["AP+A"],  // base64
                    repeated_bool: [true],
                    repeated_enum: ["A"],
                    map_string_int32: { "a": 1, "b": 2 },
                    map_string_int64: { "c": "12345678901234", "d": "98765432109876" },
                    map_string_string: { "e": "asdf", "f": "jkl;" },
                    map_string_enum: { "g": "A", "h": "B" },
                    map_int32_string: { "9": "a", "10": "b" },
                    map_int64_string: { "12345678901234": "a", "98765432109876": "b" },
                    map_bool_string: { "false": "a", "true": "b" },
                });

            var testMsg2 = Test.decodeJSON(testMsg.encodeJSON());
            test.strictEqual(testMsg2.encodeJSON(), testMsg.encodeJSON());

            test.done();
        },

        // Node.js only
        "loaders": BROWSER ? {} : {

            "commonjs": function(test) {
                var fs = require("fs")
                  , vm = require("vm")
                  , util = require('util');

                var code = fs.readFileSync(__dirname+"/../dist/"+FILE);
                var exports = {};
                var sandbox = new Sandbox({
                    module: {
                        exports: exports,
                        id: "protobufjs"
                    },
                    exports: exports,
                    require: (function() {
                        function require(mod) {
                            if (mod == 'bytebuffer') require.called = true;
                            return ByteBuffer;
                        }
                        require.called = false;
                        return require;
                    })()
                });
                vm.runInNewContext(code, sandbox, "ProtoBuf.js in CommonJS-VM");
                // console.log(util.inspect(sandbox));
                test.ok(typeof sandbox.module.exports == 'object');
                test.ok(typeof sandbox.require != 'undefined' && sandbox.require.called);
                test.done();
            },

            "amd": function(test) {
                var fs = require("fs")
                  , vm = require("vm")
                  , util = require('util');

                var code = fs.readFileSync(__dirname+"/../dist/"+FILE);
                var sandbox = new Sandbox({
                    define: (function() {
                        function define() {
                            define.called = true;
                        }
                        define.amd = true;
                        define.called = false;
                        return define;
                    })()
                });
                vm.runInNewContext(code, sandbox, "ProtoBuf.js in AMD-VM");
                // console.log(util.inspect(sandbox));
                test.ok(sandbox.define.called == true);
                test.done();
            },

            "shim": function(test) {
                var fs = require("fs")
                  , vm = require("vm")
                  , util = require('util');

                var code = fs.readFileSync(__dirname+"/../dist/"+FILE);
                var sandbox = new Sandbox({
                    dcodeIO: {
                        ByteBuffer: ByteBuffer
                    }
                });
                vm.runInNewContext(code, sandbox, "ProtoBuf.js in shim-VM");
                // console.log(util.inspect(sandbox));
                test.ok(typeof sandbox.dcodeIO != 'undefined' && typeof sandbox.dcodeIO.ProtoBuf != 'undefined');
                test.done();
            }
        }
    };

    if (typeof module != 'undefined' && module.exports) {
        module.exports = suite;
    } else {
        global["suite"] = suite;
    }

})(this);
