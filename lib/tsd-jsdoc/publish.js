"use strict";

var fs = require("fs");

// output stream
var out = null;

// documentation data
var data = null;

// already handled objects, by name
var seen = {};

// indentation level
var indent = 0;

// whether indent has been written for the current line yet
var indentWritten = false;

// provided options
var options = {};

// queued interfaces
var queuedInterfaces = [];

// whether writing the first line
var firstLine = true;

// JSDoc hook
exports.publish = function publish(taffy, opts) {
    options = opts || {};

    // query overrides options
    if (options.query)
        for (var i in options.query)
            if (options.query.hasOwnProperty(i))
                switch (options[i] = options.query[i]) {
                    case "true":
                        options[i] = true;
                        break;
                    case "false":
                        options[i] = false;
                        break;
                    case "null":
                        options[i] = null;
                        break;
                }
    
    // remove undocumented
    taffy({ undocumented: true }).remove();
    taffy({ ignore: true }).remove();
    taffy({ inherited: true }).remove();

    // remove private
    if (!options.private)
        taffy({ access: "private" }).remove();

    // setup output
    out = options.destination
        ? fs.createWriteStream(options.destination)
        : process.stdout;
    
    try {
        // setup environment
        data = taffy().get();
        indent = 0;
        indentWritten = false;
        firstLine = true;
        
        // wrap everything in a module if configured
        if (options.module) {
            writeln("export = ", options.module, ";");
            writeln();
            writeln("declare namespace ", options.module, " {");
            writeln();
            ++indent;
        }

        // handle all
        getChildrenOf(undefined).forEach(function(child) {
            handleElement(child, null);
        });

        // process queued
        while (queuedInterfaces.length) {
            var element = queuedInterfaces.shift();
            begin(element);
            writeInterface(element);
            writeln(";");
        }

        // end wrap
        if (options.module) {
            --indent;
            writeln("}");
        }

        // close file output
        if (out !== process.stdout)
            out.end();
        
    } finally {
        // gc environment objects
        out = data = null;
        seen = options = {};
        queuedInterfaces = [];
    }
}

//
// Utility
//

// writes one or multiple strings
function write() {
    var s = Array.prototype.slice.call(arguments).join("");
    if (!indentWritten) {
        for (var i = 0; i < indent; ++i)
            s = "    " + s;
        indentWritten = true;
    }
    out.write(s);
    firstLine = false;
}

// writes one or multiple strings, followed by a new line
function writeln() {
    var s = Array.prototype.slice.call(arguments).join("");
    if (s.length)
        write(s, "\n");
    else if (!firstLine)
        out.write("\n");
    indentWritten = false;
}

// writes a comment
function writeComment(comment, otherwiseNewline) {
    if (!comment || options.comments === false) {
        if (otherwiseNewline)
            writeln();
        return;
    }
    var first = true;
    comment.split(/\r?\n/g).forEach(function(line) {
        line = line.trim().replace(/^\*/, " *");
        if (line.length) {
            if (first) {
                writeln();
                first = false;
            }
            writeln(line);
        }
    });
}

// recursively replaces all occurencies of re's match
function replaceRecursive(name, re, fn) {
    var found;
    do {
        found = false;
        name = name.replace(re, function() {
            found = true;
            return fn.apply(null, arguments);
        });
    } while (found);
    return name;
}

// tests if an element is considered to be a class or class-like
function isClassLike(element) {
    return element && (element.kind === "class" || element.kind === "interface" || element.kind === "mixin");
}

// tests if an element is considered to be an interface
function isInterface(element) {
    return element && (element.kind === "interface" || (getTypeOf(element) === 'Object' && element.properties && element.properties.length));
}

// tests if an element is considered to be a namespace
function isNamespace(element) {
    return element && (element.kind === "namespace" || element.kind === "module");
}

// gets all children of the specified parent
function getChildrenOf(parent) {
    var memberof = parent ? parent.longname : undefined;
    return data.filter(function(element) {
        return element.memberof === memberof;
    });
}

