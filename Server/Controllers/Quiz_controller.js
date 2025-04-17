const mongoose = require("mongoose");
const Quiz = require("../Models/Quiz_Model");

const saveQuiz = async (req, res) => {
  try {
    console.log("📥 Incoming Request Body:", req.body);

    const {
      quizName,
      topic,
      difficulty,
      score,
      totalQuestions,
      percentage,
      userId,
    } = req.body;

    // Check for missing fields
    if (!quizName || !topic || !difficulty || !userId) {
      console.error("❌ Missing required fields detected!");
      return res.status(400).json({
        error: "Missing required fields",
        details: "quizName, topic, difficulty, and userId are required",
      });
    }

    // Validate userId format
    if (typeof userId !== "string" || userId.length !== 24) {
      console.error("❌ Invalid userId format:", userId);
      return res.status(400).json({
        error: "Invalid user ID format",
        details: "User ID must be a 24-character string",
      });
    }

    // Create new quiz document
    const newQuiz = new Quiz({
      quizName: quizName.trim(),
      topic: topic.trim(),
      difficulty: difficulty.trim().toLowerCase(),
      score: Number(score),
      totalQuestions: Number(totalQuestions),
      percentage: Number(percentage),
      userId: userId.trim(),
      timestamp: new Date(),
    });

    // Save to database
    await newQuiz.save();

    console.log("✅ Quiz saved successfully:", newQuiz);

    return res.status(201).json({
      message: "Quiz saved successfully!",
      success: true,
      quiz: newQuiz,
    });
  } catch (error) {
    console.error("❌ Error in saveQuiz:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation failed",
        details: error.message,
        success: false,
      });
    }

    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
      success: false,
    });
  }
};

const getUserQuizzes = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: "Missing user ID",
        success: false,
      });
    }

    const quizzes = await Quiz.find({ userId })
      .sort({ timestamp: -1 }) // Sort by most recent first
      .lean(); // Convert to plain JavaScript objects

    return res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    console.error("❌ Error fetching user quizzes:", error);
    return res.status(500).json({
      error: "Failed to fetch user quizzes",
      details: error.message,
      success: false,
    });
  }
};

module.exports = { saveQuiz, getUserQuizzes };
