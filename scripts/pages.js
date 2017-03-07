/*eslint-disable no-console*/
"use strict";

var ghpages = require("gh-pages"),
    path    = require("path");

ghpages.publish(path.join(__dirname, "..", "docs"), {
    logger: function(message) {
        console.log(message);
    }
}, function(err) {
    if (err)
        console.error(err);
    else
        console.log("done");
});
