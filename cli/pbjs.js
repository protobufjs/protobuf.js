var minimist = require('minimist');
var util     = require("./util");

var protobuf = require(".."),
    sources  = util.requireAll("./sources"),
    targets  = util.requireAll("./targets");

exports.main = function(args) {
    var argv = minimist(args.slice(2), {
        
    });
    console.log(argv);
    return 0;
};
