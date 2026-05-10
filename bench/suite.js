"use strict";
module.exports = newSuite;

var benchmark = require("benchmark");

var padSize = 23;
var colors = process.stdout.isTTY;

function newSuite(name) {
    var benches = [];
    return new benchmark.Suite(name, {
        delay: 5
    })
    .on("add", function(event) {
        benches.push(event.target);
    })
    .on("start", function() {
        process.stdout.write(bold("benchmarking " + name + " performance ...") + "\n\n");
    })
    .on("cycle", function(event) {
        process.stdout.write(String(event.target) + "\n");
    })
    .on("complete", function() {
        if (benches.length > 1) {
            benches.sort(function(a, b) { return getHz(b) - getHz(a); });
            var fastest   = benches[0],
                fastestHz = getHz(fastest);
            process.stdout.write("\n" + pad(fastest.name, padSize) + " was " + green("fastest") + "\n");
            benches.slice(1).forEach(function(bench) {
                var hz = getHz(bench);
                var percent = 1 - hz / fastestHz;
                process.stdout.write(pad(bench.name, padSize) + " was " + red((percent * 100).toFixed(1) + "% ops/sec slower (factor " + (fastestHz / hz).toFixed(1) + ")") + "\n");
            });
        }
        process.stdout.write("\n");
    });
}

function getHz(bench) {
    return 1 / (bench.stats.mean + bench.stats.moe);
}

function pad(str, len, l) {
    while (str.length < len)
        str = l ? str + " " : " " + str;
    return str;
}

function ansi(code, str) {
    return colors ? "\x1b[" + code + "m" + str + "\x1b[0m" : str;
}

function bold(str) {
    return ansi(1, str);
}

function green(str) {
    return ansi(32, str);
}

function red(str) {
    return ansi(31, str);
}
