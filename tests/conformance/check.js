"use strict";

var fs = require("fs");

var args = process.argv.slice(2),
    file = args[0],
    binaryThreshold = 100,
    report,
    binary,
    binaryPercent;

for (var i = 1; i < args.length; ++i) {
    if (args[i] === "--binary")
        binaryThreshold = Number(args[++i]);
}

if (!file || !isFinite(binaryThreshold)) {
    console.error("usage: node tests/conformance/check.js <conformance-json> [--binary <percent>]");
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
