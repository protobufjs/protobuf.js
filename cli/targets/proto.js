module.exports = proto_target;

proto_target.private = true;

var protobuf = require("../..");

var Namespace = protobuf.Namespace,
    Enum      = protobuf.Enum,
    Type      = protobuf.Type,
    Field     = protobuf.Field,
    OneOf     = protobuf.OneOf,
    Service   = protobuf.Service,
    Method    = protobuf.Method;

var out = [];
var indent = 0;
var first = false;

function proto_target(root, options, callback) {

    if (options) {
        switch (options.syntax) {
            case undefined:
            case "proto3":
            case "3":
                syntax = 3;
                break;
            case "proto2":
            case "2":
                syntax = 2;
                break;
            default:
                return callback(Error("invalid syntax: " + options.syntax));
        }
    }
    indent = 0;
    first = false;
    try {
        buildRoot(root);
        callback(null, out.join('\n'));
    } catch (err) {
        callback(err);
    } finally {
        out = [];
    }

}

function push(line) {
    if (line === "")
        return out.push("");
    var ind = "";
    for (var i = 0; i < indent; ++i)
        ind += "    ";
    out.push(ind + line);
}

function under_score(name) {
    return name.substring(0,1)
         + name.substring(1)
               .replace(/([A-Z])(?=[a-z]|$)/g, function($0, $1) { return "_" + $1.toLowerCase(); });
}

function buildRoot(root) {
    root.resolveAll();
    var pkg = [];
    var ptr = root;
    do {
        var nested = ptr.nestedArray;
        if (nested.length === 1 && nested[0] instanceof Namespace && !(nested[0] instanceof Type || nested[0] instanceof Service)) {
            ptr = nested[0];
            if (ptr !== root)
                pkg.push(ptr.name);
        } else
            break;
    } while (true);
    if (pkg.length)
        out.push("package " + pkg.join(".") + ";", "");
    out.push('syntax = "proto' + syntax + '";');

    buildOptions(ptr);
    ptr.nestedArray.forEach(build);
}

function build(object) {
    if (object instanceof Enum)
        buildEnum(object);
    else if (object instanceof Type)
        buildType(object);
    else if (object instanceof Field)
        buildField(object);
    else if (object instanceof OneOf)
        buildOneOf(object);
    else if (object instanceof Service)
        buildService(object);
    else if (object instanceof Method)
        buildMethod(object);
    else
        buildNamespace(object);
}

function buildNamespace(namespace) { // just a namespace, not a type etc.
    push("");
    push("message " + namespace.name + " {");
    ++indent;
    buildOptions(namespace);
    consolidateExtends(namespace.nestedArray).remaining.forEach(build);
    --indent;
    push("}");
}

function buildEnum(enm) {
    push("");
    push("enum " + enm.name + " {");
    buildOptions(enm);
    ++indent; first = true;
    Object.keys(enm.values).forEach(function(name) {
        var val = enm.values[name];
        if (first) {
            push("");
            first = false;
        }
        push(name + " = " + val + ";");
    });
    --indent; first = false;
    push("}");
}

function buildType(type) {
    push("");
    push("message " + type.name + " {");
    ++indent;
    buildOptions(type);
    type.oneofsArray.forEach(build);
    first = true;
    type.fieldsArray.forEach(build);
    consolidateExtends(type.nestedArray).remaining.forEach(build);
    --indent;
    push("}");
}

function buildField(field, passExtend) {
    if (field.partOf || field.declaringType || (field.extend !== undefined && !passExtend))
        return;
    if (first)
        first = false, push("");
    var sb = [];
    if (field.map)
        sb.push("map<" + field.keyType + ", " + field.type + ">");
    else if (field.repeated)
        sb.push("repeated", field.type);
    else if (syntax === 2)
        sb.push(field.required && "required" || "optional", field.type);
    else
        sb.push(field.type);
    sb.push(under_score(field.name), "=", field.id);
    var opts = [];
    if (field.repeated) {
        if (syntax === 2) {
            if (field.packed)
                opts.push("packed=true");
        } else {
            if (!field.packed)
                opts.push("packed=false");
        }
        // TODO: Proper field options
    }
    if (opts.length)
        sb.push("[" + opts.join(', ') + "]");
    push(sb.join(" ") + ";");
}

function consolidateExtends(nested) {
    var ext = {};
    nested = nested.filter(function(obj) {
        if (!(obj instanceof Field) || obj.extend === undefined)
            return true;
        (ext[obj.extend] || (ext[obj.extend] = [])).push(obj);
        return false;
    });
    Object.keys(ext).forEach(function(extend) {
        push("");
        push("extend " + extend + " {");
        ++indent; first = true;
        ext[extend].forEach(function(field) {
            buildField(field, true);
        });
        --indent;
        push("}");
    });
    return {
        remaining: nested
    };
}

function buildOneOf(oneof) {
    push("");
    push("oneof " + under_score(oneof.name) + " {");
    ++indent; first = true;
    oneof.oneof.forEach(function(fieldName) {
        var field = oneof.parent.get(fieldName);
        if (first)
            push(""), first = false;
        push(field.type + " " + under_score(field.name) + " = " + field.id + ";");
    });
    --indent;
    push("}");
}

function buildService(service) {
    push("service " + service.name + " {");
    ++indent;
    service.methodsArray.forEach(build);
    consolidateExtends(service.nestedArray).remaining.forEach(build);
    --indent;
    push("}");
}

function buildMethod(method) {
    push(method.type + " " + method.name + " (" + (method.requestStream ? "stream " : "") + method.requestType + ") returns (" + (method.responseStream ? "stream " : "") + method.responseType + ");");
}

function buildOptions(object) {
    if (!object.options)
        return
    first = true;
    Object.keys(object.options).forEach(function(key) {
        if (first)
            push(""), first = false;
        var val = object.options[key];
        push("option " + key + " = " + JSON.stringify(val) + ";");
    });
}