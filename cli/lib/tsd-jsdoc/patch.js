"use strict";

var typeParserPatched = false;
var typeLinkerPatched = false;
var typeScriptTypePattern = /[&;]|\?:|=>|\bkeyof\b|\btypeof\b/;
var typeNamePattern = /^[A-Za-z_$][0-9A-Za-z_$]*(?:\.[A-Za-z_$][0-9A-Za-z_$]*)*=?$/;

function normalizeType(type) {
    return type.replace(/\r?\n|\r/g, "\n");
}

function parseTagName(text) {
    text = text.trim();
    if (!text)
        return {};

    var result = {};
    if (text.charAt(0) === "[") {
        var close = text.indexOf("]");
        if (close >= 0) {
            var name = text.substring(1, close),
                equal = name.indexOf("=");
            result.optional = true;
            if (equal >= 0) {
                result.defaultvalue = name.substring(equal + 1);
                name = name.substring(0, equal);
            }
            result.name = name;
            result.text = text.substring(close + 1).trim();
            return result;
        }
    }

    var match = /^(\S+)(?:\s+([\s\S]*))?$/.exec(text);
    if (match) {
        result.name = match[1];
        result.text = match[2] || "";
    }
    return result;
}

function patchTypeExpressionParser(dictionary) {
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
            if (!typeScriptTypePattern.test(expression) && !/^\s*\{/.test(expression) && !typeNamePattern.test(expression))
                throw e;

            var expressionType = expression,
                typeOptional = false;
            if (typeNamePattern.test(expression) && expression.charAt(expression.length - 1) === "=") {
                expressionType = expression.substring(0, expression.length - 1);
                typeOptional = true;
            }

            var tag = canHaveName ? parseTagName(text.substring(close + 1)) : {};
            var parsed = {
                type: [ expressionType ],
                typeExpression: expression
            };
            if (tag.name)
                parsed.name = tag.name;
            if (tag.text)
                parsed.text = tag.text;
            if (tag.optional || typeOptional)
                parsed.optional = true;
            if (tag.defaultvalue)
                parsed.defaultvalue = tag.defaultvalue;
            if (typeNamePattern.test(expression)) {
                parsed.parsedType = {
                    type: "NameExpression",
                    name: expressionType
                };
                if (typeOptional)
                    parsed.parsedType.optional = true;
            }
            return parsed;
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
