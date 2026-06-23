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
    ReflectionObject = require("./object"),
    types     = require("./types"),
    util      = require("./util");

var base10Re    = /^[1-9][0-9]*$/,
    base10NegRe = /^-?[1-9][0-9]*$/,
    base16Re    = /^0[x][0-9a-fA-F]+$/,
    base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
    base8Re     = /^0[0-7]+$/,
    base8NegRe  = /^-?0[0-7]+$/,
    numberRe    = util.patterns.numberRe,
    nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = util.patterns.typeRefRe;

var maxFieldId = 536870911, // 2^29 - 1
    maxEnumId = 2147483647; // 2^31 - 1

/**
 * Result object returned from {@link parse}.
 * @interface IParserResult
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {Root} root Populated root instance
 */

/**
 * Options modifying the behavior of {@link parse}.
 * @interface IParseOptions
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
 * @property {boolean} [preferTrailingComment=false] Use trailing comment when both leading comment and trailing comment exist.
 */

/**
 * Options modifying the behavior of JSON serialization.
 * @interface IToJSONOptions
 * @property {boolean} [keepComments=false] Serializes comments.
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 */
function parse(source, root, options) {
    /* eslint-disable callback-return */
    if (!(root instanceof Root)) {
        options = root;
        root = new Root();
    }
    if (!options)
        options = parse.defaults;

    var filename = parse.filename;
    var preferTrailingComment = options.preferTrailingComment || false;
    var tn = tokenize(source, options.alternateCommentMode || false),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        cmnt = tn.cmnt;

    var head = true,
        pkg,
        imports,
        weakImports,
        edition = "proto2";

    var ptr = root;

    var topLevelObjects = [];
    var topLevelOptions = {};

    var applyCase = options.keepCase ? function(name) { return name; } : util.camelCase;

    function resolveFileFeatures() {
        topLevelObjects.forEach(obj => {
            obj._edition = edition;
            Object.keys(topLevelOptions).forEach(opt => {
                if (obj.getOption(opt) !== undefined) return;
                obj.setOption(opt, topLevelOptions[opt], true);
            });
        });
    }

    /* istanbul ignore next */
    function illegal(line, column) {
        parse.filename = null;
        if (line === undefined)
            line = tn.line;
        if (column === undefined)
            column = tn.column;
        return Error("illegal token (" + (filename ? filename + ", " : "") + "line " + line + ", column " + column + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal();

            values.push(next());
            skip(token);
            token = peek();
        } while (token === "\"" || token === "'");
        return values.join("");
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (token) {
            case "'":
            case "\"":
                push(token);
                return readString();
            case "true": case "TRUE":
                return true;
            case "false": case "FALSE":
                return false;
        }
        try {
            return parseNumber(token);
        } catch (e) {
            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token))
                return token;

            /* istanbul ignore next */
            throw illegal();
        }
    }

    function readRanges(target, acceptStrings, max, acceptNegative) {
        var token, start;
        do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'")) {
                if (edition >= 2023) {
                    throw illegal();
                }
                target.push(readString());
            } else {
                try {
                    target.push([ start = parseId(next(), acceptNegative, max), skip("to", true) ? parseId(next(), acceptNegative, max) : start ]);
                } catch (err) {
                    if (acceptStrings && typeRefRe.test(token) && edition >= 2023) {
                        target.push(token);
                    } else {
                        throw err;
                    }
                }
            }
        } while (skip(",", true));
        var dummy = {options: undefined};
        dummy.setOption = function(name, value) {
          if (this.options === undefined) this.options = {};
          this.options[name] = value;
        };
        ifBlock(
            dummy,
            function parseRange_block(token) {
              /* istanbul ignore else */
              if (token === "option") {
                parseOption(dummy, token);  // skip
                skip(";");
              } else
                throw illegal();
            },
            function parseRange_line() {
              parseInlineOptions(dummy);  // skip
            });
    }

    function parseNumber(token) {
        var sign = 1;
        if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
        }
        switch (token) {
            case "inf": case "INF": case "Inf":
                return sign * Infinity;
            case "nan": case "NAN": case "Nan": case "NaN":
                return NaN;
            case "0":
                return 0;
        }
        if (base10Re.test(token))
            return sign * parseInt(token, 10);
        if (base16Re.test(token))
            return sign * parseInt(token, 16);
        if (base8Re.test(token))
            return sign * parseInt(token, 8);

        /* istanbul ignore else */
        if (numberRe.test(token))
            return sign * parseFloat(token);

        /* istanbul ignore next */
        throw illegal();
    }

    function parseId(token, acceptNegative, max) {
        switch (token) {
            case "max": case "MAX": case "Max":
                return max || maxFieldId;
            case "0":
                return 0;
        }

        /* istanbul ignore if */
        if (!acceptNegative && token.charAt(0) === "-")
            throw illegal();

        if (base10NegRe.test(token))
            return parseInt(token, 10);
        if (base16NegRe.test(token))
            return parseInt(token, 16);

        /* istanbul ignore else */
        if (base8NegRe.test(token))
            return parseInt(token, 8);

        /* istanbul ignore next */
        throw illegal();
    }

    function parsePackage() {
        /* istanbul ignore if */
        if (pkg !== undefined)
            throw illegal();

        pkg = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(pkg))
            throw illegal();

        ptr = ptr.define(pkg);

        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "option":
                if (edition < "2024") {
                    throw illegal();
                }
                // Import options are only used for resolving options, which we don't
                // do.  We can just throw them out.
                next();
                readString();
                skip(";");
                return;
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
                // eslint-disable-next-line no-fallthrough
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
        peek();
        var line = tn.line,
            column = tn.column;
        edition = readString();

        /* istanbul ignore if */
        if (edition < 2023)
            throw illegal(line, column);

        skip(";");
    }

    function parseEdition() {
        skip("=");
        peek();
        var line = tn.line,
            column = tn.column;
        edition = readString();
        const supportedEditions = ["2023", "2024"];

        /* istanbul ignore if */
        if (!supportedEditions.includes(edition))
            throw illegal(line, column);

        skip(";");
    }


    function parseCommon(parent, token, depth) {
        if (depth === undefined)
            depth = 0;
        // depth is checked by dispatched functions
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
                return true;

            case "message":
                parseType(parent, token, depth + 1);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "export":
            case "local":
                if (edition < "2024") {
                    return false;
                }
                token = next();
                if (token === "export" || token === "local") {
                    return false;
                }
                if (token !== "message" && token !== "enum") {
                    return false;
                }
                /* eslint-disable no-warning-comments */
                // TODO: actually enforce visiblity modifiers like protoc does.
                return parseCommon(parent, token, depth);

            case "service":
                parseService(parent, token, depth + 1);
                return true;

            case "extend":
                parseExtension(parent, token, depth);
                return true;
        }
        return false;
    }

    function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
            if(typeof obj.comment !== "string") {
              obj.comment = cmnt(); // try block-type comment
            }
            obj.filename = filename;
        }
        if (skip("{", true)) {
            var token;
            while ((token = next()) !== "}")
                fnIf(token);
            skip(";", true);
        } else {
            if (fnElse)
                fnElse();
            skip(";");
            if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
                obj.comment = cmnt(trailingLine) || obj.comment; // try line-type comment
        }
    }

    function parseType(parent, token, depth) {
        if (depth === undefined)
            depth = 0;
        if (depth > util.nestingLimit)
            throw Error("max depth exceeded");

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal();

        var type = new Type(token);
        ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token, depth))
                return;

            switch (token) {

                case ";":
                    break;

                case "map":
                    parseMapField(type, token);
                    break;

                case "required":
                    if (edition !== "proto2")
                        throw illegal();
                /* eslint-disable no-fallthrough */
                case "repeated":
                    parseField(type, token, undefined, depth + 1);
                    break;

                case "optional":
                    /* istanbul ignore if */
                    if (edition === "proto3") {
                        parseField(type, "proto3_optional", undefined, depth + 1);
                    } else if (edition !== "proto2") {
                        throw illegal();
                    } else {
                        parseField(type, "optional", undefined, depth + 1);
                    }
                    break;

                case "oneof":
                    parseOneOf(type, token, depth + 1);
                    break;

                case "extensions":
                    readRanges(type.extensions || (type.extensions = []));
                    break;

                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;

                default:
                    /* istanbul ignore if */
                    if (edition === "proto2" || !typeRefRe.test(token)) {
                        throw illegal();
                    }

                    push(token);
                    parseField(type, "optional", undefined, depth + 1);
                    break;
            }
        });
        parent.add(type);
        if (parent === ptr) {
            topLevelObjects.push(type);
        }
    }

    function parseField(parent, rule, extend, depth) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule, extend, depth);
            return;
        }
        // Type names can consume multiple tokens, in multiple variants:
        //    package.subpackage   field       tokens: "package.subpackage" [TYPE NAME ENDS HERE] "field"
        //    package . subpackage field       tokens: "package" "." "subpackage" [TYPE NAME ENDS HERE] "field"
        //    package.  subpackage field       tokens: "package." "subpackage" [TYPE NAME ENDS HERE] "field"
        //    package  .subpackage field       tokens: "package" ".subpackage" [TYPE NAME ENDS HERE] "field"
        // Keep reading tokens until we get a type name with no period at the end,
        // and the next token does not start with a period.
        while (type.endsWith(".") || peek().startsWith(".")) {
            type += next();
        }

        /* istanbul ignore if */
        if (!typeRefRe.test(type))
            throw illegal();

        var name = next();

        /* istanbul ignore if */

        if (!nameRe.test(name))
            throw illegal();

        var protoName = name;
        name = applyCase(name);
        skip("=");

        var field = new Field(name, parseId(next()), type, rule === "proto3_optional" ? "optional" : rule, extend);
        if (protoName !== name)
            field.protoName = protoName;

        ifBlock(field, function parseField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal();

        }, function parseField_line() {
            parseInlineOptions(field);
        });

        if (rule === "proto3_optional") {
            // for proto3 optional fields, we create a single-member Oneof to mimic "optional" behavior
            var oneof = new OneOf("_" + name);
            field.setOption("proto3_optional", true);
            oneof.add(field);
            parent.add(oneof);
        } else {
            parent.add(field);
        }
        if (parent === ptr) {
            topLevelObjects.push(field);
        }
    }

    function parseGroup(parent, rule, extend, depth) {
        if (depth === undefined)
            depth = 0;
        if (depth > util.nestingLimit)
            throw Error("max depth exceeded");
        if (edition >= 2023) {
            throw illegal();
        }
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal();

        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule, extend);
        field.filename = filename;
        ifBlock(type, function parseGroup_block(token) {
            switch (token) {

                case ";":
                    break;

                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;
                case "required":
                case "repeated":
                    parseField(type, token, undefined, depth + 1);
                    break;

                case "optional":
                    /* istanbul ignore if */
                    if (edition === "proto3") {
                        parseField(type, "proto3_optional", undefined, depth + 1);
                    } else {
                        parseField(type, "optional", undefined, depth + 1);
                    }
                    break;

                case "message":
                    parseType(type, token, depth + 1);
                    break;

                case "enum":
                    parseEnum(type, token);
                    break;

                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;

                case "export":
                case "local":
                    if (edition < "2024") {
                        throw illegal();
                    }
                    token = next();
                    switch (token) {
                        case "message":
                            parseType(type, token, depth + 1);
                            break;
                        case "enum":
                            parseType(type, token, depth + 1);
                            break;
                        default:
                            throw illegal();
                    }
                    break;

                /* istanbul ignore next */
                default:
                    throw illegal(); // there are no groups with proto3 semantics
            }
        });
        parent.add(type)
              .add(field);
        if (parent === ptr) {
            topLevelObjects.push(type);
            topLevelObjects.push(field);
        }
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();

        /* istanbul ignore if */
        if (types.mapKey[keyType] === undefined)
            throw illegal();

        skip(",");
        var valueType = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(valueType))
            throw illegal();

        skip(">");
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal();

        skip("=");
        var protoName = name;
        name = applyCase(name);
        var field = new MapField(name, parseId(next()), keyType, valueType);
        if (protoName !== name)
            field.protoName = protoName;
        ifBlock(field, function parseMapField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal();

        }, function parseMapField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);
    }

    function parseOneOf(parent, token, depth) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal();

        var oneof = new OneOf(applyCase(token));
        ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
                parseOption(oneof, token);
                skip(";");
            } else {
                push(token);
                parseField(oneof, "optional", undefined, depth);
            }
        });
        parent.add(oneof);
    }

    function parseEnum(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal();

        var enm = new Enum(token);
        ifBlock(enm, function parseEnum_block(token) {
          switch(token) {
            case ";":
              break;

            case "option":
              parseOption(enm, token);
              skip(";");
              break;

            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true, maxEnumId, true);
              if(enm.reserved === undefined) enm.reserved = [];
              break;

            default:
              parseEnumValue(enm, token);
          }
        });
        parent.add(enm);
        if (parent === ptr) {
            topLevelObjects.push(enm);
        }
    }

    function parseEnumValue(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token))
            throw illegal();

        skip("=");
        var value = parseId(next(), true),
            dummy = {
                options: undefined
            };
        dummy.getOption = function(name) {
            return this.options[name];
        };
        dummy.setOption = function(name, value) {
            ReflectionObject.prototype.setOption.call(dummy, name, value);
        };
        dummy.setParsedOption = function() {
            return undefined;
        };
        ifBlock(dummy, function parseEnumValue_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(dummy, token); // skip
                skip(";");
            } else
                throw illegal();

        }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
        });
        parent.add(token, value, dummy.comment, dummy.parsedOptions || dummy.options);
    }

    function parseOption(parent, token) {
            var option;
            var propName;
            var isOption = true;
            if (token === "option") {
                token = next();
            }

            while (token !== "=") {
                if (token === "(") {
                    var parensValue = next();
                    skip(")");
                    token = "(" + parensValue + ")";
                }
                if (isOption) {
                    isOption = false;
                    if (token.includes(".") && !token.includes("(")) {
                        var tokens = token.split(".");
                        option = tokens[0] + ".";
                        token = tokens[1];
                        continue;
                    }
                    option = token;
                } else {
                    propName = propName ? propName += token : token;
                }
                token = next();
            }
            var name = propName ? option.concat(propName) : option;
            var optionValue = parseOptionValue(parent, name);
            propName = propName && propName[0] === "." ? propName.slice(1) : propName;
            option = option && option[option.length - 1] === "." ? option.slice(0, -1) : option;
            setParsedOption(parent, option, optionValue, propName);
    }

    function parseOptionValue(parent, name, depth) {
        if (depth === undefined)
            depth = 0;
        if (depth > util.recursionLimit)
            throw Error("max depth exceeded");
        // { a: "foo" b { c: "bar" } }
        if (skip("{", true)) {
            var objectResult = {};

            while (!skip("}", true)) {
                /* istanbul ignore if */
                if (!nameRe.test(token = next())) {
                    throw illegal();
                }
                if (token === null) {
                  throw illegal();
                }

                var value;
                var propName = token;

                skip(":", true);

                if (peek() === "{") {
                    // option (my_option) = {
                    //     repeated_value: [ "foo", "bar" ]
                    // };
                    value = parseOptionValue(parent, name + "." + token, depth + 1);
                } else if (peek() === "[") {
                    value = [];
                    var lastValue;
                    if (skip("[", true)) {
                        if (!skip("]", true)) {
                            do {
                                lastValue = readValue(true);
                                value.push(lastValue);
                            } while (skip(",", true));
                            skip("]");
                            if (typeof lastValue !== "undefined") {
                                setOption(parent, name + "." + token, lastValue);
                            }
                        }
                    }
                } else {
                    value = readValue(true);
                    setOption(parent, name + "." + token, value);
                }

                var prevValue = Object.prototype.hasOwnProperty.call(objectResult, propName)
                    ? objectResult[propName]
                    : undefined;

                if (prevValue)
                    value = [].concat(prevValue).concat(value);

                if (propName !== "__proto__")
                    objectResult[propName] = value;

                // Semicolons and commas can be optional
                skip(",", true);
                skip(";", true);
            }

            return objectResult;
        }

        var simpleValue = readValue(true);
        setOption(parent, name, simpleValue);
        return simpleValue;
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (ptr === parent && /^features\./.test(name)) {
            topLevelOptions[name] = value;
            return;
        }
        // lift json_name onto Field
        if (name === "json_name" && parent instanceof Field) {
            parent.jsonName = value;
            return;
        }
        if (parent.setOption)
            parent.setOption(name, value);
    }

    function setParsedOption(parent, name, value, propName) {
        if (name === "json_name" && parent instanceof Field)
            return; // lifted onto Field#jsonName above
        if (parent.setParsedOption)
            parent.setParsedOption(name, value, propName);
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        return parent;
    }

    function parseService(parent, token, depth) {
        if (depth === undefined)
            depth = 0;
        if (depth > util.recursionLimit)
            throw Error("max depth exceeded");

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal();

        var service = new Service(token);
        ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token, depth)) {
                return;
            }

            /* istanbul ignore else */
            if (token === ";")
                return;
            if (token === "rpc")
                parseMethod(service, token);
            else
                throw illegal();
        });
        parent.add(service);
        if (parent === ptr) {
            topLevelObjects.push(service);
        }
    }

    function parseMethod(parent, token) {
        // Get the comment of the preceding line now (if one exists) in case the
        // method is defined across multiple lines.
        var commentText = cmnt();

        var type = token;

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal();

        var name = token,
            requestType, requestStream,
            responseType, responseStream;

        skip("(");
        if (skip("stream", true))
            requestStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal();

        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip("stream", true))
            responseStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal();

        responseType = token;
        skip(")");

        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        method.comment = commentText;
        ifBlock(method, function parseMethod_block(token) {

            /* istanbul ignore else */
            if (token === ";")
                return;
            if (token === "option") {
                parseOption(method, token);
                skip(";");
            } else
                throw illegal();

        });
        parent.add(method);
    }

    function parseExtension(parent, token, depth) {

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal();

        var reference = token;
        ifBlock(null, function parseExtension_block(token) {
            switch (token) {

                case "required":
                case "repeated":
                    parseField(parent, token, reference, depth + 1);
                    break;

                case "optional":
                    /* istanbul ignore if */
                    if (edition === "proto3") {
                        parseField(parent, "proto3_optional", reference, depth + 1);
                    } else {
                        parseField(parent, "optional", reference, depth + 1);
                    }
                    break;

                default:
                    /* istanbul ignore if */
                    if (edition === "proto2" || !typeRefRe.test(token))
                        throw illegal();
                    push(token);
                    parseField(parent, "optional", reference, depth + 1);
                    break;
            }
        });
    }

    var token;
    while ((token = next()) !== null) {
        switch (token) {

            case ";":
                break;

            case "package":

                /* istanbul ignore if */
                if (!head)
                    throw illegal();

                parsePackage();
                break;

            case "import":

                parseImport();
                break;

            case "syntax":

                /* istanbul ignore if */
                if (!head)
                    throw illegal();

                parseSyntax();
                break;

            case "edition":
                /* istanbul ignore if */
                if (!head)
                    throw illegal();
                parseEdition();
                break;

            case "option":
                parseOption(ptr, token);
                skip(";", true);
                break;

            default:

                /* istanbul ignore else */
                if (parseCommon(ptr, token, 0)) {
                    head = false;
                    continue;
                }

                /* istanbul ignore next */
                throw illegal();
        }
    }

    resolveFileFeatures();

    parse.filename = null;
    return {
        "package"     : pkg,
        "imports"     : imports,
         weakImports  : weakImports,
         root         : root
    };
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 * @variation 2
 */
