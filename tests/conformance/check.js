"use strict";

var fs = require("fs");

var args = process.argv.slice(2),
    file = args[0],
    binaryThreshold = 100,
    textFormatThreshold = null,
    report,
    binary,
    binaryPercent,
    textFormat,
    textFormatPercent;

for (var i = 1; i < args.length; ++i) {
    if (args[i] === "--binary")
        binaryThreshold = Number(args[++i]);
    else if (args[i] === "--text-format")
        textFormatThreshold = Number(args[++i]);
}

if (!file || !isFinite(binaryThreshold) || textFormatThreshold !== null && !isFinite(textFormatThreshold)) {
    console.error("usage: node tests/conformance/check.js <conformance-json> [--binary <percent>] [--text-format <percent>]");
    process.exit(1);
}

if (!fs.existsSync(file)) {
    console.error("missing conformance summary: " + file);
    process.exit(1);
}

report = JSON.parse(fs.readFileSync(file, "utf8"));
binary = report.totals && report.totals.byFormat && report.totals.byFormat.binary;
if (!binary || !binary.total) {
    console.error("missing Binary conformance results in " + file);
    process.exit(1);
}

binaryPercent = binary.passPercent * 100;
if (binaryPercent + 1e-9 < binaryThreshold) {
    console.error("Binary conformance below " + binaryThreshold.toFixed(2) + "%: "
        + binaryPercent.toFixed(2) + "% (" + binary.passed + "/" + binary.total + ")");
    if (binary.failed)
        console.error("Binary failures: " + binary.failed);
    if (binary.skipped)
        console.error("Binary skipped: " + binary.skipped);
    process.exit(1);
}

console.log("Binary conformance: " + binaryPercent.toFixed(2) + "% (" + binary.passed + "/" + binary.total + ")");

textFormat = report.totals && report.totals.byFormat && report.totals.byFormat.textFormat;
if (textFormat && textFormat.total) {
    textFormatPercent = textFormat.passPercent * 100;
    if (textFormatThreshold !== null && textFormatPercent + 1e-9 < textFormatThreshold) {
        console.error("Text Format conformance below " + textFormatThreshold.toFixed(2) + "%: "
            + textFormatPercent.toFixed(2) + "% (" + textFormat.passed + "/" + textFormat.total + ")");
        if (textFormat.failed)
            console.error("Text Format failures: " + textFormat.failed);
        if (textFormat.skipped)
            console.error("Text Format skipped: " + textFormat.skipped);
        process.exit(1);
    }
    console.log("Text Format conformance: " + textFormatPercent.toFixed(2) + "% (" + textFormat.passed + "/" + textFormat.total + ")");
}
