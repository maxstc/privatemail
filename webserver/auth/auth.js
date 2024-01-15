const express = require("express");
const router = express.Router();

const ADD_USER_ADDRESS_TAKEN = 0;
const ADD_USER_SUCCESS = 1;
const AUTH_SUCCESS = 2;

router.get("/", (req, res) => {
    res.send("asdf");
});

function authUser(address, password) {
    if (db[address] == password) {
        return AUTH_SUCCESS;
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