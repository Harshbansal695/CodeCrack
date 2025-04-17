import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logicalquiz = () => {
  const { subtopic } = useParams();
  const navigate = useNavigate();

  // Question Bank with more questions
  const questionBank = {
    puzzles: [
      {
        id: 1,
        question:
          "A farmer has 17 sheep, all but 9 run away. How many are left?",
        options: ["8", "9", "17", "0"],
        correctAnswer: 1,
        explanation: "All but 9 means 9 are left.",
        difficulty: "easy",
      },
      {
        id: 2,
        question: "Which number should come next? 2, 6, 12, 20, 30, __?",
        options: ["38", "40", "42", "48"],
        correctAnswer: 1,
        explanation: "Pattern is n² + n → (5² + 5) = 40",
        difficulty: "medium",
      },
      {
        id: 3,
        question:
          "If you have it, you want to share it. If you share it, you don't have it. What is it?",
        options: ["Money", "Secret", "Time", "Happiness"],
        correctAnswer: 1,
        explanation: "Once you share a secret, it's no longer just yours.",
        difficulty: "hard",
      },
    ],
    syllogism: [
      {
        id: 1,
        question: "All cats are dogs. Some dogs are mice. Conclusion: ?",
        options: [
          "All cats are mice",
          "Some cats are mice",
          "No conclusion",
          "All mice are cats",
        ],
        correctAnswer: 2,
        explanation: "The conclusion cannot be derived.",
        difficulty: "medium",
      },
    ],
    coding_decoding: [
      {
        id: 1,
        question:
          "If in a code, 'APPLE' is written as 'ELPPA', how will 'BANANA' be written?",
        options: ["ANANAB", "NANAAB", "AANNAB", "ABNANA"],
        correctAnswer: 0,
        explanation: "The word is reversed, so BANANA → ANANAB.",
        difficulty: "easy",
      },
    ],
    blood_relations: [
      {
        id: 1,
        question:
          "If A is the father of B, but B is not the son of A, what is B?",
        options: ["Daughter", "Father", "Brother", "Mother"],
        correctAnswer: 0,
        explanation: "If B is not the son, B must be the daughter.",
        difficulty: "easy",
      },
    ],
  };

  const questions = questionBank[subtopic] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500/20 text-emerald-400";
      case "medium":
        return "bg-amber-500/20 text-amber-400";
      case "hard":
        return "bg-rose-500/20 text-rose-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-2xl mx-auto">
        {showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="result-section text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50"
          >
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400"
            >
              Quiz Results
            </motion.h2>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="radial-progress mx-auto mb-6 text-indigo-400"
              style={{
                "--value": (score / questions.length) * 100,
                "--size": "10rem",
                "--thickness": "12px",
              }}
            >
              <div className="text-4xl font-bold">
                {score}
                <span className="text-xl text-gray-400">
                  /{questions.length}
                </span>
              </div>
            </motion.div>

            <p className="text-gray-300 mb-8">
              {score === questions.length
                ? "Perfect! 🎉"
                : score >= questions.length / 2
                ? "Good job! 👍"
                : "Keep practicing! 💪"}
            </p>

            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="px-6 py-3 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg transition-all"
              >
                Retry Quiz
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/aptitude/logical")}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
              >
                Back to Topics
              </motion.button>
            </div>
          </motion.div>
        ) : questions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="question-card p-8 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="text-indigo-400 font-mono mr-2">
                  {currentQuestion + 1}
                </span>
                <span className="text-gray-400">/ {questions.length}</span>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                  questions[currentQuestion].difficulty
                )}`}
              >
                {questions[currentQuestion].difficulty.toUpperCase()}
              </span>
            </div>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-semibold text-gray-100 mb-8 leading-relaxed"
            >
              {questions[currentQuestion].question}
            </motion.h3>

            <div className="options-grid space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`option-item p-4 rounded-lg cursor-pointer transition-all border
                    ${!answered ? "border-gray-600 hover:bg-gray-700/50" : ""}
                    ${
                      selectedOption !== null &&
                      index === questions[currentQuestion].correctAnswer
                        ? "bg-emerald-500/10 border-emerald-400/50"
                        : selectedOption === index
                        ? "bg-rose-500/10 border-rose-400/50"
                        : ""
                    }
                  `}
                  onClick={() => {
                    if (!answered) {
                      setSelectedOption(index);
                      setAnswered(true);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center
                      ${!answered ? "border border-gray-500" : ""}
                      ${
                        selectedOption !== null &&
                        index === questions[currentQuestion].correctAnswer
                          ? "bg-emerald-500 text-white"
                          : selectedOption === index
                          ? "bg-rose-500 text-white"
                          : ""
                      }
                    `}
                    >
                      {selectedOption !== null &&
                      index === questions[currentQuestion].correctAnswer ? (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : selectedOption === index ? (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <span className="text-xs text-gray-400">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </div>
                    <span
                      className={`${
                        answered &&
                        index === questions[currentQuestion].correctAnswer
                          ? "text-emerald-300"
                          : answered && selectedOption === index
                          ? "text-rose-300"
                          : "text-gray-300"
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600/30"
              >
                <h4 className="text-sm font-medium text-indigo-300 mb-2">
                  Explanation:
                </h4>
                <p className="text-gray-300 text-sm">
                  {questions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}

            <motion.button
              whileHover={answered ? { scale: 1.02 } : {}}
              whileTap={answered ? { scale: 0.98 } : {}}
              onClick={handleNext}
              disabled={!answered}
              className={`mt-8 w-full py-3 rounded-lg text-white transition-all
                ${
                  !answered
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/20"
                }
              `}
            >
              {currentQuestion === questions.length - 1
                ? "Submit Quiz"
                : "Next Question"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 inline"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50"
          >
            <svg
              className="h-16 w-16 text-rose-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              No Questions Available
            </h3>
            <p className="text-gray-400 mb-6">
              Sorry, there are no questions for this topic yet.
            </p>
            <button
              onClick={() => navigate("/aptitude/logical")}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"
            >
              Back to Logical Topics
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Logicalquiz;
