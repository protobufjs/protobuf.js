"use strict";
module.exports = newSuite;

var benchmark = require("benchmark"),
    chalk     = require("chalk");

var padSize = 27;

function newSuite(name) {
    var benches = [];
    return new benchmark.Suite(name)
    .on("add", function(event) {
        benches.push(event.target);
    })
    .on("start", function() {
        console.log("benchmarking " + name + " performance ...\n");
    })
    .on("error", function(err) {
        console.log("ERROR:", err);
    })
    .on("cycle", function(event) {
        console.log(String(event.target));
    })
    .on("complete", function(event) {
        if (benches.length > 1) {
            var fastest = this.filter('fastest'),
                slowest = this.filter('slowest');
            var fastestHz = getHz(fastest[0]);
            console.log("\n" + chalk.white(pad(fastest[0].name, padSize)) + " was " + chalk.green("fastest"));
            benches.forEach(function(bench) {
                if (fastest.indexOf(bench) === 0)
                    return;
                var hz = hz = getHz(bench);
                var percent = (1 - (hz / fastestHz)) * 100;
                console.log(chalk.white(pad(bench.name, padSize)) + " was " + chalk.red(percent.toFixed(1)+'% slower'));
            });
        }
        console.log();
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
