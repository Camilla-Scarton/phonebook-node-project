// to wrap async functions and handle the try/catch automatically
const asyncHandler = require("express-async-handler");

/**
 * @description Register a user
 * @route POST /api/users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register user" })
})

/**
 * @description Login a user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login user" })
})

/**
 * @description Current user information
 * @route GET /api/users/current
 * @access private
 */
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user information" })
})

module.exports = { registerUser, loginUser, currentUser };