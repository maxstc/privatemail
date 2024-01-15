const express = require("express");
const app = express();
const db = require("../fakedb.json");
const fs = require("fs");

app.use(express.json());

const authRouter = require("./routers/auth.js");
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("xd");
});

app.listen(3000, () => console.log("Web server runnning on port 3000"));