/* eslint-disable default-case, callback-return */

module.exports = tokenize;

var delimRe        = /[\s{}=;:\[\],'"\(\)<>]/g,
    stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

/**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @returns {Object} Tokenizer handle
 */
function tokenize(source) {
    source = source.toString();
    
    var offset = 0,
        length = source.length,
        line = 1;
    
    var stack = [];

    var stringDelim = null;

    function readString() {
        var re = stringDelim === '"' ? stringDoubleRe : stringSingleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
            throw Error("unterminated string (line " + line + ")");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return match[1];
    }

    function next() {
        if (stack.length > 0)
            return stack.shift();
        if (stringDelim)
            return readString();
        var repeat,
            prev,
            curr;
        do {
            if (offset === length)
                return null;
            repeat = false;
            while (/\s/.test(curr = source.charAt(offset))) {
                if (curr === '\n')
                    ++line;
                if (++offset === length)
                    return null;
            }
            if (source.charAt(offset) === '/') {
                if (++offset === length)
                    throw Error("unterminated comment (line " + line + ")");
                if (source.charAt(offset) === '/') { // Line
                    while (source.charAt(++offset) !== '\n')
                        if (offset === length)
                            return null;
                    ++offset;
                    ++line;
                    repeat = true;
                } else if ((curr = source.charAt(offset)) === '*') { /* Block */
                    do {
                        if (curr === '\n')
                            ++line;
                        if (++offset === length)
                            return null;
                        prev = curr;
                        curr = source.charAt(offset);
                    } while (prev !== '*' || curr !== '/');
                    ++offset;
                    repeat = true;
                } else
                    return '/';
            }
        } while (repeat);

        if (offset === length)
            return null;
        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(source.charAt(end++));
        if (!delim)
            while (end < length && !delimRe.test(source.charAt(end)))
                ++end;
        var token = source.substring(offset, offset = end);
        if (token === '"' || token === "'")
            stringDelim = token;
        return token;
    }

    function push(token) {
        stack.push(token);
    }

    function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null)
                return null;
            push(token);
        }
        return stack[0];
    }

    function skip(expected) {
        var actual = next();
        if (actual !== expected)
            throw Error("illegal token '" + actual + "' ('" + expected + "' expected, line " + line + ")");
    }

    function omit(optional) {
        var actual = peek();
        if (actual === optional) {
            next();
            return true;
        }
        return false;
    }

    return {
        line: function() { return line; },
        next: next,
        push: push,
        peek: peek,
        skip: skip,
        omit: omit
    };
}