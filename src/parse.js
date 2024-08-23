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

var base10Re    = /^[1-9][0-9]*$/,
    base10NegRe = /^-?[1-9][0-9]*$/,
    base16Re    = /^0[x][0-9a-fA-F]+$/,
    base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
    base8Re     = /^0[0-7]+$/,
    base8NegRe  = /^-?0[0-7]+$/,
    numberRe    = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
    nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
    fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

/**
 * Result object returned from {@link parse}.
 * @interface IParserResult
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
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
        syntax,
        edition = false,
        isProto3 = false;

    var ptr = root;

    var applyCase = options.keepCase ? function(name) { return name; } : util.camelCase;

    /* istanbul ignore next */
    function illegal(token, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
            parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal(`A${token}`);

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
            case typeof token === "string":
            case "\"":
                console.log('readValueA')
                push(token);
                console.log('right before readstrin?')
                return readString();
            case "true": case "TRUE":
                console.log('readValueB')
                return true;
            case "false": case "FALSE":
                console.log('readValueC')
                return false;
        }
        try {
            console.log('readValueD')
            return parseNumber(token, /* insideTryCatch */ true);
        } catch (e) {
            console.log('readValueE')


            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token))
                return token;

            /* istanbul ignore next */
            throw illegal(`B${token}`, "value");
        }
    }

    function readRanges(target, acceptStrings) {
        var token, start;
        do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'"))
                target.push(readString());
            else
                target.push([ start = parseId(next()), skip("to", true) ? parseId(next()) : start ]);
        } while (skip(",", true));
        var dummy = {options: undefined};
        dummy.setOption = function(name, value) {
          if (this.options === undefined) this.options = {};
          this.options[name] = value;
        };
        console.log('ifblock in readranges')
        ifBlock(
            dummy,
            function parseRange_block(token) {
              /* istanbul ignore else */
              if (token === "option") {
                parseOption(dummy, token);  // skip
                console.log("SKIP #10")
                skip(";");
              } else
                throw illegal(`C${token}`);
            },
            function parseRange_line() {
              parseInlineOptions(dummy);  // skip
            });
    }

    function parseNumber(token, insideTryCatch) {
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
        throw illegal(`20${token}`, "number", insideTryCatch);
    }

    function parseId(token, acceptNegative) {
        switch (token) {
            case "max": case "MAX": case "Max":
                return 536870911;
            case "0":
                return 0;
        }

        /* istanbul ignore if */
        if (!acceptNegative && token.charAt(0) === "-")
            throw illegal(`D${token}`, "id");

        if (base10NegRe.test(token))
            return parseInt(token, 10);
        if (base16NegRe.test(token))
            return parseInt(token, 16);

        /* istanbul ignore else */
        if (base8NegRe.test(token))
            return parseInt(token, 8);

        /* istanbul ignore next */
        throw illegal(`E${token}`, "id");
    }

    function parsePackage() {

        /* istanbul ignore if */
        if (pkg !== undefined)
            throw illegal("21package");

        pkg = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(pkg))
            throw illegal(`22${pkg}`, "name");

        ptr = ptr.define(pkg);
        console.log("SKIP #11")
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
                // eslint-disable-next-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        console.log("SKIP #12")
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";

        /* istanbul ignore if */
        if (!isProto3 && syntax !== "proto2")
            throw illegal(`23${syntax}`, "syntax");

        // Syntax is needed to understand the meaning of the optional field rule
        // Otherwise the meaning is ambiguous between proto2 and proto3
        root.setOption("syntax", syntax);

        console.log("SKIP #13")
        skip(";");
    }

    function parseEdition() {
        skip("=");
        edition = readString();
        const supportedEditions = ["2023"]

        /* istanbul ignore if */
        if (!supportedEditions.includes(edition))
            throw illegal(`24${edition}`, "edition");

        // Syntax is needed to understand the meaning of the optional field rule
        // Otherwise the meaning is ambiguous between proto2 and proto3
        root.setOption("edition", edition);

        console.log("SKIP #14")
        skip(";");
    }


    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                console.log("in parseCommon")
                console.log(tn.line);
                parseOption(parent, token);
                console.log("SKIP #15")
                console.log(tn.line);
                skip(";");
                return true;

            case "message":
                console.log('parseType in parseCOmmon')
                parseType(parent, token);
                console.log('does parsetype finish?')
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

    function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
            if(typeof obj.comment !== "string") {
              obj.comment = cmnt(); // try block-type comment
            }
            obj.filename = parse.filename;
        }
        if (skip("{", true)) {
            var token;
            while ((token = next()) !== "}")
                fnIf(token);
            skip(";", true);
        } else {
            if (fnElse)
                fnElse();
            console.log("SKIP #16")
            console.log(token)
            console.log(tn.line)
            skip(";");
            if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
                obj.comment = cmnt(trailingLine) || obj.comment; // try line-type comment
        }
    }

    function parseType(parent, token) {
        console.log('are we calling from parseType?')

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(`F${token}`, "type name");

        var type = new Type(token);
        console.log('if block in parseType')
        ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token)) {
                console.log('calling parseCommon from parseType? (hope not)')
                return;
            }

            switch (token) {

                case "map":
                    console.log('in parseMapField in parseType')
                    parseMapField(type, token);
                    console.log('does parse mapfield complete?')
                    break;

                case "required":
                case "repeated":
                    parseField(type, token);
                    break;

                case "optional":
                    /* istanbul ignore if */
                    if (isProto3) {
                        parseField(type, "proto3_optional");
                    } else {
                        parseField(type, "optional");
                    }
                    break;

                case "oneof":
                    parseOneOf(type, token);
                    break;

                case "extensions":
                    readRanges(type.extensions || (type.extensions = []));
                    break;

                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;

                default:
                    /* istanbul ignore if */
                    console.log(isProto3)
                    console.log(typeRefRe.test(token))
                    console.log(token)
                    if ((!isProto3 && !edition) || !typeRefRe.test(token))
                        throw illegal(`G${token}`);

                    push(token);
                    parseField(type, "optional");
                    break;
            }
        });
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule);
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
            throw illegal(`1${type}`, "type");

        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(`2${name}`, "name");

        name = applyCase(name);
        skip("=");

        var field = new Field(name, parseId(next()), type, rule, extend);
        console.log('if block in parseField')

        ifBlock(field, function parseField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                console.log("SKIP #2")
                skip(";");
            } else
                throw illegal(`H${token}`);

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

        // JSON defaults to packed=true if not set so we have to set packed=false explicity when
        // parsing proto2 descriptors without the option, where applicable. This must be done for
        // all known packable types and anything that could be an enum (= is not a basic type).
        if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined))
            field.setOption("packed", false, /* ifNotSet */ true);
    }

    function parseGroup(parent, rule) {
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(`3${name}`, "name");

        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        console.log('if block in parsegroup')
        ifBlock(type, function parseGroup_block(token) {
            switch (token) {

                case "option":
                    console.log("in parseGroup")
                    parseOption(type, token);
                    console.log("SKIP #3")
                    skip(";");
                    break;

                case "required":
                case "repeated":
                    parseField(type, token);
                    break;

                case "optional":
                    /* istanbul ignore if */
                    if (isProto3) {
                        parseField(type, "proto3_optional");
                    } else {
                        parseField(type, "optional");
                    }
                    break;

                case "message":
                    console.log('parseType in parseGroup')
                    parseType(type, token);
                    break;

                case "enum":
                    parseEnum(type, token);
                    break;

                /* istanbul ignore next */
                default:
                    throw illegal(`I${token}`); // there are no groups with proto3 semantics
            }
        });
        parent.add(type)
              .add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();

        /* istanbul ignore if */
        if (types.mapKey[keyType] === undefined)
            throw illegal(`4${keyType}`, "type");

        skip(",");
        var valueType = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(valueType))
            throw illegal(`5${valueType}`, "type");

        skip(">");
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(`6${name}`, "name");

        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        console.log('if block in parsemapfield')
        ifBlock(field, function parseMapField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                console.log("SKIP #4")
                skip(";");
            } else
                throw illegal(`J${token}`);

        }, function parseMapField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);
    }

    function parseOneOf(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(`7${token}`, "name");

        var oneof = new OneOf(applyCase(token));
        console.log('if block in parseoneof')
        ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
                parseOption(oneof, token);
                console.log("SKIP #5")
                skip(";");
            } else {
                push(token);
                parseField(oneof, "optional");
            }
        });
        parent.add(oneof);
    }

    function parseEnum(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(`8${token}`, "name");

        var enm = new Enum(token);
        console.log('if block in parseenum')
        ifBlock(enm, function parseEnum_block(token) {
          switch(token) {
            case "option":
                console.log("in parseEnum")
              parseOption(enm, token);
              console.log("SKIP #6")
              skip(";");
              break;

            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true);
              break;

            default:
              parseEnumValue(enm, token);
          }
        });
        parent.add(enm);
    }

    function parseEnumValue(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token))
            throw illegal(`9${token}`, "name");

        skip("=");
        var value = parseId(next(), true),
            dummy = {
                options: undefined
            };
        dummy.setOption = function(name, value) {
            if (this.options === undefined)
                this.options = {};
            this.options[name] = value;
        };
        console.log('if block in parseenumvalue')
        ifBlock(dummy, function parseEnumValue_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(dummy, token); // skip
                console.log("SKIP #7")
                skip(";");
            } else
                throw illegal(`K${token}`);

        }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
        });
        parent.add(token, value, dummy.comment, dummy.options);
    }

    function parseOption(parent, token) {
        var isCustom = skip("(", true);
        if (!typeRefRe.test(token = next())) 
            throw illegal(`L${token}`, "name");

        var name = token;
        var option = name;
        var propName;

        if (isCustom) {
            console.log('in iscustom?')
            skip(")");
            name = "(" + name + ")";
            option = name;
            token = peek();
            if (fqTypeRefRe.test(token)) {
                propName = token.slice(1); //remove '.' before property name
                name += token;
                next();
            }
        }

        skip("=");
        var optionValue = parseOptionValue(parent, name);
        setParsedOption(parent, option, optionValue, propName);
    }

    function parseOptionValue(parent, name) {
        // { a: "foo" b { c: "bar" } }
        if (skip("{", true)) {
            var objectResult = {};

            while (!skip("}", true)) {
                /* istanbul ignore if */
                if (!nameRe.test(token = next())) {
                    throw illegal(`M${token}`, "name");
                }
                if (token === null) {
                  throw illegal(`N${token}`, "end of input");
                }

                var value;
                var propName = token;

                skip(":", true);

                if (peek() === "{")
                    value = parseOptionValue(parent, name + "." + token);
                else if (peek() === "[") {
                    // option (my_option) = {
                    //     repeated_value: [ "foo", "bar" ]
                    // };
                    value = [];
                    var lastValue;
                    if (skip("[", true)) {
                        do {
                            lastValue = readValue(true);
                            value.push(lastValue);
                        } while (skip(",", true));
                        skip("]");
                        if (typeof lastValue !== "undefined") {
                            setOption(parent, name + "." + token, lastValue);
                        }
                    }
                } else {
                    value = readValue(true);
                    setOption(parent, name + "." + token, value);
                }

                var prevValue = objectResult[propName];

                if (prevValue)
                    value = [].concat(prevValue).concat(value);

                objectResult[propName] = value;

                // Semicolons and commas can be optional
                skip(",", true);
                skip(";", true);
            }

            return objectResult;
        }

        var simpleValue = readValue(true);
        setOption(parent, name, simpleValue);
        console.log(`in parseOptionValue: ${name}, ${simpleValue}`)
        return simpleValue;
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
    }

    function setParsedOption(parent, name, value, propName) {
        if (parent.setParsedOption)
            parent.setParsedOption(name, value, propName);
    }

    function parseInlineOptions(parent) {
        console.log('in parseInlineOptions?')
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        return parent;
    }

    function parseService(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(`10${token}`, "service name");

        var service = new Service(token);
        console.log('if block in parseservice')
        ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token)) {
                console.log('calling parseCommon from parseService')
                return;
            }
            /* istanbul ignore else */
            if (token === "rpc")
                parseMethod(service, token);
            else
                throw illegal(`11${token}`);
        });
        parent.add(service);
    }

    function parseMethod(parent, token) {
        // Get the comment of the preceding line now (if one exists) in case the
        // method is defined across multiple lines.
        var commentText = cmnt();

        var type = token;

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(`12${token}`, "name");

        var name = token,
            requestType, requestStream,
            responseType, responseStream;

        skip("(");
        if (skip("stream", true))
            requestStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(`13${token}`);

        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip("stream", true))
            responseStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(`14${token}`);

        responseType = token;
        skip(")");

        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        method.comment = commentText;
        console.log('if block in parseMethod')
        ifBlock(method, function parseMethod_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(method, token);
                console.log("SKIP #8")
                skip(";");
            } else
                throw illegal(`15${token}`);

        });
        parent.add(method);
    }

    function parseExtension(parent, token) {

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(`16${token}`, "reference");

        var reference = token;
        console.log('if block in parseextension')
        ifBlock(null, function parseExtension_block(token) {
            switch (token) {

                case "required":
                case "repeated":
                    parseField(parent, token, reference);
                    break;

                case "optional":
                    /* istanbul ignore if */
                    if (isProto3) {
                        parseField(parent, "proto3_optional", reference);
                    } else {
                        parseField(parent, "optional", reference);
                    }
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(`17${token}`);
                    push(token);
                    parseField(parent, "optional", reference);
                    break;
            }
        });
    }

    var token;
    while ((token = next()) !== null) {
        console.log(`TOKEN: ${token}`)
        switch (token) {

            case "package":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(`N${token}`);

                parsePackage();
                break;

            case "import":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(`O${token}`);

                parseImport();
                break;

            case "syntax":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(`P${token}`);

                parseSyntax();
                break;

            case "edition":
                /* istanbul ignore if */
                if (!head)
                    throw illegal(`Q${token}`);
                parseEdition();
                break;

            case "option":
                console.log("in parseExtension")
                console.log(tn.line)
                parseCommon(ptr, token);
                console.log(tn.line);
                console.log("SKIP #9")
                skip(";", true);
                break;

            default:

                /* istanbul ignore else */
                if (parseCommon(ptr, token)) {
                    console.log('calling parseCommon from parseextension')
                    head = false;
                    console.log(token)
                    console.log(next())
                    continue;
                }

                /* istanbul ignore next */
                throw illegal(`R${token}`);
        }
    }

    parse.filename = null;
    console.log('finishing parse.js')
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
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 * @variation 2
 */
