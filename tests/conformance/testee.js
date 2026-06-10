"use strict";

var fs = require("fs"),
    path = require("path"),
    protobuf = require("../.."),
    generated = require("./generated/messages.js"),
    reflectionRoot = protobuf.Root.fromJSON(require("./generated/messages.json")).resolveAll(),
    conformance = generated.conformance,
    protojson = require("../../ext/protojson"),
    textformat = require("../../ext/textformat"),
    list = process.argv.indexOf("--list") >= 0,
    mode = process.env.PROTOBUFJS_CONFORMANCE_MODE || "reflect",
    testTypes = Object.create(null);

var config;
switch (mode) {
    case "static":
        config = { generated: generated, binaryOnly: true };
        break;
    case "reflect":
        config = { root: reflectionRoot, binaryOnly: false };
        break;
    case "static-plugin":
        config = { generated: pluginGenerated(mode), binaryOnly: true };
        break;
    case "reflect-plugin":
        config = { root: pluginGenerated(mode).resolveAll(), binaryOnly: false };
        break;
    default:
        throw Error("unsupported PROTOBUFJS_CONFORMANCE_MODE: " + mode);
}

// Conformance tests assert protobuf binary round-tripping, including unknown fields.
protobuf.Reader.preserveUnknown = true;

var TEST_TYPE_NAMES = [
    "protobuf_test_messages.proto2.TestAllTypesProto2",
    "protobuf_test_messages.proto3.TestAllTypesProto3",
    "protobuf_test_messages.editions.proto2.TestAllTypesProto2",
    "protobuf_test_messages.editions.proto3.TestAllTypesProto3",
    "protobuf_test_messages.editions.TestAllTypesEdition2023"
];

// Register the local stable-edition copy of UNSTABLE if included by generate.js.
if (lookupGenerated(generated, "protobuf_test_messages.edition_unstable.TestAllTypesEditionUnstable"))
    TEST_TYPE_NAMES.push("protobuf_test_messages.edition_unstable.TestAllTypesEditionUnstable");

TEST_TYPE_NAMES.forEach(function(name) {
    var type = config.root
        ? config.root.lookupType(name)
        : lookupGenerated(config.generated, name);
    if (!type)
        throw Error("missing " + mode + " test type: " + name);
    testTypes[name] = type;
});

function lookupGenerated(root, name) {
    var parts = name.split("."),
        ptr = root;
    for (var i = 0; i < parts.length; ++i) {
        ptr = ptr && ptr[parts[i]];
        if (!ptr)
            return null;
    }
    return ptr;
}

function pluginGenerated(mode) {
    var file = path.join(__dirname, "generated", mode, "messages.js");
    if (!fs.existsSync(file))
        throw Error("missing " + mode + " conformance artifact; run tests/conformance/generate.js with PROTOC set");
    return require(file);
}

function isBinaryOnlySupported(request) {
    return request.payload === "protobufPayload"
        && request.requestedOutputFormat === conformance.WireFormat.PROTOBUF;
}

// Keep stdout synchronous because it carries the framed testee protocol.
if (process.stdout._handle)
    process.stdout._handle.setBlocking(true);

var count = 0,
    body,
    message,
    request,
    requestBuffer,
    response,
    sizeBuffer,
    type;

try {
    for (;;) {
        // Read the next length-prefixed ConformanceRequest from stdin.
        sizeBuffer = readStdin(4);
        if (!sizeBuffer)
            break;

        requestBuffer = readStdin(sizeBuffer.readInt32LE(0));
        if (!requestBuffer)
            throw Error("unexpected EOF while reading request");

        request = conformance.ConformanceRequest.decode(requestBuffer);
        response = null;
        message = null;

        // Build the ConformanceResponse for this request.
        if (request.messageType === "conformance.FailureSet") {
            response = {
                protobufPayload: conformance.FailureSet.encode(conformance.FailureSet.create()).finish()
            };
        } else if (list) {
            response = { skipped: "list mode" };
        } else if (config.binaryOnly && !isBinaryOnlySupported(request)) {
            response = { skipped: mode + " mode supports protobuf input/output only" };
        } else {
            type = testTypes[request.messageType];
            if (!type) {
                response = { runtimeError: "unknown message type: " + request.messageType };
            } else {
                // Parse the request payload into the requested generated type.
                try {
                    switch (request.payload) {
                        case "protobufPayload":
                            message = type.decode(request.protobufPayload);
                            break;
                        case "jsonPayload":
                            message = protojson.fromJsonString(type, request.jsonPayload, {
                                ignoreUnknownFields: request.testCategory
                                    === conformance.TestCategory.JSON_IGNORE_UNKNOWN_PARSING_TEST
                            });
                            break;
                        case "jspbPayload":
                            response = { skipped: "JSPB not supported" };
                            break;
                        case "textPayload":
                            message = textformat.fromText(type, request.textPayload);
                            break;
                        default:
                            response = { parseError: "unsupported format" };
                            break;
                    }
                } catch (err) {
                    response = { parseError: String(err) };
                }

                if (!response) {
                    // Serialize the parsed message into the requested output format.
                    try {
                        switch (request.requestedOutputFormat) {
                            case conformance.WireFormat.PROTOBUF:
                                response = { protobufPayload: type.encode(message).finish() };
                                break;
                            case conformance.WireFormat.JSON:
                                response = { jsonPayload: protojson.toJsonString(type, message) };
                                break;
                            case conformance.WireFormat.JSPB:
                                response = { skipped: "JSPB not supported" };
                                break;
                            case conformance.WireFormat.TEXT_FORMAT:
                                response = {
                                    textPayload: textformat.toText(type, message, {
                                        unknowns: request.printUnknownFields
                                    })
                                };
                                break;
                            default:
                                response = { runtimeError: "unknown output format: " + request.requestedOutputFormat };
                                break;
                        }
                    } catch (err) {
                        response = { serializeError: String(err) };
                    }
                }
            }
        }

        // Write the length-prefixed ConformanceResponse to stdout.
        body = conformance.ConformanceResponse.encode(
                conformance.ConformanceResponse.create(response)
            ).finish();
        sizeBuffer = Buffer.alloc(4);
        sizeBuffer.writeInt32LE(body.length, 0);
        writeStdout(sizeBuffer);
        writeStdout(Buffer.from(body));
        ++count;
    }
} catch (err) {
    process.stderr.write(
        "conformance testee failed after " + count + " tests: "
        + (err && err.stack || String(err)) + "\n"
    );
    process.exit(1);
}

function readStdin(size) {
    var buffer = Buffer.alloc(size),
        offset = 0,
        read;
    while (offset < size) {
        read = fs.readSync(0, buffer, offset, size - offset, null);
        if (read === 0) {
            if (offset === 0)
                return null;
            throw Error("unexpected EOF");
        }
        offset += read;
    }
    return buffer;
}

function writeStdout(buffer) {
    var offset = 0;
    while (offset < buffer.length)
        offset += fs.writeSync(1, buffer, offset, buffer.length - offset);
}
