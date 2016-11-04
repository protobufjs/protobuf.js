var ReflectionObject = require("./object"),
    types     = require("./types"),
    Enum      = require("./enum"),
    util      = require("./util");
var Type;

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
    if (!util.isInteger(id))
        throw util._TypeError("id", "integer");
    if (!util.isString(type))
        throw util._TypeError("type");
    if (extend !== undefined && !util.isString(extend))
        throw util._TypeError("extend");
    if (rule === "map")
        throw util._TypeError("rule", "non-map (use MapField instead)");

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && (rule = rule.toLowerCase()) !== 'optional' ? rule : undefined; // exposed

    /**
     * Field type.
     * @type {string}
     */
    this.type = type; // exposed

    /**
     * Unique field id.
     * @type {number}
     */
     this.id = id; // exposed, marker

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = undefined; // exposed

    /**
     * Whether this field is required.
     * @type {boolean}
     */
    this.required = rule === "required";

    /**
     * Whether this field is optional.
     * @type {boolean}
     */
    this.optional = !this.required;

    /**
     * Whether this field is repeated.
     * @type {boolean}
     */
    this.repeated = rule === "repeated";

    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */
    this.map = false;

    /**
     * Message this field belongs to.
     * @type {?Type}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {?OneOf}
     */
    this.partOf = null;

    /**
     * The field's default value. Only relevant when working with proto2.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Resolved type if not a basic type.
     * @type {?(Type|Enum)}
     */
    this.resolvedType = null;

    /**
     * Resolved extended type if any.
     * @type {?ReflectionObject}
     */
    this.resolvedExtend = null;

    /**
     * Internally remembers whether this field is packed.
     * @type {?boolean}
     * @private
     */
    this._packed = null;
}

var FieldPrototype = ReflectionObject.extend(Field, [ "rule", "type", "id", "extend" ]);

Object.defineProperties(FieldPrototype, {

    /**
     * Determines whether this field is packed. Only relevant when repeated and working with proto2.
     * @name Field#packed
     * @type {boolean}
     * @readonly
     */
    packed: {
        get: function() {
            if (this._packed === null)
                this._packed = this.getOption("packed") !== false;
            return this._packed;
        }
    }

});

/**
 * @override
 */
FieldPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed")
        this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

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
 * @throws {TypeError} If arguments are invalid
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
    if (this.map)
        this.defaultValue = {};
    else if (this.repeated)
        this.defaultValue = [];
    else if (this.options && (optionDefault = this.options.default) !== undefined)
        this.defaultValue = optionDefault;
    else
        this.defaultValue = typeDefault;
    
    return ReflectionObject.prototype.resolve.call(this);
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
        if (this.packed && types.packableWireTypes[type] !== undefined) {
            value.forEach(writer[type], writer.fork());
            var buf = writer.finish();
            if (buf.length)
                writer.tag(this.id, 2).bytes(buf);
        } else
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
 * @throws {Error} If the wire format is invalid
 */
FieldPrototype.decode = function decode(reader, receivedWireType) {
    var type = this.resolve().resolvedType instanceof Enum ? "uint32" : this.type;

    if (this.repeated && this.packed && types.packableWireTypes[type] === receivedWireType) {
        var limit = reader.uint32() + reader.pos,
            values = [];
        while (reader.pos < limit)
            values.push(reader[type]());
        if (reader.pos > limit)
            throw Error("invalid wire format");
        return values;
    }

    return receivedWireType === types.wireTypes[type]
        ? reader[type]()
        : this.resolvedType.decodeDelimited(reader); // assumes wire type 2, throws if invalid
    
    // NOTE: This is tuned to be fast with as few assertions as possible.
    // Also note that there is no clean way to distinguish whether a field
    // is packed on the wire or not if its type encodes with wire type 2.
    // The official implementation obviously uses some sort of binary iterator
    // class to distinguish there.
};
