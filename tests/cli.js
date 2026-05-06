// A minimal test for pbjs tool targets.

var tape = require("tape");
var path = require("path");
var Module = require("module");
var protobuf = require("..");
var fs = require("fs");
var EventEmitter = require("events").EventEmitter;
var child_process = require("child_process");

function cliTest(test, testFunc) {
    // pbjs does not seem to work with Node v4, so skip this test if we're running on it
    if (process.versions.node.match(/^4\./)) {
        test.end();
        return;
    }

    // Alter the require cache to make the cli/targets/static work since it requires "protobufjs"
    // and we don't want to mess with "npm link"
    var savedResolveFilename = Module._resolveFilename;
    Module._resolveFilename = function(request, parent) { 
      if (request.startsWith("protobufjs")) {
        return request;
      }
      return savedResolveFilename(request, parent);
    };
    require.cache.protobufjs = require.cache[path.resolve("index.js")];

    try {
        testFunc();
    } finally {
        // Rollback all the require() related mess we made
        delete require.cache.protobufjs;
        Module._resolveFilename = savedResolveFilename;
    }
}

tape.test("pbjs generates static code", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/test.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            typeurl: true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally do with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OneofContainer = protobuf.roots.default.OneofContainer;
            var Message = protobuf.roots.default.Message;
            test.ok(OneofContainer, "type is loaded");
            test.ok(Message, "type is loaded");

            // Check that fromObject and toObject work for plain object
            var obj = {
                messageInOneof: {
                    value: 42,
                },
                regularField: "abc",
                enumField: 1,
            };
            var obj1 = OneofContainer.toObject(OneofContainer.fromObject(obj));
            test.deepEqual(obj, obj1, "fromObject and toObject work for plain object");

            // Check that dynamic fromObject and toObject work for static instance
            var root = protobuf.loadSync("tests/data/cli/test.proto");
            var OneofContainerDynamic = root.lookup("OneofContainer");
            var instance = new OneofContainer();
            instance.messageInOneof = new Message();
            instance.messageInOneof.value = 42;
            instance.regularField = "abc";
            instance.enumField = 1;
            var instance1 = OneofContainerDynamic.toObject(OneofContainerDynamic.fromObject(instance));
            test.deepEqual(OneofContainer.toObject(instance), instance1, "fromObject and toObject work for instance of the static type");

            // Check that getTypeUrl works
            var defaultTypeUrl = Message.getTypeUrl();
            var customTypeUrl = Message.getTypeUrl("example.com");
            test.equal(defaultTypeUrl, "type.googleapis.com/Message", "getTypeUrl returns expected url");
            test.equal(customTypeUrl, "example.com/Message", "getTypeUrl returns custom url");

            test.end();
        });
    });
});

tape.test("pbjs generates correct ES module static-module imports", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/test.proto");
        root.resolveAll();

        var staticModuleTarget = require("../cli/targets/static-module");

        staticModuleTarget(root, {
            wrap: "esm",
        }, function(err, jsCode) {
            test.error(err, "static-module code generation worked");
            test.ok(jsCode.includes("import $protobuf from \"protobufjs/minimal.js\";"), "esm wrapper uses a default import and explicit .js extension");
            test.end();
        });
    });
});

tape.test("pbjs keeps es6 as an ES module wrapper alias", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/test.proto");
        root.resolveAll();

        var staticModuleTarget = require("../cli/targets/static-module");

        staticModuleTarget(root, {
            wrap: "es6",
        }, function(err, jsCode) {
            test.error(err, "static-module code generation worked");
            test.ok(jsCode.includes("import $protobuf from \"protobufjs/minimal.js\";"), "es6 wrapper alias uses ESM imports");
            test.end();
        });
    });
});

