var ReflectionObject = require("./object"),
    types     = require("./types"),
    Enum      = require("./enum"),
    util      = require("./util");
var Type,
    MapField;

module.exports = Field;

/**
 * Reflected message field.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Type of the underlying value
 * @param {string} [rule=optional] Field rule
 * @param {string} [extend] Extended type if different from parent
 * @param {!Object.<string,*>} [options] Field options
 */
function Field(name, id, type, rule, extend, options) {
    if (util.isObject(rule)) {
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        options = extend;
        extend = undefined;
    }   
    ReflectionObject.call(this, name, options);

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && (rule = rule.toLowerCase()) !== 'optional' ? rule : undefined;
    if (rule === "map")
        throw TypeError("illegal rule " + rule + ": use MapField instead");

    /**
     * Field type.
     * @type {string}
     */
    this.type = type;

    /**
     * Unique field id.
     * @type {number}
     */
     this.id = id;

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = undefined;

    // Reflection only properties

    /**
     * Message this field belongs to.
     * @type {?Type}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {?OneOf}
     */
    this.oneof = null;

    /**
     * The field's default value. Only relevant when working with proto2.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Resolved type if not a basic type.
     * @type {Type|Enum}
     */
    this.resolvedType = null;

    /**
     * Resolved extended type if any.
     * @type {ReflectionObject}
     */
    this.resolvedExtend = null;
}

var FieldPrototype = ReflectionObject.extend(Field, [ "rule", "type", "id", "extend" ]);

Object.defineProperties(FieldPrototype, {

    /**
     * Determines whether this field is required. Only relevant when working with proto2.
     * @name Field#required
     * @type {boolean}
     * @readonly
     */
    required: {
        get: function() {
            return this.rule === "required";
        }
    },

    /**
     * Determines whether this field is optional. Only relevant wwhen working with proto2.
     * @name Field#optional
     * @type {boolean}
     * @readonly
     */
    optional: {
        get: function() {
            return !this.rule || this.rule === "optional";
        }
    },

    /**
     * Determines whether this field is repeated.
     * @name Field#repeated
     * @type {boolean}
     * @readonly
     */
    repeated: {
        get: function() {
            return this.rule === "repeated";
        }
    },

    /**
     * Determines whether this field is packed. Only relevant when repeated and working with proto2.
     * @name Field#packed
     * @type {boolean}
     * @readonly
     */
    packed: {
        get: function() {
            return this.getOption("packed") !== false;
        }
    },

    /**
     * Determines whether this field is a map.
     * @name Field#map
     * @type {boolean}
     * @readonly
     */
    map: {
        get: function() {
            if (!MapField)
                MapField = require("./mapfield");
            return this instanceof MapField;
        }
    }

});

/**
 * Tests if the specified JSON object describes a field.
 * @param {*} json Any JSON object to test
 * @returns {boolean} `true` if the object describes a field
 */
Field.testJSON = function testJSON(json) {
    return Boolean(json && json.id !== undefined);
};

/**
 * Constructs a field from JSON.
 * @param {string} name Field name
 * @param {!Object} json JSON object
 * @returns {!Field} Created field
 */
Field.fromJSON = function fromJSON(name, json) {
    return new Field(name, json.id, json.type, json.role, json.extend, json.options);
};

/**
 * Resolves this field's type references.
 * @returns {!Field} this
 * @throws {Error} If any reference cannot be resolved
 */
FieldPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    if (!Type)
        Type = require("./type");

    var resolved;

    // extended type
    if (this.extend !== undefined) {
        resolved = this.parent.lookup(this.extend);
        if (!resolved || !(resolved instanceof Type))
            throw Error("unresolvable extend type: " + this.extend);
        this.resolvedExtend = resolved;
    }

    var typeDefault = types.defaults[this.type];

    // if not a basic type, resolve it
    if (typeDefault === undefined) {
        resolved = this.parent.lookup(this.type);
        if (resolved instanceof Type) {
            this.resolvedType = resolved;
            typeDefault = null;
        } else if (resolved instanceof Enum) {
            this.resolvedType = resolved;
            typeDefault = 0;
        } else
            throw Error("unresolvable field type: " + this.type);
    }

    // when everything is resolved determine the default value
    var optionDefault;
    if (this.repeated)
        this.defaultValue = [];
    else if (this.options && (optionDefault = this.options.default) !== undefined)
        this.defaultValue = optionDefault;
    else
        this.defaultValue = typeDefault;
    
    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Tests whether the specified value is present on the wire.
 * @param {*} value Field value
 * @returns {boolean} `true` if present
 */
FieldPrototype.present = function present(value) {
    if (this.required)
        return true;
    if (this.repeated)
        return Boolean(value && value.length);
    if (this.resolve().resolvedExtend)
        return false;
    if (this.resolvedType)
        return Boolean(this.resolvedType.present(value));
    return value != this.defaultValue; // eslint-disable-line eqeqeq
};

/**
 * Encodes the specified field value. Assumes that the field is present.
 * @param {*} value Field value
 * @param {!Writer} writer Writer to encode to
 * @returns {!Writer} writer
 */
FieldPrototype.encode = function encode(value, writer) {
    var type = this.resolve().resolvedType instanceof Enum ? "uint32" : this.type;
    if (this.repeated) {
        if (!util.isArray(value))
            value = [ value ];
        else if (!value.length)
            return writer;
        if (this.packed && types.packable[type]) {
            value.forEach(writer[type], writer.fork());
            var buf = writer.finish();
            if (buf.length)
                writer.tag(this.id, 2).bytes(buf);
        } else if (this.resolvedType)
            value.forEach(function(val) {
                this.resolvedType.encodeDelimited(val, writer.tag(this.id, 2));
            }, this);
    } else {
        var wireType = types.wireTypes[type];
        if (wireType !== undefined)
            writer.tag(this.id, wireType)[type](value);
        else
            this.resolvedType.encodeDelimited(value, writer.tag(this.id, 2));
    }
    return writer;
};

/**
 * Decodes a field value.
 * @param {!Reader} reader Reader to decode from
 * @param {number} receivedWireType Wire type received
 * @returns {*} Field value
 */
FieldPrototype.decode = function decode(reader, receivedWireType) {
    this.resolve();
    // At this point we know that the id matches
    var type = this.resolve().resolvedType instanceof Enum ? "uint32" : this.type;
    if (this.repeated && this.packed && types.packable[type] && receivedWireType === 2) {
        var limit = reader.uint32() + reader.pos,
            values = [];
        while (reader.pos < limit)
            values.push(reader[type]());
        return values;
    }
    // message type handles multiple values of repeated fields
    var basicWireType = types.wireTypes[type];
    if (receivedWireType === basicWireType)
        return reader[type]();
    else if (this.resolvedType && receivedWireType === 2)
        return this.resolvedType.decode(reader);
    throw Error("illegal wire type for " + this + " (received " + receivedWireType + ", expected " + (basicWireType !== undefined ? basicWireType : 2) + ")");
};
