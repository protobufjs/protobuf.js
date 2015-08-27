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
 * Gets the string name of an enum value.
 * @param {!ProtoBuf.Builder.Enum} enm Runtime enum
 * @param {number} value Enum value
 * @returns {?string} Name or `null` if not present
 * @expose
 */
Enum.getName = function(enm, value) {
    var keys = Object.keys(enm);
    for (var i=0, key; i<keys.length; ++i)
        if (enm[key = keys[i]] === value)
            return key;
    return null;
};

/**
 * @alias ProtoBuf.Reflect.Enum.prototype
 * @inner
 */
var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);

/**
 * Builds this enum and returns the runtime counterpart.
 * @param {boolean} rebuild Whether to rebuild or not, defaults to false
 * @returns {!Object.<string,number>}
 * @expose
 */
EnumPrototype.build = function(rebuild) {
    if (this.object && !rebuild)
        return this.object;
    var enm = new ProtoBuf.Builder.Enum(),
        values = this.getChildren(Enum.Value);
    for (var i=0, k=values.length; i<k; ++i)
        enm[values[i]['name']] = values[i]['id'];
    if (Object.defineProperty)
        Object.defineProperty(enm, '$options', {
            "value": this.buildOpt(),
            "enumerable": false
        });
    return this.object = enm;
};
