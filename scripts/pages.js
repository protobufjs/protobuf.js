/*eslint-disable no-console, no-process-env*/

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import ghpages from "gh-pages";

var pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

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

ghpages.publish(fileURLToPath(new URL("../docs", import.meta.url)), options, function(err) {
    if (err) {
        console.error(err.message || err);
        process.exitCode = 1;
    } else
        console.log("done");
});
