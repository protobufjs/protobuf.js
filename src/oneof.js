var ReflectionObject = require("./object"),
    Field = require("./field");

module.exports = OneOf;

/**
 * Reflected OneOf.
 * @constructor
 * @extends Namespace
 * @param {string} name
 */
function OneOf(name) {
    ReflectionObject.call(this, name);

    /**
     * Field names that belong to this oneof and have been added to the oneof's parent.
     * @type {!Array.<string>}
     */
    this.oneof = [];

    /**
     * Fields that belong to this oneof and are possibly not yet added to its parent.
     * @type {!Array.<!Field>}
     * @private
     */
    this._fields = [];
}

var OneOfPrototype = ReflectionObject.extend(OneOf, [ "oneof" ]);

/**
 * Adds a field to this oneof.
 * @override
 * @param {!Field} field
 * @returns {!OneOf} this
 */
OneOfPrototype.add = function add(field) {
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");
    if (field.parent)
        field.parent.remove(field);
    this._fields.push(field);
    field.oneof = this;
    if (this.parent) {
        this.parent.add(field);
        this.oneof.push(field.name);
    }
    return this;
};

/**
 * Removes a field from this oneof.
 * @override
 * @param {!Field} field
 * @returns {!OneOf} this
 */
OneOfPrototype.remove = function remove(field) {
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");
    var index1 = this._fields.indexOf(field);
    if (index1 < 0)
        throw Error(field + " is not a member of " + this);
    var index2 = this.oneof.indexOf(field.name);
    if (index2 > -1) {
        this.oneof.splice(index2, 1);
        this.parent.remove(field);
    }
    this._fields.splice(index1, 1);
    field.oneof = undefined;
    return this;
};

/**
 * @override
 */
OneOfPrototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    this._fields.forEach(function(field) {
        var index = this.oneof.indexOf(field.name);
        if (index < 0) {
            parent.add(field);
            this.oneof.push(field.name);
        }
    }, this);
};

/**
 * @override
 */
OneOfPrototype.onRemove = function onRemove(parent) {
    ReflectionObject.prototype.onRemove.call(this, parent);
    this._fields.forEach(function(field) {
        var index = this.oneof.indexOf(field.name);
        if (index > -1) {
            parent.remove(field);
            this.oneof.splice(index, 1);
        }
        field.oneof = undefined;
    }, this);
};
