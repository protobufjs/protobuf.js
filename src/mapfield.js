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
    Field.call(this, name, undefined, type, options);
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
    var keyType = this.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : this.keyType;
    var keyWireType = types.mapKeyWireTypes[keyType];

    var valueType = this.resolvedType instanceof Enum ? "uint32" : this.type;
    var valueWireType = types.wireTypes[valueType];

    var keys = Object.keys(value);
    for (var i = 0, k = keys.length; i < k; ++i) {
        var forked = writer.fork(),
            key = keys[i];
        forked.tag(1, keyWireType)[keyType](keys[i]);
        if (valueWireType === undefined)
            this.resolvedType.encodeDelimited(value[key], forked);
        else
            forked.tag(2, valueWireType)[valueType](value[key]);
        var buf = forked.finish();
        writer.tag(this.id, 2)
              .bytes(buf);
    }
    return writer;
};
