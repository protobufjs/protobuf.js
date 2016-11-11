var protobuf = require(".."),
    chalk = require("chalk");

var Root  = protobuf.Root,
    Type  = protobuf.Type,
    Field = protobuf.Field;

function inspect(object, indent) {
    if (!object)
        return "";
    var sb = [];
    if (!indent)
        indent = "";
    var ind = indent ? indent.substring(0, indent.length - 2) + "└ " : "";
    sb.push(
        ind + chalk.bold(object.toString()),
        indent + chalk.gray("parent: ") + object.parent
    );
    if (object instanceof Field) {
        if (object.extend !== undefined)
            sb.push(indent + chalk.gray("extend: ") + object.extend);
        if (object.oneof)
            sb.push(indent + chalk.gray("oneof : ") + object.oneof);
    }
    sb.push("");
    if (object.each) {
        if (object.fields)
            object.each(function(field) {
                sb.push(inspect(field, indent + "  "));
            }, object, object.fields);
        if (object.oneofs)
            object.each(function(oneof) {
                sb.push(inspect(oneof, indent + "  "));
            }, object, object.oneofs);
        if (object.methods)
            object.each(function(service) {
                sb.push(inspect(service, indent + "  "));
            }, object, object.methods);
        if (object.nested)
            object.each(function(nested) {
                sb.push(inspect(nested, indent + "  "));
            });
    }
    return sb.join("\n");
}

var root = new Root(),
    gp = root.lookup("google.protobuf");

gp.add(
    new protobuf.Service("Something")
    .add(new protobuf.Method("Get", "rpc", "Any", "Any"))
);

console.log(inspect(gp));

console.log(gp.object.Something);
console.log(gp.object.Something === gp.object.Something);
console.log(gp.object === gp.object);