tape.test("pbjs json-module exports reflection root", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync([
            "tests/data/package.proto",
            "tests/data/comment_serialization.proto"
        ]);
        root.addJSON({
            awesomepackage: {
                nested: {
                    AwesomeMessage: {
                        fields: {
                            awesomeField: {
                                type: "string",
                                id: 1
                            }
                        }
                    }
                }
            },
            "bad-package": {
                nested: {
                    "Bad-Message": {
                        fields: {}
                    }
                }
            },
            lookup: {
                nested: {
                    Collision: {
                        fields: {}
                    }
                }
            },
            some: {
                nested: {
                    really: {
                        nested: {
                            DeepMessage: {
                                fields: {}
                            }
                        }
                    }
                }
            }
        });
        root.resolveAll();

        var jsonModuleTarget = require("../cli/targets/json-module");

        jsonModuleTarget(root, {
            wrap: "commonjs",
            root: "jsonCompat",
            es6: true,
            lint: "",
            service: true,
            typeurl: true
        }, function(err, jsCode) {
            test.error(err, "json-module code generation worked");

            delete protobuf.roots.jsonCompat;

            var module = { exports: {} };
            function localRequire(request) {
                if (request.indexOf("protobufjs") === 0)
                    return protobuf;
                throw Error("unexpected require: " + request);
            }

            test.doesNotThrow(function() {
                new Function("require", "module", "exports", jsCode)(localRequire, module, module.exports); // eslint-disable-line no-new-func
            }, "generated commonjs module is executable");

            test.ok(jsCode.indexOf("require(\"protobufjs/light\")") >= 0, "commonjs wrapper uses light without .js extension");
            test.ok(jsCode.indexOf("@type {$protobuf.Root}") >= 0, "documents commonjs root export");
            test.ok(jsCode.indexOf("module.exports = $root") >= 0, "keeps commonjs root export");
            test.equal(jsCode.indexOf("export const "), -1, "does not emit named exports for commonjs with es6 syntax");

            var bundle = module.exports;
            test.equal(bundle, protobuf.roots.jsonCompat, "exports the reflection root");
            test.equal(typeof bundle.lookup, "function", "keeps root lookup method");
            test.equal(bundle.Package, bundle.lookupType("Package"), "exposes upper-case top-level message type");
            test.equal(bundle.Package.Repository, bundle.lookupType("Package.Repository"), "exposes upper-case nested message type");
            test.equal(bundle.awesomepackage, undefined, "does not add lower-case package aliases to the root");
            test.equal(bundle.get("awesomepackage").AwesomeMessage, bundle.lookupType("awesomepackage.AwesomeMessage"), "reflection namespace exposes upper-case package message");
            test.equal(bundle.badpackage, undefined, "does not add escaped aliases to the root");
            test.equal(bundle.get("bad-package").BadMessage, bundle.lookupType("bad-package.BadMessage"), "reflection namespace exposes escaped package message");
            test.equal(bundle.lookup.Collision, undefined, "does not overwrite root methods with lower-case namespace aliases");
            test.equal(bundle.get("lookup").Collision, bundle.lookupType("lookup.Collision"), "reflection namespace exposes root method name collision");
            test.equal(bundle.some, undefined, "does not add lower-case nested namespace aliases to the root");
            test.equal(bundle.get("some").get("really").DeepMessage, bundle.lookupType("some.really.DeepMessage"), "reflection namespaces expose upper-case nested messages");
            test.equal(bundle.Package.getTypeUrl(), "type.googleapis.com/Package", "exports top-level getTypeUrl");
            test.equal(bundle.Package.Repository.getTypeUrl("example.com"), "example.com/Package.Repository", "exports nested getTypeUrl");
            test.equal(bundle.get("awesomepackage").AwesomeMessage.getTypeUrl(), "type.googleapis.com/awesomepackage.AwesomeMessage", "exports package message getTypeUrl");
            test.equal(bundle.TestEnum.VALUE, 1, "exports enum values");
            test.equal(bundle.TestService, bundle.lookupService("TestService"), "exports service type");
            test.equal(typeof bundle.TestService.create(function() {}).testMethod, "function", "service create returns RPC service");

            var encoded = bundle.Package.encode(bundle.Package.create({
                repository: {
                    type: "git",
                    url: "https://example.com/repo.git"
                }
            })).finish();
            test.equal(bundle.Package.decode(encoded).repository.url, "https://example.com/repo.git", "exported types use reflection encode/decode");

            var service = bundle.TestService.create(function(method, requestData, callback) {
                test.equal(method.name, "testMethod", "service passes reflected method");
                test.equal(bundle.TestMessage.decode(requestData).testField, "ping", "service encodes request");
                callback(null, bundle.TestMessage.encode({ testField: "pong" }).finish());
            });

            service.testMethod({ testField: "ping" }, function(rpcErr, response) {
                test.error(rpcErr, "service call succeeds");
                test.equal(response.testField, "pong", "service decodes response");
                delete protobuf.roots.jsonCompat;
                test.end();
            });
        });
    });
});

