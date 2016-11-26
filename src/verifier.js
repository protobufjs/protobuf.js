"use strict";
module.exports = Verifier;

var Enum = require("./enum"),
    Type = require("./type"),
    util = require("./util");

/**
 * Constructs a new verifier for the specified message type.
 * @classdesc Runtime message verifier using code generation on top of reflection.
 * @constructor
 * @param {Type} type Message type
 */
function Verifier(type) {

    /**
     * Message type.
     * @type {Type}
     */
    this.type = type;
}

/** @alias Verifier.prototype */
var VerifierPrototype = Verifier.prototype;

// This is here to mimic Type so that fallback functions work without having to bind()
Object.defineProperties(VerifierPrototype, {

    /**
     * Fields of this verifier's message type as an array for iteration.
     * @name Verifier#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this.type.fieldsArray;
        }
    },

    /**
     * Full name of this verifier's message type.
     * @name Verifier#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: function() {
            return this.type.fullName;
        }
    }
});

/**
 * Verifies a runtime message of this verifier's message type.
 * @param {Prototype|Object} message Runtime message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
VerifierPrototype.verify = function verify_fallback(message) {
    var fields = this.fieldsArray,
        i = 0;
    while (i < fields.length) {
        var field = fields[i++].resolve(),
            value = message[field.name];

        if (value === undefined) {
            if (field.required)
                return "missing required field " + field.name + " in " + this.fullName;

        } else if (field.resolvedType instanceof Enum && field.resolvedType.valuesById[value] === undefined) {
            return "invalid enum value " + field.name + " = " + value + " in " + this.fullName;

        } else if (field.resolvedType instanceof Type) {
            if (!value && field.required)
                return "missing required field " + field.name + " in " + this.fullName;
            var reason;
            if ((reason = field.resolvedType.verify(value)) !== null)
                return reason;
        }
    }
    return null;
};

/**
 * Generates a verifier specific to this verifier's message type.
 * @returns {function} Verifier function with an identical signature to {@link Verifier#verify}
 */
VerifierPrototype.generate = function generate() {
    /* eslint-disable no-unexpected-multiline */
    var fields = this.type.fieldsArray;
    var gen = util.codegen("m");
    var hasReasonVar = false;

    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            prop  = util.safeProp(field.name);
        if (field.required) { gen

            ("if(m%s===undefined)", prop)
                ("return 'missing required field %s in %s'", field.name, this.type.fullName);

        } else if (field.resolvedType instanceof Enum) {
            var values = util.toArray(field.resolvedType.values); gen

            ("switch(m%s){", prop)
                ("default:")
                    ("return 'invalid enum value %s = '+m%s+' in %s'", field.name, prop, this.type.fullName);

            for (var j = 0, l = values.length; j < l; ++j) gen
                ("case %d:", values[j]); gen
            ("}");

        } else if (field.resolvedType instanceof Type) {
            if (field.required) gen

            ("if(!m%s)", prop)
                ("return 'missing required field %s in %s'", field.name, this.type.fullName);

            if (!hasReasonVar) { gen("var r"); hasReasonVar = true; } gen

            ("if((r=types[%d].verify(m%s))!==null)", i, prop)
                ("return r");
        }
    }
    return gen
    ("return null")

    .eof(this.type.fullName + "$verify", {
        types : fields.map(function(fld) { return fld.resolvedType; })
    });
    /* eslint-enable no-unexpected-multiline */
};
