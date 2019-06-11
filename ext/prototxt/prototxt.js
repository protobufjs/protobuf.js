
var prototxt = prototxt || {}

prototxt.TextReader = function(text) {
    this.text = text;
    this.position = 0;
    this.lineEnd = -1;
    this.lineStart = 0;
    this.line = -1;
    this.depth = 0;
    this.array_depth = 0;
    this.token = "";
    prototxt.TextReader.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
}

prototxt.TextReader.create = function(text) {
    return new prototxt.TextReader(text);
};

prototxt.TextReader.prototype.start = function() {
    if (this.depth > 0) {
        this.expect("{");
    }
    this.depth++;
};

prototxt.TextReader.prototype.end = function() {
    var token = this.peek();
    if (this.depth > 0 && token === "}") {
        this.expect("}");
        this.depth--;
        return true;
    }
    return token === "";
};

prototxt.TextReader.prototype.tag = function() {
    var name = this.read();
    var separator = this.peek();
    if (separator != "[" && separator != "{") {
        this.expect(":");
    }
    return name;
};

prototxt.TextReader.prototype.assert = function(tag) {
    var token = this.tag();
    if (token != tag) {
        throw new Error("Unexpected '" + token + "' instead of '" + tag + "'" + this.location());
    }
};

prototxt.TextReader.prototype.int32 = function() {
    var token = this.read();
    var value = Number.parseInt(token, 10);
    if (Number.isNaN(token - value)) {
        throw new Error("Couldn't parse int '" + token + "'" + this.location());
    }
    this.semicolon();
    return value;
};

prototxt.TextReader.prototype.uint32 = function() {
    var token = this.read();
    var value = Number.parseInt(token, 10);
    if (Number.isNaN(token - value)) {
        throw new Error("Couldn't parse int '" + token + "'" + this.location());
    }
    this.semicolon();
    return value;
};

prototxt.TextReader.prototype.int64 = function() {
    var token = this.read();
    var value = Number.parseInt(token, 10);
    if (Number.isNaN(token - value)) {
        throw new Error("Couldn't parse int '" + token + "'" + this.location());
    }
    this.semicolon();
    return value;
};

prototxt.TextReader.prototype.float = function() {
    return this.double();
};

prototxt.TextReader.prototype.double = function() {
    var token = this.read();
    if (token.startsWith('nan')) {
        return NaN;
    }
    if (token.startsWith('inf')) {
        return Infinity;
    }
    if (token.startsWith('-inf')) {
        return -Infinity;
    }
    if (token.endsWith('f')) {
        token = token.substring(0, token.length - 1);
    }
    var value = Number.parseFloat(token);
    if (Number.isNaN(token - value)) {
        throw new Error("Couldn't parse float '" + token + "'" + this.location());
    }
    this.semicolon();
    return value;
};

prototxt.TextReader.prototype.string = function() {
    var token = this.read();
    if (token.length < 2) {
        throw new Error("String is too short" + this.location());
    }
    var quote = token[0];
    if (quote !== "'" && quote !== "\"") {
        throw new Error("String is not in quotes" + this.location());
    }
    if (quote !== token[token.length - 1]) {
        throw new Error("String quotes do not match" + this.location());
    }
    var value = token.substring(1, token.length - 1);
    this.semicolon();
    return value;
};

prototxt.TextReader.prototype.bool = function() {
    var token = this.read();
    switch (token) {
        case "true":
        case "True":
        case "1":
            this.semicolon();
            return true;
        case "false":
        case "False":
        case "0":
            this.semicolon();
            return false;
    }
    throw new Error("Couldn't parse boolean '" + token + "'" + this.location());
};

prototxt.TextReader.prototype.bytes = function() {
    var token = this.string();
    var i = 0;
    var o = 0;
    var length = token.length;
    var a = new prototxt.TextReader.Array(length);
    while (i < length) {
        var c = token.charCodeAt(i++);
        if (c !== 0x5C) {
            a[o++] = c;
        }
        else {
            if (i >= length) {
                throw new Error("Unexpected end of bytes string" + this.location());
            }
            c = token.charCodeAt(i++);
            switch (c) {
                case 0x27: a[o++] = 0x27; break; // '
                case 0x5C: a[o++] = 0x5C; break; // \\
                case 0x22: a[o++] = 0x22; break; // "
                case 0x72: a[o++] = 0x0D; break; // \r
                case 0x6E: a[o++] = 0x0A; break; // \n
                case 0x74: a[o++] = 0x09; break; // \t
                case 0x62: a[o++] = 0x08; break; // \b
                case 0x58: // x
                case 0x78: // X
                    for (var xi = 0; xi < 2; xi++) {
                        if (i >= length) {
                            throw new Error("Unexpected end of bytes string" + this.location());
                        }
                        var xd = token.charCodeAt(i++);
                        xd = xd >= 65 && xd <= 70 ? xd - 55 : xd >= 97 && xd <= 102 ? xd - 87 : xd >= 48 && xd <= 57 ? xd - 48 : -1;
                        if (xd === -1) {
                            throw new Error("Unexpected hex digit '" + xd + "' in bytes string" + this.location());
                        }
                        a[o] = a[o] << 4 | xd;
                    }
                    o++;
                    break;
                default:
                    if (c < 48 || c > 57) { // 0-9
                        throw new Error("Unexpected character '" + c + "' in bytes string" + this.location());
                    }
                    i--;
                    for (var oi = 0; oi < 3; oi++) {
                        if (i >= length) {
                            throw new Error("Unexpected end of bytes string" + this.location());
                        }
                        var od = token.charCodeAt(i++);
                        if (od < 48 || od > 57) {
                            throw new Error("Unexpected octal digit '" + od + "' in bytes string" + this.location());
                        }
                        a[o] = a[o] << 3 | od - 48;
                    }
                    o++;
                    break;
            }
       }
    }
    return a.slice(0, o);
};

