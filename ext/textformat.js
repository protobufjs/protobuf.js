"use strict";
var protobuf = require("../light");

var Type    = protobuf.Type,
    Enum    = protobuf.Enum,
    Field   = protobuf.Field,
    Reader  = protobuf.Reader,
    types   = protobuf.types,
    util    = protobuf.util;

var textformat = protobuf.textformat = module.exports = {};

var recursionLimit;

/**
 * Maximum recursion depth for text format parsing and formatting. Defaults to util.recursionLimit.
 * @type {number}
 */
Object.defineProperty(textformat, "recursionLimit", {
    get: function get() {
        return recursionLimit === undefined ? util.recursionLimit : recursionLimit;
    },
    set: function set(value) {
        recursionLimit = value == null ? undefined : value;
    }
});

/**
 * Maximum recursion depth for formatting length-delimited unknown fields.
 * @type {number}
 */
textformat.unknownRecursionLimit = 10;

var punct = {
    "{": true,
    "}": true,
    "<": true,
    ">": true,
    ":": true,
    "[": true,
    "]": true,
    ",": true,
    ";": true,
    "-": true
};

var identRe = /^[A-Za-z_][A-Za-z0-9_]*$/,
    numberStartRe = /[0-9]/,
    wordCharRe = /[A-Za-z0-9_]/,
    hexRe = /^[0-9A-Fa-f]$/,
    octRe = /^[0-7]$/,
    floatRe = /^(?:[0-9]+\.[0-9]*(?:[eE][+-]?[0-9]+)?[fF]?|\.[0-9]+(?:[eE][+-]?[0-9]+)?[fF]?|[0-9]+[eE][+-]?[0-9]+[fF]?|[0-9]+[fF])/,
    hexIntRe = /^0[xX][0-9A-Fa-f]+/,
    octIntRe = /^0[0-7]+/,
    decIntRe = /^(?:0|[1-9][0-9]*)/;

/**
 * Parses protobuf text format using the specified reflected message type.
 * @param {Type} type Reflected message type
 * @param {string} text Text format input
 * @returns {Message<{}>} Message instance
 */
function parseText(type, text) {
    if (!(type instanceof Type))
        throw TypeError("type must be a Type");
    type.root.resolveAll();
    var parser = new Parser(String(text));
    var object = parser.parseMessage(type, null, 0);
    parser.expectEnd();
    var err = verifyTextMessage(type, object),
        message;
    if (err)
        throw Error(err);
    message = type.create(object);
    return message;
}

/**
 * Formats a message as protobuf text format using the specified reflected type.
 * @param {Type} type Reflected message type
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Object} [options] Text format options
 * @param {boolean} [options.unknowns=false] Includes and formats unknown fields
 * @returns {string} Text format output
 */
function formatText(type, message, options) {
    if (!(type instanceof Type))
        throw TypeError("type must be a Type");
    type.root.resolveAll();
    var lines = [];
    writeMessage(type, message, lines, 0, options || {}, 0, textformat.recursionLimit);
    return lines.join("\n");
}

/**
 * Parses this type from protobuf text format.
 * @param {string} text Text format input
 * @returns {Message<{}>} Message instance
 */
Type.prototype.fromText = function fromText(text) {
    return parseText(this, text);
};

/**
 * Formats a message of this type as protobuf text format.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Object} [options] Text format options
 * @returns {string} Text format output
 */
Type.prototype.toText = function toText(message, options) {
    return formatText(this, message, options);
};

function Tokenizer(source) {
    this.source = source;
    this.pos = 0;
    this.len = source.length;
    this.line = 1;
    this.stack = [];
}

Tokenizer.prototype.error = function error(message) {
    return Error(message + " (line " + this.line + ")");
};

Tokenizer.prototype.peek = function peek() {
    var token = this.next();
    this.push(token);
    return token;
};

Tokenizer.prototype.push = function push(token) {
    if (token)
        this.stack.unshift(token);
};

Tokenizer.prototype.next = function next() {
    if (this.stack.length)
        return this.stack.shift();
    this.skipSpace();
    if (this.pos >= this.len)
        return null;

    var ch = this.source.charAt(this.pos);
    if (ch === "\"" || ch === "'")
        return this.readString(ch);
    if (ch === "." && numberStartRe.test(this.source.charAt(this.pos + 1)) || numberStartRe.test(ch))
        return this.readNumber();
    if (punct[ch]) {
        ++this.pos;
        return { type: "punct", value: ch, raw: ch, line: this.line };
    }
    return this.readWord();
};

Tokenizer.prototype.expect = function expect(value) {
    var token = this.next();
    if (!token || token.value !== value)
        throw this.error("expected '" + value + "'");
    return token;
};

Tokenizer.prototype.skip = function skip(value) {
    var token = this.next();
    if (token && token.value === value)
        return true;
    this.push(token);
    return false;
};

