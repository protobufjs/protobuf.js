"use strict";
module.exports = parse;

parse.filename = null;
parse.defaults = { keepCase: false };

var tokenize  = require("./tokenize"),
    Root      = require("./root"),
    Type      = require("./type"),
    Field     = require("./field"),
    MapField  = require("./mapfield"),
    OneOf     = require("./oneof"),
    Enum      = require("./enum"),
    Service   = require("./service"),
    Method    = require("./method"),
    types     = require("./types"),
    util      = require("./util");

function isName(token) {
    return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(token);
}

function isTypeRef(token) {
    return /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/.test(token);
}

function isFqTypeRef(token) {
    return /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/.test(token);
}

function lower(token) {
    return token === null ? null : token.toLowerCase();
}

function camelCase(str) {
    return str.substring(0,1)
         + str.substring(1)
               .replace(/_([a-z])(?=[a-z]|$)/g, function($0, $1) { return $1.toUpperCase(); });
}

/**
 * Result object returned from {@link parse}.
 * @typedef ParserResult
 * @type {Object.<string,*>}
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */

/**
 * Options modifying the behavior of {@link parse}.
 * @typedef ParseOptions
 * @type {Object.<string,*>}
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @function
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {ParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {ParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {ParseOptions} defaults Default {@link ParseOptions}
 */
