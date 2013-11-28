// Set up: npm install
var http = require("http"), https = require("https"),
    fs = require("fs"),
    path = require("path"),
    url = require("url"),
    ws = require("ws"),
    open = require("open"),
    // ProtoBuf = require("protobufjs"),
    ProtoBuf = require(path.join(__dirname, "..", "..", "ProtoBuf.js"));

// Copy dependencies to "www/"
var deps = [
    ["Long.min.js", "./node_modules/protobufjs/node_modules/bytebuffer/node_modules/long/Long.min.js"],
    ["ByteBuffer.min.js", "./node_modules/protobufjs/node_modules/bytebuffer/ByteBuffer.min.js"],
    ["ProtoBuf.min.js", "./node_modules/protobufjs/ProtoBuf.min.js"]
];
for (var i=0, dep, data; i<deps.length; i++) {
    dep = deps[i];
    console.log("Copying "+dep[0]+" from "+dep[1]);
    fs.writeFileSync(path.join(__dirname, "www", dep[0]), fs.readFileSync(path.join(__dirname, dep[1])));
}

// Initialize from .proto file
var builder = ProtoBuf.protoFromFile(path.join(__dirname, "www", "example.proto")),
    Message = builder.build("Message");

// HTTP server
var server = http.createServer(function(req, res) {
        var file = null,
            type = "text/html";
        if (req.url == "/") {
            file = "index.html";
        } else if (/^\/(\w+(?:\.min)?\.(?:js|html|proto))$/.test(req.url)) {
            file = req.url.substring(1);
            if (/\.js$/.test(file)) {
                type = "text/javascript";
            }
        }
        if (file) {
            fs.readFile(path.join(__dirname, "www", file), function(err, data) {
                if (err) {
                    res.writeHead(500, {"Content-Type": type});
                    res.end("Internal Server Error: "+err);
                } else {
                    res.writeHead(200, {"Content-Type": type});
                    res.write(data);
                    res.end();
                    console.log("Served www/"+file);
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
});
server.on("error", function(err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});
    
// WebSocket adapter
var wss = new ws.Server({server: server});
wss.on("connection", function(socket) {
    console.log("New WebSocket connection");
    socket.on("close", function() {
        console.log("WebSocket disconnected");
    });
    socket.on("message", function(data, flags) {
        if (flags.binary) {
            try {
                // Decode the Message
                var msg = Message.decode(data);
                console.log("Received: "+msg.text);
                // Transform the text to upper case
                msg.text = msg.text.toUpperCase();
                // Re-encode it and send it back
                socket.send(msg.toBuffer());
                console.log("Sent: "+msg.text);
            } catch (err) {
                console.log("Processing failed:", err);
            }
        } else {
            console.log("Not binary data");
        }
    });
});
