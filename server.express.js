const chalk = require("chalk");
const path = require("path");
const { addNote } = require("./notes.controller");
const express = require("express");

const port = 3000;
const basePath = path.join(__dirname, "pages");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html")); // html имя файла обязательно
});
app.post("/", async (req, res) => {
  //console.log(req.body);
  await addNote(req.body.title);
  res.sendFile(path.join(basePath, "index.html"));
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
