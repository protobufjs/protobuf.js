/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
//? if (typeof NOPARSE === 'undefined') NOPARSE = false;

/**
 * @license ProtoBuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/ProtoBuf.js for details
 */
(function(global) {
    "use strict";
    
    function init(ByteBuffer) {

        /**
         * The ProtoBuf namespace.
         * @exports ProtoBuf
         * @namespace
         * @expose
         */
        var ProtoBuf = {};
        
        /**
         * ProtoBuf.js version.
         * @type {string}
         * @const
         * @expose
         */
        ProtoBuf.VERSION = /*?== VERSION */;

        /**
         * Wire types.
         * @type {Object.<string,number>}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES = {};

        /**
         * Varint wire type.
         * @type {number}
         * @expose
         */
        ProtoBuf.WIRE_TYPES.VARINT = 0;

        /**
         * Fixed 64 bits wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.BITS64 = 1;

        /**
         * Length delimited wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.LDELIM = 2;

        /**
         * Start group wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.STARTGROUP = 3;

        /**
         * End group wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.ENDGROUP = 4;

        /**
         * Fixed 32 bits wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.BITS32 = 5;

        /**
         * Packable wire types.
         * @type {!Array.<number>}
         * @const
         * @expose
         */
        ProtoBuf.PACKABLE_WIRE_TYPES = [
            ProtoBuf.WIRE_TYPES.VARINT,
            ProtoBuf.WIRE_TYPES.BITS64,
            ProtoBuf.WIRE_TYPES.BITS32
        ];

        /**
         * Types.
         * @dict
         * @type {Object.<string,{name: string, wireType: number}>}
         * @const
         * @expose
         */
        ProtoBuf.TYPES = {
            // According to the protobuf spec.
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
            "int64": {
                name: "int64",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "uint64": {
                name: "uint64",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "sint64": {
                name: "sint64",
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
            "fixed64": {
                name: "fixed64",
                wireType: ProtoBuf.WIRE_TYPES.BITS64
            },
            "sfixed64": {
                name: "sfixed64",
                wireType: ProtoBuf.WIRE_TYPES.BITS64
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
            },
            "group": {
                name: "group",
                wireType: ProtoBuf.WIRE_TYPES.STARTGROUP
            }
        };

        /**
         * Minimum field id.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.ID_MIN = 1;

        /**
         * Maximum field id.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.ID_MAX = 0x1FFFFFFF;

        /**
         * @type {!function(new: ByteBuffer, ...[*])}
         * @expose
         */
        ProtoBuf.ByteBuffer = ByteBuffer;

        /**
         * @type {?function(new: Long, ...[*])}
         * @expose
         */
        ProtoBuf.Long = ByteBuffer.Long || null;

        /**
         * If set to `true`, field names will be converted from underscore notation to camel case. Defaults to `false`.
         *  Must be set prior to parsing.
         * @type {boolean}
         * @expose
         */
        ProtoBuf.convertFieldsToCamelCase = false;

        /**
         * By default, messages are populated with (setX, set_x) accessors for each field. This can be disabled by
         *  setting this to `false` prior to building messages.
         * @type {boolean}
         * @expose
         */
        ProtoBuf.populateAccessors = true;
        
        //? include("ProtoBuf/Util.js");
        
        //? include("ProtoBuf/Lang.js");
        
        //? if (!NOPARSE) include("ProtoBuf/DotProto.js");
        
        //? include("ProtoBuf/Reflect.js");
        
        //? include("ProtoBuf/Builder.js");

        //? if (!NOPARSE) {
        
        /**
         * Loads a .proto string and returns the Builder.
         * @param {string} proto .proto file contents
         * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
         * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
         * @return {ProtoBuf.Builder} Builder to create new messages
         * @throws {Error} If the definition cannot be parsed or built
         * @expose
         */
        ProtoBuf.loadProto = function(proto, builder, filename) {
            if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
                filename = builder,
                builder = undefined;
            return ProtoBuf.loadJson((new ProtoBuf.DotProto.Parser(proto)).parse(), builder, filename);
        };

        /**
         * Loads a .proto string and returns the Builder. This is an alias of {@link ProtoBuf.loadProto}.
         * @function
         * @param {string} proto .proto file contents
         * @param {(ProtoBuf.Builder|string)=} builder Builder to append to. Will create a new one if omitted.
         * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
         * @return {ProtoBuf.Builder} Builder to create new messages
         * @throws {Error} If the definition cannot be parsed or built
         * @expose
         */
        ProtoBuf.protoFromString = ProtoBuf.loadProto; // Legacy

        /**
         * Loads a .proto file and returns the Builder.
         * @param {string|{root: string, file: string}} filename Path to proto file or an object specifying 'file' with
         *  an overridden 'root' path for all imported files.
         * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
         *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
         *  file will be read synchronously and this function will return the Builder.
         * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
         * @return {?ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
         *   request has failed), else undefined
         * @expose
         */
        ProtoBuf.loadProtoFile = function(filename, callback, builder) {
            if (callback && typeof callback === 'object')
                builder = callback,
                callback = null;
            else if (!callback || typeof callback !== 'function')
                callback = null;
            if (callback)
                return ProtoBuf.Util.fetch(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(contents) {
                    if (contents === null) {
                        callback(Error("Failed to fetch file"));
                        return;
                    }
                    try {
                        callback(null, ProtoBuf.loadProto(contents, builder, filename));
                    } catch (e) {
                        callback(e);
                    }
                });
            var contents = ProtoBuf.Util.fetch(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename);
            return contents === null ? null : ProtoBuf.loadProto(contents, builder, filename);
        };

        /**
         * Loads a .proto file and returns the Builder. This is an alias of {@link ProtoBuf.loadProtoFile}.
         * @function
         * @param {string|{root: string, file: string}} filename Path to proto file or an object specifying 'file' with
         *  an overridden 'root' path for all imported files.
         * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
         *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
         *  file will be read synchronously and this function will return the Builder.
         * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
         * @return {!ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
         *   request has failed), else undefined
         * @expose
         */
        ProtoBuf.protoFromFile = ProtoBuf.loadProtoFile; // Legacy

        //? } // !NOPARSE

        /**
         * Constructs a new empty Builder.
         * @param {Object.<string,*>=} options Builder options, defaults to global options set on ProtoBuf
         * @return {!ProtoBuf.Builder} Builder
         * @expose
         */
        ProtoBuf.newBuilder = function(options) {
            options = options || {};
            if (typeof options['convertFieldsToCamelCase'] === 'undefined')
                options['convertFieldsToCamelCase'] = ProtoBuf.convertFieldsToCamelCase;
            if (typeof options['populateAccessors'] === 'undefined')
                options['populateAccessors'] = ProtoBuf.populateAccessors;
            return new ProtoBuf.Builder(options);
        };

        /**
         * Loads a .json definition and returns the Builder.
         * @param {!*|string} json JSON definition
         * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
         * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
         * @return {ProtoBuf.Builder} Builder to create new messages
         * @throws {Error} If the definition cannot be parsed or built
         * @expose
         */
        ProtoBuf.loadJson = function(json, builder, filename) {
            if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
                filename = builder,
                builder = null;
            if (!builder || typeof builder !== 'object')
                builder = ProtoBuf.newBuilder();
            if (typeof json === 'string')
                json = JSON.parse(json);
            builder["import"](json, filename);
            builder.resolveAll();
            return builder;
        };

        /**
         * Loads a .json file and returns the Builder.
         * @param {string|!{root: string, file: string}} filename Path to json file or an object specifying 'file' with
         *  an overridden 'root' path for all imported files.
         * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
         *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
         *  file will be read synchronously and this function will return the Builder.
         * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
         * @return {?ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
         *   request has failed), else undefined
         * @expose
         */
        ProtoBuf.loadJsonFile = function(filename, callback, builder) {
            if (callback && typeof callback === 'object')
                builder = callback,
                callback = null;
            else if (!callback || typeof callback !== 'function')
                callback = null;
            if (callback)
                return ProtoBuf.Util.fetch(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(contents) {
                    if (contents === null) {
                        callback(Error("Failed to fetch file"));
                        return;
                    }                        
                    try {
                        callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
                    } catch (e) {
                        callback(e);
                    }
                });
            var contents = ProtoBuf.Util.fetch(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename);
            return contents === null ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
        };

        return ProtoBuf;
    }

    /* CommonJS */ if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
        module['exports'] = init(require("bytebuffer"));
    /* AMD */ else if (typeof define === 'function' && define["amd"])
        define(["ByteBuffer"], init);
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["ProtoBuf"] = init(global["dcodeIO"]["ByteBuffer"]);

})(this);
