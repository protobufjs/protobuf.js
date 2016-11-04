var fs   = require("fs"),
    path = require("path");

exports.requireAll = function(dirname) {
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
