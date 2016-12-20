var gitSemverTags = require("git-semver-tags"),
    gitRawCommits = require("git-raw-commits");

var pkg = require("../package.json");

var breakingFallback = /removed|stripped|dropped/i;

// categories to be used in the future and regexes for lazy / older subjects
var validCategories = {
    "Breaking": null,
    "Fixed": /fix|properly|prevent/i,
    "New": /added|initial/i,
    "CLI": /pbjs|pbts/,
    "Docs": /README/i,
    "Other": null
};

var repo = "https://github.com/dcodeIO/protobuf.js";

gitSemverTags(function(err, tags) {
    if (err)
        throw err;

    var categories = {};
    Object.keys(validCategories).forEach(function(category) {
        categories[category] = [];
    });

    var commits = gitRawCommits({
        from: tags[0],
        to: 'HEAD',
        merges: false,
        format: "%B%n#%H"
    });

    commits.on("error", function(err) {
        throw err;
    });

    commits.on("data", function(chunk) {
        chunk.toString("utf8").trim().split(";").forEach(function(message) {
            if (/^(Merge pull request |Post\-merge)/.test(message))
                return;
            var match = /#([0-9a-f]{40})$/.exec(message);
            var hash;
            if (match) {
                message = message.substring(0, message.length - match[1].length).trim();
                hash = match[1];
            }
            match = /^(\w+):/i.exec(message = message.trim());
            var category;
            if (match && match[1] in validCategories) {
                category = match[1];
                message = message.substring(match[1].length + 1).trim();
            } else {
                var keys = Object.keys(validCategories);
                for (var i = 0; i < keys.length; ++i) {
                    var re = validCategories[keys[i]];
                    if (re && re.test(message)) {
                        category = keys[i];
                        break;
                    }
                }
                message = message.replace(/^(\w+):/i, "").trim();
            }
            if (!category) {
                if (breakingFallback.test(message))
                    category = "Breaking";
                else
                    category = "Other";
            }
            var nl = message.indexOf("\n");
            if (nl > -1)
                message = message.substring(0, nl).trim();
            if (!hash || message.length < 12)
                return;
            categories[category].push({
                text: message,
                hash: hash
            });
        });
    });

    commits.on("end", function() {
        console.log("# [" + pkg.version + "](" + repo + "/releases/tag/" + pkg.version + ")");
        Object.keys(categories).forEach(function(category) {
            var messages = categories[category];
            if (!messages.length)
                return;
            console.log("\n## " + category);
            messages.forEach(function(message) {
                var text = message.text.replace(/#(\d+)/g, "[#$1](" + repo + "/issues/$1)");
                console.log("[:hash:](" + repo + "/commit/" + message.hash + ") " + text + "<br />");
            });
        });
    });
});
