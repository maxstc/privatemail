const express = require("express");
const router = express.Router();

const ADD_USER_ADDRESS_TAKEN = 0;
const ADD_USER_SUCCESS = 1;
const AUTH_SUCCESS = 2;
const AUTH_FAILURE = 3;

router.post("/signup", (req, res) => {
    let result = addUser(req.body.address, req.body.password);
    if (result === ADD_USER_ADDRESS_TAKEN) {
        res.json(false);
    }
    else if (result === ADD_USER_SUCCESS) {
        res.json(true);
    }
    else {
        res.json(false);
    }
});

router.post("/signin", (req, res) => {
    let result = authUser(req.body.address, req.body.password);
    if (result === AUTH_SUCCESS) {
        res.json(true);
    }
    else if (result === AUTH_FAILURE) {
        res.json(false);
    }
    else {
        res.json(false);
    }
});

function authUser(address, password) {
    if (db[address] == password) {
        return AUTH_SUCCESS;
    }
    else {
        return AUTH_FAILURE;
    }
}

function addUser(address, password) {
    if (db[address] == undefined) {
        db[address] = password;
        saveDB();
        return ADD_USER_SUCCESS;
    }
    else {
        return ADD_USER_ADDRESS_TAKEN;
    }
}

function saveDB() {
    let json = JSON.stringify(db);
    fs.write("../fakedb.json", json, "utf8");
}

module.exports = router;