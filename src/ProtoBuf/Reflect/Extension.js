/**
 * An extension (field).
 * @exports ProtoBuf.Reflect.Extension
 * @constructor
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.T} parent Parent object
 * @param {string} name Object name
 * @param {!ProtoBuf.Reflect.Message.Field} field Extension field
 */
var Extension = function(builder, parent, name, field) {
    T.call(this, builder, parent, name);

    /**
     * Extended message field.
     * @type {!ProtoBuf.Reflect.Message.Field}
     * @expose
     */
    this.field = field;
};

// Extends T
Extension.prototype = Object.create(T.prototype);
