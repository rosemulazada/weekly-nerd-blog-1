// Core modules
const path = require("path");

// NPM modules
const express = require("express");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 8000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "ejs");
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/**========================================================================
 *                           CODE START
 *========================================================================**/

/**============================================
 *                   ROUTING
 *=============================================**/

app.get("", (req, res) => {
    res.render("index");
});

/**======================
 *          404
 *=======================**/
// TODO: 404: How to make useful?

app.get("/findings/*", (req, res) => {
    res.send(`The posts you're looking for could not be found.`);
});

app.get("/articles/*", (req, res) => {
    res.send(`The articles you're looking for could not be found.`);
});

app.get("/weeklynerd/*", (req, res) => {
    res.send(`The weekly nerd you're looking for could not be found.`);
});

app.get("*", (req, res) => {
    res.send(`The page you're looking for could not be found.`);
});

// TODO: localStorage

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

module.exports = app;
