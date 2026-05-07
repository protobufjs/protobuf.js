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
    suite("Binary", "binary"),
    suite("ProtoJSON", "json"),
    suite("TextFormat", "textFormat"),
    ["Overall", formatResult(totals.overall), formatResult(totals.byRequirement.required), formatResult(totals.byRequirement.recommended)]
].filter(Boolean));

function suite(label, format) {
    var byRequirement = totals.byFormatRequirement && totals.byFormatRequirement[format];
    if (!totals.byFormat[format])
        return null;
    return [
        label,
        formatResult(totals.byFormat[format]),
        formatResult(byRequirement && byRequirement.required),
        formatResult(byRequirement && byRequirement.recommended)
    ];
}

function printTable(rows) {
    var suiteWidth = maxWidth(["Category"].concat(rows.map(function(row) {
            return row[0];
        }))),
        totalWidth = maxWidth(["Total"].concat(rows.map(function(row) {
            return row[1];
        }))),
        requiredWidth = maxWidth(["Required"].concat(rows.map(function(row) {
            return row[2];
        }))),
        recommendedWidth = maxWidth(["Recommended"].concat(rows.map(function(row) {
            return row[3];
        })));

    console.log("| " + padRight("Category", suiteWidth) + " | " + padLeft("Total", totalWidth) + " | " + padLeft("Required", requiredWidth) + " | " + padLeft("Recommended", recommendedWidth) + " |");
    console.log("| " + repeat("-", suiteWidth) + " | " + repeat("-", totalWidth) + ": | " + repeat("-", requiredWidth) + ": | " + repeat("-", recommendedWidth) + ": |");
    rows.forEach(function(row) {
        console.log("| " + padRight(row[0], suiteWidth) + " | " + padLeft(row[1], totalWidth) + " | " + padLeft(row[2], requiredWidth) + " | " + padLeft(row[3], recommendedWidth) + " |");
    });
}

function formatResult(value) {
    return value && value.total
        ? pct(value.passPercent) + " (" + value.passed + "/" + value.total + ")"
        : "-";
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
