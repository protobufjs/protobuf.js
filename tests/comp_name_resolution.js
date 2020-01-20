var fs = require('fs');
var path = require('path');
var tape = require("tape");
var protobuf = require("..");

var proto = fs.readFileSync(path.resolve(__dirname, './data/name_resolution.proto'), 'utf8');

tape.test("ambiguous names", function(test) {
    var result = protobuf.parse(proto, { keepCase: true });

    var root = result.root;
    var MyMessage = root.nested.mytest.MyMessage;

    var myMessageEncoded = MyMessage.create({
        "foo_field": {
            "foo_inner_field": "value_for_inner_field",
            "foo_outer_field": "value_for_outer_field",
        }
    });

    var myMessageDecoded = MyMessage.decode(
        MyMessage.encode(myMessageEncoded).finish()
    );

    test.equal(myMessageDecoded.foo_field.foo_outer_field, 'value_for_outer_field', "should resolve type as outer field");
    test.end();
});
