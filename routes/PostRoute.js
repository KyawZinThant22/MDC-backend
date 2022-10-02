const express = require("express");
const {
  createPost,
  getAllPost,
  UpdatePost,
  DeletePost,
  getPost,
} = require("../controller/PostController");
const { protect } = require("../middleware/requireAuth");

const router = express.Router();

router.post("/create", protect, createPost);

router.get("/", protect, getAllPost);
router
  .route("/:id")
  .patch(protect, UpdatePost)
  .delete(protect, DeletePost)
  .get(protect, getPost);

module.exports = router;
