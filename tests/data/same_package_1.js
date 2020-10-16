/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("../../minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * Namespace some_pkg.
 * @exports some_pkg
 * @namespace
 */

$root.some_pkg = (function(some_pkg) {

    some_pkg.MessageA = (function(MessageA) {

        /**
         * Properties of a MessageA.
         * @memberof some_pkg
         * @interface IMessageA
         */

        /**
         * Constructs a new MessageA.
         * @memberof some_pkg
         * @classdesc Represents a MessageA.
         * @implements IMessageA
         * @constructor
         * @param {some_pkg.IMessageA=} [properties] Properties to set
         */
        function MessageA(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MessageA instance using the specified properties.
         * @function create
         * @memberof some_pkg.MessageA
         * @static
         * @param {some_pkg.IMessageA=} [properties] Properties to set
         * @returns {some_pkg.MessageA} MessageA instance
         */
        MessageA.create = function create(properties) {
            return new MessageA(properties);
        };

        /**
         * Encodes the specified MessageA message. Does not implicitly {@link some_pkg.MessageA.verify|verify} messages.
         * @function encode
         * @memberof some_pkg.MessageA
         * @static
         * @param {some_pkg.IMessageA} message MessageA message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageA.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified MessageA message, length delimited. Does not implicitly {@link some_pkg.MessageA.verify|verify} messages.
         * @function encodeDelimited
         * @memberof some_pkg.MessageA
         * @static
         * @param {some_pkg.IMessageA} message MessageA message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageA.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageA message from the specified reader or buffer.
         * @function decode
         * @memberof some_pkg.MessageA
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {some_pkg.MessageA} MessageA
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageA.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.some_pkg.MessageA();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageA message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof some_pkg.MessageA
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {some_pkg.MessageA} MessageA
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageA.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageA message.
         * @function verify
         * @memberof some_pkg.MessageA
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageA.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a MessageA message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof some_pkg.MessageA
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {some_pkg.MessageA} MessageA
         */
        MessageA.fromObject = function fromObject(object) {
            if (object instanceof $root.some_pkg.MessageA)
                return object;
            return new $root.some_pkg.MessageA();
        };

        /**
         * Creates a plain object from a MessageA message. Also converts values to other types if specified.
         * @function toObject
         * @memberof some_pkg.MessageA
         * @static
         * @param {some_pkg.MessageA} message MessageA
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageA.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this MessageA to JSON.
         * @function toJSON
         * @memberof some_pkg.MessageA
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageA.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MessageA;
    })(some_pkg.MessageA || {});

    return some_pkg;
})($root.some_pkg || {});

module.exports = $root;