prototxt.TextReader.prototype.enum = function(type) {
    var token = this.read();
    if (!Object.prototype.hasOwnProperty.call(type, token)) {
        var value = Number.parseInt(token, 10);
        if (!Number.isNaN(token - value)) {
            this.semicolon();
            return value;
        }
        throw new Error("Couldn't parse enum '" + token + "'" + this.location());
    }
    this.semicolon();
    return type[token];
};

prototxt.TextReader.prototype.any = function(message) {
    if (this.match("[")) {
        this.read();
        var begin = this.position;
        var end = this.text.indexOf("]", begin);
        if (end === -1 || end >= this.next) {
            throw new Error("End of Any type_url not found" + this.location());
        }
        message.type_url = this.text.substring(begin, end);
        this.position = end + 1;
        message.value = this.skip().substring(1);
        this.expect("}");
        return true;
    }
    return false;
};

prototxt.TextReader.prototype.first = function(c) {
    if (this.match("[")) {
        this.array_depth++;
        return true;
    }
    return false;
};

prototxt.TextReader.prototype.last = function() {
    if (this.match("]")) {
        this.array_depth--;
        return true;
    }
    return false;
};

prototxt.TextReader.prototype.next = function() {
    var token = this.peek();
    if (token == ',') {
        this.read();
        return;
    }
    if (token == ']') {
        return;
    }
    this.handle(token);
}

prototxt.TextReader.prototype.skip = function() {
    var token = this.peek();
    if (token == '{') {
        var message = this.position;
        this.start();
        while (!this.end()) {
            this.read();
        }
        return this.text.substring(message, this.position);
    }
    else if (token == '[') {
        var list = this.position;
        this.read();
        while (!this.last()) {
            token = this.read();
            if (token == '') {
                this.handle(token);
            }
        }
        return this.text.substring(list, this.position);
    }
    var position = this.position;
    this.read();
    this.semicolon();
    return this.text.substring(position, this.position);
};

prototxt.TextReader.prototype.handle = function(token) {
    throw new Error("Unexpected token '" + token + "'" + this.location());
};

prototxt.TextReader.prototype.field = function(token, module) {
    throw new Error("Unknown field '" + token + "'" + this.location());
};

prototxt.TextReader.prototype.whitespace = function() {
    for (;;) {
        while (this.position >= this.lineEnd) {
            this.lineStart = this.lineEnd + 1;
            this.position = this.lineStart;
            if (this.position >= this.text.length) {
                return false;
            }
            this.lineEnd = this.text.indexOf("\n", this.position);
            if (this.lineEnd === -1) {
                this.lineEnd = this.text.length;
            }
            this.line++;
        }
        var c = this.text[this.position];
        switch (c) {
            case " ":
            case "\r":
            case "\t":
                this.position++;
                break;
            case "#":
                this.position = this.lineEnd;
                break;
            default:
                return true;
        }
    }
};

prototxt.TextReader.prototype.tokenize = function() {
    if (!this.whitespace()) {
        this.token = "";
        return this.token;
    }
    var c = this.text[this.position];
    if (c === "{" || c === "}" || c === ":" || c === "[" || c === "," || c === "]" || c === ";") {
        this.token = c;
        return this.token;
    }
    var position = this.position + 1;
    if (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "_") {
        while (position < this.lineEnd) {
            c = this.text[position];
            if (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "_" || c === "+" || c === "-") {
                position++;
                continue;
            }
            break;
        }
        this.token = this.text.substring(this.position, position);
        return this.token;
    }
    if (c >= "0" && c <= "9" || c === "-" || c === "+" || c === ".") {
        while (position < this.lineEnd) {
            c = this.text[position];
            if (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "_" || c === "+" || c === "-" || c === ".") {
                position++;
                continue;
            }
            break;
        }
        this.token = this.text.substring(this.position, position);
        return this.token;
    }
    if (c === "\"" || c === "'") {
        var quote = c;
        while (position < this.lineEnd) {
            c = this.text[position];
            if (c === "\\" && position < this.lineEnd) {
                position += 2;
                continue;
            }
            position++;
            if (c === quote) {
                break;
            }
        }
        this.token = this.text.substring(this.position, position);
        return this.token;
    }
    throw new Error("Unexpected token '" + c + "'" + this.location());
};

prototxt.TextReader.prototype.peek = function() {
    if (!this.cache) {
        this.token = this.tokenize();
        this.cache = true;
    }
    return this.token;
};

prototxt.TextReader.prototype.read = function() {
    if (!this.cache) {
        this.token = this.tokenize();
    }
    this.position += this.token.length;
    this.cache = false;
    return this.token;
};

prototxt.TextReader.prototype.expect = function(value) {
    var token = this.read();
    if (token !== value) {
        throw new Error("Unexpected '" + token + "' instead of '" + value + "'" + this.location());
    }
};

prototxt.TextReader.prototype.match = function(value) {
    if (this.peek() === value) {
        this.read();
        return true;
    }
    return false;
};

prototxt.TextReader.prototype.semicolon = function() {
    if (this.array_depth == 0) {
        this.match(";");
    }
};

prototxt.TextReader.prototype.location = function() {
    return " at " + (this.line + 1).toString() + ":" + (this.position - this.lineStart + 1).toString();
};

if (typeof module !== "undefined" && typeof module.exports === "object") {
    module.exports.TextReader = prototxt.TextReader; 
}
