const express = require("express");
const router = express.Router();
const {
  getDSAProgress,
  updateDSAProgress,
} = require("../Controllers/Dsa_controller");
const { DSAProgressModel } = require("../Models/Dsa_Model");

// Get user's DSA progress by email
router.get("/gprogress", (req, res) => {
  getDSAProgress(req, res);
});

// Update user's DSA progress
router.post("/progress", (req, res) => {
  updateDSAProgress(req, res);
});

module.exports = router;
