"use strict";

var fs = require("fs");

exports.read = function(logFile, testListLogFile) {
    var tests = readTests(testListLogFile),
        failures = readFailures(logFile),
        skips = readSkips(logFile);

    return {
        summary: readRunnerSummary(logFile),
        totals: summarize(tests, failures, skips)
    };
};

exports.readText = readText;

function readTests(file) {
    var log,
        tests = Object.create(null),
        pattern = /SKIPPED, test=([^\r\n ]+)/g,
        match,
        name;

    if (!file || !fs.existsSync(file))
        return [];

    log = readText(file);
    if (log.indexOf("CONFORMANCE SUITE") >= 0)
        log = log.substring(0, log.indexOf("CONFORMANCE SUITE"));
    while ((match = pattern.exec(log)) !== null) {
        name = match[1];
        tests[name] = classifyTest(name);
    }
    return Object.keys(tests).sort().map(function(testName) {
        var test = tests[testName];
        test.name = testName;
        return test;
    });
}

function readFailures(file) {
    var log,
        failures = Object.create(null),
        pattern = /ERROR, test=([^\r\n :]+)/g,
        match;

    if (!file || !fs.existsSync(file))
        return failures;

    log = readText(file);
    while ((match = pattern.exec(log)) !== null)
        failures[match[1]] = true;
    return failures;
}

function readSkips(file) {
    var log,
        skips = Object.create(null),
        pattern = /SKIPPED, test=([^\r\n ]+)/g,
        match;

    if (!file || !fs.existsSync(file))
        return skips;

    log = readText(file);
    while ((match = pattern.exec(log)) !== null)
        skips[match[1]] = true;
    return skips;
}

function readRunnerSummary(file) {
    var match;

    if (!file || !fs.existsSync(file))
        return null;

    match = /CONFORMANCE SUITE \w+: (\d+) successes, (\d+) skipped, (\d+) expected failures, (\d+) unexpected failures\./.exec(readText(file));
    return match ? {
        successes: Number(match[1]),
        skipped: Number(match[2]),
        expectedFailures: Number(match[3]),
        unexpectedFailures: Number(match[4])
    } : null;
}

function summarize(tests, failures, skips) {
    return {
        overall: summarizeTests(tests, failures, skips),
        byRequirement: summarizeGroups(tests, failures, skips, "requirement", requirementOrder()),
        byFormat: summarizeGroups(tests, failures, skips, "format", formatOrder()),
        bySyntax: summarizeGroups(tests, failures, skips, "syntax", syntaxOrder())
    };
}

function summarizeGroups(tests, failures, skips, property, groups) {
    var out = Object.create(null);
    groups.forEach(function(group) {
        var groupTests = tests.filter(function(test) {
            return test[property] === group.id;
        });
        if (groupTests.length)
            out[group.id] = Object.assign({ id: group.id, label: group.label }, summarizeTests(groupTests, failures, skips));
    });
    return out;
}

function summarizeTests(tests, failures, skips) {
    var total = tests.length,
        passed = 0,
        failed = 0,
        skipped = 0;

    tests.forEach(function(test) {
        if (failures[test.name]) {
            ++failed;
        } else if (skips[test.name]) {
            ++skipped;
        } else {
            ++passed;
        }
    });

    return {
        total: total,
        passed: passed,
        failed: failed,
        skipped: skipped,
        passPercent: percent(passed, total)
    };
}

function classifyTest(name) {
    return {
        requirement: name.indexOf("Required.") === 0 ? "required" : "recommended",
        format: classifyFormat(name),
        syntax: classifySyntax(name)
    };
}

function classifyFormat(name) {
    if (/(^|\.)TextFormat(Input|Output)(\.|$)/.test(name))
        return "textFormat";
    if (/(^|\.)(JSPB|Jspb)(Input|Output)(\.|$)/.test(name))
        return "jspb";
    if (/(^|\.)Json(Input|Output)(\.|$)/.test(name) || /\.Validator$/.test(name))
        return "json";
    if (/(^|\.)Protobuf(Input|Output)(\.|$)/.test(name))
        return "binary";
    return "other";
}

function classifySyntax(name) {
    var parts = name.split(".");
    if (parts[1] === "Proto2")
        return "proto2";
    if (parts[1] === "Proto3")
        return "proto3";
    if (parts[1] === "Editions" || parts[1] === "Editions_Proto2" || parts[1] === "Editions_Proto3")
        return "editions";
    return "other";
}

function formatOrder() {
    return [
        { id: "binary", label: "Binary" },
        { id: "json", label: "ProtoJSON" },
        { id: "textFormat", label: "Text Format" },
        { id: "jspb", label: "JSPB" },
        { id: "other", label: "Other" }
    ];
}

function syntaxOrder() {
    return [
        { id: "proto2", label: "proto2" },
        { id: "proto3", label: "proto3" },
        { id: "editions", label: "Editions" },
        { id: "other", label: "Other" }
    ];
}

function requirementOrder() {
    return [
        { id: "required", label: "Required" },
        { id: "recommended", label: "Recommended" }
    ];
}

function percent(value, total) {
    return total ? value / total : 0;
}

function readText(file) {
    var buffer = fs.readFileSync(file);
    return buffer[0] === 0xff && buffer[1] === 0xfe
        ? buffer.toString("utf16le")
        : buffer.toString("utf8");
}
