const stream = require("stream");
const db = require("./fakedb.json");

const fs = require("fs");
const https = require("https");
const privateKey  = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.crt", "utf8");
const credentials = {key: privateKey, cert: certificate};

const simpleParser = require("mailparser").simpleParser;

const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    authOptional: true,
    key: privateKey,
    cert: certificate,
    onData(stream, session, callback) {
        simpleParser(stream)
        .then(parsed => {handleMail(parsed)})
        .catch(err => {
            console.log("failed to parse mail"); 
            console.log(err);
        });
        // let ws = new stream;
        // ws.writeable = true;
        // ws.output = "";
        // ws.write = (chunk) => {
        //     ws.output += chunk.toString();
        // };
        // ws.end = () => {
        //     handleMail(ws.output);
        //     console.log(ws.output);
        // }
        // str.pipe(ws);
        stream.on("end", callback);
    }
});
server.listen(3001);
console.log("SMTP Mail server running on port 3001");

function handleMail(text) {
    // console.log(text.to.text);
    let parsedToLocalPart = text.to.value[0].address.substring(0, text.to.value[0].address.indexOf("@"));
    // console.log(text.subject);
    // console.log(text.from.text);
    // console.log(text.date);
    // console.log(text.text);
    text.parsedToLocalPart = parsedToLocalPart;
    console.log(text.parsedToLocalPart);
    if (db["alias"][parsedToLocalPart] === undefined) {
        console.log("Mail bounced!");
        console.log(text);
    }
    else {
        db["mail"][db["alias"][parsedToLocalPart]].push(text);
    }
}

// function parseMail(text) {
//     let output = {};
//     output.text = "";
//     let split = text.split(/\r?\n/);
//     let isText = false;
//     for (let i = 0; i < split.length; i++) {
//         if (isText) {
//             if (split[i].substring(split[i].length, split[i].length + 1) == "=") {
//                 split[i] = split[i].substring(0, split[i].length);
//             }
//             output.text += split[i] + "\n";
//         }
//         else if (split[i].trim() === "") {
//             isText = true;
//         }
//         else {
//             let colonIndex = split[i].indexOf(":");
//             output[split[i].substring(0, colonIndex).toLowerCase()] = split[i].substring(colonIndex + 1).trim();
//         }
//     }
//     output.text = output.text.substring(0, output.text.length - 1);
//     output.parsedTo = output.to.substring(0, output.to.indexOf("@"));
//     if (output.parsedTo.includes("<")) {
//         output.parsedTo = output.parsedTo.substring(output.parsedTo.indexOf("<") + 1, output.parsedTo.length);
//     }
    
//     output.text = output.text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
//     return output;
// }

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("../client"));

const authRouter = require("./routers/auth.js");
app.use("/auth", authRouter);

const mailRouter = require("./routers/mail.js");
app.use("/mail", mailRouter);

const aliasRouter = require("./routers/alias.js");
app.use("/alias", aliasRouter);

app.get("/", (req, res) => {
    res.redirect("index.html");
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);
console.log("HTTPS server running on port 3000")

// // do something when app is closing
// process.on('exit', () => {doExit()});

// // catches ctrl+c event
// process.on('SIGINT', () => {doExit()});

// // catches "kill pid" (for example: nodemon restart)
// process.on('SIGUSR1', () => {doExit()});
// process.on('SIGUSR2', () => {doExit()});

// // catches uncaught exceptions
// process.on('uncaughtException', () => {doExit()});