// Get the "ws" module: npm install ws
var ws = require("ws"),
    server = new ws.Server({ port: 8080 });

// Initialize ProtoBuf.js
var ProtoBuf = require("../../ProtoBuf.js"),
    Message = ProtoBuf.protoFromFile("example.proto").build("Message");

server.on("listening", function() {
    console.log("Server started");
});

server.on("error", function(err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});

server.on("connection", function(socket) {
    console.log("New connection");
    socket.on("close", function() {
        console.log("Disconnected");
    });
    socket.on("message", function(data, flags) {
        if (flags.binary) {
            try {
                // Decode the Message
                var msg = Message.decode(data);
                console.log("Processing: "+msg.text);
                // Transform the text to upper case
                msg.text = msg.text.toUpperCase();
                // Re-encode it and send it back
                socket.send(msg.toBuffer());
            } catch (err) {
                console.log("Processing failed:", err);
            }
        } else {
            console.log("Not binary data");
        }
    });
});
