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
  // in body all fields must be present
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // check if email is already in db -> in that case, registration can't be done
  const userPresent = await User.findOne({ email });
  if (userPresent) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // raw password is crypted -> hashed password is saved in db
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await User.create({ username, email, password: hashedPassword });

  // if user is created correctly, it's sent back an object with the data from the db -> NB: not the password, just some info to confirm registration/saving in db
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
  // in body all fields must be present
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // check if user is present in db
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // if user is in db, we compare password in body with hashedPassword in db too
    const accessToken = jwt.sign(
      {
        // user is the payload
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        // expiresIn is the expiring time
        expiresIn: "1m",
      }
    );
    console.log(accessToken)
    res.status(200).json({ accessToken });
  } else {
    // if email in body is not in db or if email is present but there is no match with the password in the body and the related password in the db...
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
  // NB: access private -> validation required -> if validation works, we have access to req.user (validateTokenHandler middleware returns it!)
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
