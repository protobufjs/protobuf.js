"use strict"; // eslint-disable-line strict

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.A = (function() {

    /**
     * Constructs a new A.
     * @exports A
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function A(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias A.prototype */
    var $prototype = A.prototype;

    /**
     * A whatever.
     * @type {string}
     */
    $prototype.whatever = "";

    /**
     * Creates a new A instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {A} A instance
     */
    A.create = function create(properties) {
        return new A(properties);
    };

    /**
     * Encodes the specified A.
     * @function
     * @param {A|Object} message A or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    A.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
        writer || (writer = Writer.create())
        if (message.whatever !== undefined && message.whatever !== "")
            writer.uint32(10/*= id 1, wireType 2 */).string(message.whatever)
        return writer
    }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

    /**
     * Encodes the specified A, length delimited.
     * @param {A|Object} message A or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    A.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a A from the specified reader or buffer.
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {A} A
     */
    A.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
        reader instanceof Reader || (reader = Reader.create(reader))
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.A
        while (reader.pos < end) {
            var tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.whatever = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

    /**
     * Decodes a A from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {A} A
     */
    A.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a A.
     * @function
     * @param {A|Object} message A or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    A.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
        if (message.whatever !== undefined) {
            if (!util.isString(message.whatever))
                return "invalid value for field .A.whatever (string expected)"
        }
        return null
    }})($protobuf.util, [null]); /* eslint-enable */

    return A;
})();

$root.B = (function() {

    /**
     * Constructs a new B.
     * @exports B
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function B(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias B.prototype */
    var $prototype = B.prototype;

    /**
     * B A.
     * @type {A}
     */
    $prototype.A = null;

    /**
     * Creates a new B instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {B} B instance
     */
    B.create = function create(properties) {
        return new B(properties);
    };

    /**
     * Encodes the specified B.
     * @function
     * @param {B|Object} message B or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    B.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
        writer || (writer = Writer.create())
        if (message.A !== undefined && message.A !== null)
            types[0].encode(message.A, writer.uint32(10/*= id 1, wireType 2 */).fork()).ldelim()
        return writer
    }})($protobuf.Writer, $protobuf.util, ["A"]); /* eslint-enable */

    /**
     * Encodes the specified B, length delimited.
     * @param {B|Object} message B or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    B.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a B from the specified reader or buffer.
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {B} B
     */
    B.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
        reader instanceof Reader || (reader = Reader.create(reader))
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.B
        while (reader.pos < end) {
            var tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.A = types[0].decode(reader, reader.uint32())
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }})($protobuf.Reader, $protobuf.util, ["A"]); /* eslint-enable */

    /**
     * Decodes a B from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {B} B
     */
    B.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a B.
     * @function
     * @param {B|Object} message B or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    B.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
        if (message.A !== undefined && message.A !== null) {
            var reason;
            if (reason = types[0].verify(message.A))
                return reason
        }
        return null
    }})($protobuf.util, ["A"]); /* eslint-enable */

    return B;
})();

// Resolve lazy types
$lazyTypes.forEach(function(types) {
    types.forEach(function(path, i) {
        if (!path)
            return;
        path = path.split('.');
        var ptr = $root;
        while (path.length)
            ptr = ptr[path.shift()];
        types[i] = ptr;
    });
});

$protobuf.roots["test_ambiguous-names"] = $root;

module.exports = $root;
