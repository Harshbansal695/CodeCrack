const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
    enum: ["easy", "medium", "hard"],
  },
  score: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  totalQuestions: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  percentage: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return v.length === 24; // MongoDB ObjectId length
      },
      message: (props) => `${props.value} is not a valid user ID!`,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