Tokenizer.prototype.skipSpace = function skipSpace() {
    var ch;
    while (this.pos < this.len) {
        ch = this.source.charAt(this.pos);
        if (ch === "#") {
            while (this.pos < this.len && this.source.charAt(this.pos) !== "\n")
                ++this.pos;
        } else if (ch === " " || ch === "\t" || ch === "\v" || ch === "\f" || ch === "\r") {
            ++this.pos;
        } else if (ch === "\n") {
            ++this.pos;
            ++this.line;
        } else
            break;
    }
};

Tokenizer.prototype.readWord = function readWord() {
    var start = this.pos,
        ch;
    while (this.pos < this.len) {
        ch = this.source.charAt(this.pos);
        if (ch === "#" || ch === "\"" || ch === "'" || punct[ch] || /\s/.test(ch))
            break;
        ++this.pos;
    }
    if (start === this.pos)
        throw this.error("illegal character '" + this.source.charAt(this.pos) + "'");
    var raw = this.source.substring(start, this.pos);
    return { type: "word", value: raw, raw: raw, line: this.line };
};

Tokenizer.prototype.readNumber = function readNumber() {
    var rest = this.source.substring(this.pos),
        matches = [
            floatRe.exec(rest),
            hexIntRe.exec(rest),
            octIntRe.exec(rest),
            decIntRe.exec(rest)
        ],
        raw = null;
    for (var i = 0; i < matches.length; ++i)
        if (matches[i] && (!raw || matches[i][0].length > raw.length))
            raw = matches[i][0];
    if (!raw)
        throw this.error("illegal number");
    this.pos += raw.length;
    if (this.pos < this.len && wordCharRe.test(this.source.charAt(this.pos)))
        throw this.error("illegal number '" + raw + this.source.charAt(this.pos) + "'");
    return { type: "number", value: raw, raw: raw, line: this.line };
};

Tokenizer.prototype.readString = function readString(quote) {
    var bytes = [],
        ch,
        code;
    ++this.pos;
    while (this.pos < this.len) {
        ch = this.source.charAt(this.pos++);
        if (ch === quote)
            return { type: "string", value: bytes, raw: quote, line: this.line };
        if (ch === "\n")
            throw this.error("illegal string");
        if (ch !== "\\") {
            code = ch.charCodeAt(0);
            if ((code & 0xFC00) === 0xD800 && this.pos < this.len) {
                var next = this.source.charCodeAt(this.pos);
                if ((next & 0xFC00) === 0xDC00) {
                    ++this.pos;
                    code = 0x10000 + ((code & 0x03FF) << 10) + (next & 0x03FF);
                }
            }
            pushUtf8(bytes, code);
            continue;
        }
        if (this.pos >= this.len)
            throw this.error("illegal string escape");
        ch = this.source.charAt(this.pos++);
        switch (ch) {
            case "a": bytes.push(7); break;
            case "b": bytes.push(8); break;
            case "f": bytes.push(12); break;
            case "n": bytes.push(10); break;
            case "r": bytes.push(13); break;
            case "t": bytes.push(9); break;
            case "v": bytes.push(11); break;
            case "?": bytes.push(63); break;
            case "\\": bytes.push(92); break;
            case "'": bytes.push(39); break;
            case "\"": bytes.push(34); break;
            case "x":
            case "X":
                bytes.push(this.readHexEscape());
                break;
            case "u":
                pushUtf8(bytes, this.readCodePoint(4));
                break;
            case "U":
                pushUtf8(bytes, this.readCodePoint(8));
                break;
            default:
                if (octRe.test(ch)) {
                    bytes.push(this.readOctEscape(ch));
                    break;
                }
                throw this.error("illegal string escape '\\" + ch + "'");
        }
    }
    throw this.error("unterminated string");
};

Tokenizer.prototype.readHexEscape = function readHexEscape() {
    var value = 0,
        count = 0,
        ch;
    while (count < 2 && this.pos < this.len && hexRe.test(ch = this.source.charAt(this.pos))) {
        value = value * 16 + parseInt(ch, 16);
        ++this.pos;
        ++count;
    }
    if (!count)
        throw this.error("illegal hex escape");
    return value;
};

Tokenizer.prototype.readOctEscape = function readOctEscape(first) {
    var value = parseInt(first, 8),
        count = 1,
        ch;
    while (count < 3 && this.pos < this.len && octRe.test(ch = this.source.charAt(this.pos))) {
        value = value * 8 + parseInt(ch, 8);
        ++this.pos;
        ++count;
    }
    return value & 255;
};

Tokenizer.prototype.readCodePoint = function readCodePoint(size) {
    var raw = this.source.substring(this.pos, this.pos + size);
    if (raw.length !== size || !/^[0-9A-Fa-f]+$/.test(raw))
        throw this.error("illegal unicode escape");
    this.pos += size;
    var code = parseInt(raw, 16);
    if (code > 0x10FFFF || code >= 0xD800 && code <= 0xDFFF)
        throw this.error("illegal unicode escape");
    return code;
};

