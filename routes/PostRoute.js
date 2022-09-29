const express = require("express");
const { createPost, getAllPost } = require("../controller/PostController");
const { protect } = require("../middleware/requireAuth");

const router = express.Router();

router.post("/create", protect, createPost);
router.get("/", protect, getAllPost);

module.exports = router;
