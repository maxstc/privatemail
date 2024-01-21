const express = require("express");
const router = express.Router();
const db = require("../fakedb.json");
const fs = require("fs");
const auth = require("./auth.js");

router.post("/add", (req, res) => {
    if (authUser(req.body.address, req.body.password)) {
        let done = false;
        while (!done) {
            let address = generateAddress();
            if (db["alias"][address] === undefined) {
                done = true;
                db["alias"][address] = req.body.address();
            }
        }
    }
    else {
        res.json(false);
    }
});

const randomAddressLength = 32;
const randomAddressValidCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateAddress() {
    let output = "";
    for (let i = 0; i < randomAddressLength; i++) {
        let random = Math.floor(Math.random() * randomAddressValidCharacters.length);
        output += randomAddressValidCharacters[random];
    }
    return output;
}

module.exports = router;