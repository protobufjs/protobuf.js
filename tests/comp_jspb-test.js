var tape = require("tape");
var protobuf  = require("..");

tape.test("jspb test.proto", function(test) {

    protobuf.load("tests/data/test.proto", function(err, root) {
        if (err)
            return test.fail(err.message);
        
        test.pass("should parse without errors");
        test.end();
    });

});
