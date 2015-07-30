/*?
 // --- Scope -----------------
 // Lang : Language expressions
*/
/**
 * Constructs a new Tokenizer.
 * @exports ProtoBuf.DotProto.Tokenizer
 * @class prototype tokenizer
 * @param {string} proto Proto to tokenize
 * @constructor
 */
var Tokenizer = function(proto) {

    /**
     * Source to parse.
     * @type {string}
     * @expose
     */
    this.source = proto+"";

    /**
     * Current index.
     * @type {number}
     * @expose
     */
    this.index = 0;

    /**
     * Current line.
     * @type {number}
     * @expose
     */
    this.line = 1;

    /**
     * Token stack.
     * @type {!Array.<string>}
     * @expose
     */
    this.stack = [];

    /**
     * Opening character of the current string read, if any.
     * @type {?string}
     * @private
     */
    this._stringOpen = null;
};

/**
 * @alias ProtoBuf.DotProto.Tokenizer.prototype
 * @inner
 */
var TokenizerPrototype = Tokenizer.prototype;

/**
 * Reads a string beginning at the current index.
 * @return {string}
 * @private
 */
TokenizerPrototype._readString = function() {
    var re = this._stringOpen === '"'
        ? Lang.STRING_DQ
        : Lang.STRING_SQ;
    re.lastIndex = this.index - 1; // Include the open quote
    var match = re.exec(this.source);
    if (!match)
        throw Error("unterminated string");
    this.index = re.lastIndex;
    this.stack.push(this._stringOpen);
    this._stringOpen = null;
    return match[1];
};

/**
 * Gets the next token and advances by one.
 * @return {?string} Token or `null` on EOF
 * @expose
 */
TokenizerPrototype.next = function() {
    if (this.stack.length > 0)
        return this.stack.shift();
    if (this.index >= this.source.length)
        return null;
    if (this._stringOpen !== null)
        return this._readString();

    var repeat,
        prev,
        next;
    do {
        repeat = false;

        // Strip white spaces
        while (Lang.WHITESPACE.test(next = this.source.charAt(this.index))) {
            if (next === '\n')
                ++this.line;
            if (++this.index === this.source.length)
                return null;
        }

        // Strip comments
        if (this.source.charAt(this.index) === '/') {
            ++this.index;
            if (this.source.charAt(this.index) === '/') { // Line
                while (this.source.charAt(++this.index) !== '\n')
                    if (this.index == this.source.length)
                        return null;
                ++this.index;
                ++this.line;
                repeat = true;
            } else if ((next = this.source.charAt(this.index)) === '*') { /* Block */
                do {
                    if (next === '\n')
                        ++this.line;
                    if (++this.index === this.source.length)
                        return null;
                    prev = next;
                    next = this.source.charAt(this.index);
                } while (prev !== '*' || next !== '/');
                ++this.index;
                repeat = true;
            } else
                return '/';
        }
    } while (repeat);

    if (this.index === this.source.length)
        return null;

    // Read the next token
    var end = this.index;
    Lang.DELIM.lastIndex = 0;
    var delim = Lang.DELIM.test(this.source.charAt(end++));
    if (!delim)
        while(end < this.source.length && !Lang.DELIM.test(this.source.charAt(end)))
            ++end;
    var token = this.source.substring(this.index, this.index = end);
    if (token === '"' || token === "'")
        this._stringOpen = token;
    return token;
};

/**
 * Peeks for the next token.
 * @return {?string} Token or `null` on EOF
 * @expose
 */
TokenizerPrototype.peek = function() {
    if (this.stack.length === 0) {
        var token = this.next();
        if (token === null)
            return null;
        this.stack.push(token);
    }
    return this.stack[0];
};

/**
 * Skips a specific token and throws if it differs.
 * @param {string} expected Expected token
 * @throws {Error} If the actual token differs
 */
TokenizerPrototype.skip = function(expected) {
    var actual = this.next();
    if (actual !== expected)
        throw Error("illegal '"+actual+"', '"+expected+"' expected");
};

/**
 * Omits an optional token.
 * @param {string} expected Expected optional token
 * @returns {boolean} `true` if the token exists
 */
TokenizerPrototype.omit = function(expected) {
    if (this.peek() === expected) {
        this.next();
        return true;
    }
    return false;
};

/**
 * Returns a string representation of this object.
 * @return {string} String representation as of "Tokenizer(index/length)"
 * @expose
 */
TokenizerPrototype.toString = function() {
    return "Tokenizer ("+this.index+"/"+this.source.length+" at line "+this.line+")";
};
