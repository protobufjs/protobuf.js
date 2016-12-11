(function(global, factory) {
    /* eslint-disable no-undef */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);
    
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs"));

    /* eslint-enable no-undef */
})(this, function(protobuf) {

    var $root = protobuf.roots[%ROOT%] = protobuf.Root.fromJSON(%OUTPUT%);
    return $root;
});
