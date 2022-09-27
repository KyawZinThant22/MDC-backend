const User = require("../model/User");
const jwt = require("jsonwebtoken");

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
  return jwt.sign({ id }, "WDC", { expiresIn: maxAge });
};

//controller actions

exports.Signup = async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    const user = await User.signup(email, password, userName);

    //create a token
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    // const error = handleUserError(err);
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
