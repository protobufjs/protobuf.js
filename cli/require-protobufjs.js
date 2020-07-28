"use strict";

module.exports = function requireProtobufjs() {
    try {
        // for local development, i.e. forked from github
        return require("..");
    } catch (e) {
        return require("protobufjs");
    }
};
