var fs            = require("fs"),
    path          = require("path"),
    child_process = require("child_process");

var protobuf = require("..");

exports.requireAll = function requireAll(dirname) {
    dirname   = path.join(__dirname, dirname);
    var files = fs.readdirSync(dirname),
        all = {};
    files.forEach(function(file) {
        var basename = path.basename(file, ".js"),
            extname  = path.extname(file);
        if (extname === ".js")
            all[basename] = require(path.join(dirname, file));
    });
    return all;
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

exports.require = function(name, version) {
    var cwd = path.join(__dirname, "..");
    var dir = path.join(cwd, "node_modules", name);
    try {
        // do not feed the cache
        require.resolve(path.join(dir, "package.json"));
    } catch (e) {
        console.error("installing " + name + "@" + version + " ...");
        child_process.execSync("npm install " + name + "@" + version, {
            cwd: cwd
        });
    }
    return require(name);
};
