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
     * @type {string}
     */
    $prototype.name = "";

    /**
     * Package version.
     * @type {string}
     */
    $prototype.version = "";

    /**
     * Package description.
     * @type {string}
     */
    $prototype.description = "";

    /**
     * Package author.
     * @type {string}
     */
    $prototype.author = "";

    /**
     * Package license.
     * @type {string}
     */
    $prototype.license = "";

    /**
     * Package repository.
     * @type {Package.Repository}
     */
    $prototype.repository = null;

    /**
     * Package bugs.
     * @type {string}
     */
    $prototype.bugs = "";

    /**
     * Package homepage.
     * @type {string}
     */
    $prototype.homepage = "";

    /**
     * Package keywords.
     * @type {Array.<string>}
     */
    $prototype.keywords = $protobuf.util.emptyArray;

    /**
     * Package main.
     * @type {string}
     */
    $prototype.main = "";

    /**
     * Package bin.
     * @type {string}
     */
    $prototype.bin = $protobuf.util.emptyObject;

    /**
     * Package scripts.
     * @type {string}
     */
    $prototype.scripts = $protobuf.util.emptyObject;

    /**
     * Package dependencies.
     * @type {string}
     */
    $prototype.dependencies = $protobuf.util.emptyObject;

    /**
     * Package optionalDependencies.
     * @type {string}
     */
    $prototype.optionalDependencies = $protobuf.util.emptyObject;

    /**
     * Package devDependencies.
     * @type {string}
     */
    $prototype.devDependencies = $protobuf.util.emptyObject;

    /**
     * Package types.
     * @type {string}
     */
    $prototype.types = "";

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
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Package.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
        writer || (writer = Writer.create())
        if (message.name !== undefined && message.name !== "")
            writer.uint32(10).string(message.name)
        if (message.version !== undefined && message.version !== "")
            writer.uint32(18).string(message.version)
        if (message.description !== undefined && message.description !== "")
            writer.uint32(26).string(message.description)
        if (message.author !== undefined && message.author !== "")
            writer.uint32(34).string(message.author)
        if (message.license !== undefined && message.license !== "")
            writer.uint32(42).string(message.license)
        if (message.repository !== undefined && message.repository !== null)
            types[5].encode(message.repository, writer.uint32(50).fork()).ldelim()
        if (message.bugs !== undefined && message.bugs !== "")
            writer.uint32(58).string(message.bugs)
        if (message.homepage !== undefined && message.homepage !== "")
            writer.uint32(66).string(message.homepage)
        if (message.keywords)
            for (var i = 0; i < message.keywords.length; ++i)
            writer.uint32(74).string(message.keywords[i])
        if (message.main !== undefined && message.main !== "")
            writer.uint32(82).string(message.main)
        if (message.bin && message.bin !== util.emptyObject) {
            for (var keys = Object.keys(message.bin), i = 0; i < keys.length; ++i) {
                writer.uint32(90).fork().uint32(10).string(keys[i])
                writer.uint32(18).string(message.bin[keys[i]])
                writer.ldelim()
            }
        }
        if (message.scripts && message.scripts !== util.emptyObject) {
            for (var keys = Object.keys(message.scripts), i = 0; i < keys.length; ++i) {
                writer.uint32(98).fork().uint32(10).string(keys[i])
                writer.uint32(18).string(message.scripts[keys[i]])
                writer.ldelim()
            }
        }
        if (message.dependencies && message.dependencies !== util.emptyObject) {
            for (var keys = Object.keys(message.dependencies), i = 0; i < keys.length; ++i) {
                writer.uint32(106).fork().uint32(10).string(keys[i])
                writer.uint32(18).string(message.dependencies[keys[i]])
                writer.ldelim()
            }
        }
        if (message.optionalDependencies && message.optionalDependencies !== util.emptyObject) {
            for (var keys = Object.keys(message.optionalDependencies), i = 0; i < keys.length; ++i) {
                writer.uint32(114).fork().uint32(10).string(keys[i])
                writer.uint32(18).string(message.optionalDependencies[keys[i]])
                writer.ldelim()
            }
        }
        if (message.devDependencies && message.devDependencies !== util.emptyObject) {
            for (var keys = Object.keys(message.devDependencies), i = 0; i < keys.length; ++i) {
                writer.uint32(122).fork().uint32(10).string(keys[i])
                writer.uint32(18).string(message.devDependencies[keys[i]])
                writer.ldelim()
            }
        }
        if (message.types !== undefined && message.types !== "")
            writer.uint32(138).string(message.types)
        return writer
    }})($protobuf.Writer, $protobuf.util, [null, null, null, null, null, "Package.Repository", null, null, null, null, null, null, null, null, null, null]); /* eslint-enable */

    /**
     * Encodes the specified Package, length delimited.
     * @param {Package|Object} message Package or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Package.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Package from the specified reader or buffer.
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Package} Package
     */
    Package.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
        reader instanceof Reader || (reader = Reader.create(reader))
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Package
        while (reader.pos < end) {
            var tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string()
                    break
                case 2:
                    message.version = reader.string()
                    break
                case 3:
                    message.description = reader.string()
                    break
                case 4:
                    message.author = reader.string()
                    break
                case 5:
                    message.license = reader.string()
                    break
                case 6:
                    message.repository = types[5].decode(reader, reader.uint32())
                    break
                case 7:
                    message.bugs = reader.string()
                    break
                case 8:
                    message.homepage = reader.string()
                    break
                case 9:
                    message.keywords && message.keywords.length || (message.keywords = [])
                    message.keywords.push(reader.string())
                    break
                case 10:
                    message.main = reader.string()
                    break
                case 11:
                    reader.skip().pos++
                    if (message.bin === util.emptyObject)
                        message.bin = {}
                    var key = reader.string()
                    if (typeof key === "object")
                        key = util.longToHash(key)
                    reader.pos++
                    message.bin[key] = reader.string()
                    break
                case 12:
                    reader.skip().pos++
                    if (message.scripts === util.emptyObject)
                        message.scripts = {}
                    var key = reader.string()
                    if (typeof key === "object")
                        key = util.longToHash(key)
                    reader.pos++
                    message.scripts[key] = reader.string()
                    break
                case 13:
                    reader.skip().pos++
                    if (message.dependencies === util.emptyObject)
                        message.dependencies = {}
                    var key = reader.string()
                    if (typeof key === "object")
                        key = util.longToHash(key)
                    reader.pos++
                    message.dependencies[key] = reader.string()
                    break
                case 14:
                    reader.skip().pos++
                    if (message.optionalDependencies === util.emptyObject)
                        message.optionalDependencies = {}
                    var key = reader.string()
                    if (typeof key === "object")
                        key = util.longToHash(key)
                    reader.pos++
                    message.optionalDependencies[key] = reader.string()
                    break
                case 15:
                    reader.skip().pos++
                    if (message.devDependencies === util.emptyObject)
                        message.devDependencies = {}
                    var key = reader.string()
                    if (typeof key === "object")
                        key = util.longToHash(key)
                    reader.pos++
                    message.devDependencies[key] = reader.string()
                    break
                case 17:
                    message.types = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    }})($protobuf.Reader, $protobuf.util, [null, null, null, null, null, "Package.Repository", null, null, null, null, null, null, null, null, null, null]); /* eslint-enable */

    /**
     * Decodes a Package from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
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
    Package.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
        if (message.name !== undefined) {
            if (!util.isString(message.name))
                return "invalid value for field .Package.name (string expected)"
        }
        if (message.version !== undefined) {
            if (!util.isString(message.version))
                return "invalid value for field .Package.version (string expected)"
        }
        if (message.description !== undefined) {
            if (!util.isString(message.description))
                return "invalid value for field .Package.description (string expected)"
        }
        if (message.author !== undefined) {
            if (!util.isString(message.author))
                return "invalid value for field .Package.author (string expected)"
        }
        if (message.license !== undefined) {
            if (!util.isString(message.license))
                return "invalid value for field .Package.license (string expected)"
        }
        if (message.repository !== undefined && message.repository !== null) {
            var s;
            if (s = types[5].verify(message.repository))
                return s
        }
        if (message.bugs !== undefined) {
            if (!util.isString(message.bugs))
                return "invalid value for field .Package.bugs (string expected)"
        }
        if (message.homepage !== undefined) {
            if (!util.isString(message.homepage))
                return "invalid value for field .Package.homepage (string expected)"
        }
        if (message.keywords !== undefined) {
            if (!Array.isArray(message.keywords))
                return "invalid value for field .Package.keywords (array expected)"
            for (var i = 0; i < message.keywords.length; ++i) {
                if (!util.isString(message.keywords[i]))
                    return "invalid value for field .Package.keywords (string[] expected)"
            }
        }
        if (message.main !== undefined) {
            if (!util.isString(message.main))
                return "invalid value for field .Package.main (string expected)"
        }
        if (message.bin !== undefined) {
            if (!util.isObject(message.bin))
                return "invalid value for field .Package.bin (object expected)"
            var key = Object.keys(message.bin)
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.bin[key[i]]))
                    return "invalid value for field .Package.bin (string{key : string} expected)"
            }
        }
        if (message.scripts !== undefined) {
            if (!util.isObject(message.scripts))
                return "invalid value for field .Package.scripts (object expected)"
            var key = Object.keys(message.scripts)
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.scripts[key[i]]))
                    return "invalid value for field .Package.scripts (string{key : string} expected)"
            }
        }
        if (message.dependencies !== undefined) {
            if (!util.isObject(message.dependencies))
                return "invalid value for field .Package.dependencies (object expected)"
            var key = Object.keys(message.dependencies)
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.dependencies[key[i]]))
                    return "invalid value for field .Package.dependencies (string{key : string} expected)"
            }
        }
        if (message.optionalDependencies !== undefined) {
            if (!util.isObject(message.optionalDependencies))
                return "invalid value for field .Package.optionalDependencies (object expected)"
            var key = Object.keys(message.optionalDependencies)
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.optionalDependencies[key[i]]))
                    return "invalid value for field .Package.optionalDependencies (string{key : string} expected)"
            }
        }
        if (message.devDependencies !== undefined) {
            if (!util.isObject(message.devDependencies))
                return "invalid value for field .Package.devDependencies (object expected)"
            var key = Object.keys(message.devDependencies)
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.devDependencies[key[i]]))
                    return "invalid value for field .Package.devDependencies (string{key : string} expected)"
            }
        }
        if (message.types !== undefined) {
            if (!util.isString(message.types))
                return "invalid value for field .Package.types (string expected)"
        }
        return null
    }})($protobuf.util, [null, null, null, null, null, "Package.Repository", null, null, null, null, null, null, null, null, null, null]); /* eslint-enable */

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
         * @type {string}
         */
        $prototype.type = "";

        /**
         * Repository url.
         * @type {string}
         */
        $prototype.url = "";

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
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Repository.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
            writer || (writer = Writer.create())
            if (message.type !== undefined && message.type !== "")
                writer.uint32(10).string(message.type)
            if (message.url !== undefined && message.url !== "")
                writer.uint32(18).string(message.url)
            return writer
        }})($protobuf.Writer, $protobuf.util, [null, null]); /* eslint-enable */

        /**
         * Encodes the specified Repository, length delimited.
         * @param {Package.Repository|Object} message Repository or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Repository.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Repository from the specified reader or buffer.
         * @function
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Package.Repository} Repository
         */
        Repository.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
            reader instanceof Reader || (reader = Reader.create(reader))
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Package.Repository
            while (reader.pos < end) {
                var tag = reader.uint32()
                switch (tag >>> 3) {
                    case 1:
                        message.type = reader.string()
                        break
                    case 2:
                        message.url = reader.string()
                        break
                    default:
                        reader.skipType(tag & 7)
                        break
                }
            }
            return message
        }})($protobuf.Reader, $protobuf.util, [null, null]); /* eslint-enable */

        /**
         * Decodes a Repository from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
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
        Repository.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
            if (message.type !== undefined) {
                if (!util.isString(message.type))
                    return "invalid value for field .Package.Repository.type (string expected)"
            }
            if (message.url !== undefined) {
                if (!util.isString(message.url))
                    return "invalid value for field .Package.Repository.url (string expected)"
            }
            return null
        }})($protobuf.util, [null, null]); /* eslint-enable */

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
