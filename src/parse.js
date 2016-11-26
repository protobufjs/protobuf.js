"use strict";
module.exports = parse;

var tokenize = require("./tokenize"),
    Root     = require("./root"),
    Type     = require("./type"),
    Field    = require("./field"),
    MapField = require("./mapfield"),
    OneOf    = require("./oneof"),
    Enum     = require("./enum"),
    Service  = require("./service"),
    Method   = require("./method"),
    types    = require("./types");

var nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
    fqTypeRefRe = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;

function lower(token) {
    return token === null ? null : token.toLowerCase();
}

function camelCase(name) {
    return name.substring(0,1)
         + name.substring(1)
               .replace(/_([a-z])(?=[a-z]|$)/g, function($0, $1) { return $1.toUpperCase(); });
}

var s_required = "required",
    s_repeated = "repeated",
    s_optional = "optional",
    s_option   = "option",
    s_name     = "name",
    s_type     = "type";
var s_open     = "{",
    s_close    = "}",
    s_bopen    = '(',
    s_bclose   = ')',
    s_semi     = ";",
    s_dq       = '"',
    s_sq       = "'";

/**
 * Result object returned from {@link parse}.
 * @typedef ParserResult
 * @type {Object}
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} [root] Root to populate
 * @returns {ParserResult} Parser result
 */
