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

    some_pkg.MessageB = (function(MessageB) {

        /**
         * Properties of a MessageB.
         * @memberof some_pkg
         * @interface IMessageB
         */

        /**
         * Constructs a new MessageB.
         * @memberof some_pkg
         * @classdesc Represents a MessageB.
         * @implements IMessageB
         * @constructor
         * @param {some_pkg.IMessageB=} [properties] Properties to set
         */
        function MessageB(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MessageB instance using the specified properties.
         * @function create
         * @memberof some_pkg.MessageB
         * @static
         * @param {some_pkg.IMessageB=} [properties] Properties to set
         * @returns {some_pkg.MessageB} MessageB instance
         */
        MessageB.create = function create(properties) {
            return new MessageB(properties);
        };

        /**
         * Encodes the specified MessageB message. Does not implicitly {@link some_pkg.MessageB.verify|verify} messages.
         * @function encode
         * @memberof some_pkg.MessageB
         * @static
         * @param {some_pkg.IMessageB} message MessageB message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageB.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified MessageB message, length delimited. Does not implicitly {@link some_pkg.MessageB.verify|verify} messages.
         * @function encodeDelimited
         * @memberof some_pkg.MessageB
         * @static
         * @param {some_pkg.IMessageB} message MessageB message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageB.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageB message from the specified reader or buffer.
         * @function decode
         * @memberof some_pkg.MessageB
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {some_pkg.MessageB} MessageB
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageB.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.some_pkg.MessageB();
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
         * Decodes a MessageB message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof some_pkg.MessageB
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {some_pkg.MessageB} MessageB
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageB.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageB message.
         * @function verify
         * @memberof some_pkg.MessageB
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageB.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a MessageB message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof some_pkg.MessageB
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {some_pkg.MessageB} MessageB
         */
        MessageB.fromObject = function fromObject(object) {
            if (object instanceof $root.some_pkg.MessageB)
                return object;
            return new $root.some_pkg.MessageB();
        };

        /**
         * Creates a plain object from a MessageB message. Also converts values to other types if specified.
         * @function toObject
         * @memberof some_pkg.MessageB
         * @static
         * @param {some_pkg.MessageB} message MessageB
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageB.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this MessageB to JSON.
         * @function toJSON
         * @memberof some_pkg.MessageB
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageB.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MessageB;
    })(some_pkg.MessageB || {});

    return some_pkg;
})($root.some_pkg || {});

module.exports = $root;
