/*
 * Copyright 2012 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for ProtoBuf.js.
 * @see https://github.com/dcodeIO/ProtoBuf.js
 * @externs
 */

/**
 BEGIN_NODE_INCLUDE
 var ProtoBuf = require('protobufjs');
 END_NODE_INCLUDE
 */

/**
 * {@type object.<string.*>}
 */
var ProtoBuf = {};

/**
 * @type {string}
 * @const
 */
ProtoBuf.VERSION = "0.9.2";

/**
 * @type {!object.<string,number>}
 * @const
 */
ProtoBuf.WIRE_TYPES = {};

/**
 * @type {number}
 * @const
 */
ProtoBuf.WIRE_TYPES.VARINT = 0;

/**
 * @type {number}
 * @const
 */
ProtoBuf.WIRE_TYPES.BITS64 = 1;

/**
 * @type {number}
 * @const
 */
ProtoBuf.WIRE_TYPES.LDELIM = 2;

/**
 * @type {number}
 * @const
 */
ProtoBuf.WIRE_TYPES.STARTGROUP = 3;

/**
 * @type {number}
 * @const
 */
ProtoBuf.WIRE_TYPES.ENDGROUP = 4;

/**
 * @type {number}
 * @const
 */
ProtoBuf.WIRE_TYPES.BITS32 = 5;

/**
 * @dict
 * @type {!object.<string,{name: string, wireType: number}>}
 * @const
 */
ProtoBuf.TYPES = {
    "int32": {
        name: "int32",
        wireType: ProtoBuf.WIRE_TYPES.VARINT
    },
    "uint32": {
        name: "uint32",
        wireType: ProtoBuf.WIRE_TYPES.VARINT
    },
    "sint32": {
        name: "sint32",
        wireType: ProtoBuf.WIRE_TYPES.VARINT
    },
    "bool": {
        name: "bool",
        wireType: ProtoBuf.WIRE_TYPES.VARINT
    },
    "double": {
        name: "double",
        wireType: ProtoBuf.WIRE_TYPES.BITS64
    },
    "string": {
        name: "string",
        wireType: ProtoBuf.WIRE_TYPES.LDELIM
    },
    "bytes": {
        name: "bytes",
        wireType: ProtoBuf.WIRE_TYPES.LDELIM
    },
    "fixed32": {
        name: "fixed32",
        wireType: ProtoBuf.WIRE_TYPES.BITS32
    },
    "sfixed32": {
        name: "sfixed32",
        wireType: ProtoBuf.WIRE_TYPES.BITS32
    },
    "float": {
        name: "float",
        wireType: ProtoBuf.WIRE_TYPES.BITS32
    },
    "enum": {
        name: "enum",
        wireType: ProtoBuf.WIRE_TYPES.VARINT
    },
    "message": {
        name: "message",
        wireType: ProtoBuf.WIRE_TYPES.LDELIM
    }
};

/**
 * @type {!object.<string,string|RegExp>}
 */
ProtoBuf.Lang = {};

/**
 * @type {!object.<string,function>}
 */
ProtoBuf.DotProto = {};

/**
 * @param {string} proto
 * @constructor
 */
ProtoBuf.DotProto.Tokenizer = function(proto) {};

/**
 * @type {string}
 */
ProtoBuf.DotProto.Tokenizer.prototype.source;

/**
 * @type {number}
 */
ProtoBuf.DotProto.Tokenizer.prototype.index;

/**
 * @type {array.<string>}
 */
ProtoBuf.DotProto.Tokenizer.prototype.stack;

/**
 * @type {boolean}
 */
ProtoBuf.DotProto.Tokenizer.prototype.readingString;

/**
 * @return {string}
 * @throws {Error}
 */
ProtoBuf.DotProto.Tokenizer.prototype.next = function() {};

/**
 * @return {string}
 * @nosideeffects
 */
ProtoBuf.DotProto.Tokenizer.prototype.toString = function() {};

/**
 * @param {string} proto
 * @constructor
 */
ProtoBuf.DotProto.Parser = function(proto) {};

/**
 * @type {!ProtoBuf.DotProto.Tokenizer}
 */
ProtoBuf.DotProto.Parser.prototype.tn;

/**
 * @return {{package: string, messages: Array.<Object>, options: Object<string,*>}}
 * @throws {Error}
 */
ProtoBuf.DotProto.Parser.prototype.parse = function() {};

/**
 * @return {string}
 * @nosideeffects
 */
ProtoBuf.DotProto.Parser.prototype.toString = function() {};

/**
 * @type {Object.<string,function>}
 */
ProtoBuf.Reflect.Reflect = {};

