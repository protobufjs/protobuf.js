var ProtoBuf = require("./ProtoBuf.js");

var util = require("util"),
    fs = require("fs");

var proto = fs.readFileSync("test.proto");
var parser = new ProtoBuf.DotProto.Parser(proto);
var res = parser.parse();
console.log(util.inspect(res, true, null, true));
/* var token;
while ((token = tn.next()) !== null) {
    console.log("token: "+token);
} */