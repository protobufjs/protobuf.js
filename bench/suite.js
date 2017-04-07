"use strict";
module.exports = newSuite;

var benchmark = require("benchmark"),
    chalk     = require("chalk");

var padSize = 23;

function newSuite(name) {
    var benches = [];
    return new benchmark.Suite(name)
    .on("add", function(event) {
        benches.push(event.target);
    })
    .on("start", function() {
        process.stdout.write(chalk.white.bold("benchmarking " + name + " performance ...") + "\n\n");
    })
    .on("cycle", function(event) {
        process.stdout.write(String(event.target) + "\n");
    })
    .on("complete", function() {
        if (benches.length > 1) {
            benches.sort(function(a, b) { return getHz(b) - getHz(a); });
            var fastest   = benches[0],
                fastestHz = getHz(fastest);
            process.stdout.write("\n" + chalk.white(pad(fastest.name, padSize)) + " was " + chalk.green("fastest") + "\n");
            benches.slice(1).forEach(function(bench) {
                var hz = getHz(bench);
                var percent = (1 - hz / fastestHz); // less total operations per time
                var factor = -(1 - fastestHz / hz); // additional time it takes to complete the same number of operations
                process.stdout.write(chalk.white(pad(bench.name, padSize)) + " was " + chalk.red(factor.toFixed(2) + " times slower (-" + (percent * 100).toFixed(1) + "% ops/sec)") + "\n");
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
