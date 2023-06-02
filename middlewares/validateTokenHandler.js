const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler((req, res, next) => {
    let token;
    // token in Headers: Authorization key assigned to "Bearer <accessToken>"" || token in Auth > Bearer: Bearer Token assigned to "<accessToken>" created in login
    // authHeader takes the access token from the existing one
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        // token is just the accessToken, without "Bearer "
        token = authHeader.split(" ")[1];
        // token verification
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // token not valid (not correct or expired) or valid for another user
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            // token verified (the user information is embedded in the decoded object of line 13) -> user info extracted and attached to the req.user property
            req.user = decoded.user;
            next();
        })

        // token not provided or user not authorized
        if (!token) {
            res.status(401);
            throw new Error("User not authorized or token missing");
        }
    }
})

module.exports = validateToken;