/**
 * Constructs a Reflect base class.
 * @exports ProtoBuf.Reflect.T
 * @constructor
 * @abstract
 * @param {ProtoBuf.Reflect.T} parent Parent object
 * @param {string} name Object name
 */
var T = function(parent, name) {

    /**
     * Parent object.
     * @type {ProtoBuf.Reflect.T|null}
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
 * Returns the fully qualified name of this object.
 * @returns {string} Fully qualified name as of ".PATH.TO.THIS"
 * @expose
 */
T.prototype.fqn = function() {
    var name = this.name,
        ptr = this;
    do {
        ptr = ptr.parent;
        if (ptr == null) break;
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
T.prototype.toString = function(includeClass) {
    var pfx = includeClass
        ? this.className + " "
        : "";
    return pfx + this.fqn();
};

/**
 * Builds this type.
 * @throws {Error} If this type cannot be built directly
 * @expose
 */
T.prototype.build = function() {
    throw(new Error(this.toString(true)+" cannot be built directly"));
};
