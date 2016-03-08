/**
 * @alias ProtoBuf.DotProto
 * @export
 */
ProtoBuf.DotProto = (function(ProtoBuf, Lang) {
    "use strict";

    /**
     * Utilities to parse .proto files.
     * @exports ProtoBuf.DotProto
     * @namespace
     */
    var DotProto = {};
    
    //? include("DotProto/Tokenizer.js");

    /**
     * @alias ProtoBuf.DotProto.Tokenizer
     * @export
     */
    DotProto.Tokenizer = Tokenizer;
    
    //? include("DotProto/Parser.js");

    /**
     * @alias ProtoBuf.DotProto.Parser
     * @export
     */
    DotProto.Parser = Parser;
    
    return DotProto;
    
})(ProtoBuf, ProtoBuf.Lang);
