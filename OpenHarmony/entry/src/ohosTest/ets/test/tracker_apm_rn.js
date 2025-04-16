/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from "@ohos/protobufjs";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const RnApmTracker = $root.RnApmTracker = (() => {

    /**
     * Properties of a RnApmTracker.
     * @exports IRnApmTracker
     * @interface IRnApmTracker
     * @property {IRnPerformanceMeasure|null} [rnScriptExecutionTiming] RnApmTracker rnScriptExecutionTiming
     * @property {IRnPerformanceMeasure|null} [rnPageFirstAppearTiming] RnApmTracker rnPageFirstAppearTiming
     * @property {IRnHttpRequestTiming|null} [rnHttpRequestTiming] RnApmTracker rnHttpRequestTiming
     * @property {IRnPerformanceMeasure|null} [rnPerformanceMeasure] RnApmTracker rnPerformanceMeasure
     * @property {Array.<IRnResourceTiming>|null} [rnResourceTiming] RnApmTracker rnResourceTiming
     * @property {IRnVideoResourceTiming|null} [rnVideoResourceTiming] RnApmTracker rnVideoResourceTiming
     * @property {IRnApmContext|null} [rnApmContext] RnApmTracker rnApmContext
     * @property {IRnRouteNotFound|null} [rnRouteNotFound] RnApmTracker rnRouteNotFound
     */

    /**
     * Constructs a new RnApmTracker.
     * @exports RnApmTracker
     * @classdesc Represents a RnApmTracker.
     * @implements IRnApmTracker
     * @constructor
     * @param {IRnApmTracker=} [properties] Properties to set
     */
    function RnApmTracker(properties) {
        this.rnResourceTiming = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnApmTracker rnScriptExecutionTiming.
     * @member {IRnPerformanceMeasure|null|undefined} rnScriptExecutionTiming
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnScriptExecutionTiming = null;

    /**
     * RnApmTracker rnPageFirstAppearTiming.
     * @member {IRnPerformanceMeasure|null|undefined} rnPageFirstAppearTiming
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnPageFirstAppearTiming = null;

    /**
     * RnApmTracker rnHttpRequestTiming.
     * @member {IRnHttpRequestTiming|null|undefined} rnHttpRequestTiming
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnHttpRequestTiming = null;

    /**
     * RnApmTracker rnPerformanceMeasure.
     * @member {IRnPerformanceMeasure|null|undefined} rnPerformanceMeasure
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnPerformanceMeasure = null;

    /**
     * RnApmTracker rnResourceTiming.
     * @member {Array.<IRnResourceTiming>} rnResourceTiming
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnResourceTiming = $util.emptyArray;

    /**
     * RnApmTracker rnVideoResourceTiming.
     * @member {IRnVideoResourceTiming|null|undefined} rnVideoResourceTiming
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnVideoResourceTiming = null;

    /**
     * RnApmTracker rnApmContext.
     * @member {IRnApmContext|null|undefined} rnApmContext
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnApmContext = null;

    /**
     * RnApmTracker rnRouteNotFound.
     * @member {IRnRouteNotFound|null|undefined} rnRouteNotFound
     * @memberof RnApmTracker
     * @instance
     */
    RnApmTracker.prototype.rnRouteNotFound = null;

    /**
     * Creates a new RnApmTracker instance using the specified properties.
     * @function create
     * @memberof RnApmTracker
     * @static
     * @param {IRnApmTracker=} [properties] Properties to set
     * @returns {RnApmTracker} RnApmTracker instance
     */
    RnApmTracker.create = function create(properties) {
        return new RnApmTracker(properties);
    };

    /**
     * Encodes the specified RnApmTracker message. Does not implicitly {@link RnApmTracker.verify|verify} messages.
     * @function encode
     * @memberof RnApmTracker
     * @static
     * @param {IRnApmTracker} message RnApmTracker message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnApmTracker.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.rnScriptExecutionTiming != null && Object.hasOwnProperty.call(message, "rnScriptExecutionTiming"))
            $root.RnPerformanceMeasure.encode(message.rnScriptExecutionTiming, writer.uint32(/* id 4001, wireType 2 =*/32010).fork()).ldelim();
        if (message.rnPageFirstAppearTiming != null && Object.hasOwnProperty.call(message, "rnPageFirstAppearTiming"))
            $root.RnPerformanceMeasure.encode(message.rnPageFirstAppearTiming, writer.uint32(/* id 4002, wireType 2 =*/32018).fork()).ldelim();
        if (message.rnHttpRequestTiming != null && Object.hasOwnProperty.call(message, "rnHttpRequestTiming"))
            $root.RnHttpRequestTiming.encode(message.rnHttpRequestTiming, writer.uint32(/* id 4003, wireType 2 =*/32026).fork()).ldelim();
        if (message.rnPerformanceMeasure != null && Object.hasOwnProperty.call(message, "rnPerformanceMeasure"))
            $root.RnPerformanceMeasure.encode(message.rnPerformanceMeasure, writer.uint32(/* id 4004, wireType 2 =*/32034).fork()).ldelim();
        if (message.rnResourceTiming != null && message.rnResourceTiming.length)
            for (let i = 0; i < message.rnResourceTiming.length; ++i)
                $root.RnResourceTiming.encode(message.rnResourceTiming[i], writer.uint32(/* id 4005, wireType 2 =*/32042).fork()).ldelim();
        if (message.rnVideoResourceTiming != null && Object.hasOwnProperty.call(message, "rnVideoResourceTiming"))
            $root.RnVideoResourceTiming.encode(message.rnVideoResourceTiming, writer.uint32(/* id 4006, wireType 2 =*/32050).fork()).ldelim();
        if (message.rnApmContext != null && Object.hasOwnProperty.call(message, "rnApmContext"))
            $root.RnApmContext.encode(message.rnApmContext, writer.uint32(/* id 4007, wireType 2 =*/32058).fork()).ldelim();
        if (message.rnRouteNotFound != null && Object.hasOwnProperty.call(message, "rnRouteNotFound"))
            $root.RnRouteNotFound.encode(message.rnRouteNotFound, writer.uint32(/* id 4008, wireType 2 =*/32066).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RnApmTracker message, length delimited. Does not implicitly {@link RnApmTracker.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnApmTracker
     * @static
     * @param {IRnApmTracker} message RnApmTracker message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnApmTracker.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnApmTracker message from the specified reader or buffer.
     * @function decode
     * @memberof RnApmTracker
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnApmTracker} RnApmTracker
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnApmTracker.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnApmTracker();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 4001: {
                    message.rnScriptExecutionTiming = $root.RnPerformanceMeasure.decode(reader, reader.uint32());
                    break;
                }
            case 4002: {
                    message.rnPageFirstAppearTiming = $root.RnPerformanceMeasure.decode(reader, reader.uint32());
                    break;
                }
            case 4003: {
                    message.rnHttpRequestTiming = $root.RnHttpRequestTiming.decode(reader, reader.uint32());
                    break;
                }
            case 4004: {
                    message.rnPerformanceMeasure = $root.RnPerformanceMeasure.decode(reader, reader.uint32());
                    break;
                }
            case 4005: {
                    if (!(message.rnResourceTiming && message.rnResourceTiming.length))
                        message.rnResourceTiming = [];
                    message.rnResourceTiming.push($root.RnResourceTiming.decode(reader, reader.uint32()));
                    break;
                }
            case 4006: {
                    message.rnVideoResourceTiming = $root.RnVideoResourceTiming.decode(reader, reader.uint32());
                    break;
                }
            case 4007: {
                    message.rnApmContext = $root.RnApmContext.decode(reader, reader.uint32());
                    break;
                }
            case 4008: {
                    message.rnRouteNotFound = $root.RnRouteNotFound.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnApmTracker message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnApmTracker
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnApmTracker} RnApmTracker
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnApmTracker.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnApmTracker message.
     * @function verify
     * @memberof RnApmTracker
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnApmTracker.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.rnScriptExecutionTiming != null && message.hasOwnProperty("rnScriptExecutionTiming")) {
            let error = $root.RnPerformanceMeasure.verify(message.rnScriptExecutionTiming);
            if (error)
                return "rnScriptExecutionTiming." + error;
        }
        if (message.rnPageFirstAppearTiming != null && message.hasOwnProperty("rnPageFirstAppearTiming")) {
            let error = $root.RnPerformanceMeasure.verify(message.rnPageFirstAppearTiming);
            if (error)
                return "rnPageFirstAppearTiming." + error;
        }
        if (message.rnHttpRequestTiming != null && message.hasOwnProperty("rnHttpRequestTiming")) {
            let error = $root.RnHttpRequestTiming.verify(message.rnHttpRequestTiming);
            if (error)
                return "rnHttpRequestTiming." + error;
        }
        if (message.rnPerformanceMeasure != null && message.hasOwnProperty("rnPerformanceMeasure")) {
            let error = $root.RnPerformanceMeasure.verify(message.rnPerformanceMeasure);
            if (error)
                return "rnPerformanceMeasure." + error;
        }
        if (message.rnResourceTiming != null && message.hasOwnProperty("rnResourceTiming")) {
            if (!Array.isArray(message.rnResourceTiming))
                return "rnResourceTiming: array expected";
            for (let i = 0; i < message.rnResourceTiming.length; ++i) {
                let error = $root.RnResourceTiming.verify(message.rnResourceTiming[i]);
                if (error)
                    return "rnResourceTiming." + error;
            }
        }
        if (message.rnVideoResourceTiming != null && message.hasOwnProperty("rnVideoResourceTiming")) {
            let error = $root.RnVideoResourceTiming.verify(message.rnVideoResourceTiming);
            if (error)
                return "rnVideoResourceTiming." + error;
        }
        if (message.rnApmContext != null && message.hasOwnProperty("rnApmContext")) {
            let error = $root.RnApmContext.verify(message.rnApmContext);
            if (error)
                return "rnApmContext." + error;
        }
        if (message.rnRouteNotFound != null && message.hasOwnProperty("rnRouteNotFound")) {
            let error = $root.RnRouteNotFound.verify(message.rnRouteNotFound);
            if (error)
                return "rnRouteNotFound." + error;
        }
        return null;
    };

    /**
     * Creates a RnApmTracker message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnApmTracker
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnApmTracker} RnApmTracker
     */
    RnApmTracker.fromObject = function fromObject(object) {
        if (object instanceof $root.RnApmTracker)
            return object;
        let message = new $root.RnApmTracker();
        if (object.rnScriptExecutionTiming != null) {
            if (typeof object.rnScriptExecutionTiming !== "object")
                throw TypeError(".RnApmTracker.rnScriptExecutionTiming: object expected");
            message.rnScriptExecutionTiming = $root.RnPerformanceMeasure.fromObject(object.rnScriptExecutionTiming);
        }
        if (object.rnPageFirstAppearTiming != null) {
            if (typeof object.rnPageFirstAppearTiming !== "object")
                throw TypeError(".RnApmTracker.rnPageFirstAppearTiming: object expected");
            message.rnPageFirstAppearTiming = $root.RnPerformanceMeasure.fromObject(object.rnPageFirstAppearTiming);
        }
        if (object.rnHttpRequestTiming != null) {
            if (typeof object.rnHttpRequestTiming !== "object")
                throw TypeError(".RnApmTracker.rnHttpRequestTiming: object expected");
            message.rnHttpRequestTiming = $root.RnHttpRequestTiming.fromObject(object.rnHttpRequestTiming);
        }
        if (object.rnPerformanceMeasure != null) {
            if (typeof object.rnPerformanceMeasure !== "object")
                throw TypeError(".RnApmTracker.rnPerformanceMeasure: object expected");
            message.rnPerformanceMeasure = $root.RnPerformanceMeasure.fromObject(object.rnPerformanceMeasure);
        }
        if (object.rnResourceTiming) {
            if (!Array.isArray(object.rnResourceTiming))
                throw TypeError(".RnApmTracker.rnResourceTiming: array expected");
            message.rnResourceTiming = [];
            for (let i = 0; i < object.rnResourceTiming.length; ++i) {
                if (typeof object.rnResourceTiming[i] !== "object")
                    throw TypeError(".RnApmTracker.rnResourceTiming: object expected");
                message.rnResourceTiming[i] = $root.RnResourceTiming.fromObject(object.rnResourceTiming[i]);
            }
        }
        if (object.rnVideoResourceTiming != null) {
            if (typeof object.rnVideoResourceTiming !== "object")
                throw TypeError(".RnApmTracker.rnVideoResourceTiming: object expected");
            message.rnVideoResourceTiming = $root.RnVideoResourceTiming.fromObject(object.rnVideoResourceTiming);
        }
        if (object.rnApmContext != null) {
            if (typeof object.rnApmContext !== "object")
                throw TypeError(".RnApmTracker.rnApmContext: object expected");
            message.rnApmContext = $root.RnApmContext.fromObject(object.rnApmContext);
        }
        if (object.rnRouteNotFound != null) {
            if (typeof object.rnRouteNotFound !== "object")
                throw TypeError(".RnApmTracker.rnRouteNotFound: object expected");
            message.rnRouteNotFound = $root.RnRouteNotFound.fromObject(object.rnRouteNotFound);
        }
        return message;
    };

    /**
     * Creates a plain object from a RnApmTracker message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnApmTracker
     * @static
     * @param {RnApmTracker} message RnApmTracker
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnApmTracker.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.rnResourceTiming = [];
        if (options.defaults) {
            object.rnScriptExecutionTiming = null;
            object.rnPageFirstAppearTiming = null;
            object.rnHttpRequestTiming = null;
            object.rnPerformanceMeasure = null;
            object.rnVideoResourceTiming = null;
            object.rnApmContext = null;
            object.rnRouteNotFound = null;
        }
        if (message.rnScriptExecutionTiming != null && message.hasOwnProperty("rnScriptExecutionTiming"))
            object.rnScriptExecutionTiming = $root.RnPerformanceMeasure.toObject(message.rnScriptExecutionTiming, options);
        if (message.rnPageFirstAppearTiming != null && message.hasOwnProperty("rnPageFirstAppearTiming"))
            object.rnPageFirstAppearTiming = $root.RnPerformanceMeasure.toObject(message.rnPageFirstAppearTiming, options);
        if (message.rnHttpRequestTiming != null && message.hasOwnProperty("rnHttpRequestTiming"))
            object.rnHttpRequestTiming = $root.RnHttpRequestTiming.toObject(message.rnHttpRequestTiming, options);
        if (message.rnPerformanceMeasure != null && message.hasOwnProperty("rnPerformanceMeasure"))
            object.rnPerformanceMeasure = $root.RnPerformanceMeasure.toObject(message.rnPerformanceMeasure, options);
        if (message.rnResourceTiming && message.rnResourceTiming.length) {
            object.rnResourceTiming = [];
            for (let j = 0; j < message.rnResourceTiming.length; ++j)
                object.rnResourceTiming[j] = $root.RnResourceTiming.toObject(message.rnResourceTiming[j], options);
        }
        if (message.rnVideoResourceTiming != null && message.hasOwnProperty("rnVideoResourceTiming"))
            object.rnVideoResourceTiming = $root.RnVideoResourceTiming.toObject(message.rnVideoResourceTiming, options);
        if (message.rnApmContext != null && message.hasOwnProperty("rnApmContext"))
            object.rnApmContext = $root.RnApmContext.toObject(message.rnApmContext, options);
        if (message.rnRouteNotFound != null && message.hasOwnProperty("rnRouteNotFound"))
            object.rnRouteNotFound = $root.RnRouteNotFound.toObject(message.rnRouteNotFound, options);
        return object;
    };

    /**
     * Converts this RnApmTracker to JSON.
     * @function toJSON
     * @memberof RnApmTracker
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnApmTracker.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnApmTracker
     * @function getTypeUrl
     * @memberof RnApmTracker
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnApmTracker.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnApmTracker";
    };

    return RnApmTracker;
})();

export const RnApmContext = $root.RnApmContext = (() => {

    /**
     * Properties of a RnApmContext.
     * @exports IRnApmContext
     * @interface IRnApmContext
     * @property {string|null} [fakeAppVersion] RnApmContext fakeAppVersion
     * @property {boolean|null} [isInstanceReuse] RnApmContext isInstanceReuse
     * @property {boolean|null} [isInstancePreload] RnApmContext isInstancePreload
     */

    /**
     * Constructs a new RnApmContext.
     * @exports RnApmContext
     * @classdesc Represents a RnApmContext.
     * @implements IRnApmContext
     * @constructor
     * @param {IRnApmContext=} [properties] Properties to set
     */
    function RnApmContext(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnApmContext fakeAppVersion.
     * @member {string} fakeAppVersion
     * @memberof RnApmContext
     * @instance
     */
    RnApmContext.prototype.fakeAppVersion = "";

    /**
     * RnApmContext isInstanceReuse.
     * @member {boolean} isInstanceReuse
     * @memberof RnApmContext
     * @instance
     */
    RnApmContext.prototype.isInstanceReuse = false;

    /**
     * RnApmContext isInstancePreload.
     * @member {boolean} isInstancePreload
     * @memberof RnApmContext
     * @instance
     */
    RnApmContext.prototype.isInstancePreload = false;

    /**
     * Creates a new RnApmContext instance using the specified properties.
     * @function create
     * @memberof RnApmContext
     * @static
     * @param {IRnApmContext=} [properties] Properties to set
     * @returns {RnApmContext} RnApmContext instance
     */
    RnApmContext.create = function create(properties) {
        return new RnApmContext(properties);
    };

    /**
     * Encodes the specified RnApmContext message. Does not implicitly {@link RnApmContext.verify|verify} messages.
     * @function encode
     * @memberof RnApmContext
     * @static
     * @param {IRnApmContext} message RnApmContext message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnApmContext.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.fakeAppVersion != null && Object.hasOwnProperty.call(message, "fakeAppVersion"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.fakeAppVersion);
        if (message.isInstanceReuse != null && Object.hasOwnProperty.call(message, "isInstanceReuse"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isInstanceReuse);
        if (message.isInstancePreload != null && Object.hasOwnProperty.call(message, "isInstancePreload"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isInstancePreload);
        return writer;
    };

    /**
     * Encodes the specified RnApmContext message, length delimited. Does not implicitly {@link RnApmContext.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnApmContext
     * @static
     * @param {IRnApmContext} message RnApmContext message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnApmContext.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnApmContext message from the specified reader or buffer.
     * @function decode
     * @memberof RnApmContext
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnApmContext} RnApmContext
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnApmContext.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnApmContext();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.fakeAppVersion = reader.string();
                    break;
                }
            case 2: {
                    message.isInstanceReuse = reader.bool();
                    break;
                }
            case 3: {
                    message.isInstancePreload = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnApmContext message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnApmContext
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnApmContext} RnApmContext
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnApmContext.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnApmContext message.
     * @function verify
     * @memberof RnApmContext
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnApmContext.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.fakeAppVersion != null && message.hasOwnProperty("fakeAppVersion"))
            if (!$util.isString(message.fakeAppVersion))
                return "fakeAppVersion: string expected";
        if (message.isInstanceReuse != null && message.hasOwnProperty("isInstanceReuse"))
            if (typeof message.isInstanceReuse !== "boolean")
                return "isInstanceReuse: boolean expected";
        if (message.isInstancePreload != null && message.hasOwnProperty("isInstancePreload"))
            if (typeof message.isInstancePreload !== "boolean")
                return "isInstancePreload: boolean expected";
        return null;
    };

    /**
     * Creates a RnApmContext message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnApmContext
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnApmContext} RnApmContext
     */
    RnApmContext.fromObject = function fromObject(object) {
        if (object instanceof $root.RnApmContext)
            return object;
        let message = new $root.RnApmContext();
        if (object.fakeAppVersion != null)
            message.fakeAppVersion = String(object.fakeAppVersion);
        if (object.isInstanceReuse != null)
            message.isInstanceReuse = Boolean(object.isInstanceReuse);
        if (object.isInstancePreload != null)
            message.isInstancePreload = Boolean(object.isInstancePreload);
        return message;
    };

    /**
     * Creates a plain object from a RnApmContext message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnApmContext
     * @static
     * @param {RnApmContext} message RnApmContext
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnApmContext.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.fakeAppVersion = "";
            object.isInstanceReuse = false;
            object.isInstancePreload = false;
        }
        if (message.fakeAppVersion != null && message.hasOwnProperty("fakeAppVersion"))
            object.fakeAppVersion = message.fakeAppVersion;
        if (message.isInstanceReuse != null && message.hasOwnProperty("isInstanceReuse"))
            object.isInstanceReuse = message.isInstanceReuse;
        if (message.isInstancePreload != null && message.hasOwnProperty("isInstancePreload"))
            object.isInstancePreload = message.isInstancePreload;
        return object;
    };

    /**
     * Converts this RnApmContext to JSON.
     * @function toJSON
     * @memberof RnApmContext
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnApmContext.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnApmContext
     * @function getTypeUrl
     * @memberof RnApmContext
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnApmContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnApmContext";
    };

    return RnApmContext;
})();

export const RnHttpRequestTiming = $root.RnHttpRequestTiming = (() => {

    /**
     * Properties of a RnHttpRequestTiming.
     * @exports IRnHttpRequestTiming
     * @interface IRnHttpRequestTiming
     * @property {IRnPerformanceMeasure|null} [rnPerformanceMeasure] RnHttpRequestTiming rnPerformanceMeasure
     * @property {string|null} [method] RnHttpRequestTiming method
     * @property {string|null} [matchedPath] RnHttpRequestTiming matchedPath
     * @property {number|null} [status] RnHttpRequestTiming status
     * @property {number|null} [errorCode] RnHttpRequestTiming errorCode
     * @property {string|null} [clientErrorMessage] RnHttpRequestTiming clientErrorMessage
     * @property {string|null} [errorType] RnHttpRequestTiming errorType
     * @property {string|null} [code] RnHttpRequestTiming code
     * @property {string|null} [traceId] RnHttpRequestTiming traceId
     * @property {number|null} [duration] RnHttpRequestTiming duration
     * @property {string|null} [url] RnHttpRequestTiming url
     * @property {string|null} [data] RnHttpRequestTiming data
     * @property {string|null} [level] RnHttpRequestTiming level
     * @property {string|null} [errorMsg] RnHttpRequestTiming errorMsg
     * @property {IRnNetworkErrorInfo|null} [networkErrorInfo] RnHttpRequestTiming networkErrorInfo
     */

    /**
     * Constructs a new RnHttpRequestTiming.
     * @exports RnHttpRequestTiming
     * @classdesc Represents a RnHttpRequestTiming.
     * @implements IRnHttpRequestTiming
     * @constructor
     * @param {IRnHttpRequestTiming=} [properties] Properties to set
     */
    function RnHttpRequestTiming(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnHttpRequestTiming rnPerformanceMeasure.
     * @member {IRnPerformanceMeasure|null|undefined} rnPerformanceMeasure
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.rnPerformanceMeasure = null;

    /**
     * RnHttpRequestTiming method.
     * @member {string} method
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.method = "";

    /**
     * RnHttpRequestTiming matchedPath.
     * @member {string} matchedPath
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.matchedPath = "";

    /**
     * RnHttpRequestTiming status.
     * @member {number} status
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.status = 0;

    /**
     * RnHttpRequestTiming errorCode.
     * @member {number} errorCode
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.errorCode = 0;

    /**
     * RnHttpRequestTiming clientErrorMessage.
     * @member {string} clientErrorMessage
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.clientErrorMessage = "";

    /**
     * RnHttpRequestTiming errorType.
     * @member {string} errorType
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.errorType = "";

    /**
     * RnHttpRequestTiming code.
     * @member {string} code
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.code = "";

    /**
     * RnHttpRequestTiming traceId.
     * @member {string} traceId
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.traceId = "";

    /**
     * RnHttpRequestTiming duration.
     * @member {number} duration
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.duration = 0;

    /**
     * RnHttpRequestTiming url.
     * @member {string} url
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.url = "";

    /**
     * RnHttpRequestTiming data.
     * @member {string} data
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.data = "";

    /**
     * RnHttpRequestTiming level.
     * @member {string} level
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.level = "";

    /**
     * RnHttpRequestTiming errorMsg.
     * @member {string} errorMsg
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.errorMsg = "";

    /**
     * RnHttpRequestTiming networkErrorInfo.
     * @member {IRnNetworkErrorInfo|null|undefined} networkErrorInfo
     * @memberof RnHttpRequestTiming
     * @instance
     */
    RnHttpRequestTiming.prototype.networkErrorInfo = null;

    /**
     * Creates a new RnHttpRequestTiming instance using the specified properties.
     * @function create
     * @memberof RnHttpRequestTiming
     * @static
     * @param {IRnHttpRequestTiming=} [properties] Properties to set
     * @returns {RnHttpRequestTiming} RnHttpRequestTiming instance
     */
    RnHttpRequestTiming.create = function create(properties) {
        return new RnHttpRequestTiming(properties);
    };

    /**
     * Encodes the specified RnHttpRequestTiming message. Does not implicitly {@link RnHttpRequestTiming.verify|verify} messages.
     * @function encode
     * @memberof RnHttpRequestTiming
     * @static
     * @param {IRnHttpRequestTiming} message RnHttpRequestTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnHttpRequestTiming.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.rnPerformanceMeasure != null && Object.hasOwnProperty.call(message, "rnPerformanceMeasure"))
            $root.RnPerformanceMeasure.encode(message.rnPerformanceMeasure, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.method != null && Object.hasOwnProperty.call(message, "method"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.method);
        if (message.matchedPath != null && Object.hasOwnProperty.call(message, "matchedPath"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.matchedPath);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
        if (message.errorCode != null && Object.hasOwnProperty.call(message, "errorCode"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.errorCode);
        if (message.clientErrorMessage != null && Object.hasOwnProperty.call(message, "clientErrorMessage"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.clientErrorMessage);
        if (message.errorType != null && Object.hasOwnProperty.call(message, "errorType"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.errorType);
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.code);
        if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.traceId);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.duration);
        if (message.url != null && Object.hasOwnProperty.call(message, "url"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.url);
        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
            writer.uint32(/* id 12, wireType 2 =*/98).string(message.data);
        if (message.level != null && Object.hasOwnProperty.call(message, "level"))
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.level);
        if (message.errorMsg != null && Object.hasOwnProperty.call(message, "errorMsg"))
            writer.uint32(/* id 14, wireType 2 =*/114).string(message.errorMsg);
        if (message.networkErrorInfo != null && Object.hasOwnProperty.call(message, "networkErrorInfo"))
            $root.RnNetworkErrorInfo.encode(message.networkErrorInfo, writer.uint32(/* id 100, wireType 2 =*/802).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RnHttpRequestTiming message, length delimited. Does not implicitly {@link RnHttpRequestTiming.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnHttpRequestTiming
     * @static
     * @param {IRnHttpRequestTiming} message RnHttpRequestTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnHttpRequestTiming.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnHttpRequestTiming message from the specified reader or buffer.
     * @function decode
     * @memberof RnHttpRequestTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnHttpRequestTiming} RnHttpRequestTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnHttpRequestTiming.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnHttpRequestTiming();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.rnPerformanceMeasure = $root.RnPerformanceMeasure.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.method = reader.string();
                    break;
                }
            case 3: {
                    message.matchedPath = reader.string();
                    break;
                }
            case 4: {
                    message.status = reader.int32();
                    break;
                }
            case 5: {
                    message.errorCode = reader.int32();
                    break;
                }
            case 6: {
                    message.clientErrorMessage = reader.string();
                    break;
                }
            case 7: {
                    message.errorType = reader.string();
                    break;
                }
            case 8: {
                    message.code = reader.string();
                    break;
                }
            case 9: {
                    message.traceId = reader.string();
                    break;
                }
            case 10: {
                    message.duration = reader.double();
                    break;
                }
            case 11: {
                    message.url = reader.string();
                    break;
                }
            case 12: {
                    message.data = reader.string();
                    break;
                }
            case 13: {
                    message.level = reader.string();
                    break;
                }
            case 14: {
                    message.errorMsg = reader.string();
                    break;
                }
            case 100: {
                    message.networkErrorInfo = $root.RnNetworkErrorInfo.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnHttpRequestTiming message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnHttpRequestTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnHttpRequestTiming} RnHttpRequestTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnHttpRequestTiming.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnHttpRequestTiming message.
     * @function verify
     * @memberof RnHttpRequestTiming
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnHttpRequestTiming.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.rnPerformanceMeasure != null && message.hasOwnProperty("rnPerformanceMeasure")) {
            let error = $root.RnPerformanceMeasure.verify(message.rnPerformanceMeasure);
            if (error)
                return "rnPerformanceMeasure." + error;
        }
        if (message.method != null && message.hasOwnProperty("method"))
            if (!$util.isString(message.method))
                return "method: string expected";
        if (message.matchedPath != null && message.hasOwnProperty("matchedPath"))
            if (!$util.isString(message.matchedPath))
                return "matchedPath: string expected";
        if (message.status != null && message.hasOwnProperty("status"))
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        if (message.errorCode != null && message.hasOwnProperty("errorCode"))
            if (!$util.isInteger(message.errorCode))
                return "errorCode: integer expected";
        if (message.clientErrorMessage != null && message.hasOwnProperty("clientErrorMessage"))
            if (!$util.isString(message.clientErrorMessage))
                return "clientErrorMessage: string expected";
        if (message.errorType != null && message.hasOwnProperty("errorType"))
            if (!$util.isString(message.errorType))
                return "errorType: string expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isString(message.code))
                return "code: string expected";
        if (message.traceId != null && message.hasOwnProperty("traceId"))
            if (!$util.isString(message.traceId))
                return "traceId: string expected";
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (typeof message.duration !== "number")
                return "duration: number expected";
        if (message.url != null && message.hasOwnProperty("url"))
            if (!$util.isString(message.url))
                return "url: string expected";
        if (message.data != null && message.hasOwnProperty("data"))
            if (!$util.isString(message.data))
                return "data: string expected";
        if (message.level != null && message.hasOwnProperty("level"))
            if (!$util.isString(message.level))
                return "level: string expected";
        if (message.errorMsg != null && message.hasOwnProperty("errorMsg"))
            if (!$util.isString(message.errorMsg))
                return "errorMsg: string expected";
        if (message.networkErrorInfo != null && message.hasOwnProperty("networkErrorInfo")) {
            let error = $root.RnNetworkErrorInfo.verify(message.networkErrorInfo);
            if (error)
                return "networkErrorInfo." + error;
        }
        return null;
    };

    /**
     * Creates a RnHttpRequestTiming message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnHttpRequestTiming
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnHttpRequestTiming} RnHttpRequestTiming
     */
    RnHttpRequestTiming.fromObject = function fromObject(object) {
        if (object instanceof $root.RnHttpRequestTiming)
            return object;
        let message = new $root.RnHttpRequestTiming();
        if (object.rnPerformanceMeasure != null) {
            if (typeof object.rnPerformanceMeasure !== "object")
                throw TypeError(".RnHttpRequestTiming.rnPerformanceMeasure: object expected");
            message.rnPerformanceMeasure = $root.RnPerformanceMeasure.fromObject(object.rnPerformanceMeasure);
        }
        if (object.method != null)
            message.method = String(object.method);
        if (object.matchedPath != null)
            message.matchedPath = String(object.matchedPath);
        if (object.status != null)
            message.status = object.status | 0;
        if (object.errorCode != null)
            message.errorCode = object.errorCode | 0;
        if (object.clientErrorMessage != null)
            message.clientErrorMessage = String(object.clientErrorMessage);
        if (object.errorType != null)
            message.errorType = String(object.errorType);
        if (object.code != null)
            message.code = String(object.code);
        if (object.traceId != null)
            message.traceId = String(object.traceId);
        if (object.duration != null)
            message.duration = Number(object.duration);
        if (object.url != null)
            message.url = String(object.url);
        if (object.data != null)
            message.data = String(object.data);
        if (object.level != null)
            message.level = String(object.level);
        if (object.errorMsg != null)
            message.errorMsg = String(object.errorMsg);
        if (object.networkErrorInfo != null) {
            if (typeof object.networkErrorInfo !== "object")
                throw TypeError(".RnHttpRequestTiming.networkErrorInfo: object expected");
            message.networkErrorInfo = $root.RnNetworkErrorInfo.fromObject(object.networkErrorInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a RnHttpRequestTiming message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnHttpRequestTiming
     * @static
     * @param {RnHttpRequestTiming} message RnHttpRequestTiming
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnHttpRequestTiming.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.rnPerformanceMeasure = null;
            object.method = "";
            object.matchedPath = "";
            object.status = 0;
            object.errorCode = 0;
            object.clientErrorMessage = "";
            object.errorType = "";
            object.code = "";
            object.traceId = "";
            object.duration = 0;
            object.url = "";
            object.data = "";
            object.level = "";
            object.errorMsg = "";
            object.networkErrorInfo = null;
        }
        if (message.rnPerformanceMeasure != null && message.hasOwnProperty("rnPerformanceMeasure"))
            object.rnPerformanceMeasure = $root.RnPerformanceMeasure.toObject(message.rnPerformanceMeasure, options);
        if (message.method != null && message.hasOwnProperty("method"))
            object.method = message.method;
        if (message.matchedPath != null && message.hasOwnProperty("matchedPath"))
            object.matchedPath = message.matchedPath;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = message.status;
        if (message.errorCode != null && message.hasOwnProperty("errorCode"))
            object.errorCode = message.errorCode;
        if (message.clientErrorMessage != null && message.hasOwnProperty("clientErrorMessage"))
            object.clientErrorMessage = message.clientErrorMessage;
        if (message.errorType != null && message.hasOwnProperty("errorType"))
            object.errorType = message.errorType;
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        if (message.traceId != null && message.hasOwnProperty("traceId"))
            object.traceId = message.traceId;
        if (message.duration != null && message.hasOwnProperty("duration"))
            object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
        if (message.url != null && message.hasOwnProperty("url"))
            object.url = message.url;
        if (message.data != null && message.hasOwnProperty("data"))
            object.data = message.data;
        if (message.level != null && message.hasOwnProperty("level"))
            object.level = message.level;
        if (message.errorMsg != null && message.hasOwnProperty("errorMsg"))
            object.errorMsg = message.errorMsg;
        if (message.networkErrorInfo != null && message.hasOwnProperty("networkErrorInfo"))
            object.networkErrorInfo = $root.RnNetworkErrorInfo.toObject(message.networkErrorInfo, options);
        return object;
    };

    /**
     * Converts this RnHttpRequestTiming to JSON.
     * @function toJSON
     * @memberof RnHttpRequestTiming
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnHttpRequestTiming.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnHttpRequestTiming
     * @function getTypeUrl
     * @memberof RnHttpRequestTiming
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnHttpRequestTiming.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnHttpRequestTiming";
    };

    return RnHttpRequestTiming;
})();

export const RnResourceTiming = $root.RnResourceTiming = (() => {

    /**
     * Properties of a RnResourceTiming.
     * @exports IRnResourceTiming
     * @interface IRnResourceTiming
     * @property {string|null} [name] RnResourceTiming name
     * @property {string|null} [entryType] RnResourceTiming entryType
     * @property {number|null} [startTime] RnResourceTiming startTime
     * @property {number|null} [duration] RnResourceTiming duration
     * @property {string|null} [initiatorType] RnResourceTiming initiatorType
     * @property {string|null} [nextHopProtocol] RnResourceTiming nextHopProtocol
     * @property {number|null} [workerStart] RnResourceTiming workerStart
     * @property {number|null} [redirectStart] RnResourceTiming redirectStart
     * @property {number|null} [redirectEnd] RnResourceTiming redirectEnd
     * @property {number|null} [fetchStart] RnResourceTiming fetchStart
     * @property {number|null} [domainLookupStart] RnResourceTiming domainLookupStart
     * @property {number|null} [domainLookupEnd] RnResourceTiming domainLookupEnd
     * @property {number|null} [connectStart] RnResourceTiming connectStart
     * @property {number|null} [connectEnd] RnResourceTiming connectEnd
     * @property {number|null} [secureConnectionStart] RnResourceTiming secureConnectionStart
     * @property {number|null} [requestStart] RnResourceTiming requestStart
     * @property {number|null} [responseStart] RnResourceTiming responseStart
     * @property {number|null} [responseEnd] RnResourceTiming responseEnd
     * @property {number|Long|null} [transferSize] RnResourceTiming transferSize
     * @property {number|Long|null} [encodedBodySize] RnResourceTiming encodedBodySize
     * @property {number|Long|null} [decodedBodySize] RnResourceTiming decodedBodySize
     * @property {IRnLocation|null} [location] RnResourceTiming location
     * @property {Array.<IRnResourceMeta>|null} [resourceMeta] RnResourceTiming resourceMeta
     * @property {IRnNetworkErrorInfo|null} [networkErrorInfo] RnResourceTiming networkErrorInfo
     */

    /**
     * Constructs a new RnResourceTiming.
     * @exports RnResourceTiming
     * @classdesc Represents a RnResourceTiming.
     * @implements IRnResourceTiming
     * @constructor
     * @param {IRnResourceTiming=} [properties] Properties to set
     */
    function RnResourceTiming(properties) {
        this.resourceMeta = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnResourceTiming name.
     * @member {string} name
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.name = "";

    /**
     * RnResourceTiming entryType.
     * @member {string} entryType
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.entryType = "";

    /**
     * RnResourceTiming startTime.
     * @member {number} startTime
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.startTime = 0;

    /**
     * RnResourceTiming duration.
     * @member {number} duration
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.duration = 0;

    /**
     * RnResourceTiming initiatorType.
     * @member {string} initiatorType
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.initiatorType = "";

    /**
     * RnResourceTiming nextHopProtocol.
     * @member {string} nextHopProtocol
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.nextHopProtocol = "";

    /**
     * RnResourceTiming workerStart.
     * @member {number} workerStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.workerStart = 0;

    /**
     * RnResourceTiming redirectStart.
     * @member {number} redirectStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.redirectStart = 0;

    /**
     * RnResourceTiming redirectEnd.
     * @member {number} redirectEnd
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.redirectEnd = 0;

    /**
     * RnResourceTiming fetchStart.
     * @member {number} fetchStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.fetchStart = 0;

    /**
     * RnResourceTiming domainLookupStart.
     * @member {number} domainLookupStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.domainLookupStart = 0;

    /**
     * RnResourceTiming domainLookupEnd.
     * @member {number} domainLookupEnd
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.domainLookupEnd = 0;

    /**
     * RnResourceTiming connectStart.
     * @member {number} connectStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.connectStart = 0;

    /**
     * RnResourceTiming connectEnd.
     * @member {number} connectEnd
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.connectEnd = 0;

    /**
     * RnResourceTiming secureConnectionStart.
     * @member {number} secureConnectionStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.secureConnectionStart = 0;

    /**
     * RnResourceTiming requestStart.
     * @member {number} requestStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.requestStart = 0;

    /**
     * RnResourceTiming responseStart.
     * @member {number} responseStart
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.responseStart = 0;

    /**
     * RnResourceTiming responseEnd.
     * @member {number} responseEnd
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.responseEnd = 0;

    /**
     * RnResourceTiming transferSize.
     * @member {number|Long} transferSize
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.transferSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * RnResourceTiming encodedBodySize.
     * @member {number|Long} encodedBodySize
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.encodedBodySize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * RnResourceTiming decodedBodySize.
     * @member {number|Long} decodedBodySize
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.decodedBodySize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * RnResourceTiming location.
     * @member {IRnLocation|null|undefined} location
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.location = null;

    /**
     * RnResourceTiming resourceMeta.
     * @member {Array.<IRnResourceMeta>} resourceMeta
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.resourceMeta = $util.emptyArray;

    /**
     * RnResourceTiming networkErrorInfo.
     * @member {IRnNetworkErrorInfo|null|undefined} networkErrorInfo
     * @memberof RnResourceTiming
     * @instance
     */
    RnResourceTiming.prototype.networkErrorInfo = null;

    /**
     * Creates a new RnResourceTiming instance using the specified properties.
     * @function create
     * @memberof RnResourceTiming
     * @static
     * @param {IRnResourceTiming=} [properties] Properties to set
     * @returns {RnResourceTiming} RnResourceTiming instance
     */
    RnResourceTiming.create = function create(properties) {
        return new RnResourceTiming(properties);
    };

    /**
     * Encodes the specified RnResourceTiming message. Does not implicitly {@link RnResourceTiming.verify|verify} messages.
     * @function encode
     * @memberof RnResourceTiming
     * @static
     * @param {IRnResourceTiming} message RnResourceTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnResourceTiming.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.entryType != null && Object.hasOwnProperty.call(message, "entryType"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.entryType);
        if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.startTime);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.duration);
        if (message.initiatorType != null && Object.hasOwnProperty.call(message, "initiatorType"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.initiatorType);
        if (message.nextHopProtocol != null && Object.hasOwnProperty.call(message, "nextHopProtocol"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.nextHopProtocol);
        if (message.workerStart != null && Object.hasOwnProperty.call(message, "workerStart"))
            writer.uint32(/* id 7, wireType 1 =*/57).double(message.workerStart);
        if (message.redirectStart != null && Object.hasOwnProperty.call(message, "redirectStart"))
            writer.uint32(/* id 8, wireType 1 =*/65).double(message.redirectStart);
        if (message.redirectEnd != null && Object.hasOwnProperty.call(message, "redirectEnd"))
            writer.uint32(/* id 9, wireType 1 =*/73).double(message.redirectEnd);
        if (message.fetchStart != null && Object.hasOwnProperty.call(message, "fetchStart"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.fetchStart);
        if (message.domainLookupStart != null && Object.hasOwnProperty.call(message, "domainLookupStart"))
            writer.uint32(/* id 11, wireType 1 =*/89).double(message.domainLookupStart);
        if (message.domainLookupEnd != null && Object.hasOwnProperty.call(message, "domainLookupEnd"))
            writer.uint32(/* id 12, wireType 1 =*/97).double(message.domainLookupEnd);
        if (message.connectStart != null && Object.hasOwnProperty.call(message, "connectStart"))
            writer.uint32(/* id 13, wireType 1 =*/105).double(message.connectStart);
        if (message.connectEnd != null && Object.hasOwnProperty.call(message, "connectEnd"))
            writer.uint32(/* id 14, wireType 1 =*/113).double(message.connectEnd);
        if (message.secureConnectionStart != null && Object.hasOwnProperty.call(message, "secureConnectionStart"))
            writer.uint32(/* id 15, wireType 1 =*/121).double(message.secureConnectionStart);
        if (message.requestStart != null && Object.hasOwnProperty.call(message, "requestStart"))
            writer.uint32(/* id 16, wireType 1 =*/129).double(message.requestStart);
        if (message.responseStart != null && Object.hasOwnProperty.call(message, "responseStart"))
            writer.uint32(/* id 17, wireType 1 =*/137).double(message.responseStart);
        if (message.responseEnd != null && Object.hasOwnProperty.call(message, "responseEnd"))
            writer.uint32(/* id 18, wireType 1 =*/145).double(message.responseEnd);
        if (message.transferSize != null && Object.hasOwnProperty.call(message, "transferSize"))
            writer.uint32(/* id 19, wireType 0 =*/152).int64(message.transferSize);
        if (message.encodedBodySize != null && Object.hasOwnProperty.call(message, "encodedBodySize"))
            writer.uint32(/* id 20, wireType 0 =*/160).int64(message.encodedBodySize);
        if (message.decodedBodySize != null && Object.hasOwnProperty.call(message, "decodedBodySize"))
            writer.uint32(/* id 21, wireType 0 =*/168).int64(message.decodedBodySize);
        if (message.location != null && Object.hasOwnProperty.call(message, "location"))
            $root.RnLocation.encode(message.location, writer.uint32(/* id 100, wireType 2 =*/802).fork()).ldelim();
        if (message.resourceMeta != null && message.resourceMeta.length)
            for (let i = 0; i < message.resourceMeta.length; ++i)
                $root.RnResourceMeta.encode(message.resourceMeta[i], writer.uint32(/* id 101, wireType 2 =*/810).fork()).ldelim();
        if (message.networkErrorInfo != null && Object.hasOwnProperty.call(message, "networkErrorInfo"))
            $root.RnNetworkErrorInfo.encode(message.networkErrorInfo, writer.uint32(/* id 102, wireType 2 =*/818).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RnResourceTiming message, length delimited. Does not implicitly {@link RnResourceTiming.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnResourceTiming
     * @static
     * @param {IRnResourceTiming} message RnResourceTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnResourceTiming.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnResourceTiming message from the specified reader or buffer.
     * @function decode
     * @memberof RnResourceTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnResourceTiming} RnResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnResourceTiming.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnResourceTiming();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.name = reader.string();
                    break;
                }
            case 2: {
                    message.entryType = reader.string();
                    break;
                }
            case 3: {
                    message.startTime = reader.double();
                    break;
                }
            case 4: {
                    message.duration = reader.double();
                    break;
                }
            case 5: {
                    message.initiatorType = reader.string();
                    break;
                }
            case 6: {
                    message.nextHopProtocol = reader.string();
                    break;
                }
            case 7: {
                    message.workerStart = reader.double();
                    break;
                }
            case 8: {
                    message.redirectStart = reader.double();
                    break;
                }
            case 9: {
                    message.redirectEnd = reader.double();
                    break;
                }
            case 10: {
                    message.fetchStart = reader.double();
                    break;
                }
            case 11: {
                    message.domainLookupStart = reader.double();
                    break;
                }
            case 12: {
                    message.domainLookupEnd = reader.double();
                    break;
                }
            case 13: {
                    message.connectStart = reader.double();
                    break;
                }
            case 14: {
                    message.connectEnd = reader.double();
                    break;
                }
            case 15: {
                    message.secureConnectionStart = reader.double();
                    break;
                }
            case 16: {
                    message.requestStart = reader.double();
                    break;
                }
            case 17: {
                    message.responseStart = reader.double();
                    break;
                }
            case 18: {
                    message.responseEnd = reader.double();
                    break;
                }
            case 19: {
                    message.transferSize = reader.int64();
                    break;
                }
            case 20: {
                    message.encodedBodySize = reader.int64();
                    break;
                }
            case 21: {
                    message.decodedBodySize = reader.int64();
                    break;
                }
            case 100: {
                    message.location = $root.RnLocation.decode(reader, reader.uint32());
                    break;
                }
            case 101: {
                    if (!(message.resourceMeta && message.resourceMeta.length))
                        message.resourceMeta = [];
                    message.resourceMeta.push($root.RnResourceMeta.decode(reader, reader.uint32()));
                    break;
                }
            case 102: {
                    message.networkErrorInfo = $root.RnNetworkErrorInfo.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnResourceTiming message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnResourceTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnResourceTiming} RnResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnResourceTiming.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnResourceTiming message.
     * @function verify
     * @memberof RnResourceTiming
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnResourceTiming.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.entryType != null && message.hasOwnProperty("entryType"))
            if (!$util.isString(message.entryType))
                return "entryType: string expected";
        if (message.startTime != null && message.hasOwnProperty("startTime"))
            if (typeof message.startTime !== "number")
                return "startTime: number expected";
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (typeof message.duration !== "number")
                return "duration: number expected";
        if (message.initiatorType != null && message.hasOwnProperty("initiatorType"))
            if (!$util.isString(message.initiatorType))
                return "initiatorType: string expected";
        if (message.nextHopProtocol != null && message.hasOwnProperty("nextHopProtocol"))
            if (!$util.isString(message.nextHopProtocol))
                return "nextHopProtocol: string expected";
        if (message.workerStart != null && message.hasOwnProperty("workerStart"))
            if (typeof message.workerStart !== "number")
                return "workerStart: number expected";
        if (message.redirectStart != null && message.hasOwnProperty("redirectStart"))
            if (typeof message.redirectStart !== "number")
                return "redirectStart: number expected";
        if (message.redirectEnd != null && message.hasOwnProperty("redirectEnd"))
            if (typeof message.redirectEnd !== "number")
                return "redirectEnd: number expected";
        if (message.fetchStart != null && message.hasOwnProperty("fetchStart"))
            if (typeof message.fetchStart !== "number")
                return "fetchStart: number expected";
        if (message.domainLookupStart != null && message.hasOwnProperty("domainLookupStart"))
            if (typeof message.domainLookupStart !== "number")
                return "domainLookupStart: number expected";
        if (message.domainLookupEnd != null && message.hasOwnProperty("domainLookupEnd"))
            if (typeof message.domainLookupEnd !== "number")
                return "domainLookupEnd: number expected";
        if (message.connectStart != null && message.hasOwnProperty("connectStart"))
            if (typeof message.connectStart !== "number")
                return "connectStart: number expected";
        if (message.connectEnd != null && message.hasOwnProperty("connectEnd"))
            if (typeof message.connectEnd !== "number")
                return "connectEnd: number expected";
        if (message.secureConnectionStart != null && message.hasOwnProperty("secureConnectionStart"))
            if (typeof message.secureConnectionStart !== "number")
                return "secureConnectionStart: number expected";
        if (message.requestStart != null && message.hasOwnProperty("requestStart"))
            if (typeof message.requestStart !== "number")
                return "requestStart: number expected";
        if (message.responseStart != null && message.hasOwnProperty("responseStart"))
            if (typeof message.responseStart !== "number")
                return "responseStart: number expected";
        if (message.responseEnd != null && message.hasOwnProperty("responseEnd"))
            if (typeof message.responseEnd !== "number")
                return "responseEnd: number expected";
        if (message.transferSize != null && message.hasOwnProperty("transferSize"))
            if (!$util.isInteger(message.transferSize) && !(message.transferSize && $util.isInteger(message.transferSize.low) && $util.isInteger(message.transferSize.high)))
                return "transferSize: integer|Long expected";
        if (message.encodedBodySize != null && message.hasOwnProperty("encodedBodySize"))
            if (!$util.isInteger(message.encodedBodySize) && !(message.encodedBodySize && $util.isInteger(message.encodedBodySize.low) && $util.isInteger(message.encodedBodySize.high)))
                return "encodedBodySize: integer|Long expected";
        if (message.decodedBodySize != null && message.hasOwnProperty("decodedBodySize"))
            if (!$util.isInteger(message.decodedBodySize) && !(message.decodedBodySize && $util.isInteger(message.decodedBodySize.low) && $util.isInteger(message.decodedBodySize.high)))
                return "decodedBodySize: integer|Long expected";
        if (message.location != null && message.hasOwnProperty("location")) {
            let error = $root.RnLocation.verify(message.location);
            if (error)
                return "location." + error;
        }
        if (message.resourceMeta != null && message.hasOwnProperty("resourceMeta")) {
            if (!Array.isArray(message.resourceMeta))
                return "resourceMeta: array expected";
            for (let i = 0; i < message.resourceMeta.length; ++i) {
                let error = $root.RnResourceMeta.verify(message.resourceMeta[i]);
                if (error)
                    return "resourceMeta." + error;
            }
        }
        if (message.networkErrorInfo != null && message.hasOwnProperty("networkErrorInfo")) {
            let error = $root.RnNetworkErrorInfo.verify(message.networkErrorInfo);
            if (error)
                return "networkErrorInfo." + error;
        }
        return null;
    };

    /**
     * Creates a RnResourceTiming message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnResourceTiming
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnResourceTiming} RnResourceTiming
     */
    RnResourceTiming.fromObject = function fromObject(object) {
        if (object instanceof $root.RnResourceTiming)
            return object;
        let message = new $root.RnResourceTiming();
        if (object.name != null)
            message.name = String(object.name);
        if (object.entryType != null)
            message.entryType = String(object.entryType);
        if (object.startTime != null)
            message.startTime = Number(object.startTime);
        if (object.duration != null)
            message.duration = Number(object.duration);
        if (object.initiatorType != null)
            message.initiatorType = String(object.initiatorType);
        if (object.nextHopProtocol != null)
            message.nextHopProtocol = String(object.nextHopProtocol);
        if (object.workerStart != null)
            message.workerStart = Number(object.workerStart);
        if (object.redirectStart != null)
            message.redirectStart = Number(object.redirectStart);
        if (object.redirectEnd != null)
            message.redirectEnd = Number(object.redirectEnd);
        if (object.fetchStart != null)
            message.fetchStart = Number(object.fetchStart);
        if (object.domainLookupStart != null)
            message.domainLookupStart = Number(object.domainLookupStart);
        if (object.domainLookupEnd != null)
            message.domainLookupEnd = Number(object.domainLookupEnd);
        if (object.connectStart != null)
            message.connectStart = Number(object.connectStart);
        if (object.connectEnd != null)
            message.connectEnd = Number(object.connectEnd);
        if (object.secureConnectionStart != null)
            message.secureConnectionStart = Number(object.secureConnectionStart);
        if (object.requestStart != null)
            message.requestStart = Number(object.requestStart);
        if (object.responseStart != null)
            message.responseStart = Number(object.responseStart);
        if (object.responseEnd != null)
            message.responseEnd = Number(object.responseEnd);
        if (object.transferSize != null)
            if ($util.Long)
                (message.transferSize = $util.Long.fromValue(object.transferSize)).unsigned = false;
            else if (typeof object.transferSize === "string")
                message.transferSize = parseInt(object.transferSize, 10);
            else if (typeof object.transferSize === "number")
                message.transferSize = object.transferSize;
            else if (typeof object.transferSize === "object")
                message.transferSize = new $util.LongBits(object.transferSize.low >>> 0, object.transferSize.high >>> 0).toNumber();
        if (object.encodedBodySize != null)
            if ($util.Long)
                (message.encodedBodySize = $util.Long.fromValue(object.encodedBodySize)).unsigned = false;
            else if (typeof object.encodedBodySize === "string")
                message.encodedBodySize = parseInt(object.encodedBodySize, 10);
            else if (typeof object.encodedBodySize === "number")
                message.encodedBodySize = object.encodedBodySize;
            else if (typeof object.encodedBodySize === "object")
                message.encodedBodySize = new $util.LongBits(object.encodedBodySize.low >>> 0, object.encodedBodySize.high >>> 0).toNumber();
        if (object.decodedBodySize != null)
            if ($util.Long)
                (message.decodedBodySize = $util.Long.fromValue(object.decodedBodySize)).unsigned = false;
            else if (typeof object.decodedBodySize === "string")
                message.decodedBodySize = parseInt(object.decodedBodySize, 10);
            else if (typeof object.decodedBodySize === "number")
                message.decodedBodySize = object.decodedBodySize;
            else if (typeof object.decodedBodySize === "object")
                message.decodedBodySize = new $util.LongBits(object.decodedBodySize.low >>> 0, object.decodedBodySize.high >>> 0).toNumber();
        if (object.location != null) {
            if (typeof object.location !== "object")
                throw TypeError(".RnResourceTiming.location: object expected");
            message.location = $root.RnLocation.fromObject(object.location);
        }
        if (object.resourceMeta) {
            if (!Array.isArray(object.resourceMeta))
                throw TypeError(".RnResourceTiming.resourceMeta: array expected");
            message.resourceMeta = [];
            for (let i = 0; i < object.resourceMeta.length; ++i) {
                if (typeof object.resourceMeta[i] !== "object")
                    throw TypeError(".RnResourceTiming.resourceMeta: object expected");
                message.resourceMeta[i] = $root.RnResourceMeta.fromObject(object.resourceMeta[i]);
            }
        }
        if (object.networkErrorInfo != null) {
            if (typeof object.networkErrorInfo !== "object")
                throw TypeError(".RnResourceTiming.networkErrorInfo: object expected");
            message.networkErrorInfo = $root.RnNetworkErrorInfo.fromObject(object.networkErrorInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a RnResourceTiming message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnResourceTiming
     * @static
     * @param {RnResourceTiming} message RnResourceTiming
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnResourceTiming.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.resourceMeta = [];
        if (options.defaults) {
            object.name = "";
            object.entryType = "";
            object.startTime = 0;
            object.duration = 0;
            object.initiatorType = "";
            object.nextHopProtocol = "";
            object.workerStart = 0;
            object.redirectStart = 0;
            object.redirectEnd = 0;
            object.fetchStart = 0;
            object.domainLookupStart = 0;
            object.domainLookupEnd = 0;
            object.connectStart = 0;
            object.connectEnd = 0;
            object.secureConnectionStart = 0;
            object.requestStart = 0;
            object.responseStart = 0;
            object.responseEnd = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.transferSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.transferSize = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.encodedBodySize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.encodedBodySize = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.decodedBodySize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.decodedBodySize = options.longs === String ? "0" : 0;
            object.location = null;
            object.networkErrorInfo = null;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.entryType != null && message.hasOwnProperty("entryType"))
            object.entryType = message.entryType;
        if (message.startTime != null && message.hasOwnProperty("startTime"))
            object.startTime = options.json && !isFinite(message.startTime) ? String(message.startTime) : message.startTime;
        if (message.duration != null && message.hasOwnProperty("duration"))
            object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
        if (message.initiatorType != null && message.hasOwnProperty("initiatorType"))
            object.initiatorType = message.initiatorType;
        if (message.nextHopProtocol != null && message.hasOwnProperty("nextHopProtocol"))
            object.nextHopProtocol = message.nextHopProtocol;
        if (message.workerStart != null && message.hasOwnProperty("workerStart"))
            object.workerStart = options.json && !isFinite(message.workerStart) ? String(message.workerStart) : message.workerStart;
        if (message.redirectStart != null && message.hasOwnProperty("redirectStart"))
            object.redirectStart = options.json && !isFinite(message.redirectStart) ? String(message.redirectStart) : message.redirectStart;
        if (message.redirectEnd != null && message.hasOwnProperty("redirectEnd"))
            object.redirectEnd = options.json && !isFinite(message.redirectEnd) ? String(message.redirectEnd) : message.redirectEnd;
        if (message.fetchStart != null && message.hasOwnProperty("fetchStart"))
            object.fetchStart = options.json && !isFinite(message.fetchStart) ? String(message.fetchStart) : message.fetchStart;
        if (message.domainLookupStart != null && message.hasOwnProperty("domainLookupStart"))
            object.domainLookupStart = options.json && !isFinite(message.domainLookupStart) ? String(message.domainLookupStart) : message.domainLookupStart;
        if (message.domainLookupEnd != null && message.hasOwnProperty("domainLookupEnd"))
            object.domainLookupEnd = options.json && !isFinite(message.domainLookupEnd) ? String(message.domainLookupEnd) : message.domainLookupEnd;
        if (message.connectStart != null && message.hasOwnProperty("connectStart"))
            object.connectStart = options.json && !isFinite(message.connectStart) ? String(message.connectStart) : message.connectStart;
        if (message.connectEnd != null && message.hasOwnProperty("connectEnd"))
            object.connectEnd = options.json && !isFinite(message.connectEnd) ? String(message.connectEnd) : message.connectEnd;
        if (message.secureConnectionStart != null && message.hasOwnProperty("secureConnectionStart"))
            object.secureConnectionStart = options.json && !isFinite(message.secureConnectionStart) ? String(message.secureConnectionStart) : message.secureConnectionStart;
        if (message.requestStart != null && message.hasOwnProperty("requestStart"))
            object.requestStart = options.json && !isFinite(message.requestStart) ? String(message.requestStart) : message.requestStart;
        if (message.responseStart != null && message.hasOwnProperty("responseStart"))
            object.responseStart = options.json && !isFinite(message.responseStart) ? String(message.responseStart) : message.responseStart;
        if (message.responseEnd != null && message.hasOwnProperty("responseEnd"))
            object.responseEnd = options.json && !isFinite(message.responseEnd) ? String(message.responseEnd) : message.responseEnd;
        if (message.transferSize != null && message.hasOwnProperty("transferSize"))
            if (typeof message.transferSize === "number")
                object.transferSize = options.longs === String ? String(message.transferSize) : message.transferSize;
            else
                object.transferSize = options.longs === String ? $util.Long.prototype.toString.call(message.transferSize) : options.longs === Number ? new $util.LongBits(message.transferSize.low >>> 0, message.transferSize.high >>> 0).toNumber() : message.transferSize;
        if (message.encodedBodySize != null && message.hasOwnProperty("encodedBodySize"))
            if (typeof message.encodedBodySize === "number")
                object.encodedBodySize = options.longs === String ? String(message.encodedBodySize) : message.encodedBodySize;
            else
                object.encodedBodySize = options.longs === String ? $util.Long.prototype.toString.call(message.encodedBodySize) : options.longs === Number ? new $util.LongBits(message.encodedBodySize.low >>> 0, message.encodedBodySize.high >>> 0).toNumber() : message.encodedBodySize;
        if (message.decodedBodySize != null && message.hasOwnProperty("decodedBodySize"))
            if (typeof message.decodedBodySize === "number")
                object.decodedBodySize = options.longs === String ? String(message.decodedBodySize) : message.decodedBodySize;
            else
                object.decodedBodySize = options.longs === String ? $util.Long.prototype.toString.call(message.decodedBodySize) : options.longs === Number ? new $util.LongBits(message.decodedBodySize.low >>> 0, message.decodedBodySize.high >>> 0).toNumber() : message.decodedBodySize;
        if (message.location != null && message.hasOwnProperty("location"))
            object.location = $root.RnLocation.toObject(message.location, options);
        if (message.resourceMeta && message.resourceMeta.length) {
            object.resourceMeta = [];
            for (let j = 0; j < message.resourceMeta.length; ++j)
                object.resourceMeta[j] = $root.RnResourceMeta.toObject(message.resourceMeta[j], options);
        }
        if (message.networkErrorInfo != null && message.hasOwnProperty("networkErrorInfo"))
            object.networkErrorInfo = $root.RnNetworkErrorInfo.toObject(message.networkErrorInfo, options);
        return object;
    };

    /**
     * Converts this RnResourceTiming to JSON.
     * @function toJSON
     * @memberof RnResourceTiming
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnResourceTiming.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnResourceTiming
     * @function getTypeUrl
     * @memberof RnResourceTiming
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnResourceTiming.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnResourceTiming";
    };

    return RnResourceTiming;
})();

export const RnPerformanceMeasure = $root.RnPerformanceMeasure = (() => {

    /**
     * Properties of a RnPerformanceMeasure.
     * @exports IRnPerformanceMeasure
     * @interface IRnPerformanceMeasure
     * @property {string|null} [name] RnPerformanceMeasure name
     * @property {string|null} [entryType] RnPerformanceMeasure entryType
     * @property {number|null} [startTime] RnPerformanceMeasure startTime
     * @property {number|null} [duration] RnPerformanceMeasure duration
     */

    /**
     * Constructs a new RnPerformanceMeasure.
     * @exports RnPerformanceMeasure
     * @classdesc Represents a RnPerformanceMeasure.
     * @implements IRnPerformanceMeasure
     * @constructor
     * @param {IRnPerformanceMeasure=} [properties] Properties to set
     */
    function RnPerformanceMeasure(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnPerformanceMeasure name.
     * @member {string} name
     * @memberof RnPerformanceMeasure
     * @instance
     */
    RnPerformanceMeasure.prototype.name = "";

    /**
     * RnPerformanceMeasure entryType.
     * @member {string} entryType
     * @memberof RnPerformanceMeasure
     * @instance
     */
    RnPerformanceMeasure.prototype.entryType = "";

    /**
     * RnPerformanceMeasure startTime.
     * @member {number} startTime
     * @memberof RnPerformanceMeasure
     * @instance
     */
    RnPerformanceMeasure.prototype.startTime = 0;

    /**
     * RnPerformanceMeasure duration.
     * @member {number} duration
     * @memberof RnPerformanceMeasure
     * @instance
     */
    RnPerformanceMeasure.prototype.duration = 0;

    /**
     * Creates a new RnPerformanceMeasure instance using the specified properties.
     * @function create
     * @memberof RnPerformanceMeasure
     * @static
     * @param {IRnPerformanceMeasure=} [properties] Properties to set
     * @returns {RnPerformanceMeasure} RnPerformanceMeasure instance
     */
    RnPerformanceMeasure.create = function create(properties) {
        return new RnPerformanceMeasure(properties);
    };

    /**
     * Encodes the specified RnPerformanceMeasure message. Does not implicitly {@link RnPerformanceMeasure.verify|verify} messages.
     * @function encode
     * @memberof RnPerformanceMeasure
     * @static
     * @param {IRnPerformanceMeasure} message RnPerformanceMeasure message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnPerformanceMeasure.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.entryType != null && Object.hasOwnProperty.call(message, "entryType"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.entryType);
        if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.startTime);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.duration);
        return writer;
    };

    /**
     * Encodes the specified RnPerformanceMeasure message, length delimited. Does not implicitly {@link RnPerformanceMeasure.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnPerformanceMeasure
     * @static
     * @param {IRnPerformanceMeasure} message RnPerformanceMeasure message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnPerformanceMeasure.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnPerformanceMeasure message from the specified reader or buffer.
     * @function decode
     * @memberof RnPerformanceMeasure
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnPerformanceMeasure} RnPerformanceMeasure
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnPerformanceMeasure.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnPerformanceMeasure();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.name = reader.string();
                    break;
                }
            case 2: {
                    message.entryType = reader.string();
                    break;
                }
            case 3: {
                    message.startTime = reader.double();
                    break;
                }
            case 4: {
                    message.duration = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnPerformanceMeasure message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnPerformanceMeasure
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnPerformanceMeasure} RnPerformanceMeasure
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnPerformanceMeasure.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnPerformanceMeasure message.
     * @function verify
     * @memberof RnPerformanceMeasure
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnPerformanceMeasure.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.entryType != null && message.hasOwnProperty("entryType"))
            if (!$util.isString(message.entryType))
                return "entryType: string expected";
        if (message.startTime != null && message.hasOwnProperty("startTime"))
            if (typeof message.startTime !== "number")
                return "startTime: number expected";
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (typeof message.duration !== "number")
                return "duration: number expected";
        return null;
    };

    /**
     * Creates a RnPerformanceMeasure message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnPerformanceMeasure
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnPerformanceMeasure} RnPerformanceMeasure
     */
    RnPerformanceMeasure.fromObject = function fromObject(object) {
        if (object instanceof $root.RnPerformanceMeasure)
            return object;
        let message = new $root.RnPerformanceMeasure();
        if (object.name != null)
            message.name = String(object.name);
        if (object.entryType != null)
            message.entryType = String(object.entryType);
        if (object.startTime != null)
            message.startTime = Number(object.startTime);
        if (object.duration != null)
            message.duration = Number(object.duration);
        return message;
    };

    /**
     * Creates a plain object from a RnPerformanceMeasure message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnPerformanceMeasure
     * @static
     * @param {RnPerformanceMeasure} message RnPerformanceMeasure
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnPerformanceMeasure.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.name = "";
            object.entryType = "";
            object.startTime = 0;
            object.duration = 0;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.entryType != null && message.hasOwnProperty("entryType"))
            object.entryType = message.entryType;
        if (message.startTime != null && message.hasOwnProperty("startTime"))
            object.startTime = options.json && !isFinite(message.startTime) ? String(message.startTime) : message.startTime;
        if (message.duration != null && message.hasOwnProperty("duration"))
            object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
        return object;
    };

    /**
     * Converts this RnPerformanceMeasure to JSON.
     * @function toJSON
     * @memberof RnPerformanceMeasure
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnPerformanceMeasure.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnPerformanceMeasure
     * @function getTypeUrl
     * @memberof RnPerformanceMeasure
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnPerformanceMeasure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnPerformanceMeasure";
    };

    return RnPerformanceMeasure;
})();

export const RnVideoResourceTiming = $root.RnVideoResourceTiming = (() => {

    /**
     * Properties of a RnVideoResourceTiming.
     * @exports IRnVideoResourceTiming
     * @interface IRnVideoResourceTiming
     * @property {string|null} [uri] RnVideoResourceTiming uri
     * @property {IRnLocation|null} [location] RnVideoResourceTiming location
     * @property {string|null} [mime] RnVideoResourceTiming mime
     * @property {number|null} [size] RnVideoResourceTiming size
     * @property {number|null} [duration] RnVideoResourceTiming duration
     * @property {IRnVideoResolution|null} [resolution] RnVideoResourceTiming resolution
     * @property {boolean|null} [playComplete] RnVideoResourceTiming playComplete
     * @property {IRnVideoLoadingTiming|null} [videoLoadingTiming] RnVideoResourceTiming videoLoadingTiming
     * @property {Array.<IRnResourceMeta>|null} [resourceMeta] RnVideoResourceTiming resourceMeta
     * @property {IRnNetworkErrorInfo|null} [networkErrorInfo] RnVideoResourceTiming networkErrorInfo
     */

    /**
     * Constructs a new RnVideoResourceTiming.
     * @exports RnVideoResourceTiming
     * @classdesc Represents a RnVideoResourceTiming.
     * @implements IRnVideoResourceTiming
     * @constructor
     * @param {IRnVideoResourceTiming=} [properties] Properties to set
     */
    function RnVideoResourceTiming(properties) {
        this.resourceMeta = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnVideoResourceTiming uri.
     * @member {string} uri
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.uri = "";

    /**
     * RnVideoResourceTiming location.
     * @member {IRnLocation|null|undefined} location
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.location = null;

    /**
     * RnVideoResourceTiming mime.
     * @member {string} mime
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.mime = "";

    /**
     * RnVideoResourceTiming size.
     * @member {number} size
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.size = 0;

    /**
     * RnVideoResourceTiming duration.
     * @member {number} duration
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.duration = 0;

    /**
     * RnVideoResourceTiming resolution.
     * @member {IRnVideoResolution|null|undefined} resolution
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.resolution = null;

    /**
     * RnVideoResourceTiming playComplete.
     * @member {boolean} playComplete
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.playComplete = false;

    /**
     * RnVideoResourceTiming videoLoadingTiming.
     * @member {IRnVideoLoadingTiming|null|undefined} videoLoadingTiming
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.videoLoadingTiming = null;

    /**
     * RnVideoResourceTiming resourceMeta.
     * @member {Array.<IRnResourceMeta>} resourceMeta
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.resourceMeta = $util.emptyArray;

    /**
     * RnVideoResourceTiming networkErrorInfo.
     * @member {IRnNetworkErrorInfo|null|undefined} networkErrorInfo
     * @memberof RnVideoResourceTiming
     * @instance
     */
    RnVideoResourceTiming.prototype.networkErrorInfo = null;

    /**
     * Creates a new RnVideoResourceTiming instance using the specified properties.
     * @function create
     * @memberof RnVideoResourceTiming
     * @static
     * @param {IRnVideoResourceTiming=} [properties] Properties to set
     * @returns {RnVideoResourceTiming} RnVideoResourceTiming instance
     */
    RnVideoResourceTiming.create = function create(properties) {
        return new RnVideoResourceTiming(properties);
    };

    /**
     * Encodes the specified RnVideoResourceTiming message. Does not implicitly {@link RnVideoResourceTiming.verify|verify} messages.
     * @function encode
     * @memberof RnVideoResourceTiming
     * @static
     * @param {IRnVideoResourceTiming} message RnVideoResourceTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnVideoResourceTiming.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.uri != null && Object.hasOwnProperty.call(message, "uri"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
        if (message.mime != null && Object.hasOwnProperty.call(message, "mime"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.mime);
        if (message.size != null && Object.hasOwnProperty.call(message, "size"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.size);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.duration);
        if (message.resolution != null && Object.hasOwnProperty.call(message, "resolution"))
            $root.RnVideoResolution.encode(message.resolution, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.playComplete != null && Object.hasOwnProperty.call(message, "playComplete"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.playComplete);
        if (message.location != null && Object.hasOwnProperty.call(message, "location"))
            $root.RnLocation.encode(message.location, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message.videoLoadingTiming != null && Object.hasOwnProperty.call(message, "videoLoadingTiming"))
            $root.RnVideoLoadingTiming.encode(message.videoLoadingTiming, writer.uint32(/* id 100, wireType 2 =*/802).fork()).ldelim();
        if (message.resourceMeta != null && message.resourceMeta.length)
            for (let i = 0; i < message.resourceMeta.length; ++i)
                $root.RnResourceMeta.encode(message.resourceMeta[i], writer.uint32(/* id 101, wireType 2 =*/810).fork()).ldelim();
        if (message.networkErrorInfo != null && Object.hasOwnProperty.call(message, "networkErrorInfo"))
            $root.RnNetworkErrorInfo.encode(message.networkErrorInfo, writer.uint32(/* id 102, wireType 2 =*/818).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RnVideoResourceTiming message, length delimited. Does not implicitly {@link RnVideoResourceTiming.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnVideoResourceTiming
     * @static
     * @param {IRnVideoResourceTiming} message RnVideoResourceTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnVideoResourceTiming.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnVideoResourceTiming message from the specified reader or buffer.
     * @function decode
     * @memberof RnVideoResourceTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnVideoResourceTiming} RnVideoResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnVideoResourceTiming.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnVideoResourceTiming();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.uri = reader.string();
                    break;
                }
            case 10: {
                    message.location = $root.RnLocation.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.mime = reader.string();
                    break;
                }
            case 3: {
                    message.size = reader.double();
                    break;
                }
            case 4: {
                    message.duration = reader.double();
                    break;
                }
            case 5: {
                    message.resolution = $root.RnVideoResolution.decode(reader, reader.uint32());
                    break;
                }
            case 6: {
                    message.playComplete = reader.bool();
                    break;
                }
            case 100: {
                    message.videoLoadingTiming = $root.RnVideoLoadingTiming.decode(reader, reader.uint32());
                    break;
                }
            case 101: {
                    if (!(message.resourceMeta && message.resourceMeta.length))
                        message.resourceMeta = [];
                    message.resourceMeta.push($root.RnResourceMeta.decode(reader, reader.uint32()));
                    break;
                }
            case 102: {
                    message.networkErrorInfo = $root.RnNetworkErrorInfo.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnVideoResourceTiming message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnVideoResourceTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnVideoResourceTiming} RnVideoResourceTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnVideoResourceTiming.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnVideoResourceTiming message.
     * @function verify
     * @memberof RnVideoResourceTiming
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnVideoResourceTiming.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.uri != null && message.hasOwnProperty("uri"))
            if (!$util.isString(message.uri))
                return "uri: string expected";
        if (message.location != null && message.hasOwnProperty("location")) {
            let error = $root.RnLocation.verify(message.location);
            if (error)
                return "location." + error;
        }
        if (message.mime != null && message.hasOwnProperty("mime"))
            if (!$util.isString(message.mime))
                return "mime: string expected";
        if (message.size != null && message.hasOwnProperty("size"))
            if (typeof message.size !== "number")
                return "size: number expected";
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (typeof message.duration !== "number")
                return "duration: number expected";
        if (message.resolution != null && message.hasOwnProperty("resolution")) {
            let error = $root.RnVideoResolution.verify(message.resolution);
            if (error)
                return "resolution." + error;
        }
        if (message.playComplete != null && message.hasOwnProperty("playComplete"))
            if (typeof message.playComplete !== "boolean")
                return "playComplete: boolean expected";
        if (message.videoLoadingTiming != null && message.hasOwnProperty("videoLoadingTiming")) {
            let error = $root.RnVideoLoadingTiming.verify(message.videoLoadingTiming);
            if (error)
                return "videoLoadingTiming." + error;
        }
        if (message.resourceMeta != null && message.hasOwnProperty("resourceMeta")) {
            if (!Array.isArray(message.resourceMeta))
                return "resourceMeta: array expected";
            for (let i = 0; i < message.resourceMeta.length; ++i) {
                let error = $root.RnResourceMeta.verify(message.resourceMeta[i]);
                if (error)
                    return "resourceMeta." + error;
            }
        }
        if (message.networkErrorInfo != null && message.hasOwnProperty("networkErrorInfo")) {
            let error = $root.RnNetworkErrorInfo.verify(message.networkErrorInfo);
            if (error)
                return "networkErrorInfo." + error;
        }
        return null;
    };

    /**
     * Creates a RnVideoResourceTiming message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnVideoResourceTiming
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnVideoResourceTiming} RnVideoResourceTiming
     */
    RnVideoResourceTiming.fromObject = function fromObject(object) {
        if (object instanceof $root.RnVideoResourceTiming)
            return object;
        let message = new $root.RnVideoResourceTiming();
        if (object.uri != null)
            message.uri = String(object.uri);
        if (object.location != null) {
            if (typeof object.location !== "object")
                throw TypeError(".RnVideoResourceTiming.location: object expected");
            message.location = $root.RnLocation.fromObject(object.location);
        }
        if (object.mime != null)
            message.mime = String(object.mime);
        if (object.size != null)
            message.size = Number(object.size);
        if (object.duration != null)
            message.duration = Number(object.duration);
        if (object.resolution != null) {
            if (typeof object.resolution !== "object")
                throw TypeError(".RnVideoResourceTiming.resolution: object expected");
            message.resolution = $root.RnVideoResolution.fromObject(object.resolution);
        }
        if (object.playComplete != null)
            message.playComplete = Boolean(object.playComplete);
        if (object.videoLoadingTiming != null) {
            if (typeof object.videoLoadingTiming !== "object")
                throw TypeError(".RnVideoResourceTiming.videoLoadingTiming: object expected");
            message.videoLoadingTiming = $root.RnVideoLoadingTiming.fromObject(object.videoLoadingTiming);
        }
        if (object.resourceMeta) {
            if (!Array.isArray(object.resourceMeta))
                throw TypeError(".RnVideoResourceTiming.resourceMeta: array expected");
            message.resourceMeta = [];
            for (let i = 0; i < object.resourceMeta.length; ++i) {
                if (typeof object.resourceMeta[i] !== "object")
                    throw TypeError(".RnVideoResourceTiming.resourceMeta: object expected");
                message.resourceMeta[i] = $root.RnResourceMeta.fromObject(object.resourceMeta[i]);
            }
        }
        if (object.networkErrorInfo != null) {
            if (typeof object.networkErrorInfo !== "object")
                throw TypeError(".RnVideoResourceTiming.networkErrorInfo: object expected");
            message.networkErrorInfo = $root.RnNetworkErrorInfo.fromObject(object.networkErrorInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a RnVideoResourceTiming message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnVideoResourceTiming
     * @static
     * @param {RnVideoResourceTiming} message RnVideoResourceTiming
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnVideoResourceTiming.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.resourceMeta = [];
        if (options.defaults) {
            object.uri = "";
            object.mime = "";
            object.size = 0;
            object.duration = 0;
            object.resolution = null;
            object.playComplete = false;
            object.location = null;
            object.videoLoadingTiming = null;
            object.networkErrorInfo = null;
        }
        if (message.uri != null && message.hasOwnProperty("uri"))
            object.uri = message.uri;
        if (message.mime != null && message.hasOwnProperty("mime"))
            object.mime = message.mime;
        if (message.size != null && message.hasOwnProperty("size"))
            object.size = options.json && !isFinite(message.size) ? String(message.size) : message.size;
        if (message.duration != null && message.hasOwnProperty("duration"))
            object.duration = options.json && !isFinite(message.duration) ? String(message.duration) : message.duration;
        if (message.resolution != null && message.hasOwnProperty("resolution"))
            object.resolution = $root.RnVideoResolution.toObject(message.resolution, options);
        if (message.playComplete != null && message.hasOwnProperty("playComplete"))
            object.playComplete = message.playComplete;
        if (message.location != null && message.hasOwnProperty("location"))
            object.location = $root.RnLocation.toObject(message.location, options);
        if (message.videoLoadingTiming != null && message.hasOwnProperty("videoLoadingTiming"))
            object.videoLoadingTiming = $root.RnVideoLoadingTiming.toObject(message.videoLoadingTiming, options);
        if (message.resourceMeta && message.resourceMeta.length) {
            object.resourceMeta = [];
            for (let j = 0; j < message.resourceMeta.length; ++j)
                object.resourceMeta[j] = $root.RnResourceMeta.toObject(message.resourceMeta[j], options);
        }
        if (message.networkErrorInfo != null && message.hasOwnProperty("networkErrorInfo"))
            object.networkErrorInfo = $root.RnNetworkErrorInfo.toObject(message.networkErrorInfo, options);
        return object;
    };

    /**
     * Converts this RnVideoResourceTiming to JSON.
     * @function toJSON
     * @memberof RnVideoResourceTiming
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnVideoResourceTiming.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnVideoResourceTiming
     * @function getTypeUrl
     * @memberof RnVideoResourceTiming
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnVideoResourceTiming.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnVideoResourceTiming";
    };

    return RnVideoResourceTiming;
})();

export const RnNetworkErrorInfo = $root.RnNetworkErrorInfo = (() => {

    /**
     * Properties of a RnNetworkErrorInfo.
     * @exports IRnNetworkErrorInfo
     * @interface IRnNetworkErrorInfo
     * @property {number|null} [status] RnNetworkErrorInfo status
     * @property {string|null} [info] RnNetworkErrorInfo info
     */

    /**
     * Constructs a new RnNetworkErrorInfo.
     * @exports RnNetworkErrorInfo
     * @classdesc Represents a RnNetworkErrorInfo.
     * @implements IRnNetworkErrorInfo
     * @constructor
     * @param {IRnNetworkErrorInfo=} [properties] Properties to set
     */
    function RnNetworkErrorInfo(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnNetworkErrorInfo status.
     * @member {number} status
     * @memberof RnNetworkErrorInfo
     * @instance
     */
    RnNetworkErrorInfo.prototype.status = 0;

    /**
     * RnNetworkErrorInfo info.
     * @member {string} info
     * @memberof RnNetworkErrorInfo
     * @instance
     */
    RnNetworkErrorInfo.prototype.info = "";

    /**
     * Creates a new RnNetworkErrorInfo instance using the specified properties.
     * @function create
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {IRnNetworkErrorInfo=} [properties] Properties to set
     * @returns {RnNetworkErrorInfo} RnNetworkErrorInfo instance
     */
    RnNetworkErrorInfo.create = function create(properties) {
        return new RnNetworkErrorInfo(properties);
    };

    /**
     * Encodes the specified RnNetworkErrorInfo message. Does not implicitly {@link RnNetworkErrorInfo.verify|verify} messages.
     * @function encode
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {IRnNetworkErrorInfo} message RnNetworkErrorInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnNetworkErrorInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
        if (message.info != null && Object.hasOwnProperty.call(message, "info"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.info);
        return writer;
    };

    /**
     * Encodes the specified RnNetworkErrorInfo message, length delimited. Does not implicitly {@link RnNetworkErrorInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {IRnNetworkErrorInfo} message RnNetworkErrorInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnNetworkErrorInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnNetworkErrorInfo message from the specified reader or buffer.
     * @function decode
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnNetworkErrorInfo} RnNetworkErrorInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnNetworkErrorInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnNetworkErrorInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.status = reader.int32();
                    break;
                }
            case 2: {
                    message.info = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnNetworkErrorInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnNetworkErrorInfo} RnNetworkErrorInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnNetworkErrorInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnNetworkErrorInfo message.
     * @function verify
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnNetworkErrorInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.status != null && message.hasOwnProperty("status"))
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        if (message.info != null && message.hasOwnProperty("info"))
            if (!$util.isString(message.info))
                return "info: string expected";
        return null;
    };

    /**
     * Creates a RnNetworkErrorInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnNetworkErrorInfo} RnNetworkErrorInfo
     */
    RnNetworkErrorInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.RnNetworkErrorInfo)
            return object;
        let message = new $root.RnNetworkErrorInfo();
        if (object.status != null)
            message.status = object.status | 0;
        if (object.info != null)
            message.info = String(object.info);
        return message;
    };

    /**
     * Creates a plain object from a RnNetworkErrorInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {RnNetworkErrorInfo} message RnNetworkErrorInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnNetworkErrorInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.status = 0;
            object.info = "";
        }
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = message.status;
        if (message.info != null && message.hasOwnProperty("info"))
            object.info = message.info;
        return object;
    };

    /**
     * Converts this RnNetworkErrorInfo to JSON.
     * @function toJSON
     * @memberof RnNetworkErrorInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnNetworkErrorInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnNetworkErrorInfo
     * @function getTypeUrl
     * @memberof RnNetworkErrorInfo
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnNetworkErrorInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnNetworkErrorInfo";
    };

    return RnNetworkErrorInfo;
})();

export const RnLocation = $root.RnLocation = (() => {

    /**
     * Properties of a RnLocation.
     * @exports IRnLocation
     * @interface IRnLocation
     * @property {string|null} [hash] RnLocation hash
     * @property {string|null} [host] RnLocation host
     * @property {string|null} [hostname] RnLocation hostname
     * @property {string|null} [href] RnLocation href
     * @property {string|null} [origin] RnLocation origin
     * @property {string|null} [pathname] RnLocation pathname
     * @property {string|null} [port] RnLocation port
     * @property {string|null} [protocol] RnLocation protocol
     * @property {string|null} [search] RnLocation search
     */

    /**
     * Constructs a new RnLocation.
     * @exports RnLocation
     * @classdesc Represents a RnLocation.
     * @implements IRnLocation
     * @constructor
     * @param {IRnLocation=} [properties] Properties to set
     */
    function RnLocation(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnLocation hash.
     * @member {string} hash
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.hash = "";

    /**
     * RnLocation host.
     * @member {string} host
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.host = "";

    /**
     * RnLocation hostname.
     * @member {string} hostname
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.hostname = "";

    /**
     * RnLocation href.
     * @member {string} href
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.href = "";

    /**
     * RnLocation origin.
     * @member {string} origin
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.origin = "";

    /**
     * RnLocation pathname.
     * @member {string} pathname
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.pathname = "";

    /**
     * RnLocation port.
     * @member {string} port
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.port = "";

    /**
     * RnLocation protocol.
     * @member {string} protocol
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.protocol = "";

    /**
     * RnLocation search.
     * @member {string} search
     * @memberof RnLocation
     * @instance
     */
    RnLocation.prototype.search = "";

    /**
     * Creates a new RnLocation instance using the specified properties.
     * @function create
     * @memberof RnLocation
     * @static
     * @param {IRnLocation=} [properties] Properties to set
     * @returns {RnLocation} RnLocation instance
     */
    RnLocation.create = function create(properties) {
        return new RnLocation(properties);
    };

    /**
     * Encodes the specified RnLocation message. Does not implicitly {@link RnLocation.verify|verify} messages.
     * @function encode
     * @memberof RnLocation
     * @static
     * @param {IRnLocation} message RnLocation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnLocation.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.hash);
        if (message.host != null && Object.hasOwnProperty.call(message, "host"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.host);
        if (message.hostname != null && Object.hasOwnProperty.call(message, "hostname"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.hostname);
        if (message.href != null && Object.hasOwnProperty.call(message, "href"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.href);
        if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.origin);
        if (message.pathname != null && Object.hasOwnProperty.call(message, "pathname"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.pathname);
        if (message.port != null && Object.hasOwnProperty.call(message, "port"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.port);
        if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.protocol);
        if (message.search != null && Object.hasOwnProperty.call(message, "search"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.search);
        return writer;
    };

    /**
     * Encodes the specified RnLocation message, length delimited. Does not implicitly {@link RnLocation.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnLocation
     * @static
     * @param {IRnLocation} message RnLocation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnLocation.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnLocation message from the specified reader or buffer.
     * @function decode
     * @memberof RnLocation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnLocation} RnLocation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnLocation.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnLocation();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.hash = reader.string();
                    break;
                }
            case 2: {
                    message.host = reader.string();
                    break;
                }
            case 3: {
                    message.hostname = reader.string();
                    break;
                }
            case 4: {
                    message.href = reader.string();
                    break;
                }
            case 5: {
                    message.origin = reader.string();
                    break;
                }
            case 6: {
                    message.pathname = reader.string();
                    break;
                }
            case 7: {
                    message.port = reader.string();
                    break;
                }
            case 8: {
                    message.protocol = reader.string();
                    break;
                }
            case 9: {
                    message.search = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnLocation message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnLocation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnLocation} RnLocation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnLocation.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnLocation message.
     * @function verify
     * @memberof RnLocation
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnLocation.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.hash != null && message.hasOwnProperty("hash"))
            if (!$util.isString(message.hash))
                return "hash: string expected";
        if (message.host != null && message.hasOwnProperty("host"))
            if (!$util.isString(message.host))
                return "host: string expected";
        if (message.hostname != null && message.hasOwnProperty("hostname"))
            if (!$util.isString(message.hostname))
                return "hostname: string expected";
        if (message.href != null && message.hasOwnProperty("href"))
            if (!$util.isString(message.href))
                return "href: string expected";
        if (message.origin != null && message.hasOwnProperty("origin"))
            if (!$util.isString(message.origin))
                return "origin: string expected";
        if (message.pathname != null && message.hasOwnProperty("pathname"))
            if (!$util.isString(message.pathname))
                return "pathname: string expected";
        if (message.port != null && message.hasOwnProperty("port"))
            if (!$util.isString(message.port))
                return "port: string expected";
        if (message.protocol != null && message.hasOwnProperty("protocol"))
            if (!$util.isString(message.protocol))
                return "protocol: string expected";
        if (message.search != null && message.hasOwnProperty("search"))
            if (!$util.isString(message.search))
                return "search: string expected";
        return null;
    };

    /**
     * Creates a RnLocation message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnLocation
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnLocation} RnLocation
     */
    RnLocation.fromObject = function fromObject(object) {
        if (object instanceof $root.RnLocation)
            return object;
        let message = new $root.RnLocation();
        if (object.hash != null)
            message.hash = String(object.hash);
        if (object.host != null)
            message.host = String(object.host);
        if (object.hostname != null)
            message.hostname = String(object.hostname);
        if (object.href != null)
            message.href = String(object.href);
        if (object.origin != null)
            message.origin = String(object.origin);
        if (object.pathname != null)
            message.pathname = String(object.pathname);
        if (object.port != null)
            message.port = String(object.port);
        if (object.protocol != null)
            message.protocol = String(object.protocol);
        if (object.search != null)
            message.search = String(object.search);
        return message;
    };

    /**
     * Creates a plain object from a RnLocation message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnLocation
     * @static
     * @param {RnLocation} message RnLocation
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnLocation.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.hash = "";
            object.host = "";
            object.hostname = "";
            object.href = "";
            object.origin = "";
            object.pathname = "";
            object.port = "";
            object.protocol = "";
            object.search = "";
        }
        if (message.hash != null && message.hasOwnProperty("hash"))
            object.hash = message.hash;
        if (message.host != null && message.hasOwnProperty("host"))
            object.host = message.host;
        if (message.hostname != null && message.hasOwnProperty("hostname"))
            object.hostname = message.hostname;
        if (message.href != null && message.hasOwnProperty("href"))
            object.href = message.href;
        if (message.origin != null && message.hasOwnProperty("origin"))
            object.origin = message.origin;
        if (message.pathname != null && message.hasOwnProperty("pathname"))
            object.pathname = message.pathname;
        if (message.port != null && message.hasOwnProperty("port"))
            object.port = message.port;
        if (message.protocol != null && message.hasOwnProperty("protocol"))
            object.protocol = message.protocol;
        if (message.search != null && message.hasOwnProperty("search"))
            object.search = message.search;
        return object;
    };

    /**
     * Converts this RnLocation to JSON.
     * @function toJSON
     * @memberof RnLocation
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnLocation.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnLocation
     * @function getTypeUrl
     * @memberof RnLocation
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnLocation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnLocation";
    };

    return RnLocation;
})();

export const RnVideoResolution = $root.RnVideoResolution = (() => {

    /**
     * Properties of a RnVideoResolution.
     * @exports IRnVideoResolution
     * @interface IRnVideoResolution
     * @property {number|null} [width] RnVideoResolution width
     * @property {number|null} [height] RnVideoResolution height
     * @property {string|null} [orientation] RnVideoResolution orientation
     */

    /**
     * Constructs a new RnVideoResolution.
     * @exports RnVideoResolution
     * @classdesc Represents a RnVideoResolution.
     * @implements IRnVideoResolution
     * @constructor
     * @param {IRnVideoResolution=} [properties] Properties to set
     */
    function RnVideoResolution(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnVideoResolution width.
     * @member {number} width
     * @memberof RnVideoResolution
     * @instance
     */
    RnVideoResolution.prototype.width = 0;

    /**
     * RnVideoResolution height.
     * @member {number} height
     * @memberof RnVideoResolution
     * @instance
     */
    RnVideoResolution.prototype.height = 0;

    /**
     * RnVideoResolution orientation.
     * @member {string} orientation
     * @memberof RnVideoResolution
     * @instance
     */
    RnVideoResolution.prototype.orientation = "";

    /**
     * Creates a new RnVideoResolution instance using the specified properties.
     * @function create
     * @memberof RnVideoResolution
     * @static
     * @param {IRnVideoResolution=} [properties] Properties to set
     * @returns {RnVideoResolution} RnVideoResolution instance
     */
    RnVideoResolution.create = function create(properties) {
        return new RnVideoResolution(properties);
    };

    /**
     * Encodes the specified RnVideoResolution message. Does not implicitly {@link RnVideoResolution.verify|verify} messages.
     * @function encode
     * @memberof RnVideoResolution
     * @static
     * @param {IRnVideoResolution} message RnVideoResolution message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnVideoResolution.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.width != null && Object.hasOwnProperty.call(message, "width"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.width);
        if (message.height != null && Object.hasOwnProperty.call(message, "height"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.height);
        if (message.orientation != null && Object.hasOwnProperty.call(message, "orientation"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.orientation);
        return writer;
    };

    /**
     * Encodes the specified RnVideoResolution message, length delimited. Does not implicitly {@link RnVideoResolution.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnVideoResolution
     * @static
     * @param {IRnVideoResolution} message RnVideoResolution message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnVideoResolution.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnVideoResolution message from the specified reader or buffer.
     * @function decode
     * @memberof RnVideoResolution
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnVideoResolution} RnVideoResolution
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnVideoResolution.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnVideoResolution();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.width = reader.double();
                    break;
                }
            case 2: {
                    message.height = reader.double();
                    break;
                }
            case 3: {
                    message.orientation = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnVideoResolution message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnVideoResolution
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnVideoResolution} RnVideoResolution
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnVideoResolution.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnVideoResolution message.
     * @function verify
     * @memberof RnVideoResolution
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnVideoResolution.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.width != null && message.hasOwnProperty("width"))
            if (typeof message.width !== "number")
                return "width: number expected";
        if (message.height != null && message.hasOwnProperty("height"))
            if (typeof message.height !== "number")
                return "height: number expected";
        if (message.orientation != null && message.hasOwnProperty("orientation"))
            if (!$util.isString(message.orientation))
                return "orientation: string expected";
        return null;
    };

    /**
     * Creates a RnVideoResolution message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnVideoResolution
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnVideoResolution} RnVideoResolution
     */
    RnVideoResolution.fromObject = function fromObject(object) {
        if (object instanceof $root.RnVideoResolution)
            return object;
        let message = new $root.RnVideoResolution();
        if (object.width != null)
            message.width = Number(object.width);
        if (object.height != null)
            message.height = Number(object.height);
        if (object.orientation != null)
            message.orientation = String(object.orientation);
        return message;
    };

    /**
     * Creates a plain object from a RnVideoResolution message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnVideoResolution
     * @static
     * @param {RnVideoResolution} message RnVideoResolution
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnVideoResolution.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.width = 0;
            object.height = 0;
            object.orientation = "";
        }
        if (message.width != null && message.hasOwnProperty("width"))
            object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
        if (message.height != null && message.hasOwnProperty("height"))
            object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
        if (message.orientation != null && message.hasOwnProperty("orientation"))
            object.orientation = message.orientation;
        return object;
    };

    /**
     * Converts this RnVideoResolution to JSON.
     * @function toJSON
     * @memberof RnVideoResolution
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnVideoResolution.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnVideoResolution
     * @function getTypeUrl
     * @memberof RnVideoResolution
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnVideoResolution.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnVideoResolution";
    };

    return RnVideoResolution;
})();

export const RnVideoLoadingTiming = $root.RnVideoLoadingTiming = (() => {

    /**
     * Properties of a RnVideoLoadingTiming.
     * @exports IRnVideoLoadingTiming
     * @interface IRnVideoLoadingTiming
     * @property {number|null} [loadStart] RnVideoLoadingTiming loadStart
     * @property {number|null} [canPlay] RnVideoLoadingTiming canPlay
     * @property {number|null} [bufferTime] RnVideoLoadingTiming bufferTime
     * @property {number|null} [playTime] RnVideoLoadingTiming playTime
     */

    /**
     * Constructs a new RnVideoLoadingTiming.
     * @exports RnVideoLoadingTiming
     * @classdesc Represents a RnVideoLoadingTiming.
     * @implements IRnVideoLoadingTiming
     * @constructor
     * @param {IRnVideoLoadingTiming=} [properties] Properties to set
     */
    function RnVideoLoadingTiming(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnVideoLoadingTiming loadStart.
     * @member {number} loadStart
     * @memberof RnVideoLoadingTiming
     * @instance
     */
    RnVideoLoadingTiming.prototype.loadStart = 0;

    /**
     * RnVideoLoadingTiming canPlay.
     * @member {number} canPlay
     * @memberof RnVideoLoadingTiming
     * @instance
     */
    RnVideoLoadingTiming.prototype.canPlay = 0;

    /**
     * RnVideoLoadingTiming bufferTime.
     * @member {number} bufferTime
     * @memberof RnVideoLoadingTiming
     * @instance
     */
    RnVideoLoadingTiming.prototype.bufferTime = 0;

    /**
     * RnVideoLoadingTiming playTime.
     * @member {number} playTime
     * @memberof RnVideoLoadingTiming
     * @instance
     */
    RnVideoLoadingTiming.prototype.playTime = 0;

    /**
     * Creates a new RnVideoLoadingTiming instance using the specified properties.
     * @function create
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {IRnVideoLoadingTiming=} [properties] Properties to set
     * @returns {RnVideoLoadingTiming} RnVideoLoadingTiming instance
     */
    RnVideoLoadingTiming.create = function create(properties) {
        return new RnVideoLoadingTiming(properties);
    };

    /**
     * Encodes the specified RnVideoLoadingTiming message. Does not implicitly {@link RnVideoLoadingTiming.verify|verify} messages.
     * @function encode
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {IRnVideoLoadingTiming} message RnVideoLoadingTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnVideoLoadingTiming.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.loadStart != null && Object.hasOwnProperty.call(message, "loadStart"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.loadStart);
        if (message.canPlay != null && Object.hasOwnProperty.call(message, "canPlay"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.canPlay);
        if (message.bufferTime != null && Object.hasOwnProperty.call(message, "bufferTime"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.bufferTime);
        if (message.playTime != null && Object.hasOwnProperty.call(message, "playTime"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.playTime);
        return writer;
    };

    /**
     * Encodes the specified RnVideoLoadingTiming message, length delimited. Does not implicitly {@link RnVideoLoadingTiming.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {IRnVideoLoadingTiming} message RnVideoLoadingTiming message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnVideoLoadingTiming.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnVideoLoadingTiming message from the specified reader or buffer.
     * @function decode
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnVideoLoadingTiming} RnVideoLoadingTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnVideoLoadingTiming.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnVideoLoadingTiming();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.loadStart = reader.double();
                    break;
                }
            case 2: {
                    message.canPlay = reader.double();
                    break;
                }
            case 3: {
                    message.bufferTime = reader.double();
                    break;
                }
            case 4: {
                    message.playTime = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnVideoLoadingTiming message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnVideoLoadingTiming} RnVideoLoadingTiming
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnVideoLoadingTiming.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnVideoLoadingTiming message.
     * @function verify
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnVideoLoadingTiming.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.loadStart != null && message.hasOwnProperty("loadStart"))
            if (typeof message.loadStart !== "number")
                return "loadStart: number expected";
        if (message.canPlay != null && message.hasOwnProperty("canPlay"))
            if (typeof message.canPlay !== "number")
                return "canPlay: number expected";
        if (message.bufferTime != null && message.hasOwnProperty("bufferTime"))
            if (typeof message.bufferTime !== "number")
                return "bufferTime: number expected";
        if (message.playTime != null && message.hasOwnProperty("playTime"))
            if (typeof message.playTime !== "number")
                return "playTime: number expected";
        return null;
    };

    /**
     * Creates a RnVideoLoadingTiming message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnVideoLoadingTiming} RnVideoLoadingTiming
     */
    RnVideoLoadingTiming.fromObject = function fromObject(object) {
        if (object instanceof $root.RnVideoLoadingTiming)
            return object;
        let message = new $root.RnVideoLoadingTiming();
        if (object.loadStart != null)
            message.loadStart = Number(object.loadStart);
        if (object.canPlay != null)
            message.canPlay = Number(object.canPlay);
        if (object.bufferTime != null)
            message.bufferTime = Number(object.bufferTime);
        if (object.playTime != null)
            message.playTime = Number(object.playTime);
        return message;
    };

    /**
     * Creates a plain object from a RnVideoLoadingTiming message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {RnVideoLoadingTiming} message RnVideoLoadingTiming
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnVideoLoadingTiming.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.loadStart = 0;
            object.canPlay = 0;
            object.bufferTime = 0;
            object.playTime = 0;
        }
        if (message.loadStart != null && message.hasOwnProperty("loadStart"))
            object.loadStart = options.json && !isFinite(message.loadStart) ? String(message.loadStart) : message.loadStart;
        if (message.canPlay != null && message.hasOwnProperty("canPlay"))
            object.canPlay = options.json && !isFinite(message.canPlay) ? String(message.canPlay) : message.canPlay;
        if (message.bufferTime != null && message.hasOwnProperty("bufferTime"))
            object.bufferTime = options.json && !isFinite(message.bufferTime) ? String(message.bufferTime) : message.bufferTime;
        if (message.playTime != null && message.hasOwnProperty("playTime"))
            object.playTime = options.json && !isFinite(message.playTime) ? String(message.playTime) : message.playTime;
        return object;
    };

    /**
     * Converts this RnVideoLoadingTiming to JSON.
     * @function toJSON
     * @memberof RnVideoLoadingTiming
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnVideoLoadingTiming.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnVideoLoadingTiming
     * @function getTypeUrl
     * @memberof RnVideoLoadingTiming
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnVideoLoadingTiming.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnVideoLoadingTiming";
    };

    return RnVideoLoadingTiming;
})();

export const RnResourceMeta = $root.RnResourceMeta = (() => {

    /**
     * Properties of a RnResourceMeta.
     * @exports IRnResourceMeta
     * @interface IRnResourceMeta
     * @property {string|null} [type] RnResourceMeta type
     * @property {string|null} [value] RnResourceMeta value
     */

    /**
     * Constructs a new RnResourceMeta.
     * @exports RnResourceMeta
     * @classdesc Represents a RnResourceMeta.
     * @implements IRnResourceMeta
     * @constructor
     * @param {IRnResourceMeta=} [properties] Properties to set
     */
    function RnResourceMeta(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnResourceMeta type.
     * @member {string} type
     * @memberof RnResourceMeta
     * @instance
     */
    RnResourceMeta.prototype.type = "";

    /**
     * RnResourceMeta value.
     * @member {string} value
     * @memberof RnResourceMeta
     * @instance
     */
    RnResourceMeta.prototype.value = "";

    /**
     * Creates a new RnResourceMeta instance using the specified properties.
     * @function create
     * @memberof RnResourceMeta
     * @static
     * @param {IRnResourceMeta=} [properties] Properties to set
     * @returns {RnResourceMeta} RnResourceMeta instance
     */
    RnResourceMeta.create = function create(properties) {
        return new RnResourceMeta(properties);
    };

    /**
     * Encodes the specified RnResourceMeta message. Does not implicitly {@link RnResourceMeta.verify|verify} messages.
     * @function encode
     * @memberof RnResourceMeta
     * @static
     * @param {IRnResourceMeta} message RnResourceMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnResourceMeta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
        if (message.value != null && Object.hasOwnProperty.call(message, "value"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
        return writer;
    };

    /**
     * Encodes the specified RnResourceMeta message, length delimited. Does not implicitly {@link RnResourceMeta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnResourceMeta
     * @static
     * @param {IRnResourceMeta} message RnResourceMeta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnResourceMeta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnResourceMeta message from the specified reader or buffer.
     * @function decode
     * @memberof RnResourceMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnResourceMeta} RnResourceMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnResourceMeta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnResourceMeta();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.type = reader.string();
                    break;
                }
            case 2: {
                    message.value = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnResourceMeta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnResourceMeta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnResourceMeta} RnResourceMeta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnResourceMeta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnResourceMeta message.
     * @function verify
     * @memberof RnResourceMeta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnResourceMeta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isString(message.type))
                return "type: string expected";
        if (message.value != null && message.hasOwnProperty("value"))
            if (!$util.isString(message.value))
                return "value: string expected";
        return null;
    };

    /**
     * Creates a RnResourceMeta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnResourceMeta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnResourceMeta} RnResourceMeta
     */
    RnResourceMeta.fromObject = function fromObject(object) {
        if (object instanceof $root.RnResourceMeta)
            return object;
        let message = new $root.RnResourceMeta();
        if (object.type != null)
            message.type = String(object.type);
        if (object.value != null)
            message.value = String(object.value);
        return message;
    };

    /**
     * Creates a plain object from a RnResourceMeta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnResourceMeta
     * @static
     * @param {RnResourceMeta} message RnResourceMeta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnResourceMeta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.type = "";
            object.value = "";
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        return object;
    };

    /**
     * Converts this RnResourceMeta to JSON.
     * @function toJSON
     * @memberof RnResourceMeta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnResourceMeta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnResourceMeta
     * @function getTypeUrl
     * @memberof RnResourceMeta
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnResourceMeta.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnResourceMeta";
    };

    return RnResourceMeta;
})();

export const RnRouteNotFound = $root.RnRouteNotFound = (() => {

    /**
     * Properties of a RnRouteNotFound.
     * @exports IRnRouteNotFound
     * @interface IRnRouteNotFound
     * @property {string|null} [prevPageUrl] RnRouteNotFound prevPageUrl
     * @property {string|null} [firstPageUrl] RnRouteNotFound firstPageUrl
     * @property {string|null} [prevRoutePath] RnRouteNotFound prevRoutePath
     * @property {string|null} [targetRouteName] RnRouteNotFound targetRouteName
     */

    /**
     * Constructs a new RnRouteNotFound.
     * @exports RnRouteNotFound
     * @classdesc Represents a RnRouteNotFound.
     * @implements IRnRouteNotFound
     * @constructor
     * @param {IRnRouteNotFound=} [properties] Properties to set
     */
    function RnRouteNotFound(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RnRouteNotFound prevPageUrl.
     * @member {string} prevPageUrl
     * @memberof RnRouteNotFound
     * @instance
     */
    RnRouteNotFound.prototype.prevPageUrl = "";

    /**
     * RnRouteNotFound firstPageUrl.
     * @member {string} firstPageUrl
     * @memberof RnRouteNotFound
     * @instance
     */
    RnRouteNotFound.prototype.firstPageUrl = "";

    /**
     * RnRouteNotFound prevRoutePath.
     * @member {string} prevRoutePath
     * @memberof RnRouteNotFound
     * @instance
     */
    RnRouteNotFound.prototype.prevRoutePath = "";

    /**
     * RnRouteNotFound targetRouteName.
     * @member {string} targetRouteName
     * @memberof RnRouteNotFound
     * @instance
     */
    RnRouteNotFound.prototype.targetRouteName = "";

    /**
     * Creates a new RnRouteNotFound instance using the specified properties.
     * @function create
     * @memberof RnRouteNotFound
     * @static
     * @param {IRnRouteNotFound=} [properties] Properties to set
     * @returns {RnRouteNotFound} RnRouteNotFound instance
     */
    RnRouteNotFound.create = function create(properties) {
        return new RnRouteNotFound(properties);
    };

    /**
     * Encodes the specified RnRouteNotFound message. Does not implicitly {@link RnRouteNotFound.verify|verify} messages.
     * @function encode
     * @memberof RnRouteNotFound
     * @static
     * @param {IRnRouteNotFound} message RnRouteNotFound message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnRouteNotFound.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.prevPageUrl != null && Object.hasOwnProperty.call(message, "prevPageUrl"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.prevPageUrl);
        if (message.firstPageUrl != null && Object.hasOwnProperty.call(message, "firstPageUrl"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.firstPageUrl);
        if (message.prevRoutePath != null && Object.hasOwnProperty.call(message, "prevRoutePath"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.prevRoutePath);
        if (message.targetRouteName != null && Object.hasOwnProperty.call(message, "targetRouteName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.targetRouteName);
        return writer;
    };

    /**
     * Encodes the specified RnRouteNotFound message, length delimited. Does not implicitly {@link RnRouteNotFound.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RnRouteNotFound
     * @static
     * @param {IRnRouteNotFound} message RnRouteNotFound message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RnRouteNotFound.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RnRouteNotFound message from the specified reader or buffer.
     * @function decode
     * @memberof RnRouteNotFound
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RnRouteNotFound} RnRouteNotFound
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnRouteNotFound.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RnRouteNotFound();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.prevPageUrl = reader.string();
                    break;
                }
            case 2: {
                    message.firstPageUrl = reader.string();
                    break;
                }
            case 3: {
                    message.prevRoutePath = reader.string();
                    break;
                }
            case 4: {
                    message.targetRouteName = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RnRouteNotFound message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RnRouteNotFound
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RnRouteNotFound} RnRouteNotFound
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RnRouteNotFound.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RnRouteNotFound message.
     * @function verify
     * @memberof RnRouteNotFound
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RnRouteNotFound.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.prevPageUrl != null && message.hasOwnProperty("prevPageUrl"))
            if (!$util.isString(message.prevPageUrl))
                return "prevPageUrl: string expected";
        if (message.firstPageUrl != null && message.hasOwnProperty("firstPageUrl"))
            if (!$util.isString(message.firstPageUrl))
                return "firstPageUrl: string expected";
        if (message.prevRoutePath != null && message.hasOwnProperty("prevRoutePath"))
            if (!$util.isString(message.prevRoutePath))
                return "prevRoutePath: string expected";
        if (message.targetRouteName != null && message.hasOwnProperty("targetRouteName"))
            if (!$util.isString(message.targetRouteName))
                return "targetRouteName: string expected";
        return null;
    };

    /**
     * Creates a RnRouteNotFound message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RnRouteNotFound
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RnRouteNotFound} RnRouteNotFound
     */
    RnRouteNotFound.fromObject = function fromObject(object) {
        if (object instanceof $root.RnRouteNotFound)
            return object;
        let message = new $root.RnRouteNotFound();
        if (object.prevPageUrl != null)
            message.prevPageUrl = String(object.prevPageUrl);
        if (object.firstPageUrl != null)
            message.firstPageUrl = String(object.firstPageUrl);
        if (object.prevRoutePath != null)
            message.prevRoutePath = String(object.prevRoutePath);
        if (object.targetRouteName != null)
            message.targetRouteName = String(object.targetRouteName);
        return message;
    };

    /**
     * Creates a plain object from a RnRouteNotFound message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RnRouteNotFound
     * @static
     * @param {RnRouteNotFound} message RnRouteNotFound
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RnRouteNotFound.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.prevPageUrl = "";
            object.firstPageUrl = "";
            object.prevRoutePath = "";
            object.targetRouteName = "";
        }
        if (message.prevPageUrl != null && message.hasOwnProperty("prevPageUrl"))
            object.prevPageUrl = message.prevPageUrl;
        if (message.firstPageUrl != null && message.hasOwnProperty("firstPageUrl"))
            object.firstPageUrl = message.firstPageUrl;
        if (message.prevRoutePath != null && message.hasOwnProperty("prevRoutePath"))
            object.prevRoutePath = message.prevRoutePath;
        if (message.targetRouteName != null && message.hasOwnProperty("targetRouteName"))
            object.targetRouteName = message.targetRouteName;
        return object;
    };

    /**
     * Converts this RnRouteNotFound to JSON.
     * @function toJSON
     * @memberof RnRouteNotFound
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RnRouteNotFound.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for RnRouteNotFound
     * @function getTypeUrl
     * @memberof RnRouteNotFound
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    RnRouteNotFound.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/RnRouteNotFound";
    };

    return RnRouteNotFound;
})();

export { $root as default };
