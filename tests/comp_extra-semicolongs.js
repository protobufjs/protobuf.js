var tape = require("tape");

var protobuf = require("..");

tape.test("extra semicolons", function(test) {
	protobuf.load("tests/data/extra-semicolons.proto", function(err, root) {
		if (err || !root) {
			test.fail(err && err.message || "should parse without errors");
			return test.end();
		}

		test.doesNotThrow(function(){
			root.resolveAll();
		}, "should resolve without errors");

		test.end();
	});
});
