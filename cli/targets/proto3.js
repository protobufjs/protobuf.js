module.exports = proto3_target;

var protobuf = require("../..");

function proto3_target(root, options, callback) {
    require("./proto")(root, protobuf.util.merge(options, { syntax: "proto3" }), callback);
}
