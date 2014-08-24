/**
 * An extension (field).
 * @exports ProtoBuf.Reflect.Extension
 * @constructor
 * @param {ProtoBuf.Reflect.T} parent Parent object
 * @param {string} name Object name
 * @param {!ProtoBuf.Reflect.Message.Field} field Extension field
 */
var Extension = function(parent, name, field) {
    T.call(this, parent, name);

    /**
     * Extended message field.
     * @type {!ProtoBuf.Reflect.Message.Field}
     * @expose
     */
    this.field = field;
};

// Extends T
Extension.prototype = Object.create(T.prototype);