tape.test("pbjs json-module emits ES module named exports", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync([
            "tests/data/package.proto",
            "tests/data/comment_serialization.proto"
        ]);
        root.addJSON({
            awesomepackage: {
                nested: {
                    AwesomeMessage: {
                        fields: {
                            awesomeField: {
                                type: "string",
                                id: 1
                            }
                        }
                    }
                }
            },
            "bad-package": {
                nested: {
                    "Bad-Message": {
                        fields: {}
                    }
                }
            },
            lookup: {
                nested: {
                    Collision: {
                        fields: {}
                    }
                }
            },
            some: {
                nested: {
                    really: {
                        nested: {
                            DeepMessage: {
                                fields: {}
                            }
                        }
                    }
                }
            },
            "bad-name": {
                nested: {}
            },
            badname: {
                nested: {}
            }
        });
        root.resolveAll();

        var jsonModuleTarget = require("../cli/targets/json-module");

        jsonModuleTarget(root, {
            wrap: "esm",
            es6: true,
            root: "jsonCompatEsm",
            lint: "",
            service: true,
            typeurl: true
        }, function(err, jsCode) {
            test.error(err, "json-module code generation worked");
            test.ok(jsCode.indexOf("export const Package = $root.get(\"Package\");") >= 0, "exports top-level messages");
            test.ok(jsCode.indexOf("export const awesomepackage = $root.get(\"awesomepackage\");") >= 0, "exports lower-case package namespaces");
            test.ok(jsCode.indexOf("export const badpackage = $root.get(\"bad-package\");") >= 0, "exports escaped package namespaces");
            test.ok(jsCode.indexOf("export const lookup = $root.get(\"lookup\");") >= 0, "exports root method name collisions");
            test.ok(jsCode.indexOf("export const some = $root.get(\"some\");") >= 0, "exports top-level lower-case namespace");
            test.ok(jsCode.indexOf("export const badname = $root.get(\"bad-name\");") >= 0, "exports first escaped name");
            test.equal(jsCode.indexOf("export const badname = $root.get(\"badname\");"), -1, "skips duplicate escaped export names");
            test.equal(jsCode.indexOf("$root.awesomepackage ="), -1, "does not mutate the reflection root for lower-case aliases");
            test.equal(jsCode.indexOf("Object.create("), -1, "does not generate facade objects");
            test.equal(jsCode.indexOf("getTypeUrl = function getTypeUrl"), -1, "uses Type#getTypeUrl instead of per-type generated helpers");
            test.ok(jsCode.indexOf("export const TestEnum = $root.get(\"TestEnum\").values;") >= 0, "exports top-level enums");
            test.ok(jsCode.indexOf("export const TestService = $root.get(\"TestService\");") >= 0, "exports top-level services");
            test.ok(jsCode.indexOf("@type {$protobuf.Root}") >= 0, "documents default root export");
            test.ok(jsCode.indexOf("$root as default") >= 0, "keeps default root export");
            test.end();
        });
    });
});