function Parser(source) {
    this.tn = new Tokenizer(source);
    this.recursionLimit = textformat.recursionLimit;
}

Parser.prototype.error = function error(message) {
    throw this.tn.error(message);
};

Parser.prototype.expectEnd = function expectEnd() {
    var token = this.tn.next();
    if (token)
        this.error("unexpected token '" + token.value + "'");
};

Parser.prototype.checkRecursion = function checkRecursion(depth) {
    if (depth > this.recursionLimit)
        this.error("max depth exceeded");
};

Parser.prototype.parseMessage = function parseMessage(type, end, depth) {
    this.checkRecursion(depth);
    var object = {},
        seen = {};
    for (;;) {
        var token = this.tn.peek();
        if (!token) {
            if (end)
                this.error("expected '" + end + "'");
            return object;
        }
        if (end && token.value === end) {
            this.tn.next();
            return object;
        }
        if (isSeparator(token))
            this.error("unexpected separator");
        this.parseField(type, object, seen, depth);
        token = this.tn.peek();
        if (token && isSeparator(token)) {
            this.tn.next();
            token = this.tn.peek();
            if (token && isSeparator(token))
                this.error("unexpected separator");
        }
    }
};

Parser.prototype.parseField = function parseField(type, object, seen, depth) {
    var info = this.readFieldName(type);
    if (info.any) {
        this.parseAny(type, info.name, object, seen, depth);
        return;
    }
    if (!info.field) {
        this.skipReservedValue(depth);
        return;
    }

    var field = info.field.resolve();
    if (field.map) {
        this.parseMessageFieldDelimiter();
        this.parseMapField(field, object, depth);
    } else if (field.resolvedType instanceof Type) {
        this.parseMessageFieldDelimiter();
        if (this.tn.skip("[")) {
            if (!field.repeated)
                this.error(field.fullName + ": list value specified for singular field");
            if (!this.tn.skip("]")) {
                do {
                    addField(object, seen, field, this.parseMessageValue(field.resolvedType, depth));
                } while (this.tn.skip(","));
                this.tn.expect("]");
            }
        } else
            addField(object, seen, field, this.parseMessageValue(field.resolvedType, depth));
    } else {
        this.tn.expect(":");
        if (this.tn.skip("[")) {
            if (!field.repeated)
                this.error(field.fullName + ": list value specified for singular field");
            if (!this.tn.skip("]")) {
                do {
                    addField(object, seen, field, this.parseScalar(field));
                } while (this.tn.skip(","));
                this.tn.expect("]");
            }
        } else
            addField(object, seen, field, this.parseScalar(field));
    }
};

Parser.prototype.readFieldName = function readFieldName(type) {
    var token = this.tn.next();
    if (!token)
        this.error("expected field name");
    if (token.value === "[") {
        var bracketName = this.readBracketName();
        if (type.fullName === ".google.protobuf.Any" && bracketName.indexOf("/") >= 0)
            return { any: true, name: bracketName };
        return { field: lookupExtension(type, bracketName), name: bracketName };
    }
    if (token.type !== "word" || !identRe.test(token.value))
        this.error("illegal field name '" + token.value + "'");

    var field = lookupField(type, token.value);
    if (!field) {
        if (type.isReservedName(token.value))
            return { name: token.value };
        this.error(type.fullName + ": unknown field '" + token.value + "'");
    }
    return { field: field, name: token.value };
};

Parser.prototype.readBracketName = function readBracketName() {
    var parts = [],
        token;
    while (token = this.tn.next()) {
        if (token.value === "]")
            return parts.join("");
        parts.push(token.raw || token.value);
    }
    this.error("unterminated bracketed field name");
    return null;
};

Parser.prototype.parseAny = function parseAny(type, typeUrl, object, seen, depth) {
    this.parseMessageFieldDelimiter();
    validateTypeUrl(typeUrl);
    var typeName = typeUrl.substring(typeUrl.lastIndexOf("/") + 1),
        embeddedType = type.root.lookupType(typeName.charAt(0) === "." ? typeName : "." + typeName),
        embedded = this.parseMessageValue(embeddedType, depth),
        typeUrlField = lookupField(type, "type_url") || lookupField(type, "typeUrl"),
        valueField = lookupField(type, "value");
    addField(object, seen, typeUrlField, typeUrl);
    addField(object, seen, valueField, embeddedType.encode(embedded).finish());
};

Parser.prototype.parseMapField = function parseMapField(field, object, depth) {
    if (!object[field.name])
        object[field.name] = {};
    if (this.tn.skip("[")) {
        if (!this.tn.skip("]")) {
            do {
                addMapEntry(field, object[field.name], this.parseMapEntry(field, depth + 1));
            } while (this.tn.skip(","));
            this.tn.expect("]");
        }
    } else
        addMapEntry(field, object[field.name], this.parseMapEntry(field, depth + 1));
};

Parser.prototype.parseMessageFieldDelimiter = function parseMessageFieldDelimiter() {
    this.tn.skip(":");
};

