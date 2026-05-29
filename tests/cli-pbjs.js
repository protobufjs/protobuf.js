// Tests for pbjs tool targets.

var tape = require("tape");
var path = require("path");
var protobuf = require("..");
var fs = require("fs");
var child_process = require("child_process");
var cliTest = require("./helpers/cli");

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

tape.test("pbjs generates unsigned fixed64 defaults", function(test) {
    cliTest(test, function() {
        var root = protobuf.Root.fromJSON({
            nested: {
                M: {
                    fields: {
                        v: {
                            type: "fixed64",
                            id: 1,
                            options: {
                                default: "11000000000000000001"
                            }
                        },
                        s: {
                            type: "sfixed64",
                            id: 2,
                            options: {
                                default: "-9000000000000000001"
                            }
                        }
                    }
                }
            }
        });
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {}, function(err, jsCode) {
            test.error(err, "static code generation worked");
            test.ok(
                /M\.prototype\.v = \$util\.Long \? \$util\.Long\.fromBits\([^)]*,true\) : 11000000000000000000;/.test(jsCode),
                "fixed64 default is emitted as unsigned"
            );
            test.ok(
                /M\.prototype\.s = \$util\.Long \? \$util\.Long\.fromBits\([^)]*,false\) : -9000000000000000000;/.test(jsCode),
                "sfixed64 default is emitted as signed"
            );
            test.end();
        });
    });
});

