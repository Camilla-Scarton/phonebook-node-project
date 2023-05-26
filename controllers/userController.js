// to wrap async functions and handle the try/catch automatically
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * @description Register a user
 * @route POST /api/users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userPresent = await User.findOne({ email });
  if (userPresent) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }

  res.json({ message: "Register user" });
});

/**
 * @description Login a user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    console.log(accessToken)
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error({ message: "Email or password not valid" });
  }
});

/**
 * @description Current user information
 * @route GET /api/users/current
 * @access private
 */
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
