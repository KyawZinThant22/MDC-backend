const User = require("../model/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const handleUserError = (err) => {
  let errors = { email: "", password: "", userName: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  //valition errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
  e;
};
//create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

//controller actions
// @desc Register new user
// @route POST /user/signup
// @access Public

exports.Signup = async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    const user = await User.signup(email, password, userName);

    //create a token
    res.status(201).json({
      status: "success",
      token: createToken(user._id),
      id: user._id,
    });
  } catch (err) {
    // const error = handleUserError(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// @desc Get User Data
// @route POST /user/me
// @access Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user emailclg
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      name: user.userName,
      email: user.email,
      token: createToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get User Data
// @route POST /user/me
// @access Private

exports.getMe = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const { _id, userName, email } = await User.findById(req.user._id);
  res.status(200).json({
    id: _id,
    userName,
    email,
  });
});