// gets the literal type of an element
function getTypeOf(element) {
    var name = "any";
    var type = element.type;
    if (type && type.names && type.names.length) {
        if (type.names.length === 1)
            name = element.type.names[0].trim();
        else
            name = "(" + element.type.names.join("|") + ")";
    } else
        return name;

    // Replace catchalls with any
    name = name.replace(/\*|\bmixed\b/g, "any");

    // Ensure upper case Object
    name = name.replace(/\bobject\b/g, "Object");
    
    // Correct Promise.<Something> to Promise<Something>
    name = replaceRecursive(name, /\bPromise\.<([^>]*)>/gi, function($0, $1) {
        return "Promise<" + $1 + ">";
    });

    // Replace Array.<string> with string[]
    name = replaceRecursive(name, /\bArray\.?<([^>]*)>/gi, function($0, $1) {
        return $1 + "[]";
    });

    // Replace Object.<string,number> with { [k: string]: number }
    name = replaceRecursive(name, /\bObject\.?<([^,]*), *([^>]*)>/gi, function($0, $1, $2) {
        return '{ [k: ' + $1 + ']: ' + $2 + ' }';
    });

    // Replace functions (there are no signatures) with () => any
    name = name.replace(/\bfunction(?:\(\))?([^\w]|$)/gi, '() => any');

    return name;
}

// begins writing the definition of the specified element
function begin(element, is_interface) {
    writeComment(element.comment, is_interface || isInterface(element) || isClassLike(element) || isNamespace(element) || element.isEnum);
    if (element.scope !== "global" || options.module || is_interface || isInterface(element))
        return;
    write("export ");
}

// writes the function signature describing element
function writeFunctionSignature(element, isConstructor, isTypeDef) {
    write('(');

    var params = {};

    // this type
    if (element.this)
        params["this"] = {
            type: element.this.replace(/^{|}$/g, ""),
            optional: false
        };

    // parameter types
    if (element.params)
        element.params.forEach(function(param) {
            var path = param.name.split(/\./g);
            if (path.length === 1)
                params[param.name] = {
                    type: getTypeOf(param),
                    variable: param.variable === true,
                    optional: param.optional === true,
                    defaultValue: param.defaultvalue // TODO            
                };
            else // Property syntax (TODO)
                params[path[0]].type = "{ [k: string]: any }";
        });

    var paramNames = Object.keys(params);
    paramNames.forEach(function(name, i) {
        var param = params[name];
        var type = param.type;
        if (param.variable) {
            name = "..." + name;
            type = param.type.charAt(0) === "(" ? "any[]" : param.type + "[]";
        }
        write(name, !param.variable && param.optional ? "?: " : ": ", type);
        if (i < paramNames.length - 1)
            write(", ");
    });

    write(")");

    // return type
    if (!isConstructor) {
        write(isTypeDef ? " => " : ": ");
        var typeName;
        if (element.returns && element.returns.length && (typeName = getTypeOf(element.returns[0])) !== "undefined")
            write(typeName);
        else
            write("void");
    }
}

// writes (a typedef as) an interface
function writeInterface(element) {
    writeln();
    writeln("interface ", element.name, " {");
    ++indent;
    element.properties.forEach(function(property) {
        write(property.name);
        if (property.optional)
            write("?");
        writeln(": ", getTypeOf(property), ";");
    });
    --indent;
    writeln("}");
}

//
// Handlers
//

// handles a single element of any understood type
function handleElement(element, parent, insideClass) {
    if (seen[element.longname])
        return true;
    if (isClassLike(element)) {
        if (insideClass)
            return false;
        handleClass(element, parent);
    } else switch (element.kind) {
        case "module":
        case "namespace":
            if (insideClass)
                return false;
            handleNamespace(element, parent);
            break;
        case "constant":
        case "member":
            if (insideClass && element.isEnum)
                return false;
            handleMember(element, parent);
            break;
        case "function":
            handleFunction(element, parent);
            break;
        case "typedef":
            if (insideClass)
                return false;
            handleTypeDef(element, parent);
            break;
        case "package":
            break;
    }
    seen[element.longname] = element;
    return true;
}

