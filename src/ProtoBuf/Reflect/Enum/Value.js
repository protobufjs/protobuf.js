/**
 * Constructs a new Enum Value.
 * @exports ProtoBuf.Reflect.Enum.Value
 * @param {!ProtoBuf.Reflect.Enum} enm Enum reference
 * @param {string} name Field name
 * @param {number} id Unique field id
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
var Value = function(enm, name, id) {
    T.call(this, enm, name);

    /**
     * @override
     */
    this.className = "Enum.Value";

    /**
     * Unique enum value id.
     * @type {number}
     * @expose
     */
    this.id = id;
};

// Extends T
Value.prototype = Object.create(T.prototype);
