const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler((req, res, next) => {
    let token;
    // token in the Headers: Authorization key assigned to Bearer <token> | token in the Auth, with Bearer equal to <token>
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        })

        if (!token) {
            res.status(401);
            throw new Error("User not authorized or token missing");
        }
    }
})

module.exports = validateToken;