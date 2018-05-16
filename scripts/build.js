/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var MetaScript = require("metascript"),
    path = require("path"),
    fs = require("fs");

var rootDir = path.join(__dirname, ".."),
    srcDir  = path.join(rootDir, "src"),
    distDir = path.join(rootDir, "dist"),
    pkg = require(path.join(rootDir, "package.json")),
    filename;

var scope = {
    VERSION: pkg.version,           // Version
    DOTPROTO: true                  // Whether to include the ProtoBuf.DotProto package for .proto syntax support
};

// Make full build
console.log("Building protobuf.js with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(distDir, "protobuf.js"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "wrap.js")), filename, scope, srcDir)
);

// Make light build
scope.DOTPROTO = false;
console.log("Building protobuf-light.js with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(distDir, "protobuf-light.js"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "wrap.js")), filename, scope, srcDir)
);

// Update bower.json
scope = { VERSION: pkg.version };
console.log("Updating bower.json with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(rootDir, "bower.json"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "bower.json.in")), filename, scope, srcDir)
);
