var fs = require("fs");
var path = require("path");
var tape = require("tape");
var tmp = require("tmp");

var cli = require(path.join(__dirname, "..", "..", "cli", "pbts.js"));
var protobuf = require(path.join("..", ".."));
var static_module_target = require(path.join(__dirname, "..", "..", "cli", "targets", "static-module"));

// This proto input used to produce the same variable name `end2` in one `switch` scope of the
// JavaScript output, leading to failing pbts execution. Test that code generation works
// in this case by running pbts (variable scope reduced to each case statement).
tape.test("unambiguous variables", function(test) {
    if (!protobuf.util.isNode) {
        return;
    }

    var tmpFilePath = tmp.tmpNameSync({postfix: "tmpFilePath.js"});
    var tmpFilePathTypeScriptOutput = tmp.tmpNameSync({postfix: "tmpFilePathTypeScriptOutput"});

    tape.onFinish(function() {
        try {
            fs.unlinkSync(tmpFilePath);
            fs.unlinkSync(tmpFilePathTypeScriptOutput);
        } catch(e) {
            // ignored
        }
    });

    protobuf.load("tests/data/two_maps.proto", function(err, root) {
        if (err || !root) {
            test.fail(err && err.message || "should parse without errors");
            return;
        }
        new protobuf.Root().load("tests/data/two_maps.proto", { keepCase: true }, function(err, root) {
            if (err || !root) {
                test.fail(err && err.message || "should parse without errors");
                return;
            }
            test.pass("should parse without errors");
            test.doesNotThrow(function() {
                root.resolveAll();
            }, "should resolve without errors");

            var options = {
                create: true,
                encode: true,
                decode: true,
                verify: true,
                convert: true,
                delimited: true,
                beautify: true,
                comments: true,
                es6: true,
            };
            static_module_target(root, options, function targetCallback(err, output) {
                if (err || !output || !output.length) {
                    test.fail(err && err.message || "should output without errors");
                    return;
                }

                fs.writeFileSync(tmpFilePath, Buffer.from(output, "utf-8"));

                function onCliCompletion(err, output) {
                    if (err || !output || !output.length) {
                        test.fail(err && err.message || "should output TypeScript without errors");
                        return;
                    }

                    var typeScriptOutput = fs.readFileSync(tmpFilePathTypeScriptOutput).toString();
                    if (!typeScriptOutput || typeScriptOutput.indexOf("Example.Msg") === -1) {
                        test.fail(err && err.message || "should output TypeScript without errors");
                        return;
                    }

                    test.end();
                }

                try {
                    cli.main(["-o", tmpFilePathTypeScriptOutput, tmpFilePath], onCliCompletion);
                } catch (e) {
                    test.fail("pbts cli failed: " + e);
                }
            });
        });
    });
});
