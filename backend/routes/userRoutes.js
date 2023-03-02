const express = require("express");
const {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require("../controller/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// REGISTER USER
router.route("/register").post(registerUser);

// post email & password auth // Login Route
router.route("/login").post(authController);

// GET USER PROFILE PRIVATE ROUTE
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