Parser.prototype.parseMapEntry = function parseMapEntry(field, depth) {
    this.checkRecursion(depth);
    var end;
    if (this.tn.skip("{"))
        end = "}";
    else if (this.tn.skip("<"))
        end = ">";
    else
        this.error("expected map entry");

    var entry = {},
        token,
        valueField = mapValueField(field),
        keyField = mapKeyField(field);
    for (;;) {
        token = this.tn.peek();
        if (!token)
            this.error("expected '" + end + "'");
        if (token.value === end) {
            this.tn.next();
            return entry;
        }
        if (isSeparator(token))
            this.error("unexpected separator");
        token = this.tn.next();
        if (token.type !== "word")
            this.error("expected map field name");
        if (token.value === "key") {
            this.tn.expect(":");
            entry.key = this.parseScalar(keyField);
        } else if (token.value === "value") {
            if (valueField.resolvedType instanceof Type) {
                this.parseMessageFieldDelimiter();
                entry.value = this.parseMessageValue(valueField.resolvedType, depth);
            } else {
                this.tn.expect(":");
                entry.value = this.parseScalar(valueField);
            }
        } else
            this.error("unknown map field '" + token.value + "'");
        token = this.tn.peek();
        if (token && isSeparator(token)) {
            this.tn.next();
            token = this.tn.peek();
            if (token && isSeparator(token))
                this.error("unexpected separator");
        }
    }
};

Parser.prototype.parseMessageValue = function parseMessageValue(type, depth) {
    var end;
    if (this.tn.skip("{"))
        end = "}";
    else if (this.tn.skip("<"))
        end = ">";
    else
        this.error("expected message value");
    return this.parseMessage(type, end, depth + 1);
};

Parser.prototype.parseScalar = function parseScalar(field) {
    if (field.type === "string" || field.type === "bytes") {
        var bytes = this.readStringBytes();
        return field.type === "bytes" ? util.newBuffer(bytes) : utf8Read(bytes, true);
    }

    var sign = 1;
    if (this.tn.skip("-"))
        sign = -1;

    var token = this.tn.next();
    if (!token)
        this.error("expected value");

    if (field.resolvedType instanceof Enum)
        return parseEnum(field, token, sign);

    switch (field.type) {
        case "double":
        case "float":
            return parseFloatValue(token, sign);
        case "bool":
            return parseBool(token, sign);
        case "int32":
        case "sint32":
        case "sfixed32":
            return parseInteger(token, sign, false, 32);
        case "uint32":
        case "fixed32":
            return parseInteger(token, sign, true, 32);
        case "int64":
        case "sint64":
        case "sfixed64":
            return parseInteger(token, sign, false, 64);
        case "uint64":
        case "fixed64":
            return parseInteger(token, sign, true, 64);
        default:
            this.error(field.fullName + ": unsupported scalar type");
    }
    return undefined;
};

Parser.prototype.readStringBytes = function readStringBytes() {
    var token = this.tn.next(),
        bytes = [];
    if (!token || token.type !== "string")
        this.error("expected string");
    Array.prototype.push.apply(bytes, token.value);
    while ((token = this.tn.peek()) && token.type === "string") {
        token = this.tn.next();
        Array.prototype.push.apply(bytes, token.value);
    }
    return bytes;
};

Parser.prototype.skipReservedValue = function skipReservedValue(depth) {
    this.tn.skip(":");
    var token = this.tn.peek();
    if (!token)
        return;
    if (token.value === "{") {
        this.skipBalanced("{", "}", depth);
    } else if (token.value === "<") {
        this.skipBalanced("<", ">", depth);
    } else if (token.value === "[") {
        this.skipBalanced("[", "]", depth);
    } else if (token.type === "string") {
        this.readStringBytes();
    } else {
        if (token.value === "-")
            this.tn.next();
        this.tn.next();
    }
};

Parser.prototype.skipBalanced = function skipBalanced(open, close, depth) {
    var balance = 0,
        token;
    do {
        token = this.tn.next();
        if (!token)
            this.error("expected '" + close + "'");
        if (token.value === open) {
            if (depth + ++balance > this.recursionLimit)
                this.error("max depth exceeded");
        }
        else if (token.value === close)
            --balance;
    } while (balance);
};

function addField(object, seen, field, value) {
    if (field.repeated) {
        (object[field.name] || (object[field.name] = [])).push(value);
        return;
    }
    if (Object.prototype.hasOwnProperty.call(seen, field.name))
        throw Error(field.fullName + ": multiple values");
    if (field.partOf) {
        var oneofName = "$oneof:" + field.partOf.name;
        if (seen[oneofName])
            throw Error(field.partOf.name + ": multiple values");
        seen[oneofName] = true;
    }
    seen[field.name] = true;
    object[field.name] = value;
}

function addMapEntry(field, map, entry) {
    var keyField = mapKeyField(field),
        valueField = mapValueField(field),
        key = Object.prototype.hasOwnProperty.call(entry, "key")
            ? entry.key
            : defaultScalarValue(keyField),
        value = Object.prototype.hasOwnProperty.call(entry, "value")
            ? entry.value
            : defaultMapValue(valueField);
    map[mapKey(keyField, key)] = value;
}

