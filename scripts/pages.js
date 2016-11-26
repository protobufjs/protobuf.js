var ghpages = require("gh-pages"),
    path    = require("path");

ghpages.publish(path.join(__dirname, "..", "docs"), {
    logger: function(message) {
        console.log(message);
    }
}, function(err) {
    if (err)
        throw err;
    console.log("done");
});
