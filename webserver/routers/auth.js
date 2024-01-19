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
        if (result === ADD_USER_ADDRESS_TAKEN) {
            res.json(false);
        }
        else if (result === ADD_USER_SUCCESS) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    }
});

router.post("/signin", (req, res) => {
    let result = authUser(req.body.address, req.body.password);
    res.json(result);
});

function authUser(address, password) {
    return db[address] == password;
}

function addUser(address, password) {
    if (db[address] === undefined) {
        db[address] = password;
        saveDB();
        return true;
    }
    else {
        return false;
    }
}

function saveDB() {
    let json = JSON.stringify(db);
    console.log(json);
    fs.writeFileSync("./fakedb.json", json);
}

module.exports = router;