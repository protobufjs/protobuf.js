;(function(global, factory) {

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);
    
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("../../runtime"));
    
    /* Global */ else
        global.root = factory(global.protobuf);

})(this, function($runtime) {
    "use strict";

    // Lazily resolved type references
    var $lazyTypes = [];

    // Exported root namespace
    var $root = {};

    /** @alias Package */
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

        Package.prototype.name = "";
        Package.prototype.version = "";
        Package.prototype.description = "";
        Package.prototype.author = "";
        Package.prototype.license = "";
        Package.prototype.repository = null;
        Package.prototype.bugs = "";
        Package.prototype.homepage = "";
        Package.prototype.main = "";
        Package.prototype.types = "";

        /**
         * Encodes the specified Package.
         * @function
         * @param {Package|Object} message Package or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Package.encode = (function() {
            /* eslint-disable */
            var Writer = $runtime.Writer;
            var util = $runtime.util;
            var types; $lazyTypes.push(types = [null,null,null,null,null,"Package.Repository",null,null,null,null,null,null,null,null,null,null]);
            return function encode(m,w) {
                w||(w=Writer())
                if(m['name']!==undefined&&m['name']!=="")
                    w.tag(1,2).string(m['name'])
                if(m['version']!==undefined&&m['version']!=="")
                    w.tag(2,2).string(m['version'])
                if(m['description']!==undefined&&m['description']!=="")
                    w.tag(3,2).string(m['description'])
                if(m['author']!==undefined&&m['author']!=="")
                    w.tag(4,2).string(m['author'])
                if(m['license']!==undefined&&m['license']!=="")
                    w.tag(5,2).string(m['license'])
                if(m['repository']!==undefined&&m['repository']!==null)
                    types[5].encode(m['repository'],w.fork()).len&&w.ldelim(6)||w.reset()
                if(m['bugs']!==undefined&&m['bugs']!=="")
                    w.tag(7,2).string(m['bugs'])
                if(m['homepage']!==undefined&&m['homepage']!=="")
                    w.tag(8,2).string(m['homepage'])
                if(m['keywords'])
                    for(var i=0;i<m['keywords'].length;++i)
                    w.tag(9,2).string(m['keywords'][i])
                if(m['main']!==undefined&&m['main']!=="")
                    w.tag(10,2).string(m['main'])
                if(m['bin']){
                    w.fork()
                    for(var i=0,ks=Object.keys(m['bin']);i<ks.length;++i){
                        w.tag(1,2).string(ks[i])
                        w.tag(2,2).string(m['bin'][ks[i]])
                    }
                    w.len&&w.ldelim(11)||w.reset()
                }
                if(m['scripts']){
                    w.fork()
                    for(var i=0,ks=Object.keys(m['scripts']);i<ks.length;++i){
                        w.tag(1,2).string(ks[i])
                        w.tag(2,2).string(m['scripts'][ks[i]])
                    }
                    w.len&&w.ldelim(12)||w.reset()
                }
                if(m['dependencies']){
                    w.fork()
                    for(var i=0,ks=Object.keys(m['dependencies']);i<ks.length;++i){
                        w.tag(1,2).string(ks[i])
                        w.tag(2,2).string(m['dependencies'][ks[i]])
                    }
                    w.len&&w.ldelim(13)||w.reset()
                }
                if(m['optionalDependencies']){
                    w.fork()
                    for(var i=0,ks=Object.keys(m['optionalDependencies']);i<ks.length;++i){
                        w.tag(1,2).string(ks[i])
                        w.tag(2,2).string(m['optionalDependencies'][ks[i]])
                    }
                    w.len&&w.ldelim(14)||w.reset()
                }
                if(m['devDependencies']){
                    w.fork()
                    for(var i=0,ks=Object.keys(m['devDependencies']);i<ks.length;++i){
                        w.tag(1,2).string(ks[i])
                        w.tag(2,2).string(m['devDependencies'][ks[i]])
                    }
                    w.len&&w.ldelim(15)||w.reset()
                }
                if(m['types']!==undefined&&m['types']!=="")
                    w.tag(17,2).string(m['types'])
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
            var Reader = $runtime.Reader;
            var util = $runtime.util;
            var types; $lazyTypes.push(types = [null,null,null,null,null,"Package.Repository",null,null,null,null,null,null,null,null,null,null]);
            return function decode(r,l) {
                r instanceof Reader||(r=Reader(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.Package
                while(r.pos<c){
                    var t=r.tag()
                    switch(t.id){
                        case 1:
                            m['name']=r.string()
                            break
                        case 2:
                            m['version']=r.string()
                            break
                        case 3:
                            m['description']=r.string()
                            break
                        case 4:
                            m['author']=r.string()
                            break
                        case 5:
                            m['license']=r.string()
                            break
                        case 6:
                            m['repository']=types[5].decode(r,r.uint32())
                            break
                        case 7:
                            m['bugs']=r.string()
                            break
                        case 8:
                            m['homepage']=r.string()
                            break
                        case 9:
                            m['keywords']||(m['keywords']=[])
                            m['keywords'][m['keywords'].length]=r.string()
                            break
                        case 10:
                            m['main']=r.string()
                            break
                        case 11:
                            var n=r.uint32(),o={}
                            if(n){
                                n+=r.pos
                                var k=[],v=[]
                                while(r.pos<n){
                                    if(r.tag().id===1)
                                        k[k.length]=r.string()
                                    else
                                        v[v.length]=r.string()
                                }
                                for(var i=0;i<k.length;++i)
                                    o[typeof(k[i])==='object'?util.longToHash(k[i]):k[i]]=v[i]
                            }
                            m['bin']=o
                            break
                        case 12:
                            var n=r.uint32(),o={}
                            if(n){
                                n+=r.pos
                                var k=[],v=[]
                                while(r.pos<n){
                                    if(r.tag().id===1)
                                        k[k.length]=r.string()
                                    else
                                        v[v.length]=r.string()
                                }
                                for(var i=0;i<k.length;++i)
                                    o[typeof(k[i])==='object'?util.longToHash(k[i]):k[i]]=v[i]
                            }
                            m['scripts']=o
                            break
                        case 13:
                            var n=r.uint32(),o={}
                            if(n){
                                n+=r.pos
                                var k=[],v=[]
                                while(r.pos<n){
                                    if(r.tag().id===1)
                                        k[k.length]=r.string()
                                    else
                                        v[v.length]=r.string()
                                }
                                for(var i=0;i<k.length;++i)
                                    o[typeof(k[i])==='object'?util.longToHash(k[i]):k[i]]=v[i]
                            }
                            m['dependencies']=o
                            break
                        case 14:
                            var n=r.uint32(),o={}
                            if(n){
                                n+=r.pos
                                var k=[],v=[]
                                while(r.pos<n){
                                    if(r.tag().id===1)
                                        k[k.length]=r.string()
                                    else
                                        v[v.length]=r.string()
                                }
                                for(var i=0;i<k.length;++i)
                                    o[typeof(k[i])==='object'?util.longToHash(k[i]):k[i]]=v[i]
                            }
                            m['optionalDependencies']=o
                            break
                        case 15:
                            var n=r.uint32(),o={}
                            if(n){
                                n+=r.pos
                                var k=[],v=[]
                                while(r.pos<n){
                                    if(r.tag().id===1)
                                        k[k.length]=r.string()
                                    else
                                        v[v.length]=r.string()
                                }
                                for(var i=0;i<k.length;++i)
                                    o[typeof(k[i])==='object'?util.longToHash(k[i]):k[i]]=v[i]
                            }
                            m['devDependencies']=o
                            break
                        case 17:
                            m['types']=r.string()
                            break
                        default:
                            r.skipType(t.wireType)
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
            readerOrBuffer = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };

        /**
         * Verifies a Package.
         * @param {Package|Object} message Package or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Package.verify = (function() {
            /* eslint-disable */
            var types; $lazyTypes.push(types = [null,null,null,null,null,"Package.Repository",null,null,null,null,null,null,null,null,null,null]);
            return function verify(m) {
                var r
                if((r=types[5].verify(m['repository']))!==null)
                    return r
                return null
            }
            /* eslint-enable */
        })();

        /** @alias Package.Repository */
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

            Repository.prototype.type = "";
            Repository.prototype.url = "";

            /**
             * Encodes the specified Repository.
             * @function
             * @param {Package.Repository|Object} message Repository or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            Repository.encode = (function() {
                /* eslint-disable */
                var Writer = $runtime.Writer;
                var util = $runtime.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function encode(m,w) {
                    w||(w=Writer())
                    if(m['type']!==undefined&&m['type']!=="")
                        w.tag(1,2).string(m['type'])
                    if(m['url']!==undefined&&m['url']!=="")
                        w.tag(2,2).string(m['url'])
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
                var Reader = $runtime.Reader;
                var util = $runtime.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function decode(r,l) {
                    r instanceof Reader||(r=Reader(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.Package.Repository
                    while(r.pos<c){
                        var t=r.tag()
                        switch(t.id){
                            case 1:
                                m['type']=r.string()
                                break
                            case 2:
                                m['url']=r.string()
                                break
                            default:
                                r.skipType(t.wireType)
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
                readerOrBuffer = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Repository.
             * @param {Package.Repository|Object} message Repository or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Repository.verify = (function() {
                /* eslint-disable */
                var types; $lazyTypes.push(types = [null,null]);
                return function verify(m) {
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

    return $root;
});
