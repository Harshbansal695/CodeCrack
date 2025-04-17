const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getUserByEmail,
  updateProfile,
} = require("../Controllers/User_contoller");

// User routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Get user by email route
router.get("/by-email", async (req, res) => {
  await getUserByEmail(req, res);
});

// Update user profile route
router.put("/update-profile", async (req, res) => {
  await updateProfile(req, res);
});

module.exports = router;
