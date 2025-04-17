const express = require("express");
const router = express.Router();
const { saveQuiz, getUserQuizzes } = require("../Controllers/Quiz_controller");

// Save quiz results
router.post("/save", saveQuiz);

// Get user's quizzes
router.get("/user/:userId", getUserQuizzes);

module.exports = router;