tape.test("pbjs --dts writes module declarations", function(test) {
    cliTest(test, function() {
        var pbjs = require("../cli/pbjs");
        var prefix = path.join(".tmp", "pbjs-dts-test-" + process.pid + "-" + Date.now());
        var staticOut = prefix + "-static.js";
        var jsonOut = prefix + "-json.js";
        var jsonEsmOut = prefix + "-json-esm.js";
        var jsonMinimalOut = prefix + "-json-minimal.js";
        var staticDts = prefix + "-static.d.ts";
        var jsonDts = prefix + "-json.d.ts";
        var jsonEsmDts = prefix + "-json-esm.d.ts";
        var jsonMinimalDts = prefix + "-json-minimal.d.ts";

        if (!fs.existsSync(".tmp"))
            fs.mkdirSync(".tmp");

        function cleanup() {
            [ staticOut, jsonOut, jsonEsmOut, jsonMinimalOut, staticDts, jsonDts, jsonEsmDts, jsonMinimalDts ].forEach(function(file) {
                try {
                    fs.unlinkSync(file);
                } catch (e) {
                    // best effort cleanup
                }
            });
        }

        cleanup();
        pbjs.main([
            "--target", "static-module",
            "--wrap", "commonjs",
            "--out", staticOut,
            "--dts",
            "tests/data/package.proto"
        ], function(staticErr) {
            test.error(staticErr, "static-module --dts generation worked");
            test.ok(fs.existsSync(staticOut), "writes static-module javascript");
            test.ok(fs.existsSync(staticDts), "writes static-module declarations");
            var staticTypes = fs.readFileSync(staticDts, "utf8");
            test.ok(staticTypes.indexOf("constructor(properties?: IPackage);") >= 0, "keeps constructable static declarations");

            pbjs.main([
                "--target", "json-module",
                "--wrap", "commonjs",
                "--out", jsonOut,
                "--dts",
                "tests/data/package.proto"
            ], function(jsonErr) {
                test.error(jsonErr, "json-module --dts generation worked");
                test.ok(fs.existsSync(jsonOut), "writes json-module javascript");
                test.ok(fs.existsSync(jsonDts), "writes json-module declarations");
                var jsonTypes = fs.readFileSync(jsonDts, "utf8");
                test.ok(jsonTypes.indexOf("private constructor();") >= 0, "marks reflection-backed declarations as non-constructable");
                test.ok(jsonTypes.indexOf("Reflection-backed declarations are not constructable. Use Package.create(...) instead.") >= 0, "explains create usage");
                test.ok(jsonTypes.indexOf("public static create(properties?: IPackage): Package;") >= 0, "keeps reflection Type create declaration");
                test.equal(jsonTypes.indexOf("constructor(properties?: IPackage);"), -1, "does not expose public message constructors");

                pbjs.main([
                    "--target", "json-module",
                    "--wrap", "esm",
                    "--out", jsonEsmOut,
                    "--dts",
                    "tests/data/package.proto"
                ], function(jsonEsmErr) {
                    test.error(jsonEsmErr, "json-module esm --dts generation worked");
                    test.ok(fs.existsSync(jsonEsmOut), "writes json-module esm javascript");
                    test.ok(fs.existsSync(jsonEsmDts), "writes json-module esm declarations");
                    var jsonEsmTypes = fs.readFileSync(jsonEsmDts, "utf8");
                    test.ok(jsonEsmTypes.indexOf("declare const _default: $protobuf.Root;") >= 0, "declares the default root export");
                    test.ok(jsonEsmTypes.indexOf("export default _default;") >= 0, "exports the default root declaration");

                    pbjs.main([
                        "--target", "json-module",
                        "--wrap", "commonjs",
                        "--out", jsonMinimalOut,
                        "--dts",
                        "--no-create",
                        "--no-encode",
                        "--no-decode",
                        "--no-verify",
                        "--no-convert",
                        "--no-delimited",
                        "--no-typeurl",
                        "tests/data/package.proto"
                    ], function(jsonMinimalErr) {
                        test.error(jsonMinimalErr, "json-module --dts respects static method flags");
                        test.ok(fs.existsSync(jsonMinimalOut), "writes minimal json-module javascript");
                        test.ok(fs.existsSync(jsonMinimalDts), "writes minimal json-module declarations");
                        var minimalTypes = fs.readFileSync(jsonMinimalDts, "utf8");
                        test.equal(minimalTypes.indexOf("public static create("), -1, "omits disabled create declaration");
                        test.equal(minimalTypes.indexOf("public static encode("), -1, "omits disabled encode declaration");
                        test.equal(minimalTypes.indexOf("public static decode("), -1, "omits disabled decode declaration");
                        test.equal(minimalTypes.indexOf("public static verify("), -1, "omits disabled verify declaration");
                        test.equal(minimalTypes.indexOf("public static fromObject("), -1, "omits disabled fromObject declaration");
                        test.equal(minimalTypes.indexOf("public static toObject("), -1, "omits disabled toObject declaration");
                        test.equal(minimalTypes.indexOf("public static getTypeUrl("), -1, "omits disabled getTypeUrl declaration");
                        cleanup();
                        test.end();
                    });
                });
            });
        });
    });
});

