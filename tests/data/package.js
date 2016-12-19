"use strict"; // eslint-disable-line strict

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.Package = (function() {

    /**
     * Constructs a new Package.
     * @exports Package
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function Package(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias Package.prototype */
    var $prototype = Package.prototype;

    /**
     * Package name.
     * @name Package#name
     * @type {string}
     */
    $prototype["name"] = "";

    /**
     * Package version.
     * @name Package#version
     * @type {string}
     */
    $prototype["version"] = "";

    /**
     * Package description.
     * @name Package#description
     * @type {string}
     */
    $prototype["description"] = "";

    /**
     * Package author.
     * @name Package#author
     * @type {string}
     */
    $prototype["author"] = "";

    /**
     * Package license.
     * @name Package#license
     * @type {string}
     */
    $prototype["license"] = "";

    /**
     * Package repository.
     * @name Package#repository
     * @type {Package.Repository}
     */
    $prototype["repository"] = null;

    /**
     * Package bugs.
     * @name Package#bugs
     * @type {string}
     */
    $prototype["bugs"] = "";

    /**
     * Package homepage.
     * @name Package#homepage
     * @type {string}
     */
    $prototype["homepage"] = "";

    /**
     * Package keywords.
     * @name Package#keywords
     * @type {Array.<string>}
     */
    $prototype["keywords"] = $protobuf.util.emptyArray;

    /**
     * Package main.
     * @name Package#main
     * @type {string}
     */
    $prototype["main"] = "";

    /**
     * Package bin.
     * @name Package#bin
     * @type {string}
     */
    $prototype["bin"] = $protobuf.util.emptyObject;

    /**
     * Package scripts.
     * @name Package#scripts
     * @type {string}
     */
    $prototype["scripts"] = $protobuf.util.emptyObject;

    /**
     * Package dependencies.
     * @name Package#dependencies
     * @type {string}
     */
    $prototype["dependencies"] = $protobuf.util.emptyObject;

    /**
     * Package optionalDependencies.
     * @name Package#optionalDependencies
     * @type {string}
     */
    $prototype["optionalDependencies"] = $protobuf.util.emptyObject;

    /**
     * Package devDependencies.
     * @name Package#devDependencies
     * @type {string}
     */
    $prototype["devDependencies"] = $protobuf.util.emptyObject;

    /**
     * Package types.
     * @name Package#types
     * @type {string}
     */
    $prototype["types"] = "";

    /**
     * Creates a new Package instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {Package} Package instance
     */
    Package.create = function create(properties) {
        return new Package(properties);
    };

    /**
     * Encodes the specified Package.
     * @function
     * @param {Package|Object} message Package or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    Package.encode = (function() {
        /* eslint-disable */
        var Writer = $protobuf.Writer;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null,null,null,null,null,"Package.Repository",null,null,null,null,null,null,null,null,null,null]);
        return function encode(m, w) {
            w||(w=Writer.create())
            if(m["name"]!==undefined&&m["name"]!=="")
                w.uint32(10).string(m["name"])
            if(m["version"]!==undefined&&m["version"]!=="")
                w.uint32(18).string(m["version"])
            if(m["description"]!==undefined&&m["description"]!=="")
                w.uint32(26).string(m["description"])
            if(m["author"]!==undefined&&m["author"]!=="")
                w.uint32(34).string(m["author"])
            if(m["license"]!==undefined&&m["license"]!=="")
                w.uint32(42).string(m["license"])
            if(m["repository"]!==undefined&&m["repository"]!==null)
                types[5].encode(m["repository"],w.fork()).len&&w.ldelim(6)||w.reset()
            if(m["bugs"]!==undefined&&m["bugs"]!=="")
                w.uint32(58).string(m["bugs"])
            if(m["homepage"]!==undefined&&m["homepage"]!=="")
                w.uint32(66).string(m["homepage"])
            if(m["keywords"])
                for(var i=0;i<m["keywords"].length;++i)
                w.uint32(74).string(m["keywords"][i])
            if(m["main"]!==undefined&&m["main"]!=="")
                w.uint32(82).string(m["main"])
            if(m["bin"]&&m["bin"]!==util.emptyObject){
                for(var ks=Object.keys(m["bin"]),i=0;i<ks.length;++i){
                    w.uint32(90).fork().uint32(10).string(ks[i])
                    w.uint32(18).string(m["bin"][ks[i]])
                    w.ldelim()
                }
            }
            if(m["scripts"]&&m["scripts"]!==util.emptyObject){
                for(var ks=Object.keys(m["scripts"]),i=0;i<ks.length;++i){
                    w.uint32(98).fork().uint32(10).string(ks[i])
                    w.uint32(18).string(m["scripts"][ks[i]])
                    w.ldelim()
                }
            }
            if(m["dependencies"]&&m["dependencies"]!==util.emptyObject){
                for(var ks=Object.keys(m["dependencies"]),i=0;i<ks.length;++i){
                    w.uint32(106).fork().uint32(10).string(ks[i])
                    w.uint32(18).string(m["dependencies"][ks[i]])
                    w.ldelim()
                }
            }
            if(m["optionalDependencies"]&&m["optionalDependencies"]!==util.emptyObject){
                for(var ks=Object.keys(m["optionalDependencies"]),i=0;i<ks.length;++i){
                    w.uint32(114).fork().uint32(10).string(ks[i])
                    w.uint32(18).string(m["optionalDependencies"][ks[i]])
                    w.ldelim()
                }
            }
            if(m["devDependencies"]&&m["devDependencies"]!==util.emptyObject){
                for(var ks=Object.keys(m["devDependencies"]),i=0;i<ks.length;++i){
                    w.uint32(122).fork().uint32(10).string(ks[i])
                    w.uint32(18).string(m["devDependencies"][ks[i]])
                    w.ldelim()
                }
            }
            if(m["types"]!==undefined&&m["types"]!=="")
                w.uint32(138).string(m["types"])
            return w
        }
        /* eslint-enable */
    })();

    /**
     * Encodes the specified Package, length delimited.
     * @param {Package|Object} message Package or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    Package.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Package from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Package} Package
     */
    Package.decode = (function() {
        /* eslint-disable */
        var Reader = $protobuf.Reader;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null,null,null,null,null,"Package.Repository",null,null,null,null,null,null,null,null,null,null]);
        return function decode(r, l) {
            r instanceof Reader||(r=Reader.create(r))
            var c=l===undefined?r.len:r.pos+l,m=new $root.Package
            while(r.pos<c){
                var t=r.int32()
                switch(t>>>3){
                    case 1:
                        m["name"]=r.string()
                        break
                    case 2:
                        m["version"]=r.string()
                        break
                    case 3:
                        m["description"]=r.string()
                        break
                    case 4:
                        m["author"]=r.string()
                        break
                    case 5:
                        m["license"]=r.string()
                        break
                    case 6:
                        m["repository"]=types[5].decode(r,r.uint32())
                        break
                    case 7:
                        m["bugs"]=r.string()
                        break
                    case 8:
                        m["homepage"]=r.string()
                        break
                    case 9:
                        m["keywords"]&&m["keywords"].length?m["keywords"]:m["keywords"]=[]
                        m["keywords"].push(r.string())
                        break
                    case 10:
                        m["main"]=r.string()
                        break
                    case 11:
                        r.skip().pos++
                        if(m["bin"]===util.emptyObject)
                            m["bin"]={}
                        var k=r.string()
                        if(typeof k==="object")
                            k=util.longToHash(k)
                        r.pos++
                        m["bin"][k]=r.string()
                        break
                    case 12:
                        r.skip().pos++
                        if(m["scripts"]===util.emptyObject)
                            m["scripts"]={}
                        var k=r.string()
                        if(typeof k==="object")
                            k=util.longToHash(k)
                        r.pos++
                        m["scripts"][k]=r.string()
                        break
                    case 13:
                        r.skip().pos++
                        if(m["dependencies"]===util.emptyObject)
                            m["dependencies"]={}
                        var k=r.string()
                        if(typeof k==="object")
                            k=util.longToHash(k)
                        r.pos++
                        m["dependencies"][k]=r.string()
                        break
                    case 14:
                        r.skip().pos++
                        if(m["optionalDependencies"]===util.emptyObject)
                            m["optionalDependencies"]={}
                        var k=r.string()
                        if(typeof k==="object")
                            k=util.longToHash(k)
                        r.pos++
                        m["optionalDependencies"][k]=r.string()
                        break
                    case 15:
                        r.skip().pos++
                        if(m["devDependencies"]===util.emptyObject)
                            m["devDependencies"]={}
                        var k=r.string()
                        if(typeof k==="object")
                            k=util.longToHash(k)
                        r.pos++
                        m["devDependencies"][k]=r.string()
                        break
                    case 17:
                        m["types"]=r.string()
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
     * Decodes a Package from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Package} Package
     */
    Package.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a Package.
     * @function
     * @param {Package|Object} message Package or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Package.verify = (function() {
        /* eslint-disable */
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null,null,null,null,null,"Package.Repository",null,null,null,null,null,null,null,null,null,null]);
        return function verify(m) {
            if(m["name"]!==undefined){
                if(!util.isString(m["name"]))
                    return"invalid value for field .Package.name (string expected)"
            }
            if(m["version"]!==undefined){
                if(!util.isString(m["version"]))
                    return"invalid value for field .Package.version (string expected)"
            }
            if(m["description"]!==undefined){
                if(!util.isString(m["description"]))
                    return"invalid value for field .Package.description (string expected)"
            }
            if(m["author"]!==undefined){
                if(!util.isString(m["author"]))
                    return"invalid value for field .Package.author (string expected)"
            }
            if(m["license"]!==undefined){
                if(!util.isString(m["license"]))
                    return"invalid value for field .Package.license (string expected)"
            }
            if(m["repository"]!==undefined&&m["repository"]!==null){
                var r;
                if(r=types[5].verify(m["repository"]))
                    return r
            }
            if(m["bugs"]!==undefined){
                if(!util.isString(m["bugs"]))
                    return"invalid value for field .Package.bugs (string expected)"
            }
            if(m["homepage"]!==undefined){
                if(!util.isString(m["homepage"]))
                    return"invalid value for field .Package.homepage (string expected)"
            }
            if(m["keywords"]!==undefined){
                if(!Array.isArray(m["keywords"]))
                    return"invalid value for field .Package.keywords (array expected)"
                for(var i=0;i<m["keywords"].length;++i){
                    if(!util.isString(m["keywords"][i]))
                        return"invalid value for field .Package.keywords (string[] expected)"
                }
            }
            if(m["main"]!==undefined){
                if(!util.isString(m["main"]))
                    return"invalid value for field .Package.main (string expected)"
            }
            if(m["bin"]!==undefined){
                if(!util.isObject(m["bin"]))
                    return"invalid value for field .Package.bin (object expected)"
                var k=Object.keys(m["bin"])
                for(var i=0;i<k.length;++i){
                    if(!util.isString(m["bin"][k[i]]))
                        return"invalid value for field .Package.bin (string{k:string} expected)"
                }
            }
            if(m["scripts"]!==undefined){
                if(!util.isObject(m["scripts"]))
                    return"invalid value for field .Package.scripts (object expected)"
                var k=Object.keys(m["scripts"])
                for(var i=0;i<k.length;++i){
                    if(!util.isString(m["scripts"][k[i]]))
                        return"invalid value for field .Package.scripts (string{k:string} expected)"
                }
            }
            if(m["dependencies"]!==undefined){
                if(!util.isObject(m["dependencies"]))
                    return"invalid value for field .Package.dependencies (object expected)"
                var k=Object.keys(m["dependencies"])
                for(var i=0;i<k.length;++i){
                    if(!util.isString(m["dependencies"][k[i]]))
                        return"invalid value for field .Package.dependencies (string{k:string} expected)"
                }
            }
            if(m["optionalDependencies"]!==undefined){
                if(!util.isObject(m["optionalDependencies"]))
                    return"invalid value for field .Package.optionalDependencies (object expected)"
                var k=Object.keys(m["optionalDependencies"])
                for(var i=0;i<k.length;++i){
                    if(!util.isString(m["optionalDependencies"][k[i]]))
                        return"invalid value for field .Package.optionalDependencies (string{k:string} expected)"
                }
            }
            if(m["devDependencies"]!==undefined){
                if(!util.isObject(m["devDependencies"]))
                    return"invalid value for field .Package.devDependencies (object expected)"
                var k=Object.keys(m["devDependencies"])
                for(var i=0;i<k.length;++i){
                    if(!util.isString(m["devDependencies"][k[i]]))
                        return"invalid value for field .Package.devDependencies (string{k:string} expected)"
                }
            }
            if(m["types"]!==undefined){
                if(!util.isString(m["types"]))
                    return"invalid value for field .Package.types (string expected)"
            }
            return null
        }
        /* eslint-enable */
    })();

    Package.Repository = (function() {

        /**
         * Constructs a new Repository.
         * @exports Package.Repository
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Repository(properties) {
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }

        /** @alias Package.Repository.prototype */
        var $prototype = Repository.prototype;

        /**
         * Repository type.
         * @name Package.Repository#type
         * @type {string}
         */
        $prototype["type"] = "";

        /**
         * Repository url.
         * @name Package.Repository#url
         * @type {string}
         */
        $prototype["url"] = "";

        /**
         * Creates a new Repository instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {Package.Repository} Repository instance
         */
        Repository.create = function create(properties) {
            return new Repository(properties);
        };

        /**
         * Encodes the specified Repository.
         * @function
         * @param {Package.Repository|Object} message Repository or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Repository.encode = (function() {
            /* eslint-disable */
            var Writer = $protobuf.Writer;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null]);
            return function encode(m, w) {
                w||(w=Writer.create())
                if(m["type"]!==undefined&&m["type"]!=="")
                    w.uint32(10).string(m["type"])
                if(m["url"]!==undefined&&m["url"]!=="")
                    w.uint32(18).string(m["url"])
                return w
            }
            /* eslint-enable */
        })();

        /**
         * Encodes the specified Repository, length delimited.
         * @param {Package.Repository|Object} message Repository or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Repository.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Repository from the specified reader or buffer.
         * @function
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Package.Repository} Repository
         */
        Repository.decode = (function() {
            /* eslint-disable */
            var Reader = $protobuf.Reader;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null]);
            return function decode(r, l) {
                r instanceof Reader||(r=Reader.create(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.Package.Repository
                while(r.pos<c){
                    var t=r.int32()
                    switch(t>>>3){
                        case 1:
                            m["type"]=r.string()
                            break
                        case 2:
                            m["url"]=r.string()
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
         * Decodes a Repository from the specified reader or buffer, length delimited.
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {Package.Repository} Repository
         */
        Repository.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };

        /**
         * Verifies a Repository.
         * @function
         * @param {Package.Repository|Object} message Repository or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Repository.verify = (function() {
            /* eslint-disable */
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null]);
            return function verify(m) {
                if(m["type"]!==undefined){
                    if(!util.isString(m["type"]))
                        return"invalid value for field .Package.Repository.type (string expected)"
                }
                if(m["url"]!==undefined){
                    if(!util.isString(m["url"]))
                        return"invalid value for field .Package.Repository.url (string expected)"
                }
                return null
            }
            /* eslint-enable */
        })();

        return Repository;
    })();

    return Package;
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

$protobuf.roots["test_package"] = $root;

module.exports = $root;
