/*?
 // --- Scope ----------------------
 // Lang      : Language expressions
 // Tokenizer : DotProto Tokenizer
 */
/**
 * Constructs a new Parser.
 * @exports ProtoBuf.DotProto.Parser
 * @class prototype parser
 * @param {string} source Source
 * @constructor
 */
var Parser = function(source) {

    /**
     * Tokenizer.
     * @type {!ProtoBuf.DotProto.Tokenizer}
     * @expose
     */
    this.tn = new Tokenizer(source);

    /**
     * Whether parsing proto3 or not.
     * @type {boolean}
     */
    this.proto3 = false;
};

/**
 * @alias ProtoBuf.DotProto.Parser.prototype
 * @inner
 */
var ParserPrototype = Parser.prototype;

/**
 * Parses the source.
 * @returns {!Object}
 * @throws {Error} If the source cannot be parsed
 * @expose
 */
ParserPrototype.parse = function() {
    var topLevel = {
        "name": "[ROOT]", // temporary
        "package": null,
        "messages": [],
        "enums": [],
        "imports": [],
        "options": {},
        "services": []
        // "syntax": undefined
    };
    var token,
        head = true,
        weak;
    try {
        while (token = this.tn.next()) {
            switch (token) {
                case 'package':
                    if (!head || topLevel["package"] !== null)
                        throw Error("unexpected 'package'");
                    token = this.tn.next();
                    if (!Lang.TYPEREF.test(token))
                        throw Error("illegal package name: " + token);
                    this.tn.skip(";");
                    topLevel["package"] = token;
                    break;
                case 'import':
                    if (!head)
                        throw Error("unexpected 'import'");
                    token = this.tn.peek();
                    if (token === "public" || (weak = token === "weak")) // token ignored
                        this.tn.next();
                    token = this._readString();
                    this.tn.skip(";");
                    if (!weak) // import ignored
                        topLevel["imports"].push(token);
                    break;
                case 'syntax':
                    if (!head)
                        throw Error("unexpected 'syntax'");
                    this.tn.skip("=");
                    if ((topLevel["syntax"] = this._readString()) === "proto3")
                        this.proto3 = true;
                    this.tn.skip(";");
                    break;
                case 'message':
                    this._parseMessage(topLevel, null);
                    head = false;
                    break;
                case 'enum':
                    this._parseEnum(topLevel);
                    head = false;
                    break;
                case 'option':
                    this._parseOption(topLevel);
                    break;
                case 'service':
                    this._parseService(topLevel);
                    break;
                case 'extend':
                    this._parseExtend(topLevel);
                    break;
                default:
                    throw Error("unexpected '" + token + "'");
            }
        }
    } catch (e) {
        e.message = "Parse error at line "+this.tn.line+": " + e.message;
        throw e;
    }
    delete topLevel["name"];
    return topLevel;
};

/**
 * Parses the specified source.
 * @returns {!Object}
 * @throws {Error} If the source cannot be parsed
 * @expose
 */
Parser.parse = function(source) {
    return new Parser(source).parse();
};

// ----- Conversion ------

/**
 * Converts a numerical string to an id.
 * @param {string} value
 * @param {boolean=} mayBeNegative
 * @returns {number}
 * @inner
 */
function mkId(value, mayBeNegative) {
    var id = -1,
        sign = 1;
    if (value.charAt(0) == '-') {
        sign = -1;
        value = value.substring(1);
    }
    if (Lang.NUMBER_DEC.test(value))
        id = parseInt(value);
    else if (Lang.NUMBER_HEX.test(value))
        id = parseInt(value.substring(2), 16);
    else if (Lang.NUMBER_OCT.test(value))
        id = parseInt(value.substring(1), 8);
    else
        throw Error("illegal id value: " + (sign < 0 ? '-' : '') + value);
    id = (sign*id)|0; // Force to 32bit
    if (!mayBeNegative && id < 0)
        throw Error("illegal id value: " + (sign < 0 ? '-' : '') + value);
    return id;
}

/**
 * Converts a numerical string to a number.
 * @param {string} val
 * @returns {number}
 * @inner
 */
function mkNumber(val) {
    var sign = 1;
    if (val.charAt(0) == '-') {
        sign = -1;
        val = val.substring(1);
    }
    if (Lang.NUMBER_DEC.test(val))
        return sign * parseInt(val, 10);
    else if (Lang.NUMBER_HEX.test(val))
        return sign * parseInt(val.substring(2), 16);
    else if (Lang.NUMBER_OCT.test(val))
        return sign * parseInt(val.substring(1), 8);
    else if (val === 'inf')
        return sign * Infinity;
    else if (val === 'nan')
        return NaN;
    else if (Lang.NUMBER_FLT.test(val))
        return sign * parseFloat(val);
    throw Error("illegal number value: " + (sign < 0 ? '-' : '') + val);
}

