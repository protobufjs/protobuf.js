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
    
    var ProtoBuf = BROWSER ? global.dcodeIO.ProtoBuf : require(__dirname+"/../"+FILE),
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
        var Car = Game.Cars.Car;
        var Vendor = Car.Vendor;
        var Speed = Car.Speed;
    
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
                }
            }),
            // Speed from enum object
            Speed.SUPERFAST
        );
        test.equal(car.model, "Rusty");
        test.equal(car.vendor.name, "Iron Inc.");
        test.equal(car.vendor.address.country, "US");
        test.equal(car.vendor.address.country, car.getVendor().get_address().country);
        var bb = new ByteBuffer(28);
        car.encode(bb);
        test.equal(bb.toHex(28), "<0A 05 52 75 73 74 79 12 11 0A 09 49 72 6F 6E 20 49 6E 63 2E 12 04 0A 02 55 53 18 02>");
        var carDec = Car.decode(bb);
        test.equal(carDec.model, "Rusty");
        test.equal(carDec.vendor.name, "Iron Inc.");
        test.equal(carDec.vendor.address.country, "US");
        test.equal(carDec.vendor.address.country, carDec.getVendor().get_address().country);
    }
    
    /**
     * Test suite.
     * @type {Object.<string,function>}
     */
    var suite = {
    
        setUp: function (callback) {
            callback();
        },
        
        tearDown: function (callback) {
            callback();
        },
    
        "init": function(test) {
            test.ok(typeof ProtoBuf == "object");
            test.ok(typeof ProtoBuf.Reflect == 'object');
            test.ok(typeof ProtoBuf.protoFromFile == "function");
            test.done();
        },

        // Example "A Simple Message" from the protobuf docs
        // https://developers.google.com/protocol-buffers/docs/encoding#simple
        "example1": function(test) {
            try{
                var builder = ProtoBuf.protoFromFile(__dirname+"/example1.proto");
                var Test1 = builder.build("Test1");
                test.ok(typeof Test1 == 'function');
                var inst = new Test1(150);
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
                var bb = new ByteBuffer(3);
                inst.encode(bb);
                test.equal(bb.toHex(), "<08 98 01>");
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
                var builder = ProtoBuf.protoFromFile(__dirname+"/example1u.proto");
                var Test1u = builder.build("Test1u");
                test.ok(typeof Test1u == 'function');
                var inst = new Test1u(-1);
                test.equal(inst.a, 4294967295);
                var bb = new ByteBuffer(6);
                inst.encode(bb);
                test.equal(bb.toHex(), "<08 FF FF FF FF 7F>");
                var instDec = Test1u.decode(bb);
                test.equal(instDec.a, 4294967295);
                
            } catch (e) {
                fail(e);
            }
            test.done();
        },
        
        // Example "Strings" from the protobuf docs
        // https://developers.google.com/protocol-buffers/docs/encoding#types
        "example2": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/example2.proto");
                var Test2 = builder.build("Test2");
                var inst = new Test2("testing");
                var bb = new ByteBuffer(9);
                inst.encode(bb);
                test.equal(bb.toHex(), "<12 07 74 65 73 74 69 6E 67>");
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
                var builder = ProtoBuf.protoFromFile(__dirname+"/example3.proto");
                var root = builder.build();
                var Test1 = root.Test1;
                var Test3 = root.Test3;
                var inst = new Test3(new Test1(150));
                var bb = new ByteBuffer(5);
                test.equal(inst.c.a, 150);
                inst.encode(bb);
                test.equal(bb.toHex(), "<1A 03 08 96 01>");
                var instDec = Test3.decode(bb);
                test.equal(instDec.c.a, 150);
            } catch(e) {
                fail(e);
            }
            test.done();
        },
        
        "example4": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/example4.proto");
                var Test4 = builder.build("Test4");
                var inst = new Test4([3, 270, 86942]);
                var bb = new ByteBuffer(8);
                test.equal(inst.d.length, 3);
                inst.encode(bb);
                test.equal(bb.toHex(), "<22 06 03 8E 02 9E A7 05>");
                var instDec = Test4.decode(bb);
                test.equal(bb.toHex(), " 22 06 03 8E 02 9E A7 05|");
                test.equal(instDec.d.length, 3);
                test.equal(instDec.d[2], 86942);
            } catch(e) {
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
                var builder = ProtoBuf.protoFromString(str_proto);
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
                    { f: +Infinity , b: "7F 80 00 00" },
                    // { f: -NaN , b: "FF C0 00 00>" },
                    { f: +NaN , b: "7F C0 00 00" }
                ];
    
                f_vals.map( function(x) {
                    // check encode
                    var m1 = new Float();
                    var b1 = new ByteBuffer();
                    m1.f = x.f;
                    m1.encode(b1);
                    var q1 = b1.slice(1,5).compact().reverse().toHex();
                    test.strictEqual('<' + x.b + '>', q1 );
    
                    // check decode
                    var b2 = new ByteBuffer();
                    var s1 = x.b + ' 0D';
                    var s2 = s1.split(" ");
                    var s3 = s2.reverse();
                    var i1 = s3.map(function(y) { return parseInt(y,16) } );
                    i1.map(function(y) { b2.writeUint8(y) });
                    b2.length = b2.offset;
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
                    };
                });
            } catch(e) {
                fail(e);
            }
            test.done();
        },
        
        "bytes": function(test) {
            try {
                var str_proto = "message Test { required bytes b = 0; }";
                var builder = ProtoBuf.protoFromString(str_proto);
                var Test = builder.build("Test");
                var bb = new ByteBuffer(4).writeUint32(0x12345678).flip();
                var myTest = new Test(bb);
                test.strictEqual(myTest.b.array, bb.array);
                var bb2 = new ByteBuffer(6);
                myTest.encode(bb2);
                test.equal(bb2.toHex(), "<02 04 12 34 56 78>");
                myTest = Test.decode(bb2);
                test.equal(myTest.b.BE().readUint32(), 0x12345678);
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
                    test.strictEqual(root["options"]["toplevel_1"], 10);
                    test.equal(root["options"]["toplevel_2"], "Hello world!");
                    test.equal(root["messages"][0]["fields"][0]["options"]["default"], "Max");
                    test.equal(root["messages"][0]["options"]["inmessage"], "My.Test")
                } catch (e) {
                    fail(e);
                }
                test.done();
            },
            
            "export": function(test) {
                try {
                    var builder = ProtoBuf.protoFromFile(__dirname+"/options.proto");
                    var My = builder.build("My");
                    test.deepEqual(My.$options, {
                        "toplevel_1": 10,
                        "toplevel_2": "Hello world!"
                    });
                    test.strictEqual(My.$options['toplevel_1'], 10);
                    test.deepEqual(My.Test.$options, {
                        "inmessage": "My.Test" // TODO: Options are not resolved, yet.
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
                var builder = ProtoBuf.protoFromFile(__dirname+"/complex.proto");
                validateComplex(test, builder.build("Game"));
            } catch(e) {
                fail(e);
            }
            test.done();
        },
        
        // The same created without calling upon the parser to do so (noparse)
        "complexJSON": function(test) {
            try {
                var builder = ProtoBuf.newBuilder("Game.Cars");
                builder.create(JSON.parse(ProtoBuf.Util.fetch(__dirname+"/complex.json")));
                validateComplex(test, builder.build("Game"));
            } catch (e) {
                fail(e);
            }
            test.done();
        },
        
        // Builder reused to add definitions from multiple sources
        "multibuilder": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/example1.proto");
                ProtoBuf.protoFromFile(__dirname+"/example2.proto", builder);
                var ns = builder.build();
                test.ok(!!ns.Test1);
                test.ok(!!ns.Test2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },
        
        // Inner messages test
        "repeated": {
            "legacy": function(test) {
                try {
                    var builder = ProtoBuf.protoFromFile(__dirname+"/repeated.proto");
                    var root = builder.build();
                    var Outer = root.Outer;
                    var Inner = root.Inner;
                    var outer = new Outer({ inner: [new Inner(1), new Inner(2)] });
                    var bb = new ByteBuffer(8);
                    outer.encode(bb);
                    test.equal("<0A 02 08 01 0A 02 08 02>", bb.toHex());
                    var douter = Outer.decode(bb);
                    test.ok(douter.inner instanceof Array);
                    test.equal(douter.inner.length, 2);
                    test.equal(douter.inner[0].inner_value, 1);
                    test.equal(douter.inner[1].inner_value, 2);
                    test.ok(douter.innerPacked instanceof Array);
                    test.equal(douter.innerPacked.length, 0);
                } catch (e) {
                    fail(e);
                }
                test.done();
            },
            
            "packed": function(test) {
                try {
                    var builder = ProtoBuf.protoFromFile(__dirname+"/repeated.proto");
                    var root = builder.build();
                    var Outer = root.Outer;
                    var Inner = root.Inner;
                    var outer = new Outer({ innerPacked: [new Inner(1), new Inner(2)] });
                    var bb = new ByteBuffer(8);
                    outer.encode(bb);
                    test.equal("<12 06 02 08 01 02 08 02>", bb.toHex());
                    var douter = Outer.decode(bb);
                    test.ok(douter.inner instanceof Array);
                    test.equal(douter.inner.length, 0);
                    test.ok(douter.innerPacked instanceof Array);
                    test.equal(douter.innerPacked.length, 2);
                    test.equal(douter.innerPacked[0].inner_value, 1);
                    test.equal(douter.innerPacked[1].inner_value, 2);
                } catch (e) {
                    fail(e);
                }
                test.done();
            },
            
            "both": function(test) {
                try {
                    var builder = ProtoBuf.protoFromFile(__dirname+"/repeated.proto");
                    var root = builder.build();
                    var Outer = root.Outer;
                    var Inner = root.Inner;
                    var outer = new Outer({ inner: [new Inner(1), new Inner(2)], innerPacked: [new Inner(3), new Inner(4)] });
                    var bb = new ByteBuffer(16);
                    outer.encode(bb);
                    test.equal("<0A 02 08 01 0A 02 08 02 12 06 02 08 03 02 08 04>", bb.toHex());
                    var douter = Outer.decode(bb);
                    test.ok(douter.inner instanceof Array);
                    test.equal(douter.inner.length, 2);
                    test.equal(douter.inner[0].inner_value, 1);
                    test.equal(douter.inner[1].inner_value, 2);
                    test.ok(douter.innerPacked instanceof Array);
                    test.equal(douter.innerPacked.length, 2);
                    test.equal(douter.innerPacked[0].inner_value, 3);
                    test.equal(douter.innerPacked[1].inner_value, 4);
                } catch (e) {
                    fail(e);
                }
                test.done();
            },
            
            "none": function(test) {
                try {
                    var builder = ProtoBuf.protoFromFile(__dirname+"/repeated.proto");
                    var Outer = builder.build("Outer");
                    var outer = new Outer();
                    var bb = new ByteBuffer(1);
                    outer.encode(bb);
                    test.equal("|00 ", bb.toHex());
                    var douter = Outer.decode(bb);
                    test.ok(douter.inner instanceof Array);
                    test.equal(douter.inner.length, 0);
                    test.ok(douter.innerPacked instanceof Array);
                    test.equal(douter.innerPacked.length, 0);
                } catch (e) {
                    fail(e);
                }
                test.done();
            }
        },
        
        "x64_fixed": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/x64.proto");
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
                myTest.encode(bb);
                test.equal(bb.toHex(20), "<09 FE FF FF FF FF FF FF FF 11 02 00 00 00 00 00 00 00>");
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
    
        "x64_varint": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/x64.proto");
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
                myTest.encode(bb);
                test.equal(bb.toHex(20), "<08 FE FF FF FF FF FF FF FF FF 01 10 02 18 05>");
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
        
        "imports": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/imports.proto");
                var root = builder.build();
                test.ok(!!root.Test1);
                test.ok(!!root.Test2);
                test.ok(!!root.My.Test2);
                test.notEqual(root.Test2, root.My.Test2);
            } catch (e) {
                fail(e);
            }
            test.done();
        },
        
        "toplevel": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/toplevel.proto");
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
        
        "imports-toplevel": function(test) {
            try {
                var builder = ProtoBuf.protoFromFile(__dirname+"/imports-toplevel.proto");
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
        
        "extend": function(test) {
            try {
                test.doesNotThrow(function() {
                    ProtoBuf.protoFromFile(__dirname+"/extend.proto");
                });
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
                test.equal(root["options"]["my_file_option"], "Hello world!");
                test.equal(root["messages"][0]["options"]["my_message_option"], 1234)
                test.equal(root["messages"][0]["fields"][0]["options"]["my_field_option"], 4.5);
                // TODO: add tests for my_enum_option, my_enum_value_option
            } catch (e) {
                fail(e);
            }
            test.done();
        },
        
        // Node.js only
        "loaders": BROWSER ? {} : {
            
            "commonjs": function(test) {
                var fs = require("fs")
                  , vm = require("vm")
                  , util = require('util');
        
                var code = fs.readFileSync(__dirname+"/../"+FILE);
                var sandbox = new Sandbox({
                    module: {
                        exports: {}
                    },
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
        
                var code = fs.readFileSync(__dirname+"/../"+FILE);
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
        
                var code = fs.readFileSync(__dirname+"/../"+FILE);
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
