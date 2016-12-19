var child_process = require("child_process"),
    gitSemverTags = require("git-semver-tags"),
    gitRawCommits = require("git-raw-commits");
var pkg = require("../package.json");

var categories = {};
var validCategories = [
    "Breaking",
    "Added",
    "Fixed",
    "Docs"
];

gitSemverTags(function(err, tags) {
    var commits = gitRawCommits({ from: tags[0], to: 'HEAD' });
    commits.on("data", function(chunk) {
        var message = chunk.toString("utf8").trim();
        var match = /(\w+): (.*)/.exec(message);
        var category;
        if (match && validCategories.indexOf(match[1]) > -1) {
            category = match[1];
            message = match[2].trim();
        } else
            category = "Other";
        (categories[category] || (categories[category] = [])).push(message);
    });
    commits.on("end", function() {
        console.log(categories);
    });
});

// child_process.execSync("git tag " + pkg.version);
// child_process.execSync("git push -u origin master --tags");
