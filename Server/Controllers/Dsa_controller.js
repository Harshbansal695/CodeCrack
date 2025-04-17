const { DSAProgressModel } = require("../Models/Dsa_Model");

// Get DSA progress
const getDSAProgress = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
        errors: { email: "Please provide a valid email address" },
      });
    }

    // Find progress for the specific user
    let progress = await DSAProgressModel.findOne({ email }).lean();

    if (!progress) {
      // Create a default progress document for new users
      progress = await DSAProgressModel.create({
        email,
        totalQuestions: 0,
        easy: { total: 0, solved: 0 },
        medium: { total: 0, solved: 0 },
        hard: { total: 0, solved: 0 },
        markedQuestions: [],
      });
    }

    return res.status(200).json({
      message: "DSA progress retrieved successfully",
      success: true,
      progress: {
        email: progress.email,
        totalQuestions: progress.totalQuestions || 0,
        easy: {
          total: progress.easy?.total || 0,
          solved: progress.easy?.solved || 0,
        },
        medium: {
          total: progress.medium?.total || 0,
          solved: progress.medium?.solved || 0,
        },
        hard: {
          total: progress.hard?.total || 0,
          solved: progress.hard?.solved || 0,
        },
        markedQuestions: progress.markedQuestions || [],
        lastUpdated: progress.lastUpdated || progress.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error getting DSA progress:", error);
    return res.status(500).json({
      message: "Failed to get DSA progress",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update DSA progress
const updateDSAProgress = async (req, res) => {
  try {
    const { email, questionId, difficulty, isCompleted } = req.body;

    // Validate input
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!questionId) errors.questionId = "Question ID is required";
    if (!difficulty) errors.difficulty = "Difficulty is required";
    if (typeof isCompleted !== "boolean")
      errors.isCompleted = "Completion status must be a boolean";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        errors,
      });
    }

    // Validate difficulty level
    const difficultyLower = String(difficulty).toLowerCase();
    if (!["easy", "medium", "hard"].includes(difficultyLower)) {
      return res.status(400).json({
        message: "Invalid difficulty level",
        success: false,
        errors: { difficulty: "Difficulty must be easy, medium, or hard" },
      });
    }

    // Find or create progress document for the specific user
    let progress = await DSAProgressModel.findOne({ email });
    if (!progress) {
      progress = new DSAProgressModel({
        email,
        totalQuestions: 0,
        easy: { total: 0, solved: 0 },
        medium: { total: 0, solved: 0 },
        hard: { total: 0, solved: 0 },
        markedQuestions: [],
      });
    }

    // Check if question is already marked
    const isAlreadyMarked = progress.markedQuestions.includes(questionId);

    // Update counts based on action
    if (isCompleted && !isAlreadyMarked) {
      // Add question
      progress.totalQuestions += 1;
      progress[difficultyLower].total += 1;
      progress[difficultyLower].solved += 1;
      progress.markedQuestions.push(questionId);
    } else if (!isCompleted && isAlreadyMarked) {
      // Remove question
      progress.totalQuestions = Math.max(0, progress.totalQuestions - 1);
      progress[difficultyLower].total = Math.max(
        0,
        progress[difficultyLower].total - 1
      );
      progress[difficultyLower].solved = Math.max(
        0,
        progress[difficultyLower].solved - 1
      );
      progress.markedQuestions = progress.markedQuestions.filter(
        (id) => id !== questionId
      );
    }

    // Update lastUpdated timestamp
    progress.lastUpdated = new Date();

    // Save changes
    await progress.save();

    return res.status(200).json({
      message: "Progress updated successfully",
      success: true,
      progress: {
        email: progress.email,
        totalQuestions: progress.totalQuestions,
        easy: progress.easy,
        medium: progress.medium,
        hard: progress.hard,
        markedQuestions: progress.markedQuestions,
        lastUpdated: progress.lastUpdated,
      },
    });
  } catch (error) {
    console.error("Error updating DSA progress:", error);
    return res.status(500).json({
      message: "Failed to update DSA progress",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getDSAProgress,
  updateDSAProgress,
};