// ----- Reading ------

/**
 * Reads a string.
 * @returns {string}
 * @private
 */
ParserPrototype._readString = function() {
    var value = "",
        token,
        delim;
    do {
        delim = this.tn.next();
        if (delim !== "'" && delim !== '"')
            throw Error("illegal string delimiter: "+delim);
        value += this.tn.next();
        this.tn.skip(delim);
        token = this.tn.peek();
    } while (token === '"' || token === '"'); // multi line?
    return value;
};

/**
 * Reads a value.
 * @param {boolean=} mayBeTypeRef
 * @returns {number|boolean|string}
 * @private
 */
ParserPrototype._readValue = function(mayBeTypeRef) {
    var token = this.tn.peek(),
        value;
    if (token === '"' || token === "'")
        return this._readString();
    this.tn.next();
    if (Lang.NUMBER.test(token))
        return mkNumber(token);
    if (Lang.BOOL.test(token))
        return (token.toLowerCase() === 'true');
    if (mayBeTypeRef && Lang.TYPEREF.test(token))
        return token;
    throw Error("illegal value: "+token);

};

// ----- Parsing constructs -----

/**
 * Parses a namespace option.
 * @param {!Object} parent Parent definition
 * @param {boolean=} isList
 * @private
 */
ParserPrototype._parseOption = function(parent, isList) {
    var token = this.tn.next(),
        custom = false;
    if (token === '(') {
        custom = true;
        token = this.tn.next();
    }
    if (!Lang.TYPEREF.test(token))
        // we can allow options of the form google.protobuf.* since they will just get ignored anyways
        // if (!/google\.protobuf\./.test(token)) // FIXME: Why should that not be a valid typeref?
            throw Error("illegal option name: "+token);
    var name = token;
    if (custom) { // (my_method_option).foo, (my_method_option), some_method_option, (foo.my_option).bar
        this.tn.skip(')');
        name = '('+name+')';
        token = this.tn.peek();
        if (Lang.FQTYPEREF.test(token)) {
            name += token;
            this.tn.next();
        }
    }
    this.tn.skip('=');
    this._parseOptionValue(parent, name);
    if (!isList)
        this.tn.skip(";");
};

/**
 * Sets an option on the specified options object.
 * @param {!Object.<string,*>} options
 * @param {string} name
 * @param {string|number|boolean} value
 * @inner
 */
function setOption(options, name, value) {
    if (typeof options[name] === 'undefined')
        options[name] = value;
    else {
        if (!Array.isArray(options[name]))
            options[name] = [ options[name] ];
        options[name].push(value);
    }
}

/**
 * Parses an option value.
 * @param {!Object} parent
 * @param {string} name
 * @private
 */
ParserPrototype._parseOptionValue = function(parent, name) {
    var token = this.tn.peek();
    if (token !== '{') { // Plain value
        setOption(parent["options"], name, this._readValue(true));
    } else { // Aggregate options
        this.tn.skip("{");
        while ((token = this.tn.next()) !== '}') {
            if (!Lang.NAME.test(token))
                throw Error("illegal option name: " + name + "." + token);
            if (this.tn.omit(":"))
                setOption(parent["options"], name + "." + token, this._readValue(true));
            else
                this._parseOptionValue(parent, name + "." + token);
        }
    }
};

/**
 * Parses a service definition.
 * @param {!Object} parent Parent definition
 * @private
 */
ParserPrototype._parseService = function(parent) {
    var token = this.tn.next();
    if (!Lang.NAME.test(token))
        throw Error("illegal service name at line "+this.tn.line+": "+token);
    var name = token;
    var svc = {
        "name": name,
        "rpc": {},
        "options": {}
    };
    this.tn.skip("{");
    while ((token = this.tn.next()) !== '}') {
        if (token === "option")
            this._parseOption(svc);
        else if (token === 'rpc')
            this._parseServiceRPC(svc);
        else
            throw Error("illegal service token: "+token);
    }
    this.tn.omit(";");
    parent["services"].push(svc);
};

/**
 * Parses a RPC service definition of the form ['rpc', name, (request), 'returns', (response)].
 * @param {!Object} svc Service definition
 * @private
 */