tape.test("pbjs static service methods expose rpc metadata", function(test) {
    cliTest(test, function() {
        var root = protobuf.parse([
            "syntax = \"proto3\";",
            "package rpcmeta;",
            "service TestService {",
            "  rpc Unary (Request) returns (Response);",
            "  rpc ServerStream (Request) returns (stream Response);",
            "  rpc ClientStream (stream Request) returns (Response);",
            "}",
            "message Request {}",
            "message Response {}"
        ].join("\n")).root;
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            service: true,
            comments: true,
            root: "rpcMetadata"
        }, function(err, jsCode) {
            test.error(err, "static code generation worked");

            delete protobuf.roots.rpcMetadata;
            var $protobuf = protobuf;
            eval(jsCode);

            var TestService = protobuf.roots.rpcMetadata.rpcmeta.TestService;
            var unary = TestService.prototype.unary;
            var serverStream = TestService.prototype.serverStream;
            var clientStream = TestService.prototype.clientStream;

            test.equal(unary.name, "Unary", "unary method exposes its proto name");
            test.equal(unary.path, "/rpcmeta.TestService/Unary", "unary method exposes its rpc path");
            test.equal(unary.requestType, "Request", "unary method exposes request type");
            test.equal(unary.responseType, "Response", "unary method exposes response type");
            test.equal(unary.requestStream, undefined, "unary method has no request stream flag");
            test.equal(unary.responseStream, undefined, "unary method has no response stream flag");

            test.equal(serverStream.responseStream, true, "server streaming method exposes response stream flag");
            test.equal(clientStream.requestStream, true, "client streaming method exposes request stream flag");

            require("../cli/pbts").process(jsCode, [], function(dtsErr, tsCode) {
                test.error(dtsErr, "declaration generation worked");
                test.ok(tsCode.indexOf("unary: rpcmeta.TestService.Unary;") >= 0, "declaration exposes method as typed property");
                test.ok(tsCode.indexOf("type Unary = {") >= 0, "declaration emits method callable type");
                test.ok(tsCode.indexOf("readonly path: \"/rpcmeta.TestService/Unary\";") >= 0, "declaration exposes literal rpc path");
                test.ok(tsCode.indexOf("readonly responseStream: true;") >= 0, "declaration exposes streaming metadata");

                delete protobuf.roots.rpcMetadata;
                test.end();
            });
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

tape.test("pbjs emits file overview comments on one line", function(test) {
    cliTest(test, function() {
        var root = new protobuf.Root();
        root.comment = "Generated file.";

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            comments: true
        }, function(err, jsCode) {
            test.error(err, "static code generation worked");
            test.ok(jsCode.indexOf(" * @fileoverview Generated file.") >= 0, "emits file overview comment");
            test.equal(jsCode.indexOf("@\n * f\n * i\n * l\n * e"), -1, "does not split file overview into characters");
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

tape.test("pbjs escapes wrapper lint comments", function(test) {
    cliTest(test, function() {
        var root = new protobuf.Root();
        var staticModuleTarget = require("../cli/targets/static-module");

        staticModuleTarget(root, {
            wrap: "commonjs",
            lint: "note */ text"
        }, function(err, jsCode) {
            test.error(err, "static-module code generation worked");
            test.equal(jsCode.indexOf("note */ text"), -1, "does not emit raw comment terminator");
            test.ok(jsCode.indexOf("note * / text") >= 0, "escapes comment terminator");
            test.doesNotThrow(function() {
                new Function("require", "module", "exports", jsCode); // eslint-disable-line no-new-func
            }, "should generate parseable output");
            test.end();
        });
    });
});

tape.test("pbjs supports dictionary generated root names", function(test) {
    cliTest(test, function() {
        var staticTarget = require("../cli/targets/static");
        var jsonModuleTarget = require("../cli/targets/json-module");
        var root = protobuf.Root.fromJSON({
            nested: {
                M: {
                    fields: {}
                }
            }
        });

        test.equal(Object.getPrototypeOf(protobuf.roots), null, "roots uses dictionary semantics");

        delete protobuf.roots.__proto__;
        delete protobuf.roots.constructor;
        staticTarget(root, {
            root: "__proto__"
        }, function(staticErr, staticCode) {
            test.error(staticErr, "static target accepts dictionary root name");
            test.ok(staticCode.indexOf("$protobuf.roots[\"__proto__\"]") >= 0, "static target uses bracket root access");
            var $protobuf = protobuf;
            test.doesNotThrow(function() {
                eval(staticCode);
            }, "static output should execute");
            test.ok(Object.prototype.hasOwnProperty.call(protobuf.roots, "__proto__"), "static target creates own root property");

            jsonModuleTarget(root, {
                wrap: "commonjs",
                root: "constructor",
                lint: ""
            }, function(jsonErr, jsonCode) {
                test.error(jsonErr, "json-module target accepts dictionary root name");
                test.ok(jsonCode.indexOf("$protobuf.roots[\"constructor\"]") >= 0, "json-module target uses bracket root access");

                var module = { exports: {} };
                function localRequire(request) {
                    if (request.indexOf("protobufjs") === 0)
                        return protobuf;
                    throw Error("unexpected require: " + request);
                }

                test.doesNotThrow(function() {
                    new Function("require", "module", "exports", jsonCode)(localRequire, module, module.exports); // eslint-disable-line no-new-func
                }, "json-module output should execute");
                test.ok(Object.prototype.hasOwnProperty.call(protobuf.roots, "constructor"), "json-module target creates own root property");
                test.equal(module.exports, protobuf.roots.constructor, "json-module exports dictionary root");
                delete protobuf.roots.__proto__;
                delete protobuf.roots.constructor;
                test.end();
            });
        });
    });
});

tape.test("pbjs supports custom target paths", function(test) {
    cliTest(test, function() {
        var pbjs = require("../cli/pbjs");
        var tmpDir = path.join(".tmp", "pbjs-custom-target-" + process.pid + "-" + Date.now());
        var targetPath = path.join(tmpDir, "custom-target.js");
        var outPath = path.join(tmpDir, "out.js");

        fs.mkdirSync(tmpDir, { recursive: true });
        fs.writeFileSync(targetPath, [
            "\"use strict\";",
            "module.exports = function(root, options, callback) {",
            "    callback(null, \"custom target:\" + options.target);",
            "};"
        ].join("\n"));

        pbjs.main([
            "--target", targetPath,
            "--out", outPath,
            "tests/data/package.proto"
        ], function(err) {
            test.error(err, "custom target generation worked");
            test.equal(fs.readFileSync(outPath, "utf8"), "custom target:" + targetPath, "uses required custom target");
            fs.unlinkSync(outPath);
            fs.unlinkSync(targetPath);
            fs.rmdirSync(tmpDir);
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
            test.ok(staticTypes.indexOf("constructor(properties?: Package.$Properties);") >= 0, "keeps constructable static declarations");
            test.ok(staticTypes.indexOf("type $Shape = Package.$Properties;") >= 0, "aliases shape to properties when there is no narrowing");

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
                test.ok(jsonTypes.indexOf("static create(properties?: Package.$Properties): Package;") >= 0, "keeps reflection Type create declaration");
                test.equal(jsonTypes.indexOf("constructor(properties?: Package.$Properties);"), -1, "does not expose public message constructors");

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
                        test.equal(minimalTypes.indexOf("static create("), -1, "omits disabled create declaration");
                        test.equal(minimalTypes.indexOf("static encode("), -1, "omits disabled encode declaration");
                        test.equal(minimalTypes.indexOf("static decode("), -1, "omits disabled decode declaration");
                        test.equal(minimalTypes.indexOf("static verify("), -1, "omits disabled verify declaration");
                        test.equal(minimalTypes.indexOf("static fromObject("), -1, "omits disabled fromObject declaration");
                        test.equal(minimalTypes.indexOf("static toObject("), -1, "omits disabled toObject declaration");
                        test.equal(minimalTypes.indexOf("static getTypeUrl("), -1, "omits disabled getTypeUrl declaration");
                        cleanup();
                        test.end();
                    });
                });
            });
        });
    });
});

tape.test("pbjs --dts narrows oneof interfaces", function(test) {
    cliTest(test, function() {
        var pbjs = require("../cli/pbjs");
        var prefix = path.join(".tmp", "pbjs-dts-oneof-test-" + process.pid + "-" + Date.now());
        var staticOut = prefix + ".js";
        var staticDts = prefix + ".d.ts";

        if (!fs.existsSync(".tmp"))
            fs.mkdirSync(".tmp");

        function cleanup() {
            [ staticOut, staticDts ].forEach(function(file) {
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
            "tests/data/cli/test.proto"
        ], function(err) {
            test.error(err, "static-module --dts generation worked");
            test.ok(fs.existsSync(staticDts), "writes static-module declarations");

            var staticCode = fs.readFileSync(staticOut, "utf8");
            var staticTypes = fs.readFileSync(staticDts, "utf8");
            test.ok(staticCode.indexOf("@type {{") >= 0, "documents create overloads with TypeScript JSDoc");
            test.equal(staticCode.indexOf("@tstype"), -1, "uses standard JSDoc return types");
            test.ok(staticTypes.indexOf("export interface IOneofContainer extends OneofContainer.$Properties") >= 0, "keeps a legacy properties interface");
            test.ok(staticTypes.indexOf("export class OneofContainer {") >= 0, "does not implement the scoped properties interface");
            test.equal(staticTypes.indexOf("implements OneofContainer.$Properties"), -1, "omits explicit scoped properties implementation");
            test.ok(staticTypes.indexOf("constructor(properties?: OneofContainer.$Properties);") >= 0, "uses the scoped properties type for construction");
            test.ok(staticTypes.indexOf("static create(properties: OneofContainer.$Shape): OneofContainer & OneofContainer.$Shape;") >= 0, "narrows create from oneof-safe input");
            test.ok(staticTypes.indexOf("static create(properties?: OneofContainer.$Properties): OneofContainer;") >= 0, "keeps broad create overload");
            test.ok(staticTypes.indexOf("static encode(message: OneofContainer.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;") >= 0, "uses the scoped properties type for encoding");
            test.ok(staticTypes.indexOf("static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OneofContainer & OneofContainer.$Shape;") >= 0, "narrows decoded oneof messages");
            test.equal(staticTypes.indexOf("$Oneofs"), -1, "does not expose an intermediate oneof type");
            test.ok(staticTypes.indexOf("type $Shape = {\n  stringInOneof?: string|null;\n  messageInOneof?: Message.$Shape|null;") >= 0, "emits multiline recursive shape fields");
            test.ok(staticTypes.indexOf("{ someOneof?: \"messageInOneof\"; stringInOneof?: null; messageInOneof: Message.$Shape }") >= 0, "emits oneof refinement union");
            test.ok(staticTypes.indexOf("type $Shape = Message.$Properties;") >= 0, "aliases plain shape type for non-oneof message");

            cleanup();
            test.end();
        });
    });
});

tape.test("pbjs --dts generated message typings compile", function(test) {
    cliTest(test, function() {
        var pbjs = require("../cli/pbjs");
        var prefix = path.join(".tmp", "pbjs-dts-types-test-" + process.pid + "-" + Date.now());
        var staticOut = prefix + ".js";
        var staticDts = prefix + ".d.ts";
        var tsOut = prefix + ".check.ts";
        var tsconfigOut = prefix + ".tsconfig.json";
        var tsc = require.resolve("typescript/bin/tsc");

        if (!fs.existsSync(".tmp"))
            fs.mkdirSync(".tmp");

        function cleanup() {
            [ staticOut, staticDts, tsOut, tsconfigOut ].forEach(function(file) {
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
            "tests/data/cli/test.proto"
        ], function(err) {
            test.error(err, "static-module --dts generation worked");

            fs.writeFileSync(tsOut, [
                "import { Enum, Message, OneofContainer } from \"./" + path.basename(prefix) + "\";",
                "",
                "function expectType<T>(value: T): void { void value; }",
                "",
                "const message = new Message({ value: 1 });",
                "Message.encode(message).finish();",
                "Message.encode({ value: 1 }).finish();",
                "expectType<number>(Message.decode(new Uint8Array()).value);",
                "",
                "const byCase = OneofContainer.create({ someOneof: \"stringInOneof\", stringInOneof: \"abc\" });",
                "if (byCase.someOneof === \"stringInOneof\") {",
                "    expectType<string>(byCase.stringInOneof);",
                "    expectType<null|undefined>(byCase.messageInOneof);",
                "}",
                "",
                "const byField = OneofContainer.create({ stringInOneof: \"abc\" });",
                "if (byField.stringInOneof != null) {",
                "    expectType<string>(byField.stringInOneof);",
                "    expectType<null|undefined>(byField.messageInOneof);",
                "}",
                "",
                "const byMessage = OneofContainer.create({ messageInOneof: { value: 1 } });",
                "if (byMessage.someOneof === \"messageInOneof\")",
                "    expectType<Message.$Shape>(byMessage.messageInOneof);",
                "",
                "const broadProperties: OneofContainer.$Properties = {",
                "    stringInOneof: \"abc\",",
                "    messageInOneof: { value: 1 }",
                "};",
                "const broad = OneofContainer.create(broadProperties);",
                "expectType<string|null|undefined>(broad.stringInOneof);",
                "",
                "const constructed = new OneofContainer({ stringInOneof: \"abc\" });",
                "expectType<string|null|undefined>(constructed.stringInOneof);",
                "",
                "const decoded = OneofContainer.decode(new Uint8Array());",
                "if (decoded.someOneof === \"stringInOneof\")",
                "    expectType<string>(decoded.stringInOneof);",
                "if (decoded.messageInOneof != null)",
                "    expectType<Message.$Shape>(decoded.messageInOneof);",
                "",
                "OneofContainer.encode({",
                "    regularField: \"regular\",",
                "    enumField: Enum.SOMETHING,",
                "    stringInOneof: \"abc\"",
                "}).finish();"
            ].join("\n"));

            fs.writeFileSync(tsconfigOut, JSON.stringify({
                compilerOptions: {
                    baseUrl: "..",
                    esModuleInterop: true,
                    lib: [ "es2015" ],
                    noEmit: true,
                    paths: {
                        "protobufjs/minimal": [ "minimal" ],
                        "protobufjs": [ "index" ]
                    },
                    strictNullChecks: true,
                    types: [ "node" ]
                },
                files: [ path.basename(tsOut) ]
            }, null, 4));

            child_process.execFile(process.execPath, [ tsc, "-p", tsconfigOut ], function(tscErr, stdout, stderr) {
                if (stdout)
                    process.stdout.write(stdout);
                if (stderr)
                    process.stderr.write(stderr);
                test.error(tscErr, "generated declarations type-check");
                cleanup();
                test.end();
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

tape.test("pbjs rejects static target escaped name collisions", function(test) {
    cliTest(test, function() {
        var root = protobuf.Root.fromJSON({
            nested: {
                "pkg-name": {
                    nested: {}
                },
                pkgname: {
                    nested: {}
                }
            }
        });
        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {}, function(err) {
            test.match(err && err.message, /duplicate generated name 'pkgname'/, "rejects ambiguous generated names");
            test.end();
        });
    });
});

tape.test("pbjs builds static references from escaped path segments", function(test) {
    cliTest(test, function() {
        var root = protobuf.Root.fromJSON({
            nested: {
                "pkg.name": {
                    nested: {
                        Child: {
                            fields: {
                                value: { type: "string", id: 1 }
                            }
                        },
                        Kind: {
                            values: {
                                UNKNOWN: 0,
                                READY: 1
                            }
                        },
                        Parent: {
                            fields: {
                                child: { type: "Child", id: 1 },
                                kind: { type: "Kind", id: 2 }
                            }
                        },
                        TestService: {
                            methods: {
                                Call: {
                                    requestType: "Child",
                                    responseType: "Parent"
                                }
                            }
                        }
                    }
                }
            }
        });
        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            service: true,
            verify: true,
            convert: true
        }, function(err, jsCode) {
            test.error(err, "static code generation worked");
            test.equal(jsCode.indexOf("$root.pkg.name"), -1, "does not split dotted descriptor names");
            test.ok(jsCode.indexOf("$root.pkgname.Child") >= 0, "uses escaped path segment for request type");
            test.ok(jsCode.indexOf("$root.pkgname.Parent") >= 0, "uses escaped path segment for response type");
            test.doesNotThrow(function() {
                new Function("$protobuf", jsCode); // eslint-disable-line no-new-func
            }, "should generate parseable output");

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

