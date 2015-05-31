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
    this.source = ""+proto; // In case it's a buffer

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
     * Stacked values.
     * @type {!Array.<string>}
     * @expose
     */
    this.stack = [];

    /**
     * Whether currently reading a string or not.
     * @type {boolean}
     * @expose
     */
    this.readingString = false;

    /**
     * Whatever character ends the string. Either a single or double quote character.
     * @type {string}
     * @expose
     */
    this.stringEndsWith = Lang.STRINGCLOSE;
};

/**
 * @alias ProtoBuf.DotProto.Tokenizer.prototype
 * @inner
 */
var TokenizerPrototype = Tokenizer.prototype;

/**
 * Reads a string beginning at the current index.
 * @return {string} The string
 * @throws {Error} If it's not a valid string
 * @private
 */
TokenizerPrototype._readString = function() {
    Lang.STRING.lastIndex = this.index-1; // Include the open quote
    var match;
    if ((match = Lang.STRING.exec(this.source)) !== null) {
        var s = typeof match[1] !== 'undefined' ? match[1] : match[2];
        this.index = Lang.STRING.lastIndex;
        this.stack.push(this.stringEndsWith);
        return s;
    }
    throw Error("Unterminated string at line "+this.line+", index "+this.index);
};

/**
 * Gets the next token and advances by one.
 * @return {?string} Token or `null` on EOF
 * @throws {Error} If it's not a valid proto file
 * @expose
 */
TokenizerPrototype.next = function() {
    if (this.stack.length > 0)
        return this.stack.shift();
    if (this.index >= this.source.length)
        return null; // No more tokens
    if (this.readingString) {
        this.readingString = false;
        return this._readString();
    }
    var repeat, last;
    do {
        repeat = false;
        // Strip white spaces
        while (Lang.WHITESPACE.test(last = this.source.charAt(this.index))) {
            this.index++;
            if (last === "\n")
                this.line++;
            if (this.index === this.source.length)
                return null;
        }
        // Strip comments
        if (this.source.charAt(this.index) === '/') {
            if (this.source.charAt(++this.index) === '/') { // Single line
                while (this.source.charAt(this.index) !== "\n") {
                    this.index++;
                    if (this.index == this.source.length)
                        return null;
                }
                this.index++;
                this.line++;
                repeat = true;
            } else if (this.source.charAt(this.index) === '*') { /* Block */
                last = '';
                while (last+(last=this.source.charAt(this.index)) !== '*/') {
                    this.index++;
                    if (last === "\n")
                        this.line++;
                    if (this.index === this.source.length)
                        return null;
                }
                this.index++;
                repeat = true;
            } else
                throw Error("Unterminated comment at line "+this.line+": /"+this.source.charAt(this.index));
        }
    } while (repeat);
    if (this.index === this.source.length) return null;

    // Read the next token
    var end = this.index;
    Lang.DELIM.lastIndex = 0;
    var delim = Lang.DELIM.test(this.source.charAt(end));
    if (!delim) {
        ++end;
        while(end < this.source.length && !Lang.DELIM.test(this.source.charAt(end)))
            end++;
    } else
        ++end;
    var token = this.source.substring(this.index, this.index = end);
    if (token === Lang.STRINGOPEN)
        this.readingString = true,
        this.stringEndsWith = Lang.STRINGCLOSE;
    else if (token === Lang.STRINGOPEN_SQ)
        this.readingString = true,
        this.stringEndsWith = Lang.STRINGCLOSE_SQ;
    return token;
};

/**
 * Peeks for the next token.
 * @return {?string} Token or `null` on EOF
 * @throws {Error} If it's not a valid proto file
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
 * Returns a string representation of this object.
 * @return {string} String representation as of "Tokenizer(index/length)"
 * @expose
 */
TokenizerPrototype.toString = function() {
    return "Tokenizer("+this.index+"/"+this.source.length+" at line "+this.line+")";
};