function defaultMapValue(field) {
    if (field.resolvedType instanceof Type)
        return field.resolvedType.create();
    if (field.resolvedType instanceof Enum)
        return field.typeDefault;
    return defaultScalarValue(field);
}

function defaultScalarValue(field) {
    if (field.type === "string")
        return "";
    if (field.type === "bytes")
        return util.newBuffer([]);
    if (field.type === "bool")
        return false;
    return field.defaultValue;
}

function mapKeyField(field) {
    return {
        name: "key",
        fullName: field.fullName + ".key",
        type: field.keyType,
        resolvedType: null,
        defaultValue: field.keyType === "bool" ? false : field.keyType === "string" ? "" : 0
    };
}

function mapValueField(field) {
    return {
        name: "value",
        fullName: field.fullName + ".value",
        type: field.type,
        resolvedType: field.resolvedType,
        defaultValue: field.resolvedType instanceof Enum ? field.resolvedType.values[Object.keys(field.resolvedType.values)[0]] : field.typeDefault
    };
}

function mapKey(field, value) {
    if (types.long[field.type] !== undefined)
        return String(value);
    if (field.type === "bool")
        return value ? "true" : "false";
    return String(value);
}

function lookupField(type, name) {
    var fields = type.fieldsArray;
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve();
        if (field.name === name || underScore(field.name) === name)
            return field;
        if (field.delimited && field.resolvedType instanceof Type) {
            var groupName = field.resolvedType.name,
                lowerName = name.toLowerCase(),
                compactName = compact(name);
            if (groupName === name || underScore(groupName) === name
             || field.name.toLowerCase() === lowerName
             || groupName.toLowerCase() === lowerName
             || compact(field.name) === compactName
             || compact(groupName) === compactName)
                return field;
        }
    }
    return null;
}

function lookupExtension(type, name) {
    var fullName = name.charAt(0) === "." ? name : "." + name,
        camelName = camelCaseLastPath(fullName),
        field = type.get(fullName) || type.root.lookup(fullName, Field)
             || type.get(camelName) || type.root.lookup(camelName, Field);
    if (!field)
        field = lookupExtensionField(type, fullName);
    if (field && field.extend !== undefined && field.extensionField)
        field = field.extensionField;
    if (!field || field.parent !== type)
        throw Error(type.fullName + ": unknown extension '" + name + "'");
    return field;
}

function camelCaseLastPath(name) {
    var dot = name.lastIndexOf(".");
    return name.substring(0, dot + 1) + util.camelCase(name.substring(dot + 1));
}

function parseEnum(field, token, sign) {
    if (sign < 0) {
        if (token.type !== "number")
            throw Error(field.fullName + ": enum value expected");
        return checkEnumValue(field, parseInteger(token, sign, false, 32));
    }
    if (token.type === "word") {
        var value = field.resolvedType.values[token.value];
        if (value === undefined)
            throw Error(field.fullName + ": enum value expected");
        return value;
    }
    return checkEnumValue(field, parseInteger(token, sign, false, 32));
}

function parseBool(token, sign) {
    if (sign < 0)
        throw Error("bool value expected");
    if (token.type === "word") {
        switch (token.value) {
            case "true":
            case "True":
            case "t":
                return true;
            case "false":
            case "False":
            case "f":
                return false;
        }
    } else if (token.type === "number") {
        var value = parseInteger(token, 1, true, 32);
        if (value === 0)
            return false;
        if (value === 1)
            return true;
    }
    throw Error("bool value expected");
}

function parseFloatValue(token, sign) {
    if (token.type === "word") {
        switch (token.value.toLowerCase()) {
            case "inf":
            case "infinity":
                return sign * Infinity;
            case "nan":
                return NaN;
        }
        throw Error("float value expected");
    }
    if (token.type !== "number")
        throw Error("float value expected");
    var raw = token.value;
    if (/^0[xX]/.test(raw) || /^0[0-7]/.test(raw) && raw.length > 1)
        throw Error("float value expected");
    if (/[fF]$/.test(raw))
        raw = raw.substring(0, raw.length - 1);
    return sign * Number(raw);
}

function parseInteger(token, sign, unsigned, bits) {
    if (token.type !== "number")
        throw Error("integer value expected");
    if (sign < 0 && unsigned)
        throw Error("unsigned integer value expected");

    var raw = token.value,
        radix = 10,
        digits = raw;
    if (/^0[xX]/.test(raw)) {
        radix = 16;
        digits = raw.substring(2);
    } else if (/^0[0-7]/.test(raw) && raw.length > 1) {
        radix = 8;
        digits = raw.substring(1);
    } else if (!/^(?:0|[1-9][0-9]*)$/.test(raw))
        throw Error("integer value expected");

    if (typeof util.global.BigInt === "function")
        return parseIntegerBigInt(digits, radix, sign, unsigned, bits);

    var value = parseInt(digits, radix) * sign;
    if (bits === 64 && util.Long)
        return util.Long.fromString(String(value), unsigned);
    return value;
}

