const stream = require("stream");
const db = require("./fakedb.json");

const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    authOptional: true,
    onData(str, session, callback) {
        let ws = new stream;
        ws.writeable = true;
        ws.output = "";
        ws.write = (chunk) => {
            ws.output += chunk.toString();
        };
        ws.end = () => {
            handleMail(ws.output);
        }
        str.pipe(ws);
        str.on("end", callback);
    }
});
server.listen(3001);
console.log("SMTP Mail server running on port 3001");

function handleMail(text) {
    let parsedMail = parseMail(text);
    if (db["alias"][parsedMail.parsedTo] === undefined) {
        console.log("Mail bounced!");
        console.log(parsedMail);
    }
    else {
        db["mail"][db["alias"][parsedMail.parsedTo]].push(parsedMail);
        console.log(db);
    }
    //subject, from, to, and text
}

function parseMail(text) {
    let output = {};
    output.text = "";
    let split = text.split(/\r?\n/);
    let isText = false;
    for (let i = 0; i < split.length; i++) {
        if (isText) {
            output.text += split[i] + "\n";
        }
        else if (split[i].trim() === "") {
            isText = true;
        }
        else {
            let colonIndex = split[i].indexOf(":");
            output[split[i].substring(0, colonIndex).toLowerCase()] = split[i].substring(colonIndex + 1).trim();
        }
    }
    output.text = output.text.substring(0, output.text.length - 1);
    output.parsedTo = output.to.substring(0, output.to.indexOf("@"));
    return output;
}

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("../client"));

const authRouter = require("./routers/auth.js");
app.use("/auth", authRouter);

const mailRouter = require("./routers/mail.js");
app.use("/mail", mailRouter);

app.get("/", (req, res) => {
    res.redirect("index.html");
});

app.listen(3000, () => console.log("Web server runnning on port 3000"));

function doExit() {
    console.log(db);
    process.exit();
}

// // do something when app is closing
// process.on('exit', () => {doExit()});

// // catches ctrl+c event
// process.on('SIGINT', () => {doExit()});

// // catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', () => {doExit()});
// process.on('SIGUSR2', () => {doExit()});

// // catches uncaught exceptions
// process.on('uncaughtException', () => {doExit()});