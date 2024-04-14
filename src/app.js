// Core modules
const path = require("path");
const fs = require("fs");

// NPM modules
const express = require("express");
const ejs = require("ejs");
const marked = require("marked");

const app = express();
const port = process.env.PORT || 8000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const weeklyNerdPostsPath = path.join(__dirname, "../public/posts/weeklynerds");

// Setup EJS engine and views location
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

app.get("/weeklynerd", (req, res) => {
    res.render("weeklynerd");
});

app.get("/weeklynerd/:post", (req, res) => {
    let post = req.params.post;

    // Remove the ".md" extension if present
    if (post.endsWith(".md")) {
        post = post.slice(0, -3);
    }

    const markdownFilePath = path.join(weeklyNerdPostsPath, `${post}.md`);

    fs.readFile(markdownFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }
        const html = marked.parse(data);
        res.render("posts", { html });
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});
/**======================
 *          404
 *=======================**/
// TODO: 404: How to make useful?

app.get("/posts/*", (req, res) => {
    res.status(404).send(`The posts you're looking for could not be found.`);
});

app.get("/about/*", (req, res) => {
    res.status(404).send(`The articles you're looking for could not be found.`);
});

app.get("/weeklynerd/*", (req, res) => {
    res.status(404).send(
        `The weekly nerd you're looking for could not be found.`
    );
});

app.get("*", (req, res) => {
    res.status(404).send(`The page you're looking for could not be found.`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

module.exports = app;
