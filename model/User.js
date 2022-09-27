const mongoose = require("mongoose");
const { isEmail } = require("validator");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter a email"],
    unqiue: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a email"],
    minlength: [6, "A password must have atleast 6 characters"],
  },
  userName: {
    type: String,
    required: [true, "Please Enter a user Name"],
    unqiue: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password, userName) {
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, userName, password: hash });

  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