tape.test("pbjs escapes static target names", function(test) {
    cliTest(test, function() {
        var root = protobuf.Root.fromJSON({
            nested: {
                "1-ns": {
                    nested: {}
                }
            }
        });
        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {}, function(err, jsCode) {
            test.error(err, "static code generation worked");
            test.doesNotThrow(function() {
                new Function("$protobuf", jsCode); // eslint-disable-line no-new-func
            }, "should generate parseable output");
            test.end();
        });
    });
});

tape.test("pbts passes jsdoc arguments without a shell", function(test) {
    var pbts = require("../cli/pbts");
    var originalSpawn = child_process.spawn;
    var file = "file with \"quotes\" `backticks` 'apostrophes' and ;.js";

    test.plan(5);

    child_process.spawn = function(cmd, args, options) {
        var child = new EventEmitter();
        child.stdout = new EventEmitter();
        child.stderr = { pipe: function() {} };

        test.equal(cmd, process.execPath, "should execute node directly");
        test.ok(/jsdoc[\\/]jsdoc\.js$/.test(args[0]), "should execute jsdoc directly");
        test.equal(args[args.length - 1], file, "should pass file path as a single argument");
        test.equal(options.stdio, "pipe", "should pipe jsdoc output");

        process.nextTick(function() {
            child.stdout.emit("data", "declare namespace test {}\n");
            child.stdout.emit("end");
            child.emit("close", 0);
        });

        return child;
    };

    pbts.main([file], function(err) {
        child_process.spawn = originalSpawn;
        test.error(err, "should generate definitions");
    });
});

tape.test("pbts emits class properties for extension fields", function(test) {
    var pbts = require("../cli/pbts");

    pbts.main(["tests/data/test.js"], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf('public ".jspb.test.IndirectExtension.str": string;') >= 0, "should emit scalar extension property on the class");
        test.ok(tsCode.indexOf('public ".jspb.test.CloneExtension.extField"?: (jspb.test.ICloneExtension|null);') >= 0, "should emit message extension property on the class");
        test.end();
    });
});

tape.test("without null-defaults, absent optional fields have zero values", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OptionalFields = protobuf.roots.default.OptionalFields;
            test.ok(OptionalFields, "type is loaded");

            // Check default values
            var msg = OptionalFields.fromObject({});
            test.equal(msg.a, null, "default submessage is null");
            test.equal(msg.b, "", "default string is empty");
            test.equal(msg.c, 0, "default integer is 0");

            test.end();
        });
    });
});

tape.test("with null-defaults, absent optional fields have null values", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            "null-defaults": true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OptionalFields = protobuf.roots.default.OptionalFields;
            test.ok(OptionalFields, "type is loaded");

            // Check default values
            var msg = OptionalFields.fromObject({});
            test.equal(msg.a, null, "default submessage is null");
            test.equal(msg.b, null, "default string is null");
            test.equal(msg.c, null, "default integer is null");

            test.end();
        });
    });
});


tape.test("with --null-semantics, optional fields are handled correctly in proto2", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            comments: true,
            "null-semantics": true,
        }, function(err, jsCode) {

            test.error(err, 'static code generation worked');

            test.ok(jsCode.includes("@property {OptionalFields.ISubMessage|null|undefined} [a] OptionalFields a"), "Property for a should use an interface")
            test.ok(jsCode.includes("@member {OptionalFields.SubMessage|null} a"), "Member for a should use a message type")
            test.ok(jsCode.includes("OptionalFields.prototype.a = null;"), "Initializer for a should be null")

            test.ok(jsCode.includes("@property {number|null|undefined} [c] OptionalFields c"), "Property for c should be nullable")
            test.ok(jsCode.includes("@member {number|null} c"), "Member for c should be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.c = null;"), "Initializer for c should be null")

            test.ok(jsCode.includes("@property {number} d OptionalFields d"), "Property for d should not be nullable")
            test.ok(jsCode.includes("@member {number} d"), "Member for d should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.d = 0;"), "Initializer for d should be zero")

            test.end();
        });
    });
});


