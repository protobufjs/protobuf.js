/**
 * Constructs a Reflect base class.
 * @exports ProtoBuf.Reflect.T
 * @constructor
 * @abstract
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {?ProtoBuf.Reflect.T} parent Parent object
 * @param {string} name Object name
 */
var T = function(builder, parent, name) {

    /**
     * Builder reference.
     * @type {!ProtoBuf.Builder}
     * @expose
     */
    this.builder = builder;

    /**
     * Parent object.
     * @type {?ProtoBuf.Reflect.T}
     * @expose
     */
    this.parent = parent;

    /**
     * Object name in namespace.
     * @type {string}
     * @expose
     */
    this.name = name;

    /**
     * Fully qualified class name
     * @type {string}
     * @expose
     */
    this.className;
};

/**
 * @alias ProtoBuf.Reflect.T.prototype
 * @inner
 */
var TPrototype = T.prototype;

/**
 * Returns the fully qualified name of this object.
 * @returns {string} Fully qualified name as of ".PATH.TO.THIS"
 * @expose
 */
TPrototype.fqn = function() {
    var name = this.name,
        ptr = this;
    do {
        ptr = ptr.parent;
        if (ptr == null)
            break;
        name = ptr.name+"."+name;
    } while (true);
    return name;
};

/**
 * Returns a string representation of this Reflect object (its fully qualified name).
 * @param {boolean=} includeClass Set to true to include the class name. Defaults to false.
 * @return String representation
 * @expose
 */
TPrototype.toString = function(includeClass) {
    return (includeClass ? this.className + " " : "") + this.fqn();
};

/**
 * Builds this type.
 * @throws {Error} If this type cannot be built directly
 * @expose
 */
TPrototype.build = function() {
    throw Error(this.toString(true)+" cannot be built directly");
};