ParserPrototype._parseServiceRPC = function(svc) {
    var type = "rpc",
        token = this.tn.next();
    if (!Lang.NAME.test(token))
        throw Error("illegal rpc service method name: "+token);
    var name = token;
    var method = {
        "request": null,
        "response": null,
        "request_stream": false,
        "response_stream": false,
        "options": {}
    };
    this.tn.skip("(");
    token = this.tn.next();
    if (token.toLowerCase() === "stream") {
      method["request_stream"] = true;
      token = this.tn.next();
    }
    if (!Lang.TYPEREF.test(token))
        throw Error("illegal rpc service request type: "+token);
    method["request"] = token;
    this.tn.skip(")");
    token = this.tn.next();
    if (token.toLowerCase() !== "returns")
        throw Error("illegal rpc service request type delimiter: "+token);
    this.tn.skip("(");
    token = this.tn.next();
    if (token.toLowerCase() === "stream") {
      method["response_stream"] = true;
      token = this.tn.next();
    }
    method["response"] = token;
    this.tn.skip(")");
    token = this.tn.peek();
    if (token === '{') {
        this.tn.next();
        while ((token = this.tn.next()) !== '}') {
            if (token === 'option')
                this._parseOption(method);
            else
                throw Error("illegal rpc service token: " + token);
        }
        this.tn.omit(";");
    } else
        this.tn.skip(";");
    if (typeof svc[type] === 'undefined')
        svc[type] = {};
    svc[type][name] = method;
};

/**
 * Parses a message definition.
 * @param {!Object} parent Parent definition
 * @param {!Object=} fld Field definition if this is a group
 * @returns {!Object}
 * @private
 */
ParserPrototype._parseMessage = function(parent, fld) {
    var isGroup = !!fld,
        token = this.tn.next();
    var msg = {
        "name": "",
        "fields": [],
        "enums": [],
        "messages": [],
        "options": {},
        "services": [],
        "oneofs": {}
        // "extensions": undefined
    };
    if (!Lang.NAME.test(token))
        throw Error("illegal "+(isGroup ? "group" : "message")+" name: "+token);
    msg["name"] = token;
    if (isGroup) {
        this.tn.skip("=");
        fld["id"] = mkId(this.tn.next());
        msg["isGroup"] = true;
    }
    token = this.tn.peek();
    if (token === '[' && fld)
        this._parseFieldOptions(fld);
    this.tn.skip("{");
    while ((token = this.tn.next()) !== '}') {
        if (Lang.RULE.test(token))
            this._parseMessageField(msg, token);
        else if (token === "oneof")
            this._parseMessageOneOf(msg);
        else if (token === "enum")
            this._parseEnum(msg);
        else if (token === "message")
            this._parseMessage(msg);
        else if (token === "option")
            this._parseOption(msg);
        else if (token === "service")
            this._parseService(msg);
        else if (token === "extensions")
            msg["extensions"] = this._parseExtensionRanges();
        else if (token === "reserved")
            this._parseIgnored(); // TODO
        else if (token === "extend")
            this._parseExtend(msg);
        else if (Lang.TYPEREF.test(token)) {
            if (!this.proto3)
                throw Error("illegal field rule: "+token);
            this._parseMessageField(msg, "optional", token);
        } else
            throw Error("illegal message token: "+token);
    }
    this.tn.omit(";");
    parent["messages"].push(msg);
    return msg;
};

/**
 * Parses an ignored statement.
 * @private
 */
ParserPrototype._parseIgnored = function() {
    while (this.tn.peek() !== ';')
        this.tn.next();
    this.tn.skip(";");
};

/**
 * Parses a message field.
 * @param {!Object} msg Message definition
 * @param {string} rule Field rule
 * @param {string=} type Field type if already known (never known for maps)
 * @returns {!Object} Field descriptor
 * @private
 */
ParserPrototype._parseMessageField = function(msg, rule, type) {
    if (!Lang.RULE.test(rule))
        throw Error("illegal message field rule: "+rule);
    var fld = {
        "rule": rule,
        "type": "",
        "name": "",
        "options": {},
        "id": 0
    };
    var token;
    if (rule === "map") {

        if (type)
            throw Error("illegal type: " + type);
        this.tn.skip('<');
        token = this.tn.next();
        if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token))
            throw Error("illegal message field type: " + token);
        fld["keytype"] = token;
        this.tn.skip(',');
        token = this.tn.next();
        if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token))
            throw Error("illegal message field: " + token);
        fld["type"] = token;
        this.tn.skip('>');
        token = this.tn.next();
        if (!Lang.NAME.test(token))
            throw Error("illegal message field name: " + token);
        fld["name"] = token;
        this.tn.skip("=");
        fld["id"] = mkId(this.tn.next());
        token = this.tn.peek();
        if (token === '[')
            this._parseFieldOptions(fld);
        this.tn.skip(";");

    } else {

        type = typeof type !== 'undefined' ? type : this.tn.next();

        if (type === "group") {

            // "A [legacy] group simply combines a nested message type and a field into a single declaration. In your
            // code, you can treat this message just as if it had a Result type field called result (the latter name is
            // converted to lower-case so that it does not conflict with the former)."
            var grp = this._parseMessage(msg, fld);
            if (!/^[A-Z]/.test(grp["name"]))
                throw Error('illegal group name: '+grp["name"]);
            fld["type"] = grp["name"];
            fld["name"] = grp["name"].toLowerCase();
            this.tn.omit(";");

        } else {

            if (!Lang.TYPE.test(type) && !Lang.TYPEREF.test(type))
                throw Error("illegal message field type: " + type);
            fld["type"] = type;
            token = this.tn.next();
            if (!Lang.NAME.test(token))
                throw Error("illegal message field name: " + token);
            fld["name"] = token;
            this.tn.skip("=");
            fld["id"] = mkId(this.tn.next());
            token = this.tn.peek();
            if (token === "[")
                this._parseFieldOptions(fld);
            this.tn.skip(";");

        }
    }
    msg["fields"].push(fld);
    return fld;
};

