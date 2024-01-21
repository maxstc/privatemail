const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        console.log(stream);
        stream.pipe(process.stdout);
        stream.on("end", callback);
    }
});
server.listen(3001);
console.log("SMTP Mail server running on port 3002");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("../client"));

const authRouter = require("./routers/auth.js");
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.redirect("index.html");
});

app.listen(3000, () => console.log("Web server runnning on port 3000"));