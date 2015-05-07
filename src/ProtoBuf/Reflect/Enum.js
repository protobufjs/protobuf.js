/**
 * Constructs a new Enum.
 * @exports ProtoBuf.Reflect.Enum
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.T} parent Parent Reflect object
 * @param {string} name Enum name
 * @param {Object.<string,*>=} options Enum options
 * @param {string?} syntax The syntax level (e.g., proto3)
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
var Enum = function(builder, parent, name, options, syntax) {
    Namespace.call(this, builder, parent, name, options, syntax);

    /**
     * @override
     */
    this.className = "Enum";

    /**
     * Runtime enum object.
     * @type {Object.<string,number>|null}
     * @expose
     */
    this.object = null;
};

/**
 * @alias ProtoBuf.Reflect.Enum.prototype
 * @inner
 */
var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);

/**
 * Builds this enum and returns the runtime counterpart.
 * @return {Object<string,*>}
 * @expose
 */
EnumPrototype.build = function() {
    var enm = {},
        values = this.getChildren(Enum.Value);
    for (var i=0, k=values.length; i<k; ++i)
        enm[values[i]['name']] = values[i]['id'];
    if (Object.defineProperty)
        Object.defineProperty(enm, '$options', { "value": this.buildOpt() });
    return this.object = enm;
};
