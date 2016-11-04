var protobuf = require("../..");

module.exports = proto_source;

/**
 * .proto source.
 * @param {!Object} options Source options
 * @param {function(?Error, Root=)} callback Callback function
 */
function proto_source(options, callback) {
    process.nextTick(function() {
        callback(Error("not implemented"));
    });
}