// handles (just) a namespace
function handleNamespace(element/*, parent*/) {
    begin(element);
    writeln("namespace ", element.name, " {");
    ++indent;
    getChildrenOf(element).forEach(function(child) {
        handleElement(child, element);
    });
    --indent;
    writeln("}");
}

// a filter function to remove any module references
function notAModuleReference(ref) {
    return ref.indexOf("module:") === -1;
}


// handles a class or class-like
function handleClass(element, parent) {
    var is_interface = isInterface(element);
    begin(element, is_interface);
    if (is_interface)
        write("interface ");
    else {
        if (element.virtual)
            write("abstract ");
        write("class ");
    }
    write(element.name, " ");

    // extended classes
    if (element.augments) {
        var augments = element.augments.filter(notAModuleReference);
        if (augments.length)
            write("extends ", augments[0], " ");
    }

    // implemented interfaces
    var impls = [];
    if (element.implements)
        Array.prototype.push.apply(impls, element.implements);
    if (element.mixes)
        Array.prototype.push.apply(impls, element.mixes);
    impls = impls.filter(notAModuleReference);
    if (impls.length)
        write("implements ", impls.join(", "), " ");

    writeln("{");
    ++indent;

    // constructor
    if (!is_interface && !element.virtual) 
        handleFunction(element, parent, true);

    // class-compatible members
    var inner = [];
    getChildrenOf(element).forEach(function(child) {
        if (!handleElement(child, element, true))
            inner.push(child);
    });

    --indent;
    writeln("}");

    // class-incompatible members
    if (inner.length) {
        writeln();
        if (element.scope === "global" && !options.module)
            write("export ");
        writeln("namespace ", element.name, " {");
        ++indent;
        inner.forEach(function(child) {
            handleElement(child, element);
        });
        --indent;
        writeln("}");
    }
}

// handles a namespace or class member
function handleMember(element, parent) {
    begin(element);

    if (element.isEnum) {
        
        writeln("enum ", element.name, " {");
        ++indent;
        element.properties.forEach(function(property, i) {
            write(property.name);
            if (property.defaultvalue !== undefined)
                write(" = ", JSON.stringify(property.defaultvalue));
            if (i < element.properties.length - 1)
                writeln(",");
            else
                writeln();
        });
        --indent;
        writeln("}");

    } else {

        if (isClassLike(parent)) {
            if (element.access)
                write(element.access, " ");
            if (element.scope === "static")
                write("static ");
            if (element.readonly)
                write("readonly ");
        } else
            write(element.kind === "constant" ? "const " : "var ");

        write(element.name, ": ");

        if (element.type && element.type.names && /^Object\b/i.test(element.type.names[0]) && element.properties) {
            writeln("{");
            ++indent;
            element.properties.forEach(function(property, i) {
                writeln(JSON.stringify(property.name), ": ", getTypeOf(property), i < element.properties.length - 1 ? "," : "");
            });
            --indent;
            writeln("};");
        } else
            writeln(getTypeOf(element), ";");
    }
}

// handles a function or method
function handleFunction(element, parent, isConstructor) {
    if (isConstructor) {
        writeComment(element.comment);
        write("constructor");
    } else {
        begin(element);
        if (isClassLike(parent)) {
            if (element.access)
                write(element.access, " ");
            if (element.scope === "static")
                write("static ");
        } else
            write("function ");
        write(element.name);
    }
    writeFunctionSignature(element, isConstructor, false);
    writeln(";");
}

// handles a type definition (not a real type)
function handleTypeDef(element, parent) {
    if (isInterface(element)) {
        if (isClassLike(parent))
            queuedInterfaces.push(element);
        else {
            begin(element);
            writeInterface(element);
        }
    } else {
        begin(element, true);
        if (element.access)
            write(element.access, " ");
        write("type ", element.name, " = ");
        if (element.type && element.type.names.length === 1 && element.type.names[0] === "function")
            writeFunctionSignature(element, false, true);
        else
            write(getTypeOf(element));
        writeln(";");
    }
}