/**
 * @constructor
 * @param {ProtoBuf.Reflect.T} parent
 * @param {string} name Object name
 */
ProtoBuf.Reflect.T = function(parent, name) {};

/**
 * @type {?ProtoBuf.Reflect.T}
 */
ProtoBuf.Reflect.T.prototype.parent;

/**
 * @type {string}
 */
ProtoBuf.Reflect.T.prototype.name;

/**
 * @type {?ProtoBuf.Reflect.T}
 */
ProtoBuf.Reflect.T.prototype.resolvedType;

/**
 * @param {boolean=} includeClass
 * @return
 * @nosideeffects
 */
ProtoBuf.Reflect.T.prototype.toString = function(includeClass) {};

/**
 * @throws {Error}
 */
ProtoBuf.Reflect.T.prototype.build = function() {};

/**
 * @param {?ProtoBuf.Reflect.Namespace} parent
 * @param {string} name
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
ProtoBuf.Reflect.Namespace = function(parent, name) {};

/**
 * @type {Array.<ProtoBuf.Reflect.T>}
 */
ProtoBuf.Reflect.Namespace.prototype.children;

/**
 * @param {ProtoBuf.Reflect.T=} type
 * @return {Array.<ProtoBuf.Reflect.T>}
 * @nosideeffects
 */
ProtoBuf.Reflect.Namespace.prototype.getChildren = function(type) {};

/**
 * @param {ProtoBuf.Reflect.T} child
 * @throws {Error}
 */
ProtoBuf.Reflect.Namespace.prototype.addChild = function(child) {};

/**
 * @param {string|number} nameOrId
 * @returns {boolean}
 * @nosideeffects
 */
ProtoBuf.Reflect.Namespace.prototype.hasChild = function(nameOrId) {};

/**
 * @param {string|number} nameOrId
 * @return {?ProtoBuf.Reflect.T}
 * @nosideeffects
 */
ProtoBuf.Reflect.Namespace.prototype.getChild = function(nameOrId) {};

/**
 * @param {string} qn
 * @return {?ProtoBuf.Reflect.Namespace}
 * @nosideeffects
 */
ProtoBuf.Reflect.Namespace.prototype.resolve = function(qn) {};

/**
 * @return {Object.<string,Function|Object>}
 */
ProtoBuf.Reflect.Namespace.prototype.build = function() {};

/**
 * @param {!ProtoBuf.Reflect.Namespace} parent
 * @param {string} name
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
ProtoBuf.Reflect.Message = function(parent, name) {};

/**
 * @type {?ProtoBuf.Builder.Message}
 */
ProtoBuf.Reflect.Message.prototype.built;

/**
 * @return {!ProtoBuf.Builder.Message}
 * @throws {Error}
 */
ProtoBuf.Reflect.Message.prototype.build = function() {};

/**
 * @param {!ProtoBuf.Builder.Message} message
 * @param {!ByteBuffer} buffer
 * @return {!ByteBuffer}
 * @throws {string}
 */
ProtoBuf.Reflect.Message.prototype.encode = function(message, buffer) {};

/**
 * @param {!ByteBuffer} buffer
 * @param {number=} length
 * @return {!ProtoBuf.Builder.Message}
 * @throws {Error}
 */
ProtoBuf.Reflect.Message.prototype.decode = function(buffer, length) {};

/**
 * @param {!ProtoBuf.Reflect.Message} message
 * @param {string} rule
 * @param {string} type
 * @param {string} name
 * @param {number} id
 * @param {Object.<string.*>=} options
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
ProtoBuf.Reflect.Message.Field = function(message, rule, type, name, id, options) {};

/**
 * @type {boolean}
 */
ProtoBuf.Reflect.Message.prototype.required;

/**
 * @type {boolean}
 */
ProtoBuf.Reflect.Message.prototype.repeated;

/**
 * @type {string|{name: string, wireType: number}}
 */
ProtoBuf.Reflect.Message.prototype.type;

/**
 * @type {number}
 */
ProtoBuf.Reflect.Message.prototype.id;

/**
 * @type {!Object.<string,*>}
 */
ProtoBuf.Reflect.Message.prototype.options;

/**
 * @param {*} value
 * @param {boolean=} skipRepeated
 * @return {*}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Reflect.Message.Field.prototype.verifyValue = function(value, skipRepeated) {};

/**
 * @param {*} value
 * @param {!ByteBuffer} buffer
 * @return {!ByteBuffer}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Reflect.Message.Field.prototype.encode = function(value, buffer) {};

/**
 * @param {number} wireType
 * @param {!ByteBuffer} buffer
 * @return {*}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Reflect.Message.Field.prototype.decode = function(wireType, buffer) {};

/**
 * @param {*} value
 * @param {!ByteBuffer} buffer
 * @return {!ByteBuffer}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Reflect.Message.Field.prototype.encodeValue = function(value, buffer) {};

/**
 * @param {!ProtoBuf.Reflect.T} parent
 * @param {string} name
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
ProtoBuf.Reflect.Enum = function(parent, name) {};

/**
 * @return {Object<string,*>}
 */
