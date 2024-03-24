const path = require("path");
const express = require("express");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.send("Hello, world!");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});