tape.test("with --null-semantics, optional fields are handled correctly in proto3", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/null-defaults-proto3.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            comments: true,
            "null-semantics": true,
        }, function(err, jsCode) {

            test.error(err, 'static code generation worked');

            test.ok(jsCode.includes("@property {OptionalFields.ISubMessage|null|undefined} [a] OptionalFields a"), "Property for a should use an interface")
            test.ok(jsCode.includes("@member {OptionalFields.SubMessage|null} a"), "Member for a should use a message type")
            test.ok(jsCode.includes("OptionalFields.prototype.a = null;"), "Initializer for a should be null")

            test.ok(jsCode.includes("@property {number|null|undefined} [c] OptionalFields c"), "Property for c should be nullable")
            test.ok(jsCode.includes("@member {number|null} c"), "Member for c should be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.c = null;"), "Initializer for c should be null")

            test.ok(jsCode.includes("@property {number|undefined} [d] OptionalFields d"), "Property for d should be optional but not nullable")
            test.ok(jsCode.includes("@member {number} d"), "Member for d should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.d = 0;"), "Initializer for d should be zero")

            test.end();
        });
    });
});

tape.test("with --null-semantics, optional fields are handled correctly in editions", function(test) {
    cliTest(test, function() {
        var root = protobuf.loadSync("tests/data/cli/null-defaults-edition2023.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            comments: true,
            "null-semantics": true,
        }, function(err, jsCode) {

            test.error(err, 'static code generation worked');

            test.ok(jsCode.includes("@property {OptionalFields.ISubMessage|null|undefined} [a] OptionalFields a"), "Property for a should use an interface")
            test.ok(jsCode.includes("@member {OptionalFields.SubMessage|null} a"), "Member for a should use a message type")
            test.ok(jsCode.includes("OptionalFields.prototype.a = null;"), "Initializer for a should be null")

            test.ok(jsCode.includes("@property {string|null|undefined} [e] OptionalFields e"), "Property for e should be nullable")
            test.ok(jsCode.includes("@member {string|null} e"), "Member for e should be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.e = null;"), "Initializer for e should be null")

            test.ok(jsCode.includes("@property {number} r OptionalFields r"), "Property for r should not be nullable")
            test.ok(jsCode.includes("@member {number} r"), "Member for r should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.r = 0;"), "Initializer for r should be zero")

            test.ok(jsCode.includes("@property {number|undefined} [i] OptionalFields i"), "Property for i should be optional but not nullable")
            test.ok(jsCode.includes("@member {number} i"), "Member for i should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.i = 0;"), "Initializer for i should be zero")

            test.end();
        });
    });
});


tape.test("pbjs generates static code with message filter", function (test) {
    cliTest(test, function () {
        var root = protobuf.loadSync("tests/data/cli/test-filter.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");
        var util = require("../cli/util");

        const needMessageConfig = JSON.parse(fs.readFileSync("tests/data/cli/filter.json"));

        util.filterMessage(root, needMessageConfig);

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            "null-defaults": true,
        }, function (err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var NeedMessage1 = protobuf.roots.default.filtertest.NeedMessage1;
            var NeedMessage2 = protobuf.roots.default.filtertest.NeedMessage2;
            var DependentMessage1 = protobuf.roots.default.filtertest.DependentMessage1;
            var DependentMessageFromImport = protobuf.roots.default.DependentMessageFromImport;

            var NotNeedMessageInRootFile = protobuf.roots.default.filtertest.NotNeedMessageInRootFile;
            var NotNeedMessageInImportFile = protobuf.roots.default.NotNeedMessageInImportFile;

            test.ok(NeedMessage1, "NeedMessage1 is loaded");
            test.ok(NeedMessage2, "NeedMessage2 is loaded");
            test.ok(DependentMessage1, "DependentMessage1 is loaded");
            test.ok(DependentMessageFromImport, "DependentMessageFromImport is loaded");

            test.notOk(NotNeedMessageInImportFile, "NotNeedMessageInImportFile is not loaded");
            test.notOk(NotNeedMessageInRootFile, "NotNeedMessageInRootFile is not loaded");

            test.end();
        });
    });
});

