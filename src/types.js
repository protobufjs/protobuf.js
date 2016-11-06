// NOTE: These types are structured in a way that makes looking up wire types and similar fast,
// but not necessarily comfortable. Do not modify them unless you know exactly what you are doing.

/**
 * Common type constants.
 * @namespace
 */
var types = module.exports = {};

/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 */
types.wireTypes = {

    double   : 1,
    float    : 5,
    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 5,
    sfixed32 : 5,
    fixed64  : 1,
    sfixed64 : 1,
    bool     : 0,
    string   : 2,
    bytes    : 2
    
};

/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 */
types.defaults = {

    double   : 0,
    float    : 0,
    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 0,
    sfixed32 : 0,
    fixed64  : 0,
    sfixed64 : 0,
    bool     : false,
    string   : "",
    bytes    : null

};

/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 */
types.mapKeyWireTypes = {

    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 5,
    sfixed32 : 5,
    fixed64  : 1,
    sfixed64 : 1,
    bool     : 0,
    string   : 2

};

/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 */
types.packableWireTypes = {

    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 5,
    sfixed32 : 5,
    fixed64  : 1,
    sfixed64 : 1,
    bool     : 0

};
