"use strict";
var fs       = require("fs"),
    path     = require("path"),
    protobuf = require("protobufjs");

function basenameCompare(a, b) {
    var aa = String(a).replace(/\.\w+$/, "").split(/(-?\d*\.?\d+)/g),
        bb = String(b).replace(/\.\w+$/, "").split(/(-?\d*\.?\d+)/g);
    for (var i = 0, k = Math.min(aa.length, bb.length); i < k; i++) {
        var x = parseFloat(aa[i]) || aa[i].toLowerCase(),
            y = parseFloat(bb[i]) || bb[i].toLowerCase();
        if (x < y)
            return -1;
        if (x > y)
            return 1;
    }
    return a.length < b.length ? -1 : 0;
}

exports.requireAll = function requireAll(dirname) {
    dirname   = path.join(__dirname, dirname);
    var files = fs.readdirSync(dirname).sort(basenameCompare),
        all = {};
    files.forEach(function(file) {
        var basename = path.basename(file, ".js"),
            extname  = path.extname(file);
        if (extname === ".js")
            all[basename] = require(path.join(dirname, file));
    });
    return all;
};

exports.traverse = function traverse(current, fn) {
    fn(current);
    if (current.fieldsArray)
        current.fieldsArray.forEach(function(field) {
            traverse(field, fn);
        });
    if (current.oneofsArray)
        current.oneofsArray.forEach(function(oneof) {
            traverse(oneof, fn);
        });
    if (current.methodsArray)
        current.methodsArray.forEach(function(method) {
            traverse(method, fn);
        });
    if (current.nestedArray)
        current.nestedArray.forEach(function(nested) {
            traverse(nested, fn);
        });
};

exports.traverseResolved = function traverseResolved(current, fn) {
    fn(current);
    if (current.resolvedType)
        traverseResolved(current.resolvedType, fn);
    if (current.resolvedKeyType)
        traverseResolved(current.resolvedKeyType, fn);
    if (current.resolvedRequestType)
        traverseResolved(current.resolvedRequestType, fn);
    if (current.resolvedResponseType)
        traverseResolved(current.resolvedResponseType, fn);
};

exports.isEsmWrapper = function isEsmWrapper(wrap) {
    return wrap === "esm" || wrap === "es6";
};

var env = process.env; // eslint-disable-line no-process-env
var colorEnabled =
    env.NO_COLOR === undefined &&
    env.FORCE_COLOR !== "0" &&
    (env.FORCE_COLOR !== undefined || process.stderr && process.stderr.isTTY);

exports.color = colorEnabled ? {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    gray: "\x1b[90m",
    green: "\x1b[32m",
    white: "\x1b[37m"
} : {
    reset: "",
    bold: "",
    gray: "",
    green: "",
    white: ""
};

