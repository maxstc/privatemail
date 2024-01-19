const express = require("express");
const app = express();
const db = require("./fakedb.json");
const fs = require("fs");

app.use(express.json());
app.use(express.static("../client"));

const authRouter = require("./routers/auth.js");
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.redirect("index.html");
});

app.listen(3000, () => console.log("Web server runnning on port 3000"));