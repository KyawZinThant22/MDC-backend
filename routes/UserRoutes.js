const express = require("express");

const { Signup } = require("../controller/UserController");

const router = express.Router();

router.post("/signup", Signup);

module.exports = router;
