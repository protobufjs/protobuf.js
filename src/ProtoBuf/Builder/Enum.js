// This file is not included currently and exists for documentation purposes only.

/*?
 // --- Scope ------------------
 // T : Reflect.Enum instance
 */

/**
 * Constructs a new runtime Enum.
 * @name ProtoBuf.Builder.Enum
 * @class Barebone of all runtime enums.
 * @constructor
 */
var Enum = function() {
    ProtoBuf.Builder.Enum.call(this);
};

/**
 * @alias ProtoBuf.Builder.Enum.prototype
 * @inner
 */
var EnumPrototype = Enum.prototype = Object.create(ProtoBuf.Builder.Enum.prototype);
