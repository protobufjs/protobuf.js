var tape = require("tape");

var path = require("..");

tape.test("path", function(test) {

    test.ok(path.isAbsolute("X:\\some\\path\\file.js"), "should identify absolute windows paths");
    test.ok(path.isAbsolute("/some/path/file.js"), "should identify absolute unix paths");

    test.notOk(path.isAbsolute("some\\path\\file.js"), "should identify relative windows paths");
    test.notOk(path.isAbsolute("some/path/file.js"), "should identify relative unix paths");

    test.ok(path.isAbsolute("\\\\some-unc\\path\\file.js"), "should identify windows unc paths");

    test.ok(path.isAbsolute("https://example.com/path/file.js"), "should identify absolute URLs");
    test.ok(path.isAbsolute("://example.com/path/file.js"), "should identify protocol-relative URLs");

    var paths = [
        {
            actual: "X:\\some\\..\\.\\path\\\\file.js",
            normal: "X:/path/file.js",
            resolve: {
                origin: "X:/path/origin.js",
                expected: "X:/path/file.js"
            }
        }, {
            actual: "some\\..\\.\\path\\\\file.js",
            normal: "path/file.js",
            resolve: {
                origin: "X:/path/origin.js",
                expected: "X:/path/path/file.js"
            }
        }, {
            actual: "/some/.././path//file.js",
            normal: "/path/file.js",
            resolve: {
                origin: "/path/origin.js",
                expected: "/path/file.js"
            }
        }, {
            actual: "some/.././path//file.js",
            normal: "path/file.js",
            resolve: {
                origin: "",
                expected: "path/file.js"
            }
        }, {
            actual: ".././path//file.js",
            normal: "../path/file.js"
        }, {
            actual: "/.././path//file.js",
            normal: "/path/file.js"
        }, {
            actual: "\\\\some-unc\\path\\file.js",
            normal: "\\\\some-unc/path/file.js",
            resolve: {
                origin: "\\\\some-unc\\path\\origin.js",
                expected: "\\\\some-unc/path/file.js"
            }
        }, {
            actual: "\\\\some-unc\\path\\..\\file.js",
            normal: "\\\\some-unc/file.js",
            resolve: {
                origin: "\\\\some-unc\\path\\..\\origin.js",
                expected: "\\\\some-unc/file.js"
            }
        }, {
            actual: "https://example.com/path/../file.js",
            normal: "https://example.com/file.js",
            resolve: {
                origin: "/some/local/path",
                expected: "https://example.com/file.js"
            }
        }, {
            actual: "path/file2.js",
            normal: "path/file2.js",
            resolve: {
                origin: "https://example.com/file1.js",
                expected: "https://example.com/path/file2.js"
            }
        }
    ];

    paths.forEach(function(p) {
        test.equal(path.normalize(p.actual), p.normal, "should normalize " + p.actual);
        if (p.resolve) {
            test.equal(path.resolve(p.resolve.origin, p.actual), p.resolve.expected, "should resolve " + p.actual);
            test.equal(path.resolve(p.resolve.origin, p.normal, true), p.resolve.expected, "should resolve " + p.normal + " (already normalized)");
        }
    });

    test.end();
});
