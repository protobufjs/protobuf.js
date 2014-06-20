/**
 * @alias ProtoBuf.DotProto
 * @expose
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
     * @expose
     */
    DotProto.Tokenizer = Tokenizer;
    
    //? include("DotProto/Parser.js");

    /**
     * @alias ProtoBuf.DotProto.Parser
     * @expose
     */
    DotProto.Parser = Parser;
    
    return DotProto;
    
})(ProtoBuf, ProtoBuf.Lang);
