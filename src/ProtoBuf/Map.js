/**
 * @alias ProtoBuf.Map
 * @expose
 */
ProtoBuf.Map = (function(ProtoBuf, Reflect) {
    "use strict";

    /**
     * Constructs a new Map. A Map is a container that is used to implement map
     * fields on message objects. It closely follows the ES6 Map API; however,
     * it is distinct because we do not want to depend on external polyfills or
     * on ES6 itself.
     *
     * @exports ProtoBuf.Map
     * @param {!ProtoBuf.Reflect.Field} field Map field
     * @param {Object.<string,*>=} contents Initial contents
     * @constructor
     */
    var Map = function(field, contents) {
        if (!field.map)
            throw Error("field is not a map");

        /**
         * The field corresponding to this map.
         * @type {!ProtoBuf.Reflect.Field}
         */
        this.field = field;

        /**
         * Element instance corresponding to key type.
         * @type {!ProtoBuf.Reflect.Element}
         */
        this.keyElem = new Reflect.Element(field.keyType, null, true, field.syntax);

        /**
         * Element instance corresponding to value type.
         * @type {!ProtoBuf.Reflect.Element}
         */
        this.valueElem = new Reflect.Element(field.type, field.resolvedType, false, field.syntax);

        /**
         * Internal map: stores mapping of (string form of key) -> (key, value)
         * pair.
         *
         * We provide map semantics for arbitrary key types, but we build on top
         * of an Object, which has only string keys. In order to avoid the need
         * to convert a string key back to its native type in many situations,
         * we store the native key value alongside the value. Thus, we only need
         * a one-way mapping from a key type to its string form that guarantees
         * uniqueness and equality (i.e., str(K1) === str(K2) if and only if K1
         * === K2).
         *
         * @type {!Object<string, {key: *, value: *}>}
         */
        this.map = {};

        /**
         * Returns the number of elements in the map.
         */
        Object.defineProperty(this, "size", {
            get: function() { return Object.keys(this.map).length; }
        });

        // Fill initial contents from a raw object.
        if (contents) {
            var keys = Object.keys(contents);
            for (var i = 0; i < keys.length; i++) {
                var key = this.keyElem.valueFromString(keys[i]);
                var val = this.valueElem.verifyValue(contents[keys[i]]);
                this.map[this.keyElem.valueToString(key)] =
                    { key: key, value: val };
            }
        }
    };

    var MapPrototype = Map.prototype;

    /**
     * Helper: return an iterator over an array.
     * @param {!Array<*>} arr the array
     * @returns {!Object} an iterator
     * @inner
     */
    function arrayIterator(arr) {
        var idx = 0;
        return {
            next: function() {
                if (idx < arr.length)
                    return { done: false, value: arr[idx++] };
                return { done: true };
            }
        }
    }

    /**
     * Clears the map.
     */
    MapPrototype.clear = function() {
        this.map = {};
    };

    /**
     * Deletes a particular key from the map.
     * @returns {boolean} Whether any entry with this key was deleted.
     */
    MapPrototype["delete"] = function(key) {
        var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
        var hadKey = keyValue in this.map;
        delete this.map[keyValue];
        return hadKey;
    };

    /**
     * Returns an iterator over [key, value] pairs in the map.
     * @returns {Object} The iterator
     */
    MapPrototype.entries = function() {
        var entries = [];
        var strKeys = Object.keys(this.map);
        for (var i = 0, entry; i < strKeys.length; i++)
            entries.push([(entry=this.map[strKeys[i]]).key, entry.value]);
        return arrayIterator(entries);
    };

    /**
     * Returns an iterator over keys in the map.
     * @returns {Object} The iterator
     */
    MapPrototype.keys = function() {
        var keys = [];
        var strKeys = Object.keys(this.map);
        for (var i = 0; i < strKeys.length; i++)
            keys.push(this.map[strKeys[i]].key);
        return arrayIterator(keys);
    };

    /**
     * Returns an iterator over values in the map.
     * @returns {!Object} The iterator
     */
    MapPrototype.values = function() {
        var values = [];
        var strKeys = Object.keys(this.map);
        for (var i = 0; i < strKeys.length; i++)
            values.push(this.map[strKeys[i]].value);
        return arrayIterator(values);
    };

    /**
     * Iterates over entries in the map, calling a function on each.
     * @param {function(this:*, *, *, *)} cb The callback to invoke with value, key, and map arguments.
     * @param {Object=} thisArg The `this` value for the callback
     */
    MapPrototype.forEach = function(cb, thisArg) {
        var strKeys = Object.keys(this.map);
        for (var i = 0, entry; i < strKeys.length; i++)
            cb.call(thisArg, (entry=this.map[strKeys[i]]).value, entry.key, this);
    };

    /**
     * Sets a key in the map to the given value.
     * @param {*} key The key
     * @param {*} value The value
     * @returns {!ProtoBuf.Map} The map instance
     */
    MapPrototype.set = function(key, value) {
        var keyValue = this.keyElem.verifyValue(key);
        var valValue = this.valueElem.verifyValue(value);
        this.map[this.keyElem.valueToString(keyValue)] =
            { key: keyValue, value: valValue };
        return this;
    };

    /**
     * Gets the value corresponding to a key in the map.
     * @param {*} key The key
     * @returns {*|undefined} The value, or `undefined` if key not present
     */
    MapPrototype.get = function(key) {
        var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
        if (!(keyValue in this.map))
            return undefined;
        return this.map[keyValue].value;
    };

    /**
     * Determines whether the given key is present in the map.
     * @param {*} key The key
     * @returns {boolean} `true` if the key is present
     */
    MapPrototype.has = function(key) {
        var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
        return (keyValue in this.map);
    };

    return Map;
})(ProtoBuf, ProtoBuf.Reflect);
