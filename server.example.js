const http = require("http");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { addNote } = require("./notes.controller");

const port = 3000;
const basePath = path.join(__dirname, "pages");
const server = http.createServer(async (req, res) => {
  // console.log("Server!");
  // //console.log("Request object", req); // который прилетает от клиента
  // console.log("Request method", req.method);
  // console.log("Request url", req.url);

  // res.end("Hello from server!!");
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    //res.setHeader("Content-Type", "text/html");
    //res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(content);
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8",
    });

    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });

    req.on("end", () => {
      //console.log("end", body.toString().split("=")[1].replaceAll("+", " ")); //end sdsd
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);
      res.end(`Title = ${title}`);
    });
  }
});

server.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
