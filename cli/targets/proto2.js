module.exports = proto2_target;

var protobuf = require("../..");

function proto2_target(root, options, callback) {
    require("./proto")(root, protobuf.util.merge(options, { syntax: "proto2" }), callback);
}
