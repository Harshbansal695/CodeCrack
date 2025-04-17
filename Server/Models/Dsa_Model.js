const mongoose = require("mongoose");

const DSAProgressSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    totalQuestions: {
      type: Number,
      default: 0,
      min: 0,
    },
    easy: {
      total: {
        type: Number,
        default: 0,
        min: 0,
      },
      // You can add more fields like solved, unsolved, etc.
      solved: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    medium: {
      total: {
        type: Number,
        default: 0,
        min: 0,
      },
      solved: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    hard: {
      total: {
        type: Number,
        default: 0,
        min: 0,
      },
      solved: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    markedQuestions: [
      {
        type: String, // Storing question IDs as strings
        required: true,
      },
    ],
    // Additional tracking fields
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create the model
const DSAProgressModel = mongoose.model("DSAProgress", DSAProgressSchema);

// Export the model
module.exports = { DSAProgressModel };
