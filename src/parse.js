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

var s_required = "required",
    s_repeated = "repeated",
    s_optional = "optional",
    s_option   = "option",
    s_name     = "name",
    s_type     = "type";

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} [root] Root to populate
 * @param {boolean} [visible=true] Whether types from this file are visible when exporting definitions
 * @returns {Object} Parsed contents
 */
function parse(source, root, visible) {
    /* eslint-disable default-case, callback-return */
    if (typeof root === 'boolean') {
        visible = root;
        root = undefined;
    }

    // NOTE:
    // In its current state this parser accepts a couple of directives that the
    // official parser wouldn't, i.e. some proto2 tokens in proto3 definitions.
    // While that shouldn't be much of an issue, it has to be decided how far
    // we want to go with this: Full compliance or compact library size?

    var tn = tokenize(source),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        omit = tn.omit;

    var head = true,
        pkg,
        imports,
        publicImports,
        weakImports,
        syntax,
        isProto3 = false;

    if (!root)
        root = new Root();

    var ptr = root;

    function illegal(token, name) {
        return Error("illegal " + (name || "token") + " '" + token + "' (line " + tn.line() + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            if ((token = next()) !== '"' && token !== "'")
                throw illegal(token);
            values.push(next());
            skip(token);
            token = peek();
        } while (token === '"' || token === "'");
        return values.join('');
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (lower(token)) {
            case "'":
            case '"':
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
        if (omit("to"))
            end = parseId(next());
        skip(";");
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
            throw illegal(" package");
        pkg = next();
        if (!typeRefRe.test(pkg))
            throw illegal(pkg, s_name);
        ptr = ptr.define(pkg);
        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "public":
                whichImports = publicImports || (publicImports = []);
                next();
                break;
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
        }
        if (!whichImports)
            whichImports = imports || (imports = []);
        token = readString();
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = lower(readString());
        if ([ "proto2", "proto3" ].indexOf(syntax) < 0)
            throw illegal(syntax, "syntax");
        isProto3 = syntax === "proto3";
        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case s_option:
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
                parseService(ptr, token);
                return true;

            case "extend":
                parseExtension(ptr, token);
                return true;
        }
        return false;
    }

    function parseType(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, "type name");
        var type = new Type(name);
        if (omit("{")) {
            while ((token = next()) !== '}') {
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
            omit(";");
        } else
            skip(";");
        if (!isProto3)
            type.setOption("packed", false, /* ifNotSet */ true);
        type.visible = visible;
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (!typeRefRe.test(type))
            throw illegal(type, s_type);
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        skip("=");
        var id = parseNumber(next());
        parent.add(parseInlineOptions(new Field(name, id, type, rule, extend)));
    }

    function parseMapField(parent, token) {
        if (!isProto3)
            throw illegal(token);
        skip("<");
        var keyType = next();
        if (types.mapKeyWireTypes[keyType] === undefined)
            throw illegal(keyType, s_type);
        skip(",");
        var valueType = next();
        if (!typeRefRe.test(valueType))
            throw illegal(valueType, s_type);
        skip(">");
        var name = next();
        skip("=");
        var id = parseId(next());
        parent.add(parseInlineOptions(new MapField(name, id, valueType, keyType)));
    }

    function parseOneOf(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        var oneof = new OneOf(name);
        if (omit("{")) {
            while ((token = next()) !== '}') {
                if (token === s_option) {
                    parseOption(oneof, token);
                    skip(";");
                } else
                    parseField(oneof, s_optional);
            }
            omit(";");
        } else
            skip(";");
        parent.add(oneof);
    }

    function parseEnum(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        var values = {};
        var enm = new Enum(name, values);
        if (omit("{")) {
            while ((token = next()) !== "}") {
                if (lower(token) === s_option)
                    parseOption(enm);
                else
                    parseEnumField(enm, token);
            }
            omit(";");
        } else
            skip(";");
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
        var custom = omit('(');
        var name = next();
        if (!typeRefRe.test(name))
            throw illegal(name, s_name);
        if (custom) {
            skip(')');
            name = '(' + name + ')';
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
        if (omit('{')) {
            while ((token = next()) !== '}') {
                if (!nameRe.test(token))
                    throw illegal(token, s_name);
                name = name + "." + token;
                if (omit(":"))
                    setOption(parent, name, readValue(true));
                else
                    parseOptionValue(parent, name);
            }
            omit(";");
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
        if (omit("[")) {
            do {
                parseOption(parent, s_option);
            } while (omit(","));
            skip("]");
        }
        skip(";");
        return parent;
    }

    function parseService(parent, token) {
        token = next();
        if (!nameRe.test(token))
            throw illegal(token, "service name");
        var name = token;
        var service = new Service(name);
        if (omit("{")) {
            while ((token = next()) !== '}') {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case s_option:
                        parseOption(service, tokenLower);
                        skip(";");
                        break;
                    case "rpc":
                        parseMethod(service, tokenLower);
                        break;
                    default:
                        throw illegal(token);
                }
            }
            omit(";");
        } else
            skip(";");
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;
        var name = next();
        if (!nameRe.test(name))
            throw illegal(name, s_name);
        var requestType, requestStream,
            responseType, responseStream;
        skip("(");
        if (omit("stream"))
            requestStream = true;
        if (!typeRefRe.test(token = next()))
            throw illegal(token);
        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (omit("stream"))
            responseStream = true;
        if (!typeRefRe.test(token = next()))
            throw illegal(token);
        responseType = token;
        skip(")");
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        if (omit("{")) {
            while ((token = next()) !== '}') {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case s_option:
                        parseOption(method, tokenLower);
                        skip(";");
                        break;
                    default:
                        throw illegal(token);
                }
            }
            omit(";");
        } else
            skip(";");
        parent.add(method);
    }

    function parseExtension(parent, token) {
        var reference = next();
        if (!typeRefRe.test(reference))
            throw illegal(reference, "reference");
        if (omit("{")) {
            while ((token = next()) !== '}') {
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
            omit(";");
        } else
            skip(";");
    }

    var token;
    while ((token = next()) !== null) {
        if (parseCommon(ptr, token)) {
            head = false;
            continue;
        }
        if (!head)
            throw illegal(token);
        var tokenLower = lower(token);
        switch (tokenLower) {

            case "package":
                parsePackage();
                break;

            case "import":
                parseImport();
                break;

            case "syntax":
                parseSyntax();
                break;

            default:
                throw illegal(token);
        }
    }
    return {
        package       : pkg,
        imports       : imports,
        publicImports : publicImports,
        weakImports   : weakImports,
        syntax        : syntax,
        root          : root
    };
}
