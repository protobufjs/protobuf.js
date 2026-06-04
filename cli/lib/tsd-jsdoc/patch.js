"use strict";

var typeParserPatched = false;
var typeLinkerPatched = false;
var catharsisPatched = false;
var typeScriptTypePattern = /[&;]|\?:|=>|\bkeyof\b|\btypeof\b/;

function normalizeType(type) {
    return type.replace(/\r?\n|\r/g, "\n");
}

function patchCatharsis() {
    if (catharsisPatched)
        return;
    catharsisPatched = true;

    var path = require("path");
    var typePath = require.resolve("jsdoc/tag/type");
    var catharsisPath = require.resolve("catharsis", {
        paths: [ path.dirname(typePath) ]
    });
    var catharsis = require(catharsisPath);
    var vendored = require("../catharsis/catharsis");

    catharsis.Types = vendored.Types;
    catharsis.parse = vendored.parse;
    catharsis.stringify = vendored.stringify;
}

function patchTypeExpressionParser(dictionary) {
    patchCatharsis();

    var type = require("jsdoc/tag/type");
    var parse = type.parse,
        typeTag = dictionary.lookUp("type");

    if (typeTag && !typeTag.protobufjsPatched) {
        typeTag.onTagText = function onTypeTagText(text) {
            var openIdx = text.indexOf("{"),
                closeIdx = text.indexOf("}");

            if (openIdx !== 0 || closeIdx <= openIdx + 1)
                text = "{" + text + "}";

            return text;
        };
        typeTag.protobufjsPatched = true;
    }

    if (typeParserPatched)
        return;
    typeParserPatched = true;

    type.parse = function parseTypeScriptType(tagValue, canHaveName, canHaveType) {
        try {
            return parse(tagValue, canHaveName, canHaveType);
        } catch (e) {
            if (!canHaveType)
                throw e;

            var text = String(tagValue || "");
            var open = text.indexOf("{");
            if (open < 0)
                throw e;

            var depth = 0;
            var close = -1;
            for (var i = open; i < text.length; ++i) {
                var ch = text.charAt(i);
                if (ch === "{")
                    ++depth;
                else if (ch === "}" && --depth === 0) {
                    close = i;
                    break;
                }
            }
            if (close < 0)
                throw e;

            var expression = normalizeType(text.substring(open + 1, close)).trim();
            if (!typeScriptTypePattern.test(expression) && !/^\s*\{/.test(expression))
                throw e;

            var name = canHaveName ? text.substring(close + 1).trim() : "";
            return {
                type: [ expression ],
                typeExpression: expression,
                name: name
            };
        }
    };
}

function patchTypeExpressionLinks() {
    if (typeLinkerPatched)
        return;
    typeLinkerPatched = true;

    var helper = require("jsdoc/util/templateHelper");
    var linkto = helper.linkto;

    helper.linkto = function linkTypeScriptType(longname, linkText, cssClass, fragmentId) {
        var stripped = longname ? String(longname).replace(/^<|>$/g, "") : "";
        if (stripped && typeScriptTypePattern.test(stripped) &&
            !/^(http|ftp)s?:\/\//.test(stripped) &&
            /\{@.+\}/.test(stripped) === false &&
            /^<[\s\S]+>/.test(stripped) === false)
            return linkText || helper.htmlsafe(longname);

        return linkto.call(this, longname, linkText, cssClass, fragmentId);
    };
}

exports.normalizeType = normalizeType;

exports.defineTags = function(dictionary) {
    patchTypeExpressionParser(dictionary);
    patchTypeExpressionLinks();
};
