/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, jsdoc/require-param*/
"use strict";

var $protobuf = require("../../minimal");

var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var $root = $protobuf.roots.test_bench || ($protobuf.roots.test_bench = {});

$root.Test = (function() {

    function Test(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    Test.prototype.string = "";
    Test.prototype.uint32 = 0;
    Test.prototype.inner = null;
    Test.prototype.float = 0;

    Test.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.string != null && Object.hasOwnProperty.call(message, "string"))
            writer.uint32(10).string(message.string);
        if (message.uint32 != null && Object.hasOwnProperty.call(message, "uint32"))
            writer.uint32(16).uint32(message.uint32);
        if (message.inner != null && Object.hasOwnProperty.call(message, "inner"))
            $root.Test.Inner.encode(message.inner, writer.uint32(26).fork()).ldelim();
        if (message.float != null && Object.hasOwnProperty.call(message, "float"))
            writer.uint32(37).float(message.float);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    Test.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        var end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.Test(), value;
        while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.uint32();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
            case 0:
                throw Error("illegal tag: field number 0");
            case 1: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.string = value;
                    else
                        delete message.string;
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.uint32())
                        message.uint32 = value;
                    else
                        delete message.uint32;
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.inner = $root.Test.Inner.decode(reader, reader.uint32(), undefined, _depth + 1, message.inner);
                    continue;
                }
            case 4: {
                    if (wireType !== 5)
                        break;
                    if ((value = reader.float()) !== 0)
                        message.float = value;
                    else
                        delete message.float;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    Test.Inner = (function() {

        function Inner(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        Inner.prototype.int32 = 0;
        Inner.prototype.innerInner = null;
        Inner.prototype.outer = null;

        Inner.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.int32 != null && Object.hasOwnProperty.call(message, "int32"))
                writer.uint32(8).int32(message.int32);
            if (message.innerInner != null && Object.hasOwnProperty.call(message, "innerInner"))
                $root.Test.Inner.InnerInner.encode(message.innerInner, writer.uint32(18).fork()).ldelim();
            if (message.outer != null && Object.hasOwnProperty.call(message, "outer"))
                $root.Outer.encode(message.outer, writer.uint32(26).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        Inner.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            var end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.Test.Inner(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 0:
                    throw Error("illegal tag: field number 0");
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.int32 = value;
                        else
                            delete message.int32;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.innerInner = $root.Test.Inner.InnerInner.decode(reader, reader.uint32(), undefined, _depth + 1, message.innerInner);
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.outer = $root.Outer.decode(reader, reader.uint32(), undefined, _depth + 1, message.outer);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        Inner.InnerInner = (function() {

            function InnerInner(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            InnerInner.prototype.long = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
            InnerInner.prototype["enum"] = 0;
            InnerInner.prototype.sint32 = 0;

            InnerInner.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.long != null && Object.hasOwnProperty.call(message, "long"))
                    writer.uint32(8).int64(message.long);
                if (message["enum"] != null && Object.hasOwnProperty.call(message, "enum"))
                    writer.uint32(16).int32(message["enum"]);
                if (message.sint32 != null && Object.hasOwnProperty.call(message, "sint32"))
                    writer.uint32(24).sint32(message.sint32);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (var i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            InnerInner.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                var end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.Test.Inner.InnerInner(), value;
                while (reader.pos < end) {
                    var start = reader.pos;
                    var tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    var wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 0:
                        throw Error("illegal tag: field number 0");
                    case 1: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.long = value;
                            else
                                delete message.long;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message["enum"] = value;
                            else
                                delete message["enum"];
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.sint32())
                                message.sint32 = value;
                            else
                                delete message.sint32;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                return message;
            };

            return InnerInner;
        })();

        return Inner;
    })();

    Test.Enum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ONE"] = 0;
        values[valuesById[1] = "TWO"] = 1;
        values[valuesById[2] = "THREE"] = 2;
        values[valuesById[3] = "FOUR"] = 3;
        values[valuesById[4] = "FIVE"] = 4;
        return values;
    })();

    return Test;
})();

$root.Outer = (function() {

    function Outer(properties) {
        this.bool = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    Outer.prototype.bool = $util.emptyArray;
    Outer.prototype.double = 0;

    Outer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.bool != null && message.bool.length) {
            writer.uint32(10).fork();
            for (var i = 0; i < message.bool.length; ++i)
                writer.bool(message.bool[i]);
            writer.ldelim();
        }
        if (message.double != null && Object.hasOwnProperty.call(message, "double"))
            writer.uint32(17).double(message.double);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    Outer.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        var end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.Outer(), value;
        while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.uint32();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
            case 0:
                throw Error("illegal tag: field number 0");
            case 1: {
                    if (wireType === 2) {
                        if (!(message.bool && message.bool.length))
                            message.bool = [];
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.bool.push(reader.bool());
                        continue;
                    }
                    if (wireType !== 0)
                        break;
                    if (!(message.bool && message.bool.length))
                        message.bool = [];
                    message.bool.push(reader.bool());
                    continue;
                }
            case 2: {
                    if (wireType !== 1)
                        break;
                    if ((value = reader.double()) !== 0)
                        message.double = value;
                    else
                        delete message.double;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    return Outer;
})();

module.exports = $root;
