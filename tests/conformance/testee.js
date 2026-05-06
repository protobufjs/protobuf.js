"use strict";

var fs = require("fs"),
    generated = require("./generated/messages.js"),
    conformance = generated.conformance,
    list = process.argv.indexOf("--list") >= 0,
    testTypes = Object.create(null);

var TEST_TYPES = [
    {
        name: "protobuf_test_messages.proto2.TestAllTypesProto2",
        type: generated.protobuf_test_messages.proto2.TestAllTypesProto2
    },
    {
        name: "protobuf_test_messages.proto3.TestAllTypesProto3",
        type: generated.protobuf_test_messages.proto3.TestAllTypesProto3
    },
    {
        name: "protobuf_test_messages.editions.proto2.TestAllTypesProto2",
        type: generated.protobuf_test_messages.editions.proto2.TestAllTypesProto2
    },
    {
        name: "protobuf_test_messages.editions.proto3.TestAllTypesProto3",
        type: generated.protobuf_test_messages.editions.proto3.TestAllTypesProto3
    },
    {
        name: "protobuf_test_messages.editions.TestAllTypesEdition2023",
        type: generated.protobuf_test_messages.editions.TestAllTypesEdition2023
    }
];

// Register the local stable-edition copy of UNSTABLE if included by generate.js.
if (generated.protobuf_test_messages.edition_unstable) {
    TEST_TYPES.push({
        name: "protobuf_test_messages.edition_unstable.TestAllTypesEditionUnstable",
        type: generated.protobuf_test_messages.edition_unstable.TestAllTypesEditionUnstable
    });
}

TEST_TYPES.forEach(function(testType) {
    if (!testType.type)
        throw Error("missing generated test type: " + testType.name);
    testTypes[testType.name] = testType.type;
});

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
                            message = type.fromObject(JSON.parse(request.jsonPayload));
                            break;
                        case "jspbPayload":
                            response = { parseError: "JSPB not supported" };
                            break;
                        case "textPayload":
                            response = { parseError: "TextFormat not supported" };
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
                                response = {
                                    jsonPayload: JSON.stringify(type.toObject(message, {
                                        json: true,
                                        bytes: String,
                                        longs: String,
                                        enums: String
                                    }))
                                };
                                break;
                            case conformance.WireFormat.JSPB:
                                response = { skipped: "JSPB not supported" };
                                break;
                            case conformance.WireFormat.TEXT_FORMAT:
                                response = { skipped: "text format not supported" };
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
