const express = require("express");

const { Signup, login, getMe } = require("../controller/UserController");
const { protect } = require("../middleware/requireAuth");

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
