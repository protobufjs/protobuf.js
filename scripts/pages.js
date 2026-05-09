/*eslint-disable no-console, no-process-env*/
"use strict";

var ghpages = require("gh-pages"),
    path    = require("path"),
    pkg     = require("../package.json");

var options = {
    message: "docs: update API documentation for v" + pkg.version,
    nojekyll: true
};

// Auth for the gh-pages clone in CI.
if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPOSITORY) {
    options.repo = "https://git:" + process.env.GITHUB_TOKEN
        + "@github.com/" + process.env.GITHUB_REPOSITORY + ".git";
    options.silent = true;
    options.user = {
        name: "github-actions[bot]",
        email: "41898282+github-actions[bot]@users.noreply.github.com"
    };
}

ghpages.publish(path.join(__dirname, "..", "docs"), options, function(err) {
    if (err) {
        console.error(err.message || err);
        process.exitCode = 1;
    } else
        console.log("done");
});
