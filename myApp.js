require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
console.log("Hello World");
absolutePath = __dirname + "/views/index.html";
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
    var msg = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") msg = msg.toUpperCase();
    res.json({ "message": msg });
});
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ "time": req.time });
});
app.get("/:word/echo", (req, res) => {
    res.json({ "echo": req.params.word });
});
app.get("/name", (req, res) => {
    res.json({ "name": `${req.query.first} ${req.query.last}` });
});
app.post("/name", (req, res) => {
    res.json({ "name": `${req.body.first} ${req.body.last}` });
});

























module.exports = app;
