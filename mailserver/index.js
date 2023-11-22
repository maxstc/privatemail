const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        console.log(stream);
        stream.pipe(process.stdout);
        stream.on("end", callback);
    }
});
server.listen(41399);