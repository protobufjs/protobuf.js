"use strict";

var patch = require("./patch");

exports.defineTags = function(dictionary) {
    patch.defineTags(dictionary);

    dictionary.defineTag("template", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            (doclet.templates || (doclet.templates = [])).push(tag.text);
        }
    });

    dictionary.defineTag("tstype", {
        mustHaveValue: true,
        canHaveType: false,
        canHaveName: false,
        onTagged: function(doclet, tag) {
            doclet.tsType = patch.normalizeType(tag.text);
        }
    });
};
