var ProtoBuf = require("protobufjs"),
    ByteBuffer = ProtoBuf.ByteBuffer,                    // ProtoBuf.js uses and also exposes ByteBuffer.js
    Long = ProtoBuf.Long;                                // as well as Long.js (not used in this example)

// Option 1: Loading the .proto file directly
var builder = ProtoBuf.loadProtoFile("./json.proto"),    // Creates the Builder
    JS = builder.build("js");                            // Returns just the 'js' namespace if that's all we need

// Option 2: Loading the .json file generated through 'proto2js json.proto > json.json'
var root = ProtoBuf.loadJsonFile("./json.json").build(), // Here we make the Builder return the root namespace
    JS = root.js;                                        // then we reference 'js' inside. Both is possible.

// Option 3: Loading the module generated through 'proto2js json.proto -commonjs=js > json.js'
var JS = require("./json.js");                           // Returns what is specified with -commonjs[=XX] (omitted=root)

// `JS` now contains the js namespace from json.proto: Value, Array and Object

// This is how we use these classes:

/**
 * Converts a JSON-like structure to JS-Namespace values.
 * @param {*} val JSON
 * @returns {!JS.Value} JS-Namespace value
 * @inner
 */
function _protoify(val) {
    switch (typeof val) {
        case 'number':
            if (val%1 === 0 && val >= (0x80000000|0) && val <= (0x7fffffff|0))
                return new JS.Value(val); // sets the first field declared in .js.Value
            else
                return new JS.Value(null, val); // sets the second field
        case 'string':
            return new JS.Value({ 'string': val }); // uses object notation instead
        case 'boolean':
            return new JS.Value({ 'boolean': val });
        case 'object':
            if (val === null)
                return new JS.Value({ 'null': true });
            if (Object.prototype.toString.call(val) === "[object Array]") {
                var arr = new JS.Array();
                for (var i=0; i<val.length; ++i)
                    arr['values'][i] = _protoify(val[i]);
                return new JS.Value({ 'array': arr });
            }
            var obj = new JS.Object();
            for (var key in val)
                if (val.hasOwnProperty(key))
                    obj['keys'].push(_protoify(key)),
                        obj['values'].push(_protoify(val[key]));
            return new JS.Value({ 'object': obj });
        case 'undefined':
            return new JS.Value(); // undefined
        default:
            throw Error("Unsupported type: "+(typeof val)); // symbol, function
    }
}

/**
 * Converts JS-Namespace values to JSON.
 * @param {!JS.Value} value JS value
 * @returns {*} JSON
 * @inner
 */
function _jsonify(value) {
    if (value.type === null)
        return undefined;
    switch (value.type) {
        case 'null':
            return null;
        case 'array':
            return (function() {
                var values = value['array']['values'],
                    i = 0,
                    k = values.length,
                    arr = new Array(k);
                for (; i<k; ++i)
                    arr[i] = _jsonify(values[i]);
                return arr;
            })();
        case 'object':
            return (function() {
                var keys = value['object']['keys'],
                    values = value['object']['values'],
                    i = 0,
                    k = keys.length,
                    obj = {};
                for (; i<k; ++i)
                    obj[keys[i]['string'] /* is a JS.Value, here always a string */] = _jsonify(values[i]);
                return obj;
            })();
        default:
            return value[value.type];
    }
}

// And this is how we actually encode and decode them:

/**
 * A temporary Buffer to speed up encoding.
 * @type {!ByteBuffer}
 * @inner
 */
var tempBuffer = ByteBuffer.allocate(1024);

/**
 * Converts a JSON structure to a Buffer.
 * @param {*} json JSON
 * @returns {!Buffer|!ArrayBuffer}
 * @expose
 */
module.exports = function(json) {
    return _protoify(json)     // Returns the root JS.Value
           .encode(tempBuffer).flip() // Encodes it to a ByteBuffer, here: reusing tempBuffer forever
                               // The non-tempBuffer alternative is just doing .encode()
           .toBuffer();        // Converts it to a Buffer. In the browser, this returns an ArrayBuffer. To return an
                               // ArrayBuffer explicitly both under node.js and in the browser, use .toArrayBuffer().
                               // Performance note: This just returns a slice on the ByteBuffer's backing .buffer
};

/**
 * Converts a Buffer to a JSON structure.
 * @param {!Buffer|!ArrayBuffer} proto Buffer
 * @returns {*} JSON
 * @expose
 */
module.exports.parse = function(proto) {
    return _jsonify(           // Processes JS-namespace objects
        JS.Value.decode(proto) // Decodes the JS.Value from a ByteBuffer, a Buffer, an ArrayBuffer, an Uint8Array, ...
    );
};

/**
 * Performs maintenance.
 * @expose
 */
module.exports.performMaintenance = function() {
    if (tempBuffer.capacity() > 2048)
        tempBuffer = ByteBuffer.allocate(1024);
    // In case this module is running inside of a daemon, we'd just call this
    // method every now and then to discard the tempBuffer if it becomes too
    // large. This is just an example on how to reuse ByteBuffers effectively.
    // You may consider something like this for the performance benefit, which
    // is decreasing the memory allocation footprint of your app.
};

// Have a nice day!
