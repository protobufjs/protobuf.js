/**
 * Constructs a new Message OneOf.
 * @exports ProtoBuf.Reflect.Message.OneOf
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.Message} message Message reference
 * @param {string} name OneOf name
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
var OneOf = function(builder, message, name) {
    T.call(this, builder, message, name);

    /**
     * Enclosed fields.
     * @type {!Array.<!ProtoBuf.Reflect.Message.Field>}
     * @expose
     */
    this.fields = [];
};
