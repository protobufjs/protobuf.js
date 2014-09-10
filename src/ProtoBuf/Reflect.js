/**
 * @alias ProtoBuf.Reflect
 * @expose
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
     * @expose
     */
    Reflect.T = T;
    
    //? include("Reflect/Namespace.js");

    /**
     * @alias ProtoBuf.Reflect.Namespace
     * @expose
     */
    Reflect.Namespace = Namespace;
    
    //? include("Reflect/Message.js");

    /**
     * @alias ProtoBuf.Reflect.Message
     * @expose
     */
    Reflect.Message = Message;
    
    //? include("Reflect/Message/Field.js");

    /**
     * @alias ProtoBuf.Reflect.Message.Field
     * @expose
     */
    Reflect.Message.Field = Field;

    //? include("Reflect/Message/ExtensionField.js");

    /**
     * @alias ProtoBuf.Reflect.Message.ExtensionField
     * @expose
     */
    Reflect.Message.ExtensionField = ExtensionField;

    //? include("Reflect/Message/OneOf.js");

    /**
     * @alias ProtoBuf.Reflect.Message.OneOf
     * @expose
     */
    Reflect.Message.OneOf = OneOf;

    //? include("Reflect/Enum.js");

    /**
     * @alias ProtoBuf.Reflect.Enum
     * @expose
     */
    Reflect.Enum = Enum;
    
    //? include("Reflect/Enum/Value.js");

    /**
     * @alias ProtoBuf.Reflect.Enum.Value
     * @expose
     */
    Reflect.Enum.Value = Value;

    //? include("Reflect/Extension.js");

    /**
     * @alias ProtoBuf.Reflect.Extension
     * @expose
     */
    Reflect.Extension = Extension;

    //? include("Reflect/Service.js");

    /**
     * @alias ProtoBuf.Reflect.Service
     * @expose
     */
    Reflect.Service = Service;

    //? include("Reflect/Service/Method.js");

    /**
     * @alias ProtoBuf.Reflect.Service.Method
     * @expose
     */
    Reflect.Service.Method = Method;
    
    //? include("Reflect/Service/RPCMethod.js");

    /**
     * @alias ProtoBuf.Reflect.Service.RPCMethod
     * @expose
     */
    Reflect.Service.RPCMethod = RPCMethod;

    return Reflect;

})(ProtoBuf);
