module.exports = json_target;

var protobuf = require("../..");

function json_target(root, options, callback) {
    callback(null, JSON.stringify(root, null, 2));    
}
