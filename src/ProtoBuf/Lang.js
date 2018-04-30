/**
 * Language expressions.
 * @type {!Object.<string,!RegExp>}
 * @expose
 */
ProtoBuf.Lang = {

    // Characters always ending a statement
    DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,

    // Field rules
    RULE: /^(?:required|optional|repeated|map)$/,

    // Field types
    TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,

    // Names
    NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,

    // Type definitions
    TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,

    // Type references
    TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,

    // Fully qualified type references
    FQTYPEREF: /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/,

    // All numbers
    NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,

    // Decimal numbers
    NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,

    // Hexadecimal numbers
    NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,

    // Octal numbers
    NUMBER_OCT: /^0[0-7]+$/,

    // Floating point numbers
    NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,

    // Booleans
    BOOL: /^(?:true|false)$/i,

    // Id numbers
    ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,

    // Negative id numbers (enum values)
    NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,

    // Whitespaces
    WHITESPACE: /\s/,

    // All strings
    STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,

    // Double quoted strings
    STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,

    // Single quoted strings
    STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
};
