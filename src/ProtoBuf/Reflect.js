/**
 * @alias ProtoBuf.Reflect
 * @export
 */
ProtoBuf.Reflect = (function(ProtoBuf) {
    "use strict";

    /**
     * Reflection types.
     * @exports ProtoBuf.Reflect
     * @namespace
     */
    var Reflect = {};
    
    //? include("Reflect/T.js");

    /**
     * @alias ProtoBuf.Reflect.T
     * @export
     */
    Reflect.T = T;

    //? include("Reflect/Namespace.js");

    /**
     * @alias ProtoBuf.Reflect.Namespace
     * @export
     */
    Reflect.Namespace = Namespace;

    //? include("Reflect/Element.js");

    /**
     * @alias ProtoBuf.Reflect.Element
     * @export
     */
    Reflect.Element = Element;
    
    //? include("Reflect/Message.js");

    /**
     * @alias ProtoBuf.Reflect.Message
     * @export
     */
    Reflect.Message = Message;
    
    //? include("Reflect/Message/Field.js");

    /**
     * @alias ProtoBuf.Reflect.Message.Field
     * @export
     */
    Reflect.Message.Field = Field;

    //? include("Reflect/Message/ExtensionField.js");

    /**
     * @alias ProtoBuf.Reflect.Message.ExtensionField
     * @export
     */
    Reflect.Message.ExtensionField = ExtensionField;

    //? include("Reflect/Message/OneOf.js");

    /**
     * @alias ProtoBuf.Reflect.Message.OneOf
     * @export
     */
    Reflect.Message.OneOf = OneOf;

    //? include("Reflect/Enum.js");

    /**
     * @alias ProtoBuf.Reflect.Enum
     * @export
     */
    Reflect.Enum = Enum;
    
    //? include("Reflect/Enum/Value.js");

    /**
     * @alias ProtoBuf.Reflect.Enum.Value
     * @export
     */
    Reflect.Enum.Value = Value;

    //? include("Reflect/Extension.js");

    /**
     * @alias ProtoBuf.Reflect.Extension
     * @export
     */
    Reflect.Extension = Extension;

    //? include("Reflect/Service.js");

    /**
     * @alias ProtoBuf.Reflect.Service
     * @export
     */
    Reflect.Service = Service;

    //? include("Reflect/Service/Method.js");

    /**
     * @alias ProtoBuf.Reflect.Service.Method
     * @export
     */
    Reflect.Service.Method = Method;
    
    //? include("Reflect/Service/RPCMethod.js");

    /**
     * @alias ProtoBuf.Reflect.Service.RPCMethod
     * @export
     */
    Reflect.Service.RPCMethod = RPCMethod;

    return Reflect;

})(ProtoBuf);
