const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    // console.log(`HTTP ${req.httpVersion} ${req.method} ${req.url}`);

    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(__dirname + "/index.html"));
    } else if (req.method === "POST" && req.url === "/changed") {
      req.on("data", (data) => {
        console.log(decodeURIComponent(data));
      });
    }
  })
  .listen(8080);

console.log("Server listening on PORT 8080");