function parse(source, root, options) {
    /* eslint-disable callback-return */
    if (!(root instanceof Root)) {
        options = root;
        root = new Root();
    }
    if (!options)
        options = parse.defaults;

    var tn = tokenize(source),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        cmnt = tn.cmnt;

    var head = true,
        pkg,
        imports,
        weakImports,
        syntax,
        isProto3 = false;

    var ptr = root;

    var applyCase = options.keepCase ? function(name) { return name; } : camelCase;

    /* istanbul ignore next */
    function illegal(token, name) {
        var filename = parse.filename;
        parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line() + ")");
    }

    function readString() {
        var values = [],
            token;
        /* istanbul ignore next */
        do {
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal(token);
            values.push(next());
            skip(token);
            token = peek();
        } while (token === "\"" || token === "'");
        return values.join("");
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (lower(token)) {
            case "'":
            case "\"":
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
            /* istanbul ignore else */
            if (acceptTypeRef && isTypeRef(token))
                return token;
            /* istanbul ignore next */
            throw illegal(token, "value");
        }
    }

    function readRange() {
        var start = parseId(next());
        var end = start;
        if (skip("to", true))
            end = parseId(next());
        skip(";");
        return [ start, end ];
    }

    function parseNumber(token) {
        var sign = 1;
        if (token.charAt(0) === "-") {
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
        if (/^(?!e)[0-9]*(?:\.[0-9]*)?(?:[e][+-]?[0-9]+)?$/.test(tokenLower))
            return sign * parseFloat(token);
        /* istanbul ignore next */
        throw illegal(token, "number");
    }

    function parseId(token, acceptNegative) {
        var tokenLower = lower(token);
        switch (tokenLower) {
            case "max": return 536870911;
            case "0": return 0;
        }
        /* istanbul ignore next */
        if (token.charAt(0) === "-" && !acceptNegative)
            throw illegal(token, "id");
        if (/^-?[1-9][0-9]*$/.test(token))
            return parseInt(token, 10);
        if (/^-?0[x][0-9a-f]+$/.test(tokenLower))
            return parseInt(token, 16);
        /* istanbul ignore else */
        if (/^-?0[0-7]+$/.test(token))
            return parseInt(token, 8);
        /* istanbul ignore next */
        throw illegal(token, "id");
    }

    function parsePackage() {
        /* istanbul ignore next */
        if (pkg !== undefined)
            throw illegal("package");
        pkg = next();
        /* istanbul ignore next */
        if (!isTypeRef(pkg))
            throw illegal(pkg, "name");
        ptr = ptr.define(pkg);
        skip(";");
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
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = lower(readString());
        isProto3 = syntax === "proto3";
        /* istanbul ignore next */
        if (!isProto3 && syntax !== "proto2")
            throw illegal(syntax, "syntax");
        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
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
        /* istanbul ignore next */
        if (!isName(name))
            throw illegal(name, "type name");
        var type = new Type(name);
        type.comment = cmnt();
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                if (parseCommon(type, token))
                    continue;
                switch (tokenLower) {

                    case "map":
                        parseMapField(type, tokenLower);
                        break;

                    case "required":
                    case "optional":
                    case "repeated":
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
                        /* istanbul ignore next */
                        if (!isProto3 || !isTypeRef(token))
                            throw illegal(token);
                        push(token);
                        parseField(type, "optional");
                        break;
                }
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule);
            return;
        }
        /* istanbul ignore next */
        if (!isTypeRef(type))
            throw illegal(type, "type");
        var name = next();
        /* istanbul ignore next */
        if (!isName(name))
            throw illegal(name, "name");
        name = applyCase(name);
        skip("=");
        var field = new Field(name, parseId(next()), type, rule, extend),
            trailingLine = tn.line();
        field.comment = cmnt();
        parseInlineOptions(field);
        if (!field.comment)
            field.comment = cmnt(trailingLine);
        // JSON defaults to packed=true if not set so we have to set packed=false explicity when
        // parsing proto2 descriptors without the option, where applicable.
        if (field.repeated && types.packed[type] !== undefined && !isProto3)
            field.setOption("packed", false, /* ifNotSet */ true);
        parent.add(field);
    }

    function parseGroup(parent, rule) {
        var name = next();
        /* istanbul ignore next */
        if (!isName(name))
            throw illegal(name, "name");
        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        type.comment = cmnt();
        var field = new Field(fieldName, id, name, rule);
        skip("{");
        while ((token = next()) !== "}") {
            switch (token = lower(token)) {
                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;
                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                /* istanbul ignore next */
                default:
                    throw illegal(token); // there are no groups with proto3 semantics
            }
        }
        skip(";", true);
        parent.add(type).add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();

        /* istanbul ignore next */
        if (types.mapKey[keyType] === undefined)
            throw illegal(keyType, "type");
        skip(",");
        var valueType = next();
        /* istanbul ignore next */
        if (!isTypeRef(valueType))
            throw illegal(valueType, "type");
        skip(">");
        var name = next();
        /* istanbul ignore next */
        if (!isName(name))
            throw illegal(name, "name");

        name = applyCase(name);
        skip("=");
        var field = new MapField(name, parseId(next()), keyType, valueType),
            trailingLine = tn.line();
        field.comment = cmnt();
        parseInlineOptions(field);
        if (!field.comment)
            field.comment = cmnt(trailingLine);
        parent.add(field);
    }

    function parseOneOf(parent, token) {
        var name = next();

        /* istanbul ignore next */
        if (!isName(name))
            throw illegal(name, "name");

        name = applyCase(name);
        var oneof = new OneOf(name),
            trailingLine = tn.line();
        oneof.comment = cmnt();
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                if (token === "option") {
                    parseOption(oneof, token);
                    skip(";");
                } else {
                    push(token);
                    parseField(oneof, "optional");
                }
            }
            skip(";", true);
        } else {
            skip(";");
            if (!oneof.comment)
                oneof.comment = cmnt(trailingLine);
        }
        parent.add(oneof);
    }

    function parseEnum(parent, token) {
        var name = next();

        /* istanbul ignore next */
        if (!isName(name))
            throw illegal(name, "name");

        var enm = new Enum(name);
        enm.comment = cmnt();
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                if (lower(token) === "option") {
                    parseOption(enm, token);
                    skip(";");
                } else
                    parseEnumValue(enm, token);
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(enm);
    }

    function parseEnumValue(parent, token) {

        /* istanbul ignore next */
        if (!isName(token))
            throw illegal(token, "name");

        var name = token;
        skip("=");
        var value = parseId(next(), true),
            trailingLine = tn.line();
        parent.add(name, value, cmnt());
        parseInlineOptions({}); // skips enum value options
        if (!parent.comments[name])
            parent.comments[name] = cmnt(trailingLine);
    }

    function parseOption(parent, token) {
        var custom = skip("(", true);
        var name = next();

        /* istanbul ignore next */
        if (!isTypeRef(name))
            throw illegal(name, "name");

        if (custom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();
            if (isFqTypeRef(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (skip("{", true)) { // { a: "foo" b { c: "bar" } }
            /* istanbul ignore next */
            do {
                if (!isName(token = next()))
                    throw illegal(token, "name");
                if (peek() === "{")
                    parseOptionValue(parent, name + "." + token);
                else {
                    skip(":");
                    setOption(parent, name + "." + token, readValue(true));
                }
            } while (!skip("}", true));
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        skip(";");
        return parent;
    }

    function parseService(parent, token) {
        token = next();

        /* istanbul ignore next */
        if (!isName(token))
            throw illegal(token, "service name");

        var name = token;
        var service = new Service(name);
        service.comment = cmnt();
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "option":
                        parseOption(service, tokenLower);
                        skip(";");
                        break;
                    case "rpc":
                        parseMethod(service, tokenLower);
                        break;

                    /* istanbul ignore next */
                    default:
                        throw illegal(token);
                }
            }
            skip(";", true);
        } else
            skip(";");
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;
        var name = next();

        /* istanbul ignore next */
        if (!isName(name))
            throw illegal(name, "name");
        var requestType, requestStream,
            responseType, responseStream;
        skip("(");
        if (skip("stream", true))
            requestStream = true;
        /* istanbul ignore next */
        if (!isTypeRef(token = next()))
            throw illegal(token);
        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip("stream", true))
            responseStream = true;
        /* istanbul ignore next */
        if (!isTypeRef(token = next()))
            throw illegal(token);

        responseType = token;
        skip(")");
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream),
            trailingLine = tn.line();
        method.comment = cmnt();
        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "option":
                        parseOption(method, tokenLower);
                        skip(";");
                        break;

                    /* istanbul ignore next */
                    default:
                        throw illegal(token);
                }
            }
            skip(";", true);
        } else {
            skip(";");
            if (!method.comment)
                method.comment = cmnt(trailingLine);
        }
        parent.add(method);
    }

    function parseExtension(parent, token) {
        var reference = next();

        /* istanbul ignore next */
        if (!isTypeRef(reference))
            throw illegal(reference, "reference");

        if (skip("{", true)) {
            while ((token = next()) !== "}") {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "required":
                    case "repeated":
                    case "optional":
                        parseField(parent, tokenLower, reference);
                        break;
                    default:
                        /* istanbul ignore next */
                        if (!isProto3 || !isTypeRef(token))
                            throw illegal(token);
                        push(token);
                        parseField(parent, "optional", reference);
                        break;
                }
            }
            skip(";", true);
        } else
            skip(";");
    }

    var token;
    while ((token = next()) !== null) {
        var tokenLower = lower(token);
        switch (tokenLower) {

            case "package":
                /* istanbul ignore next */
                if (!head)
                    throw illegal(token);
                parsePackage();
                break;

            case "import":
                /* istanbul ignore next */
                if (!head)
                    throw illegal(token);
                parseImport();
                break;

            case "syntax":
                /* istanbul ignore next */
                if (!head)
                    throw illegal(token);
                parseSyntax();
                break;

            case "option":
                /* istanbul ignore next */
                if (!head)
                    throw illegal(token);
                parseOption(ptr, token);
                skip(";");
                break;

            default:
                /* istanbul ignore else */
                if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }
                /* istanbul ignore next */
                throw illegal(token);
        }
    }

    parse.filename = null;
    return {
        "package"     : pkg,
        "imports"     : imports,
         weakImports  : weakImports,
         syntax       : syntax,
         root         : root
    };
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {ParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {ParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {ParseOptions} defaults Default {@link ParseOptions}
 * @variation 2
 */
