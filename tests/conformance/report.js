"use strict";

var fs = require("fs"),
    path = require("path"),
    summary = require("./summary");

var args = process.argv.slice(2),
    jsonFile = null,
    files = [],
    report,
    runnerSummary,
    totals;

args.forEach(function(arg, index) {
    if (arg === "--json") {
        jsonFile = args[index + 1];
    } else if (index === 0 || args[index - 1] !== "--json") {
        files.push(arg);
    }
});

if (!files[0]) {
    console.error("usage: node tests/conformance/report.js <conformance-log> [test-list-log] [--json <summary-json>]");
    process.exit(1);
}

report = summary.read(files[0], files[1]);
if (jsonFile) {
    fs.mkdirSync(path.dirname(jsonFile), { recursive: true });
    fs.writeFileSync(jsonFile, JSON.stringify(report, null, 2) + "\n");
}

if (!fs.existsSync(files[0])) {
    console.log("No conformance log found.");
    process.exit(0);
}

runnerSummary = report.summary;
if (!runnerSummary) {
    console.log("No conformance summary found.");
    process.exit(0);
}

totals = report.totals;
printTable([
    metric("Binary passing", totals.byFormat.binary),
    metric("ProtoJSON passing", totals.byFormat.json),
    metric("Required passing", totals.byRequirement.required),
    metric("Recommended passing", totals.byRequirement.recommended),
    metric("Total passing", totals.overall),
    ["Skipped", String(runnerSummary.skipped)],
    ["Expected failures", String(runnerSummary.expectedFailures)],
    ["Unexpected failures", String(runnerSummary.unexpectedFailures)]
].filter(Boolean));

function metric(label, value) {
    if (value && value.total)
        return [label, formatResult(value)];
    return null;
}

function printTable(rows) {
    var metricWidth = maxWidth(["Metric"].concat(rows.map(function(row) {
            return row[0];
        }))),
        countWidth = maxWidth(["Count"].concat(rows.map(function(row) {
            return row[1];
        })));

    console.log("| " + padRight("Metric", metricWidth) + " | " + padLeft("Count", countWidth) + " |");
    console.log("| " + repeat("-", metricWidth) + " | " + repeat("-", countWidth) + ": |");
    rows.forEach(function(row) {
        console.log("| " + padRight(row[0], metricWidth) + " | " + padLeft(row[1], countWidth) + " |");
    });
}

function formatResult(value) {
    return pct(value.passPercent) + " (" + value.passed + "/" + value.total + ")";
}

function pct(value) {
    return (value * 100).toFixed(2) + "%";
}

function maxWidth(values) {
    return values.reduce(function(max, value) {
        return Math.max(max, value.length);
    }, 0);
}

function padLeft(value, width) {
    return repeat(" ", width - value.length) + value;
}

function padRight(value, width) {
    return value + repeat(" ", width - value.length);
}

function repeat(value, count) {
    return new Array(count + 1).join(value);
}