ProtoBuf.Reflect.Enum.prototype.build = function() {};

/**
 * @param {!ProtoBuf.Reflect.Enum} enm
 * @param {string} name
 * @param {number} id 
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
ProtoBuf.Reflect.Enum.Value = function(enm, name, id) {};

/**
 * @type {number}
 */
ProtoBuf.Reflect.Enum.Value.prototype.id;

/**
 * @constructor
 */
ProtoBuf.Builder = function() {};

/**
 * @type {!ProtoBuf.Reflect.Namespace}
 */
ProtoBuf.Builder.prototype.ns;

/**
 * @type {?ProtoBuf.Reflect.T}
 */
ProtoBuf.Builder.prototype.ptr;

/**
 * @type {boolean}
 */
ProtoBuf.Builder.prototype.resolved;

/**
 * @type {Object.<string,ProtoBuf.Builder.Message|Object>|null}
 */
ProtoBuf.Builder.prototype.result;

/**
 */
ProtoBuf.Builder.prototype.reset = function() {};

/**
 * @param {string} pkg
 * @return {!ProtoBuf.Builder}
 * @throws {Error}
 */
ProtoBuf.Builder.prototype.define = function(pkg) {};

/**
 * @param {Object.<string,*>} def
 * @return {boolean}
 * @nosideeffects
 */
ProtoBuf.Builder.isValidMessage = function(def) {};

/**
 * @param {Object.<string,*>} def
 * @return {boolean}
 * @nosideeffects
 */
ProtoBuf.Builder.isValidMessageField = function(def) {};

/**
 * @param {Object.<string,*>} def
 * @return {boolean}
 */
ProtoBuf.Builder.isValidEnum = function(def) {};

/**
 * @param {Array.<Object.<string,*>>} messages
 * @return {ProtoBuf.Builder}
 * @throws {Error}
 */
ProtoBuf.Builder.prototype.create = function(messages) {};

/**
 * @throws {Error}
 */
ProtoBuf.Builder.prototype.resolveAll = function() {};

/**
 * @param {string=} path
 * @return {!ProtoBuf.Builder}
 * @throws {string}
 */
ProtoBuf.Builder.prototype.build = function(path) {};

/**
 * @return {string}
 * @nosideeffects
 */
ProtoBuf.Builder.prototype.toString = function() {};


/**
 * @param {Object.<string,*>} values
 * @constructor
 * @throws {Error}
 */
ProtoBuf.Builder.Message = function(values) {};

/**
 * @param {string} key
 * @param {*} value
 * @throws {Error}
 */
ProtoBuf.Builder.Message.prototype.add = function(key, value) {};

/**
 * @param {string} key
 * @param {*} value
 * @throws {Error}
 */
ProtoBuf.Builder.Message.prototype.set = function(key, value) {};

/**
 * @param {string} key
 * @return {*}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Builder.Message.prototype.get = function(key) {};

/**
 * @param {ByteBuffer=} buffer
 * @return {!ByteBuffer}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Builder.Message.prototype.encode = function(buffer) {};

/**
 * @return {ArrayBuffer}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Builder.Message.prototype.toArrayBuffer = function() {};

/**
 * @param {!ByteBuffer} buffer
 * @return {!ProtoBuf.Builder.Message}
 * @throws {Error}
 * @nosideeffects
 */
ProtoBuf.Builder.Message.decode = function(buffer) {};

/**
 * @return {string}
 * @nosideeffects
 */
ProtoBuf.Builder.Message.prototype.toString = function() {};

/**
 * @param {string} proto
 * @param {ProtoBuf.Builder=} builder
 * @return {!ProtoBuf.Builder}
 * @throws {Error}
 */
ProtoBuf.protoFromString = function(proto, builder) {};

/**
 * @param {string} filename
 * @param {(function(ProtoBuf.Builder)|ProtoBuf.Builder)=} callback
 * @param {ProtoBuf.Builder=} builder
 * @return {ProtoBuf.Builder|undefined}
 * @throws {Error}
 */
ProtoBuf.protoFromFile = function(filename, callback, builder) {};

/**
 * @param {string=} pkg
 * @return {!ProtoBuf.Builder}
 */
ProtoBuf.newBuilder = function(pkg) {};
