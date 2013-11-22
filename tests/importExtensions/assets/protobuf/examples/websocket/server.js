// Set up: npm install
var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    ws = require("ws"),
    open = require("open"),
    ProtoBuf = require("protobufjs");

// Initialize from .proto file
var Message = ProtoBuf.protoFromFile("example.proto").build("Message");

// HTTP server
var server = http.createServer(function(req, res) {
        var file = null;
        if (req.url == "/") {
            file = "index.html";
        } else if (req.url == "/example.proto") {
            file = "example.proto";
        }
        if (file) {
            fs.readFile(path.join(__dirname, file), function(err, data) {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.end("Internal Server Error: "+err);
                } else {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data);
                    res.end();
                }
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("Not Found");
        }
    });
server.listen(8080);
server.on("listening", function() {
    console.log("Server started");
    open("http://localhost:8080/");
});
server.on("error", function(err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});
    
// WebSocket adapter
var wss = new ws.Server({server: server});
wss.on("connection", function(socket) {
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
