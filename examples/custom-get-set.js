// this example demonstrates a way to keep field casing (as defined within .proto files)
// while still having virtual getters and setters for the camel cased counterparts.

var protobuf = require("..");

var proto = "syntax=\"proto3\";\
message MyMessage {\
  string some_field = 1;\
}";

var root = protobuf.parse(proto, { keepCase: true }).root;

function camelCase(str) {
    return str.substring(0,1) + str.substring(1).replace(/_([a-z])(?=[a-z]|$)/g, function($0, $1) { return $1.toUpperCase(); });
}

// this function adds alternative getters and setters for the camel cased counterparts
// to the runtime message's prototype (i.e. without having to register a custom class):
function addVirtualCamelcaseFields(type) {
    type.fieldsArray.forEach(function(field) {
        var altName = camelCase(field.name);
        if (altName !== field.name)
            Object.defineProperty(type.ctor.prototype, altName, {
                get: function() {
                    return this[field.name];
                },
                set: function(value) {
                    this[field.name] = value;
                }
            });
    });
}

var MyMessage = root.lookup("MyMessage");

addVirtualCamelcaseFields(MyMessage);

var myMessage = MyMessage.create({
    some_field /* or someField */: "hello world"
});

console.log(
    "someField:", myMessage.someField,
    "\nsome_field:", myMessage.some_field,
    "\nJSON:", JSON.stringify(myMessage)
);
