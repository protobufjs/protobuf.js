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
var description = "Binary descriptor set";

var ProtoBuf = require(__dirname+"/../../../index.js"),
    util = require(__dirname+"/../util.js"),
    node_path = require("path"),
    fs = require("fs");

/**
 * pbjs source: Binary descriptor
 * @exports pbjs/sources/binary
 * @function
 * @param {!Array.<string>} filenames Source files
 * @param {!Object.<string,*>=} options Options
 * @returns {!ProtoBuf.Builder}
 */
var binary = module.exports = function(filenames, options) {
    options = options || [];
    var builder = ProtoBuf.newBuilder(util.getBuilderOptions(options, "using")),
        loaded = [];
    filenames.forEach(function(filename) {
        var data = binary.load(filename, options, loaded);
        builder["import"](data, filename);
    });
    builder.resolveAll();
    return builder;
};

/**
 * Module description.
 * @type {string}
 */
binary.description = description;

binary.exclude = true; // Unfinished

/**
 * Loads a binary descriptor.
 * @param {string} filename Source file
 * @param {!Object.<string,*>} options Options
 * @param {!Array.<string>=} loaded An array of already loaded filenames
 * @returns {*} JSON descriptor
 */
binary.load = function(filename, options, loaded) {
    filename = node_path.resolve(filename);
    loaded = loaded || [];
    if (loaded.indexOf(filename) >= 0)
        return {};
    var data = fs.readFileSync(filename);
    loaded.push(filename);
    var builder = ProtoBuf.loadProtoFile(node_path.join("..", "..", "..", "src", "google", "protobuf", "descriptor.proto")),
        FileDescriptorSet = builder.build("google.protobuf.FileDescriptorSet");
    var fds = FileDescriptorSet.decode(data),
        imports = [];
    var json = {
        "package": null,
        "imports": imports
    };
    fds.file.forEach(function(fdp) {
        imports.push(buildFileDescriptorProto(fdp));
    });
    return json;
};

function buildFileDescriptorProto(fdp) {
    var pkg = fdp.package,
        messages = [],
        enums = [],
        services = [],
        extensions = [],
        options = {},
        imports = [];
    fdp.message_type.forEach(function(dp) {
        messages.push(buildMessageDescriptorProto(dp));
    });
    fdp.enum_type.forEach(function(edp) {
        enums.push(buildEnumDescriptorProto(edp));
    });
    fdp.service.forEach(function(sdp) {
        enums.push(buildServiceDescriptorProto(sdp));
    });
    fdp.extension.forEach(function(fdp) {
        extensions.push(buildFieldDescriptorProtoAsExtension(fdp));
    });
    fdp.options.forEach(function(fo) {
        // TODO
    });
    fdp.dependency.forEach(function(filename) {
        // TODO
    });
    return {
        "package": pkg,
        "messages": messages,
        "enums": enums,
        "services": services,
        "extensions": extensions,
        "options": options,
        "imports": imports
    };
}

function buildMessageDescriptorProto(mdp) {

}

function buildEnumDescriptorProto(edp) {

}

function buildServiceDescriptorProto(sdp) {

}

function buildFieldDescriptorProtoAsExtension(fdp) {

}