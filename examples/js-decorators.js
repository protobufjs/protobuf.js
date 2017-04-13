// This example shows how decorators can be used with plain JavaScript. It's otherwise identical to
// the README example.

/*eslint-disable strict, no-console*/
var protobuf = require("../light");

var Type  = protobuf.Type,
    Field = protobuf.Field,
    OneOf = protobuf.OneOf;

function AwesomeSubMessage(properties) {
    protobuf.Message.call(this, properties);
}

(AwesomeSubMessage.prototype = Object.create(protobuf.Message)).constructor = AwesomeSubMessage;

Field.d(1, "string", "optional", "awesome default string")(AwesomeSubMessage.prototype, "awesomeField");

var AwesomeEnum = {
    ONE: 1,
    TWO: 2
};

Type.d("SuperAwesomeMessage")(AwesomeMessage);
function AwesomeMessage(properties) {
    protobuf.Message.call(this, properties);
}

(AwesomeMessage.prototype = Object.create(protobuf.Message)).constructor = AwesomeMessage;

Field.d(1, "string", "optional", "awesome default string")(AwesomeMessage.prototype, "awesomeField");
Field.d(2, AwesomeSubMessage)(AwesomeMessage.prototype, "awesomeSubMessage");
Field.d(3, AwesomeEnum, "optional", AwesomeEnum.ONE)(AwesomeMessage.prototype, "awesomeEnum");
OneOf.d("awesomeSubMessage", "awesomeEnum")(AwesomeMessage.prototype, "which");

// example code
var message = new AwesomeMessage({ awesomeField: "hello" });
var buffer  = AwesomeMessage.encode(message).finish();
var decoded = AwesomeMessage.decode(buffer);

console.log(decoded);
console.log("internal name: " + AwesomeMessage.$type.name);
