"use strict"; // eslint-disable-line strict

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.A = (function() {

    /**
     * Constructs a new A.
     * @exports A
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function A(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias A.prototype */
    var $prototype = A.prototype;

    /**
     * A whatever.
     * @name A#whatever
     * @type {string}
     */
    $prototype["whatever"] = "";

    /**
     * Creates a new A instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {A} A instance
     */
    A.create = function create(properties) {
        return new A(properties);
    };

    /**
     * Encodes the specified A.
     * @function
     * @param {A|Object} message A or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    A.encode = (function() {
        /* eslint-disable */
        var Writer = $protobuf.Writer;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function encode(m, w) {
            w||(w=Writer.create())
            if(m.whatever!==undefined&&m.whatever!=="")
                w.uint32(10).string(m.whatever)
            return w
        }
        /* eslint-enable */
    })();

    /**
     * Encodes the specified A, length delimited.
     * @param {A|Object} message A or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    A.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a A from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {A} A
     */
    A.decode = (function() {
        /* eslint-disable */
        var Reader = $protobuf.Reader;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function decode(r, l) {
            r instanceof Reader||(r=Reader.create(r))
            var c=l===undefined?r.len:r.pos+l,m=new $root.A
            while(r.pos<c){
                var t=r.uint32()
                switch(t>>>3){
                    case 1:
                        m.whatever=r.string()
                        break
                    default:
                        r.skipType(t&7)
                        break
                }
            }
            return m
        }
        /* eslint-enable */
    })();

    /**
     * Decodes a A from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {A} A
     */
    A.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a A.
     * @function
     * @param {A|Object} message A or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    A.verify = (function() {
        /* eslint-disable */
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function verify(m) {
            if(m.whatever!==undefined){
                if(!util.isString(m.whatever))
                    return"invalid value for field .A.whatever (string expected)"
            }
            return null
        }
        /* eslint-enable */
    })();

    return A;
})();

$root.B = (function() {

    /**
     * Constructs a new B.
     * @exports B
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function B(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias B.prototype */
    var $prototype = B.prototype;

    /**
     * B A.
     * @name B#A
     * @type {A}
     */
    $prototype["A"] = null;

    /**
     * Creates a new B instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {B} B instance
     */
    B.create = function create(properties) {
        return new B(properties);
    };

    /**
     * Encodes the specified B.
     * @function
     * @param {B|Object} message B or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    B.encode = (function() {
        /* eslint-disable */
        var Writer = $protobuf.Writer;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = ["A"]);
        return function encode(m, w) {
            w||(w=Writer.create())
            if(m.A!==undefined&&m.A!==null)
                types[0].encode(m.A,w.uint32(10).fork()).ldelim()
            return w
        }
        /* eslint-enable */
    })();

    /**
     * Encodes the specified B, length delimited.
     * @param {B|Object} message B or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    B.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a B from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {B} B
     */
    B.decode = (function() {
        /* eslint-disable */
        var Reader = $protobuf.Reader;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = ["A"]);
        return function decode(r, l) {
            r instanceof Reader||(r=Reader.create(r))
            var c=l===undefined?r.len:r.pos+l,m=new $root.B
            while(r.pos<c){
                var t=r.uint32()
                switch(t>>>3){
                    case 1:
                        m.A=types[0].decode(r,r.uint32())
                        break
                    default:
                        r.skipType(t&7)
                        break
                }
            }
            return m
        }
        /* eslint-enable */
    })();

    /**
     * Decodes a B from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {B} B
     */
    B.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a B.
     * @function
     * @param {B|Object} message B or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    B.verify = (function() {
        /* eslint-disable */
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = ["A"]);
        return function verify(m) {
            if(m.A!==undefined&&m.A!==null){
                var r;
                if(r=types[0].verify(m.A))
                    return r
            }
            return null
        }
        /* eslint-enable */
    })();

    return B;
})();

// Resolve lazy types
$lazyTypes.forEach(function(types) {
    types.forEach(function(path, i) {
        if (!path)
            return;
        path = path.split('.');
        var ptr = $root;
        while (path.length)
            ptr = ptr[path.shift()];
        types[i] = ptr;
    });
});

$protobuf.roots["test_ambiguous-names"] = $root;

module.exports = $root;
