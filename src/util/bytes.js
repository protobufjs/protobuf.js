"use strict";

var utf8 = require("./utf8");

var escapeRe = /\\([0-7]{1,3}|[xX][0-9a-fA-F]{1,2}|.?)/g;
var escapeMap = {
    a: "\x07", b: "\b", f: "\f", r: "\r", n: "\n", t: "\t", v: "\v",
    "?": "?", "'": "'", "\"": "\"", "\\": "\\"
};

function unescapeChar(match, escape) {
    var first = escape.charAt(0);
    if (first >= "0" && first <= "7")
        return String.fromCharCode(parseInt(escape, 8) & 255);
    if (first === "x" || first === "X")
        return String.fromCharCode(parseInt(escape.substring(1), 16));
    return escapeMap[escape] || "";
}

exports.unescape = function unescape(literal) {
    return literal.replace(escapeRe, unescapeChar);
};

// A numeric escape is one byte, while unescaped text is UTF-8.
exports.parse = function parse(literal, output) {
    var start = 0, match;
    while ((match = escapeRe.exec(literal)) !== null) {
        utf8.write(literal.substring(start, match.index), output, output.length);
        var ch = unescapeChar(match[0], match[1]);
        if (ch)
            output.push(ch.charCodeAt(0));
        start = escapeRe.lastIndex;
    }
    utf8.write(literal.substring(start), output, output.length);
    return output;
};

// Use fixed-width octal so a following digit cannot become part of the escape.
exports.escape = function escape(bytes) {
    var out = "";
    for (var i = 0; i < bytes.length; ++i) {
        var b = bytes[i];
        switch (b) {
            case 9: out += "\\t"; break;
            case 10: out += "\\n"; break;
            case 13: out += "\\r"; break;
            case 34: out += "\\\""; break;
            case 92: out += "\\\\"; break;
            default:
                if (b >= 32 && b <= 126)
                    out += String.fromCharCode(b);
                else
                    out += "\\" + ("00" + b.toString(8)).slice(-3);
                break;
        }
    }
    return out;
};