function parseIntegerBigInt(digits, radix, sign, unsigned, bits) {
    var value,
        BigInt = util.global.BigInt;
    if (radix === 16)
        value = BigInt("0x" + digits);
    else if (radix === 8)
        value = BigInt("0o" + digits);
    else
        value = BigInt(digits);
    if (sign < 0)
        value = -value;

    var min,
        max;
    if (bits === 32) {
        min = unsigned ? BigInt(0) : -BigInt(2147483648);
        max = unsigned ? BigInt(4294967295) : BigInt(2147483647);
    } else {
        min = unsigned ? BigInt(0) : -BigInt("9223372036854775808");
        max = unsigned ? BigInt("18446744073709551615") : BigInt("9223372036854775807");
    }
    if (value < min || value > max)
        throw Error((unsigned ? "unsigned " : "") + "integer value out of range");
    if (bits === 64 && util.Long)
        return util.Long.fromString(value.toString(), unsigned, 10);
    return Number(value);
}

function checkRecursion(depth, recursionLimit) {
    if (depth > recursionLimit)
        throw Error("max depth exceeded");
}

function writeMessage(type, message, lines, indent, options, depth, recursionLimit) {
    checkRecursion(depth, recursionLimit);
    var fields = type.fieldsArray.slice().sort(util.compareFieldsById);
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            value = message[field.name];
        if (value == null || !Object.prototype.hasOwnProperty.call(message, field.name))
            continue;
        if (field.map)
            writeMapField(field, value, lines, indent, options, depth, recursionLimit);
        else if (field.repeated)
            for (var j = 0; j < value.length; ++j)
                writeField(field, value[j], lines, indent, options, depth, recursionLimit);
        else
            writeField(field, value, lines, indent, options, depth, recursionLimit);
    }
    if (options.unknowns && message.$unknowns != null && Object.prototype.hasOwnProperty.call(message, "$unknowns"))
        writeUnknowns(message.$unknowns, lines, indent);
}

function writeMapField(field, map, lines, indent, options, depth, recursionLimit) {
    var keys = Object.keys(map).sort(),
        keyField = mapKeyField(field),
        valueField = mapValueField(field),
        name = formatFieldName(field),
        sp = spaces(indent);
    for (var i = 0; i < keys.length; ++i) {
        checkRecursion(depth + 1, recursionLimit);
        var key = keyField.long ? util.longFromKey(keys[i], keyField.type === "uint64" || keyField.type === "fixed64") : keys[i];
        if (keyField.type === "bool")
            key = util.boolFromKey(keys[i]);
        lines.push(sp + name + " {");
        lines.push(spaces(indent + 2) + "key: " + formatScalar(keyField, key));
        if (valueField.resolvedType instanceof Type) {
            lines.push(spaces(indent + 2) + "value {");
            writeMessage(valueField.resolvedType, map[keys[i]], lines, indent + 4, options, depth + 2, recursionLimit);
            lines.push(spaces(indent + 2) + "}");
        } else
            lines.push(spaces(indent + 2) + "value: " + formatScalar(valueField, map[keys[i]]));
        lines.push(sp + "}");
    }
}

function writeField(field, value, lines, indent, options, depth, recursionLimit) {
    var name = formatFieldName(field),
        sp = spaces(indent);
    if (field.resolvedType instanceof Type) {
        lines.push(sp + name + " {");
        writeMessage(field.resolvedType, value, lines, indent + 2, options, depth + 1, recursionLimit);
        lines.push(sp + "}");
    } else
        lines.push(sp + name + ": " + formatScalar(field, value));
}

function writeUnknowns(unknowns, lines, indent) {
    for (var i = 0; i < unknowns.length; ++i) {
        var reader = Reader.create(unknowns[i]);
        writeUnknownFieldSet(reader, lines, indent, undefined, textformat.unknownRecursionLimit);
        if (reader.pos !== reader.len)
            throw Error("invalid unknown field data");
    }
}

function writeUnknownFieldSet(reader, lines, indent, endGroup, recursionBudget) {
    if (recursionBudget < 0)
        throw Error("max depth exceeded");
    while (reader.pos < reader.len) {
        var tag = reader.tag(),
            fieldNumber = tag >>> 3,
            wireType = tag & 7;
        if (!fieldNumber)
            throw Error("illegal tag: field number 0");
        if (wireType === 4) {
            if (fieldNumber !== endGroup)
                throw Error("invalid end group tag");
            return;
        }
        writeUnknownField(reader, fieldNumber, wireType, lines, indent, recursionBudget);
    }
    if (endGroup !== undefined)
        throw Error("missing end group tag");
}

