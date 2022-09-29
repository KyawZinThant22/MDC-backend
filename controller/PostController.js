const Post = require("../model/Post");
const asyncHandler = require("express-async-handler");

// @desc    Create post
// @route   POST /post/create
// @access  Private
exports.createPost = asyncHandler(async (req, res) => {
  try {
    const postData = await Post.create({
      post: req.body.post,
      like: req.bodylike,
      comments: req.body.comments,
      user: req.user.id,
    });
    res.status(201).json({
      status: "success",
      postData,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// @desc    Create post
// @route   POST /post/
// @access  Private

exports.getAllPost = asyncHandler(async (req, res) => {
  console.log(req.user);
  try {
    const post = await Post.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      results: post.length,
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});
