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

exports.inspect = function inspect(object, indent) {
    if (!object)
        return "";
    var chalk = require("chalk");
    var sb = [];
    if (!indent)
        indent = "";
    var ind = indent ? indent.substring(0, indent.length - 2) + "└ " : "";
    sb.push(
        ind + chalk.bold(object.toString()) + (object.visible ? " (visible)" : ""),
        indent + chalk.gray("parent: ") + object.parent
    );
    if (object instanceof protobuf.Field) {
        if (object.extend !== undefined)
            sb.push(indent + chalk.gray("extend: ") + object.extend);
        if (object.partOf)
            sb.push(indent + chalk.gray("oneof : ") + object.oneof);
    }
    sb.push("");
    if (object.fieldsArray)
        object.fieldsArray.forEach(function(field) {
            sb.push(inspect(field, indent + "  "));
        });
    if (object.oneofsArray)
        object.oneofsArray.forEach(function(oneof) {
            sb.push(inspect(oneof, indent + "  "));
        });
    if (object.methodsArray)
        object.methodsArray.forEach(function(service) {
            sb.push(inspect(service, indent + "  "));
        });
    if (object.nestedArray)
        object.nestedArray.forEach(function(nested) {
            sb.push(inspect(nested, indent + "  "));
        });
    return sb.join("\n");
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
    wrap = wrap.replace(/( *)\$OUTPUT;/, function($0, $1) {
        return $1.length ? OUTPUT.replace(/^/mg, $1) : OUTPUT;
    });
    if (options.lint !== "")
        wrap = "/*" + options.lint + "*/\n" + wrap;
    return wrap.replace(/\r?\n/g, "\n");
};

exports.pad = function(str, len, l) {
    while (str.length < len)
        str = l ? str + " " : " " + str;
    return str;
};


/**
 * DFS to get all message dependencies, cache in filterMap.
 * @param {Root} root  The protobuf root instance
 * @param {Message} message  The message need to process.
 * @param {Map} filterMap  The result of message you need and their dependencies.
 * @param {Map} flatMap  A flag to record whether the message was searched.
 * @returns {undefined}  Does not return a value
 */
function dfsFilterMessageDependencies(root, message, filterMap, flatMap) {
    if (message instanceof protobuf.Type) {
        if (flatMap.get(`${message.fullName}`)) return;
        flatMap.set(`${message.fullName}`, true);
        for (var field of message.fieldsArray) {
            if (field.resolvedType) {
                // a nested message
                if (field.resolvedType.parent.name === message.name) {
                    var nestedMessage = message.nested[field.resolvedType.name];
                    dfsFilterMessageDependencies(root, nestedMessage, filterMap, flatMap);
                    continue;
                }
                var packageName = field.resolvedType.parent.name;
                var typeName = field.resolvedType.name;
                var fullName = packageName ? `${packageName}.${typeName}` : typeName;
                doFilterMessage(root, { messageNames: [fullName] }, filterMap, flatMap, packageName);
            }
        }
    }
}

/**
 * DFS to get all message you need and their dependencies, cache in filterMap.
 * @param {Root} root  The protobuf root instance
 * @param {object} needMessageConfig  Need message config:
 * @param {string[]} needMessageConfig.messageNames  The message names array in the root namespace you need to gen. example: [msg1, msg2]
 * @param {Map} filterMap The result of message you need and their dependencies.
 * @param {Map} flatMap A flag to record whether the message was searched.
 * @param {string} currentPackageName  Current package name
 * @returns {undefined}  Does not return a value
 */
function doFilterMessage(root, needMessageConfig, filterMap, flatMap, currentPackageName) {
    var needMessageNames = needMessageConfig.messageNames;

    for (var messageFullName of needMessageNames) {
        var nameSplit = messageFullName.split(".");
        var packageName = "";
        var messageName = "";
        if (nameSplit.length > 1) {
            packageName = nameSplit[0];
            messageName = nameSplit[1];
        } else {
            messageName = nameSplit[0];
        }

        // in Namespace
        if (packageName) {
            var ns = root.nested[packageName];
            if (!ns || !(ns instanceof protobuf.Namespace)) {
                throw new Error(`package not foud ${currentPackageName}.${messageName}`);
            }

            doFilterMessage(root, { messageNames: [messageName] }, filterMap, flatMap, packageName);
        } else {
            var message = root.nested[messageName];

            if (currentPackageName) {
                message = root.nested[currentPackageName].nested[messageName];
            }

            if (!message) {
                throw new Error(`message not foud ${currentPackageName}.${messageName}`);
            }

            var set = filterMap.get(currentPackageName);
            if (!filterMap.has(currentPackageName)) {
                set = new Set();
                filterMap.set(currentPackageName, set);
            }

            set.add(messageName);

            // dfs to find all dependencies
            dfsFilterMessageDependencies(root, message, filterMap, flatMap, currentPackageName);
        }
    }
}

/**
 * filter the message you need and their dependencies, all others will be delete from root.
 * @param {Root} root  Root the protobuf root instance
 * @param {object} needMessageConfig  Need message config:
 * @param {string[]} needMessageConfig.messageNames  Tthe message names array in the root namespace you need to gen. example: [msg1, msg2]
 * @returns {boolean} True if a message should present in the generated files
 */
exports.filterMessage = function (root, needMessageConfig) {
    var filterMap = new Map();
    var flatMap = new Map();
    doFilterMessage(root, needMessageConfig, filterMap, flatMap, "");
    root._nestedArray = root._nestedArray.filter(ns => {
        if (ns instanceof protobuf.Type || ns instanceof protobuf.Enum) {
            return filterMap.get("").has(ns.name);
        } else if (ns instanceof protobuf.Namespace) {
            if (!filterMap.has(ns.name)) {
                return false;
            }
            ns._nestedArray = ns._nestedArray.filter(nns => {
                const nnsSet = filterMap.get(ns.name);
                return nnsSet.has(nns.name);
            });

            return true;
        }
        return true;
    });
};

