const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decode.id);
      next();
    } catch (error) {
      console.error(error);
      throw new Error("Not Authorized, Token Failed");
    }
  }
  if (!token) {
    throw new Error("Not Authorized, not token");
  }
});

module.exports = { protect };