function writeUnknownField(reader, fieldNumber, wireType, lines, indent, recursionBudget) {
    var sp = spaces(indent),
        lo;
    switch (wireType) {
        case 0:
            lines.push(sp + fieldNumber + ": " + readUnknownVarint(reader));
            break;
        case 1:
            lo = reader.fixed32();
            lines.push(sp + fieldNumber + ": 0x" + hexPad(reader.fixed32(), 8) + hexPad(lo, 8));
            break;
        case 2:
            writeUnknownLengthDelimited(reader, fieldNumber, lines, indent, recursionBudget);
            break;
        case 3:
            lines.push(sp + fieldNumber + " {");
            writeUnknownFieldSet(reader, lines, indent + 2, fieldNumber, recursionBudget - 1);
            lines.push(sp + "}");
            break;
        case 5:
            lines.push(sp + fieldNumber + ": 0x" + hexPad(reader.fixed32(), 8));
            break;
        default:
            throw Error("invalid wire type " + wireType);
    }
}

function writeUnknownLengthDelimited(reader, fieldNumber, lines, indent, recursionBudget) {
    var value = reader.bytes(),
        nested = value.length && recursionBudget > 0
            ? tryFormatUnknownMessage(value, indent + 2, recursionBudget - 1)
            : null,
        sp = spaces(indent);
    if (nested) {
        lines.push(sp + fieldNumber + " {");
        for (var i = 0; i < nested.length; ++i)
            lines.push(nested[i]);
        lines.push(sp + "}");
    } else
        lines.push(sp + fieldNumber + ": " + quoteBytes(value));
}

function tryFormatUnknownMessage(bytes, indent, recursionBudget) {
    var reader = Reader.create(bytes),
        lines = [];
    try {
        writeUnknownFieldSet(reader, lines, indent, undefined, recursionBudget);
        return reader.pos === reader.len ? lines : null;
    } catch (e) {
        return null;
    }
}

function readUnknownVarint(reader) {
    var BigInt = util.global.BigInt;
    if (typeof BigInt !== "function")
        return String(reader.uint64());

    var value = BigInt(0),
        shift = BigInt(0),
        b;
    for (var i = 0; i < 10; ++i) {
        if (reader.pos >= reader.len)
            throw Error("invalid varint encoding");
        b = reader.buf[reader.pos++];
        value += BigInt(b & 127) << shift;
        if (b < 128)
            return value.toString();
        shift += BigInt(7);
    }
    throw Error("invalid varint encoding");
}

function hexPad(value, length) {
    var str = value.toString(16);
    while (str.length < length)
        str = "0" + str;
    return str;
}

function formatFieldName(field) {
    if (field.declaringField || field.name.charAt(0) === ".")
        return "[" + formatExtensionName(field) + "]";
    if (field.delimited && field.resolvedType instanceof Type && compact(field.name) === compact(field.resolvedType.name))
        return field.resolvedType.name;
    return underScore(field.name);
}

function formatExtensionName(field) {
    var name = field.name.replace(/^\./, ""),
        dot = name.lastIndexOf("."),
        path = name.substring(0, dot + 1),
        last = name.substring(dot + 1);
    if (field.delimited && field.resolvedType instanceof Type && field.resolvedType.group)
        last = last.toLowerCase();
    else
        last = underScore(last);
    return path + last;
}

function formatScalar(field, value) {
    if (field.resolvedType instanceof Enum) {
        var name = field.resolvedType.valuesById[value];
        return name === undefined ? String(value) : name;
    }
    switch (field.type) {
        case "string":
            return quoteBytes(utf8Bytes(String(value)));
        case "bytes":
            return quoteBytes(bytesValue(value));
        case "bool":
            return value ? "true" : "false";
        case "double":
        case "float":
            if (isNaN(value))
                return "nan";
            if (value === 0 && 1 / value === -Infinity)
                return "-0";
            if (value === Infinity)
                return "inf";
            if (value === -Infinity)
                return "-inf";
            return String(value);
        default:
            return String(value);
    }
}

function bytesValue(value) {
    if (typeof value === "string") {
        var length = util.base64.length(value),
            buffer = util.newBuffer(length);
        util.base64.decode(value, buffer, 0);
        return buffer;
    }
    return value;
}

function quoteBytes(bytes) {
    var out = "\"",
        oct;
    for (var i = 0; i < bytes.length; ++i) {
        var b = bytes[i];
        switch (b) {
            case 9: out += "\\t"; break;
            case 10: out += "\\n"; break;
            case 13: out += "\\r"; break;
            case 34: out += "\\\""; break;
            case 92: out += "\\\\"; break;
            default:
                if (b >= 32 && b <= 126)
                    out += String.fromCharCode(b);
                else {
                    oct = b.toString(8);
                    out += "\\" + (oct.length < 2 ? "00" : oct.length < 3 ? "0" : "") + oct;
                }
                break;
        }
    }
    return out + "\"";
}

function spaces(indent) {
    var str = "";
    while (str.length < indent)
        str += " ";
    return str;
}