tape.test("proto3 roundtrip", function(test) {
    const proto = `syntax = "proto3";

message OptionalFields {

    optional SubMessage a = 1;
    optional string b = 2;
    repeated uint32 c = 3 [packed=false];
    uint32 d = 4;

    message SubMessage {

        string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto).root.resolveAll();
        var protoTarget = require("../cli/targets/proto3");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto);

            test.end();
        });
    });
});

tape.test("proto2 roundtrip", function(test) {
    const proto = `syntax = "proto2";

message OptionalFields {

    optional OptionalFields a = 1;
    required string b = 2;
    repeated uint32 c = 3 [packed=true];
    optional float d = 4 [default=0.1];
    optional group OptionalGroup = 5 {

        optional string a = 1;
    }
    repeated group RepeatedGroup = 6 {

        optional string a = 1;
    }
    required group RequiredGroup = 7 {

        optional string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto).root.resolveAll();
        var protoTarget = require("../cli/targets/proto2");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto);

            test.end();
        });
    });
});

tape.test("proto3 to proto2 valid", function(test) {
    const proto3 = `syntax = "proto3";

message OptionalFields {
    message SubMessage {
        optional string a = 1;
    }

    optional SubMessage a = 1;
    repeated int32 b = 2;
    repeated uint32 c = 3 [packed=false];

}`;
    const proto2 = `syntax = "proto2";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2 [packed=true];
    repeated uint32 c = 3;

    message SubMessage {

        optional string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto3).root.resolveAll();
        var protoTarget = require("../cli/targets/proto2");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto2);

            test.end();
        });
    });
});

tape.test("proto2 to proto3 valid", function(test) {
    const proto2 = `syntax = "proto2";

message OptionalFields {
    message SubMessage {
        optional string a = 1;
    }

    optional SubMessage a = 1;
    repeated int32 b = 2;
    repeated uint32 c = 3 [packed=true];
}`;
    const proto3 = `syntax = "proto3";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2 [packed=false];
    repeated uint32 c = 3;

    message SubMessage {

        optional string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto2).root.resolveAll();
        var protoTarget = require("../cli/targets/proto3");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto3);

            test.end();
        });
    });
});


tape.test("edition 2023 to proto2 valid", function(test) {
    const editions = `edition = "2023";
option features.repeated_field_encoding = EXPANDED;

message OptionalFields {
    message SubMessage {
        string a = 1 [features.field_presence = LEGACY_REQUIRED];
    }

    SubMessage a = 1;
    repeated int32 b = 2 [features.repeated_field_encoding = PACKED];
    repeated uint32 c = 3;
}`;
    const proto2 = `syntax = "proto2";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2 [packed=true];
    repeated uint32 c = 3;

    message SubMessage {

        required string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(editions).root.resolveAll();
        var protoTarget = require("../cli/targets/proto2");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto2);

            test.end();
        });
    });
});

tape.test("edition 2023 to proto3 valid", function(test) {
    const editions = `edition = "2023";
option features.repeated_field_encoding = EXPANDED;

message OptionalFields {
    message SubMessage {
        string a = 1 [features.field_presence = IMPLICIT];
    }

    SubMessage a = 1;
    repeated int32 b = 2 [features.repeated_field_encoding = PACKED];
    repeated uint32 c = 3;
}`;
    const proto3 = `syntax = "proto3";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2;
    repeated uint32 c = 3 [packed=false];

    message SubMessage {

        string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(editions).root.resolveAll();
        var protoTarget = require("../cli/targets/proto3");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto3);

            test.end();
        });
    });
});