function parse(source, root) {
    /* eslint-disable default-case, callback-return */
    if (!root)
        root = new Root();

    var tn = tokenize(source),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip;

    var head = true,
        pkg,
        imports,
        weakImports,
        syntax,
        isProto3 = false;

    if (!root)
        root = new Root();

    var ptr = root;

    function illegal(token, name) {
        return Error("illegal " + (name || "token") + " '" + token + "' (line " + tn.line() + s_bclose);
    }

    function readString() {
        var values = [],
            token;
        do {
            if ((token = next()) !== s_dq && token !== s_sq)
                throw illegal(token);
            values.push(next());
            skip(token);
            token = peek();
        } while (token === s_dq || token === s_sq);
        return values.join('');
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (lower(token)) {
            case s_sq:
            case s_dq:
                push(token);
                return readString();
            case "true":
                return true;
            case "false":
                return false;
        }
        try {
            return parseNumber(token);
        } catch (e) {
            if (acceptTypeRef && typeRefRe.test(token))
                return token;
            throw illegal(token, "value");
        }
    }

    function readRange() {
        var start = parseId(next());
        var end = start;
        if (skip("to", true))
            end = parseId(next());
        skip(s_semi);
        return [ start, end ];
    }

    function parseNumber(token) {
        var sign = 1;
        if (token.charAt(0) === '-') {
            sign = -1;
            token = token.substring(1);
        }
        var tokenLower = lower(token);
        switch (tokenLower) {
            case "inf": return sign * Infinity;
            case "nan": return NaN;
            case "0": return 0;
        }
        if (/^[1-9][0-9]*$/.test(token))
            return sign * parseInt(token, 10);
        if (/^0[x][0-9a-f]+$/.test(tokenLower))
            return sign * parseInt(token, 16);
        if (/^0[0-7]+$/.test(token))
            return sign * parseInt(token, 8);
        if (/^[0-9]*(?:\.[0-9]*)?(?:[e][+-]?[0-9]+)?$/.test(tokenLower))
            return sign * parseFloat(token);
        throw illegal(token, 'number');
    }

    function parseId(token) {
        var tokenLower = lower(token);
        switch (tokenLower) {
            case "min": return 1;
            case "max": return 0x1FFFFFFF;
            case "0": return 0;
        }
        if (/^[1-9][0-9]*$/.test(token))
            return parseInt(token, 10);
        if (/^0[x][0-9a-f]+$/.test(tokenLower))
            return parseInt(token, 16);
        if (/^0[0-7]+$/.test(token))
            return parseInt(token, 8);
        throw illegal(token, "id");
    }

    function parsePackage() {
        if (pkg !== undefined)
            throw illegal("package");
        pkg = next();
        if (!typeRefRe.test(pkg))
            throw illegal(pkg, s_name);
        ptr = ptr.define(pkg);
        skip(s_semi);
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
                // eslint-disable-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        skip(s_semi);
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = lower(readString());
        var p3;
        if ([ "proto2", p3 = "proto3" ].indexOf(syntax) < 0)
            throw illegal(syntax, "syntax");
        isProto3 = syntax === p3;
        skip(s_semi);
    }

    function parseCommon(parent, token) {
        switch (token) {

            case s_option:
                parseOption(parent, token);
                skip(s_semi);
                return true;

            case "message":
                parseType(parent, token);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "service":
                parseService(parent, token);
                return true;

            case "extend":
                parseExtension(parent, token);
                return true;
        }
        return false;
    }

    function parseType(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, "type name");
        var type = new Type(name);
        if (skip(s_open, true)) {
            while ((token = next()) !== s_close) {
                var tokenLower = lower(token);
                if (parseCommon(type, token))
                    continue;
                switch (tokenLower) {
                    case "map":
                        parseMapField(type, tokenLower);
                        break;
                    case s_required:
                    case s_optional:
                    case s_repeated:
                        parseField(type, tokenLower);
                        break;
                    case "oneof":
                        parseOneOf(type, tokenLower);
                        break;
                    case "extensions":
                        (type.extensions || (type.extensions = [])).push(readRange(type, tokenLower));
                        break;
                    case "reserved":
                        (type.reserved || (type.reserved = [])).push(readRange(type, tokenLower));
                        break;
                    default:
                        if (!isProto3 || !typeRefRe.test(token))
                            throw illegal(token);
                        push(token);
                        parseField(type, s_optional);
                        break;
                }
            }
            skip(s_semi, true);
        } else
            skip(s_semi);
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (!typeRefRe.test(type))
            throw illegal(type, s_type);
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        name = camelCase(name);
        skip("=");
        var id = parseId(next());
        var field = parseInlineOptions(new Field(name, id, type, rule, extend));
        if (field.repeated)
            field.setOption("packed", isProto3, /* ifNotSet */ true);
        parent.add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();
        if (types.mapKey[keyType] === undefined)
            throw illegal(keyType, s_type);
        skip(",");
        var valueType = next();
        if (!typeRefRe.test(valueType))
            throw illegal(valueType, s_type);
        skip(">");
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        name = camelCase(name);
        skip("=");
        var id = parseId(next());
        var field = parseInlineOptions(new MapField(name, id, keyType, valueType));
        parent.add(field);
    }

    function parseOneOf(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        name = camelCase(name);
        var oneof = new OneOf(name);
        if (skip(s_open, true)) {
            while ((token = next()) !== s_close) {
                if (token === s_option) {
                    parseOption(oneof, token);
                    skip(s_semi);
                } else {
                    push(token);
                    parseField(oneof, s_optional);
                }
            }
            skip(s_semi, true);
        } else
            skip(s_semi);
        parent.add(oneof);
    }

    function parseEnum(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        var values = {};
        var enm = new Enum(name, values);
        if (skip(s_open, true)) {
            while ((token = next()) !== s_close) {
                if (lower(token) === s_option)
                    parseOption(enm);
                else
                    parseEnumField(enm, token);
            }
            skip(s_semi, true);
        } else
            skip(s_semi);
        parent.add(enm);
    }

    function parseEnumField(parent, token) {
        if (!nameRe.test(token))
            throw illegal(token, s_name);
        var name = token;
        skip("=");
        var value = parseId(next());
        parseInlineOptions(parent.values[name] = new Number(value)); // eslint-disable-line no-new-wrappers
    }

    function parseOption(parent, token) {
        var custom = skip(s_bopen, true);
        var name = next();
        if (!typeRefRe.test(name))
            throw illegal(name, s_name);
        if (custom) {
            skip(s_bclose);
            name = s_bopen + name + s_bclose;
            token = peek();
            if (fqTypeRefRe.test(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (skip(s_open, true)) {
            while ((token = next()) !== s_close) {
                if (!nameRe.test(token))
                    throw illegal(token, s_name);
                name = name + "." + token;
                if (skip(":", true))
                    setOption(parent, name, readValue(true));
                else
                    parseOptionValue(parent, name);
            }
            skip(s_semi, true);
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
        else
            parent[name] = value;
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, s_option);
            } while (skip(",", true));
            skip("]");
        }
        skip(s_semi);
        return parent;
    }

    function parseService(parent, token) {
        token = next();
        if (!nameRe.test(token))
            throw illegal(token, "service name");
        var name = token;
        var service = new Service(name);
        if (skip(s_open, true)) {
            while ((token = next()) !== s_close) {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case s_option:
                        parseOption(service, tokenLower);
                        skip(s_semi);
                        break;
                    case "rpc":
                        parseMethod(service, tokenLower);
                        break;
                    default:
                        throw illegal(token);
                }
            }
            skip(s_semi, true);
        } else
            skip(s_semi);
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        var requestType, requestStream,
            responseType, responseStream;
        skip(s_bopen);
        var st;
        if (skip(st = "stream", true))
            requestStream = true;
        if (!typeRefRe.test(token = next()))
            throw illegal(token);
        requestType = token;
        skip(s_bclose); skip("returns"); skip(s_bopen);
        if (skip(st, true))
            responseStream = true;
        if (!typeRefRe.test(token = next()))
            throw illegal(token);
        responseType = token;
        skip(s_bclose);
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        if (skip(s_open, true)) {
            while ((token = next()) !== s_close) {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case s_option:
                        parseOption(method, tokenLower);
                        skip(s_semi);
                        break;
                    default:
                        throw illegal(token);
                }
            }
            skip(s_semi, true);
        } else
            skip(s_semi);
        parent.add(method);
    }

    function parseExtension(parent, token) {
        var reference = next();
        if (!typeRefRe.test(reference))
            throw illegal(reference, "reference");
        if (skip(s_open, true)) {
            while ((token = next()) !== s_close) {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case s_required:
                    case s_repeated:
                    case s_optional:
                        parseField(parent, tokenLower, reference);
                        break;
                    default:
                        if (!isProto3 || !typeRefRe.test(token))
                            throw illegal(token);
                        push(token);
                        parseField(parent, s_optional, reference);
                        break;
                }
            }
            skip(s_semi, true);
        } else
            skip(s_semi);
    }

    var token;
    while ((token = next()) !== null) {
        var tokenLower = lower(token);
        switch (tokenLower) {

            case "package":
                if (!head)
                    throw illegal(token);
                parsePackage();
                break;

            case "import":
                if (!head)
                    throw illegal(token);
                parseImport();
                break;

            case "syntax":
                if (!head)
                    throw illegal(token);
                parseSyntax();
                break;

            case s_option:
                if (!head)
                    throw illegal(token);
                parseOption(ptr, token);
                skip(s_semi);
                break;

            default:
                if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }
                throw illegal(token);
        }
    }

    return {
        package       : pkg,
        imports       : imports,
        weakImports   : weakImports,
        syntax        : syntax,
        root          : root
    };
}