exports.wrap = function(OUTPUT, options) {
    var name = options.wrap || "default";
    var wrap;
    try {
        // try built-in wrappers first
        wrap = fs.readFileSync(path.join(__dirname, "wrappers", name + ".js")).toString("utf8");
    } catch (e) {
        // otherwise fetch the custom one
        wrap = fs.readFileSync(path.resolve(process.cwd(), name)).toString("utf8");
    }
    wrap = wrap.replace(/\$DEPENDENCY/g, JSON.stringify(options.dependency || "protobufjs"));
    wrap = wrap.replace(/( *)\$DEFAULT_EXPORT/g, function($0, $1) {
        var defaultExport = options.defaultExport || "";
        if (!defaultExport)
            return $1;
        defaultExport = defaultExport.replace(/\r?\n/g, "\n");
        return $1.length ? defaultExport.replace(/^/mg, $1) : defaultExport;
    });
    wrap = wrap.replace(/( *)\$OUTPUT;/, function($0, $1) {
        return $1.length ? OUTPUT.replace(/^/mg, $1) : OUTPUT;
    });
    if (options.lint !== "")
        wrap = "/*" + String(options.lint).replace(/\*\//g, "* /") + "*/\n" + wrap;
    return wrap.replace(/\r?\n/g, "\n");
};

exports.pad = function(str, len, l) {
    while (str.length < len)
        str = l ? str + " " : " " + str;
    return str;
};


/**
 * Retains an object and, if it is a message, everything it transitively references.
 * The set of retained objects doubles as the guard against cyclic references.
 * @param {Set} retained Set of retained reflection objects
 * @param {ReflectionObject} object Object to retain
 * @returns {undefined} Does not return a value
 */
function retainWithDependencies(retained, object) {
    if (retained.has(object))
        return;
    retained.add(object);

    // Enums have no dependencies of their own, everything else is reached through fields.
    // fieldsArray covers plain, repeated, map value, oneof and group fields alike.
    if (object instanceof protobuf.Type)
        object.fieldsArray.forEach(function(field) {
            if (field.resolvedType)
                retainWithDependencies(retained, field.resolvedType);
        });
}

/**
 * Determines the edition an object is subject to, which it may inherit from its parents.
 * @param {ReflectionObject} object Object to inspect
 * @returns {string|undefined} Edition, if any
 */
function inheritedEdition(object) {
    var current = object;
    while (current && !current._edition)
        current = current.parent;
    return current ? current._edition : undefined;
}

/**
 * Replaces a namespace subclass with a plain namespace, keeping its nested objects.
 * Used for types that are only needed to spell out the full name of a retained object.
 * @param {NamespaceBase} parent Parent namespace of `object`
 * @param {NamespaceBase} object Object to replace
 * @returns {undefined} Does not return a value
 */
function replaceWithNamespace(parent, object) {
    var replacement = new protobuf.Namespace(object.name, object.options);
    replacement.comment = object.comment;
    replacement.filename = object.filename;

    // Types inherit the edition of the enclosing type, whereas Namespace#add stamps direct
    // children of a plain namespace with the default edition. Pinning the edition that was
    // in effect before the replacement keeps feature resolution, and thus field presence,
    // unchanged for everything that is moved over.
    var edition = inheritedEdition(object);
    replacement._edition = edition;

    object.nestedArray.slice().forEach(function(nested) {
        if (!nested._edition)
            nested._edition = edition;
        object.remove(nested);
        replacement.add(nested);
    });

    parent.remove(object);
    parent.add(replacement);
}

/**
 * Recursively removes everything that is neither retained nor required to address a
 * retained object by its full name.
 * @param {NamespaceBase} namespace Namespace to prune
 * @param {Set} retained Set of retained reflection objects
 * @returns {undefined} Does not return a value
 */
function pruneNamespace(namespace, retained) {
    // The array is a snapshot because removing and replacing children mutates it.
    namespace.nestedArray.slice().forEach(function(child) {
        if (child instanceof protobuf.Namespace)
            pruneNamespace(child, retained);

        if (retained.has(child))
            return;

        // Nothing retained inside, so nothing to keep it around for. Non-namespace children
        // (declaring extension fields) always end up here, and removing them makes the root
        // drop their sister fields as well.
        if (!(child instanceof protobuf.Namespace) || !child.nestedArray.length) {
            namespace.remove(child);
            return;
        }

        // Retained descendants below an object that was not selected itself: keep it as a
        // container only, so that message and service code is not emitted for it.
        if (child instanceof protobuf.Type || child instanceof protobuf.Service)
            replaceWithNamespace(namespace, child);
    });
}

/**
 * Removes everything from the root that is neither one of the configured messages nor a
 * transitive dependency of one of them.
 * @param {Root} root The protobuf root instance
 * @param {object} needMessageConfig Filter configuration
 * @param {string[]} needMessageConfig.messageNames The full names of the messages to keep.
 * example: ["mypackage.Message", "mypackage.nested.Other"]
 * @returns {undefined} Does not return a value
 * @throws {TypeError} If the configuration is invalid
 * @throws {Error} If one of the configured messages does not exist
 */
exports.filterMessage = function filterMessage(root, needMessageConfig) {
    if (!needMessageConfig || !Array.isArray(needMessageConfig.messageNames) || !needMessageConfig.messageNames.length)
        throw TypeError("filter.messageNames must be a non-empty array");

    // Dependencies are followed through resolvedType, so everything must be resolved first.
    root.resolveAll();

    var retained = new Set();

    // Names are resolved before anything is removed, so a filter that cannot be applied
    // leaves the root untouched.
    needMessageConfig.messageNames.forEach(function(name) {
        if (typeof name !== "string" || !name.length)
            throw TypeError("filter.messageNames must contain non-empty strings");

        // Looking up from the root handles full names of any namespace depth.
        var message = root.lookup(name, [ protobuf.Type ]);
        if (!message)
            throw Error("no such message: " + name);

        retainWithDependencies(retained, message);
    });

    pruneNamespace(root, retained);

    root.resolveAll();
};