/**
 * Parses a message oneof.
 * @param {!Object} msg Message definition
 * @private
 */
ParserPrototype._parseMessageOneOf = function(msg) {
    var token = this.tn.next();
    if (!Lang.NAME.test(token))
        throw Error("illegal oneof name: "+token);
    var name = token,
        fld;
    var fields = [];
    this.tn.skip("{");
    while ((token = this.tn.next()) !== "}") {
        fld = this._parseMessageField(msg, "optional", token);
        fld["oneof"] = name;
        fields.push(fld["id"]);
    }
    this.tn.omit(";");
    msg["oneofs"][name] = fields;
};

/**
 * Parses a set of field option definitions.
 * @param {!Object} fld Field definition
 * @private
 */
ParserPrototype._parseFieldOptions = function(fld) {
    this.tn.skip("[");
    var token,
        first = true;
    while ((token = this.tn.peek()) !== ']') {
        if (!first)
            this.tn.skip(",");
        this._parseOption(fld, true);
        first = false;
    }
    this.tn.next();
};

/**
 * Parses an enum.
 * @param {!Object} msg Message definition
 * @private
 */
ParserPrototype._parseEnum = function(msg) {
    var enm = {
        "name": "",
        "values": [],
        "options": {}
    };
    var token = this.tn.next();
    if (!Lang.NAME.test(token))
        throw Error("illegal name: "+token);
    enm["name"] = token;
    this.tn.skip("{");
    while ((token = this.tn.next()) !== '}') {
        if (token === "option")
            this._parseOption(enm);
        else {
            if (!Lang.NAME.test(token))
                throw Error("illegal name: "+token);
            this.tn.skip("=");
            var val = {
                "name": token,
                "id": mkId(this.tn.next(), true)
            };
            token = this.tn.peek();
            if (token === "[")
                this._parseFieldOptions({ "options": {} });
            this.tn.skip(";");
            enm["values"].push(val);
        }
    }
    this.tn.omit(";");
    msg["enums"].push(enm);
};

/**
 * Parses extension / reserved ranges.
 * @returns {!Array.<!Array.<number>>}
 * @private
 */
ParserPrototype._parseExtensionRanges = function() {
    var ranges = [];
    var token,
        range,
        value;
    do {
        range = [];
        while (true) {
            token = this.tn.next();
            switch (token) {
                case "min":
                    value = ProtoBuf.ID_MIN;
                    break;
                case "max":
                    value = ProtoBuf.ID_MAX;
                    break;
                default:
                    value = mkNumber(token);
                    break;
            }
            range.push(value);
            if (range.length === 2)
                break;
            if (this.tn.peek() !== "to") {
                range.push(value);
                break;
            }
            this.tn.next();
        }
        ranges.push(range);
    } while (this.tn.omit(","));
    this.tn.skip(";");
    return ranges;
};

/**
 * Parses an extend block.
 * @param {!Object} parent Parent object
 * @private
 */
ParserPrototype._parseExtend = function(parent) {
    var token = this.tn.next();
    if (!Lang.TYPEREF.test(token))
        throw Error("illegal extend reference: "+token);
    var ext = {
        "ref": token,
        "fields": []
    };
    this.tn.skip("{");
    while ((token = this.tn.next()) !== '}') {
        if (Lang.RULE.test(token))
            this._parseMessageField(ext, token);
        else if (Lang.TYPEREF.test(token)) {
            if (!this.proto3)
                throw Error("illegal field rule: "+token);
            this._parseMessageField(ext, "optional", token);
        } else
            throw Error("illegal extend token: "+token);
    }
    this.tn.omit(";");
    parent["messages"].push(ext);
    return ext;
};

// ----- General -----

/**
 * Returns a string representation of this parser.
 * @returns {string}
 */
ParserPrototype.toString = function() {
    return "Parser at line "+this.tn.line;
};
