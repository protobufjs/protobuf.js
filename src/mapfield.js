var Field = require("./field"),
    Enum  = require("./enum"),
    types = require("./types"),
    util  = require("./util");

module.exports = MapField;

/**
 * Reflected message map field.
 * @extends Field
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
   @param {string} type Type of values
 * @param {string} keyType Type of keys
 * @param {!Object.<string,*>} [options] Field options
 */
function MapField(name, id, type, keyType, options) {
    Field.call(this, name, id, type, options);
    if (!util.isString(keyType))
        throw util._TypeError("keyType");
    
    // Is it worth to improve serialization order here?

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // exposed, marker

    /**
     * Resolved key type if not a basic type.
     * @type {?ReflectionObject}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

var MapFieldPrototype = Field.extend(MapField, [ "keyType" ]);

/**
 * Tests if the specified JSON object describes a map field.
 * @param {!Object} json JSON object to test
 * @returns {boolean} `true` if the object describes a field
 */
MapField.testJSON = function testJSON(json) {
    return Boolean(json && json.keyType !== undefined);
};

/**
 * Constructs a map field from JSON.
 * @param {string} name Field name
 * @param {!Object} json JSON object
 * @returns {!MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.type, json.keyType, json.options);
};

/**
 * @override
 */
MapFieldPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    
    // Besides a value type, map fields have a key type to resolve
    var keyWireType = types.mapKeyWireTypes[this.keyType];
    if (keyWireType === undefined) {
        var resolved = this.parent.lookup(this.keyType);
        if (!(resolved instanceof Enum))
            throw Error("unresolvable map key type: " + this.keyType);
        this.resolvedKeyType = resolved;
    }

    return Field.prototype.resolve.call(this);
};

/**
 * @override
 */
MapFieldPrototype.encode = function encode(value, writer) {
    var keys;
    if (!(value && (keys = Object.keys(value)).length))
        return writer;

    var keyType = this.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : this.keyType;
    var keyWireType = types.mapKeyWireTypes[keyType];

    var valueType = this.resolvedType instanceof Enum ? "uint32" : this.type;
    var valueWireType = types.wireTypes[valueType];

    writer.tag(this.id, 2).fork();
    for (var i = 0, k = keys.length; i < k; ++i) {
        var key = keys[i];
        writer.tag(1, keyWireType)[keyType](key);
        if (valueWireType === undefined)
            this.resolvedType.encodeDelimited(value[key], writer);
        else
            writer.tag(2, valueWireType)[valueType](value[key]);
    }
    return writer.bytes(writer.finish());
};

/**
 * @override
 */
MapFieldPrototype.decode = function decode(reader) {
    var length = reader.uint32(),
        map = {};
    
    if (length) {

        var keyType = this.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : this.keyType;
        var keyWireType = types.mapKeyWireTypes[keyType];

        var valueType = this.resolvedType instanceof Enum ? "uint32" : this.type;
        var valueWireType = types.wireTypes[valueType];

        var limit  = reader.pos + length,
            keys   = [],
            values = [];

        while (reader.pos < limit) {
            var tag = reader.tag();
            if (tag.id === 1 && tag.wireType === keyWireType)
                keys.push(reader[keyType]());
            else if (tag.id === 2) {
                if (tag.wireType === valueWireType)
                    values.push(reader[valueType]());
                else
                    values.push(this.resolvedType.decodeDelimited(reader)); // throws if invalid
            } else
                throw Error("illegal wire format for " + this + ": received id " + tag.id + ", expected [1,2]");
        }
        if (reader.pos > limit)
            throw Error("illegal wire format for " + this);
        if (keys.length !== values.length)
            throw Error("illegal wire format for " + this + ": key/value count mismatch");
        for (var i = 0, k = keys.length; i < k; ++i)
            map[keys[i]] = values[i];
        // TODO: Long-likes cannot be keys
    }
    return map;    
};
