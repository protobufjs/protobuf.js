/**
 * Constructs a new Enum.
 * @exports ProtoBuf.Reflect.Enum
 * @param {!ProtoBuf.Reflect.T} parent Parent Reflect object
 * @param {string} name Enum name
 * @param {Object.<string.*>=} options Enum options
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
var Enum = function(parent, name, options) {
    Namespace.call(this, parent, name, options);

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

// Extends Namespace
Enum.prototype = Object.create(Namespace.prototype);

/**
 * Builds this enum and returns the runtime counterpart.
 * @return {Object<string,*>}
 * @expose
 */
Enum.prototype.build = function() {
    var enm = {};
    var values = this.getChildren(Enum.Value);
    for (var i=0; i<values.length; i++) {
        enm[values[i]['name']] = values[i]['id'];
    }
    if (Object.defineProperty) {
        Object.defineProperty(enm, '$options', {
            'value': this.buildOpt(),
            'enumerable': false,
            'configurable': false,
            'writable': false
        });
    }
    return this.object = enm;
};
