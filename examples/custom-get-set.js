// this example demonstrates a way to keep field casing (as defined within .proto files)
// while still having virtual getters and setters for the camel cased counterparts.

/*eslint-disable strict, no-console*/
var protobuf = require("..");

var proto = "syntax=\"proto3\";\
message MyMessage {\
  string some_field = 1;\
}";

var root = protobuf.parse(proto, { keepCase: true }).root; // or use Root#load

// converts a string from underscore notation to camel case
function toCamelCase(str) {
    return str.substring(0,1) + str.substring(1).replace(/_([a-z])(?=[a-z]|$)/g, function($0, $1) { return $1.toUpperCase(); });
}

// adds a virtual alias property
function addAliasProperty(type, name, aliasName) {
    if (aliasName !== name)
        Object.defineProperty(type.ctor.prototype, aliasName, {
            get: function() { return this[name]; },
            set: function(value) { this[name] = value; }
        });
}

// this function adds alternative getters and setters for the camel cased counterparts
// to the runtime message's prototype (i.e. without having to register a custom class):
function addVirtualCamelcaseFields(type) {
    type.fieldsArray.forEach(function(field) {
        addAliasProperty(type, field.name, toCamelCase(field.name));
    });
    type.oneofsArray.forEach(function(oneof) {
        addAliasProperty(type, oneof.name, toCamelCase(oneof.name));
    });
    return type;
}

var MyMessage = addVirtualCamelcaseFields(root.lookup("MyMessage"));

var myMessage = MyMessage.create({
    some_field /* or someField */: "hello world"
});

console.log(
    "someField:", myMessage.someField,
    "\nsome_field:", myMessage.some_field,
    "\nJSON:", JSON.stringify(myMessage)
);
