var protobuf = require("../..");

module.exports = proto_target;

/**
 * .proto target.
 * @param {!Object} options Target options
 * @param {function(?Error)} callback Callback
 */
function proto_target(options, callback) {
    process.nextTick(function() {
        callback(Error("not implemented"));
    });
}
