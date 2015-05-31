/**
 * Language expressions.
 * @type {!Object.<string,string|!RegExp>}
 * @expose
 */
ProtoBuf.Lang = {
    OPEN: "{",
    CLOSE: "}",
    OPTOPEN: "[",
    OPTCLOSE: "]",
    OPTEND: ",",
    EQUAL: "=",
    END: ";",
    COMMA: ",",
    STRINGOPEN: '"',
    STRINGCLOSE: '"',
    STRINGOPEN_SQ: "'",
    STRINGCLOSE_SQ: "'",
    COPTOPEN: '(',
    COPTCLOSE: ')',
    LT: '<',
    GT: '>',
    DELIM: /[\s\{\}=;\[\],'"\(\)<>]/g,
    // KEYWORD: /^(?:package|option|import|message|enum|extend|service|syntax|extensions|group)$/,
    RULE: /^(?:required|optional|repeated|map)$/,
    TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
    NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
    TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
    FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
    NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
    NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
    NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
    NUMBER_OCT: /^0[0-7]+$/,
    NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
    ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
    NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
    WHITESPACE: /\s/,
    STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
    BOOL: /^(?:true|false)$/i
};
