const Post = require("../model/Post");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const { findById } = require("../model/Post");

// @desc    Create post
// @route   POST /post/create
// @access  Private
exports.createPost = asyncHandler(async (req, res) => {
  try {
    const postData = await Post.create({
      post: req.body.post,
      like: req.body.like,
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

// @desc    Updatepost
// @route   POST /post/:id
// @access  Private
exports.UpdatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log(post);
  try {
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not Found");
    }

    // Make sure the logged in user matches the goal user
    if (post.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatePost = await Post.findByIdAndUpdate(post, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: updatePost,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

// @desc    Delete post
// @route   POST /post/:id
// @access  Private
exports.DeletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not Found");
    }

    // Make sure the logged in user matches the goal user
    if (post.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await Post.findByIdAndDelete(post);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

// @desc    Get post
// @route   POST /post/;Id
// @access  Private
exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log(req.user);
  try {
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not Found");
    }

    // Make sure the logged in user matches the goal user
    if (post.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const getPost = await Post.findById(post);

    res.status(200).json({
      status: "success",
      data: getPost,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});