function utf8Read(bytes, strict) {
    if (strict && !validUtf8(bytes))
        throw Error("invalid UTF-8 string");
    var buffer = util.newBuffer(bytes);
    return util.utf8.read(buffer, 0, buffer.length);
}

function validUtf8(bytes) {
    for (var i = 0, b; i < bytes.length;) {
        b = bytes[i++];
        if (b <= 0x7F)
            continue;
        if (b >= 0xC2 && b <= 0xDF) {
            if ((b = bytes[i++]) < 0x80 || b > 0xBF)
                return false;
        } else if (b === 0xE0) {
            if ((b = bytes[i++]) < 0xA0 || b > 0xBF || (b = bytes[i++]) < 0x80 || b > 0xBF)
                return false;
        } else if (b >= 0xE1 && b <= 0xEC || b >= 0xEE && b <= 0xEF) {
            if ((b = bytes[i++]) < 0x80 || b > 0xBF || (b = bytes[i++]) < 0x80 || b > 0xBF)
                return false;
        } else if (b === 0xED) {
            if ((b = bytes[i++]) < 0x80 || b > 0x9F || (b = bytes[i++]) < 0x80 || b > 0xBF)
                return false;
        } else if (b === 0xF0) {
            if ((b = bytes[i++]) < 0x90 || b > 0xBF || (b = bytes[i++]) < 0x80 || b > 0xBF || (b = bytes[i++]) < 0x80 || b > 0xBF)
                return false;
        } else if (b >= 0xF1 && b <= 0xF3) {
            if ((b = bytes[i++]) < 0x80 || b > 0xBF || (b = bytes[i++]) < 0x80 || b > 0xBF || (b = bytes[i++]) < 0x80 || b > 0xBF)
                return false;
        } else if (b === 0xF4) {
            if ((b = bytes[i++]) < 0x80 || b > 0x8F || (b = bytes[i++]) < 0x80 || b > 0xBF || (b = bytes[i++]) < 0x80 || b > 0xBF)
                return false;
        } else
            return false;
    }
    return true;
}

function utf8Bytes(str) {
    var buffer = util.newBuffer(util.utf8.length(str));
    util.utf8.write(str, buffer, 0);
    return buffer;
}

function pushUtf8(bytes, code) {
    if (code < 0x80) {
        bytes.push(code);
    } else if (code < 0x800) {
        bytes.push(code >> 6 | 192, code & 63 | 128);
    } else if (code < 0x10000) {
        bytes.push(code >> 12 | 224, code >> 6 & 63 | 128, code & 63 | 128);
    } else {
        bytes.push(code >> 18 | 240, code >> 12 & 63 | 128, code >> 6 & 63 | 128, code & 63 | 128);
    }
}

function verifyTextMessage(type, message) {
    var fields = type.fieldsArray;
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            value = message[field.name];
        if (value == null || !Object.prototype.hasOwnProperty.call(message, field.name)) {
            if (field.required)
                return field.fullName + ": missing required field";
            continue;
        }
        if (field.map) {
            if (field.resolvedType instanceof Type)
                for (var key in value)
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        var mapErr = verifyTextMessage(field.resolvedType, value[key]);
                        if (mapErr)
                            return mapErr;
                    }
        } else if (field.repeated) {
            if (field.resolvedType instanceof Type)
                for (var j = 0; j < value.length; ++j) {
                    var repeatedErr = verifyTextMessage(field.resolvedType, value[j]);
                    if (repeatedErr)
                        return repeatedErr;
                }
        } else if (field.resolvedType instanceof Type) {
            var err = verifyTextMessage(field.resolvedType, value);
            if (err)
                return err;
        }
    }
    return null;
}

function isSeparator(token) {
    return token.value === "," || token.value === ";";
}

function validateTypeUrl(typeUrl) {
    for (var i = 0; i < typeUrl.length; ++i)
        if (typeUrl.charAt(i) === "%") {
            if (i + 2 >= typeUrl.length || !hexRe.test(typeUrl.charAt(i + 1)) || !hexRe.test(typeUrl.charAt(i + 2)))
                throw Error("invalid Any type URL");
            i += 2;
        }
}

function lookupExtensionField(type, fullName) {
    var fields = type.fieldsArray;
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve();
        if (field.name.charAt(0) === "." && "." + formatExtensionName(field) === fullName)
            return field;
    }
    return null;
}

function checkEnumValue(field, value) {
    if (isClosedEnum(field) && field.resolvedType.valuesById[value] === undefined)
        throw Error(field.fullName + ": enum value expected");
    return value;
}

function isClosedEnum(field) {
    return field.resolvedType
        && field.resolvedType._features
        && field.resolvedType._features.enum_type === "CLOSED";
}

function compact(str) {
    return str.replace(/_/g, "").toLowerCase();
}

function underScore(str) {
    return str.substring(0, 1)
         + str.substring(1)
               .replace(/([A-Z])(?=[a-z]|$)/g, function($0, $1) { return "_" + $1.toLowerCase(); });
}
