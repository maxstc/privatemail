const express = require("express");
const router = express.Router();
const db = require("../fakedb.json");
const fs = require("fs");

router.post("/signup", (req, res) => {
    //IMPORTANT: this doesnt check that the given address is valid and it may not work
    if (req.body.address.length < 1 || req.body.password.length < 1 || req.body.address == undefined || req.body.password == undefined) {
        res.json(false);
    }
    else {
        let result = addUser(req.body.address, req.body.password);
        res.json(result);
    }
});

router.post("/signin", (req, res) => {
    let result = authUser(req.body.address, req.body.password);
    res.json(result);
});

function authUser(address, password) {
    return db["auth"][address] == password;
}

function addUser(address, password) {
    if (db["auth"][address] === undefined) {
        db["auth"][address] = password;
        db["alias"][address] = address;
        db["mail"][address] = [];
        return true;
    }
    else {
        return false;
    }
}

module.exports = router;