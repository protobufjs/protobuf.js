import { readFile, rm } from "node:fs/promises";
import * as esbuild from "esbuild";

var pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

var license = [
    "/*!",
    " * protobuf.js v" + pkg.version + " (c) 2026, Daniel Wirtz",
    " * Compiled " + new Date().toUTCString().replace("GMT", "UTC"),
    " * Licensed under the BSD-3-Clause license",
    " * https://github.com/protobufjs/protobuf.js",
    " */"
].join("\n");

var bundles = [
    [ "src/index.js", "dist/index.js" ],
    [ "src/index-light.js", "dist/light.js" ],
    [ "src/index-minimal.js", "dist/minimal.js" ]
];

await rm(new URL("../dist/", import.meta.url), {
    recursive: true,
    force: true
});

for (var i = 0; i < bundles.length; ++i) {
    var entry = bundles[i][0],
        outfile = bundles[i][1];
    await build(entry, outfile);
}

function build(entryPoint, outfile) {
    return esbuild.build({
        entryPoints: [ entryPoint ],
        outfile: outfile,
        bundle: true,
        format: "esm",
        platform: "browser",
        target: "es2022",
        sourcemap: true,
        minify: true,
        legalComments: "none",
        banner: {
            js: license
        },
        external: [
            "fs"
        ]
    });
}
