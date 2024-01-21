const express = require("express");
const router = express.Router();
const db = require("../fakedb.json");
const fs = require("fs");
const auth = require("./auth.js");

router.post("/inbox", (req, res) => {
    if (authUser(req.body.address, req.body.password)) {
        res.json(db["mail"][req.body.address]);
    }
    else {
        res.json(false);
    }
});

module.exports = router;