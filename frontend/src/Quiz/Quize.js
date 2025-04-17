import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FiArrowLeft,
  FiCheck,
  FiX,
  FiClock,
  FiAward,
  FiLoader,
} from "react-icons/fi";

const Quize = () => {
  const [quizData, setQuizData] = useState({
    quizName: "",
    topic: "",
    difficulty: "",
    questions: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSendingResults, setIsSendingResults] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [user, setUser] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showResult) {
        setTimeSpent((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult]);

  // Load quiz and user from localStorage
  useEffect(() => {
    const storedQuiz = JSON.parse(localStorage.getItem("generatedQuiz")) || {
      quizName: "Unnamed Quiz",
      topic: "General",
      difficulty: "Medium",
      questions: [],
    };
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setQuizData(storedQuiz);
    setUser(storedUser);
  }, []);

  const sendResultsToBackend = async (finalScore) => {
    setIsSendingResults(true);
    setApiError(null);

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || !storedUser._id) {
        throw new Error("Please log in to save your quiz results");
      }

      const totalQuestions = quizData.questions.length;
      const percentage = Math.round((finalScore / totalQuestions) * 100);

      const resultsData = {
        quizName: quizData.quizName || "Unnamed Quiz",
        topic: quizData.topic || "General",
        difficulty: quizData.difficulty || "Medium",
        score: finalScore,
        totalQuestions: totalQuestions,
        percentage: percentage,
        userId: storedUser._id,
        timeTaken: timeSpent,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/quiz/save`,
        resultsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setApiError(
        error.response?.data?.error ||
          "Failed to save results. Please try again."
      );
    } finally {
      setIsSendingResults(false);
    }
  };

  const handleAnswerClick = (option) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      const isCorrect = option === quizData.questions[currentIndex].answer;
      const newScore = isCorrect ? score + 1 : score;

      setTimeout(() => {
        if (currentIndex + 1 < quizData.questions.length) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setSelectedAnswer(null);
          setScore(newScore);
        } else {
          setScore(newScore);
          setShowResult(true);
          sendResultsToBackend(newScore);
        }
      }, 1000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {showResult ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl border border-gray-700 text-center"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                <FiAward className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-indigo-400 mb-2">
                {quizData.quizName}
              </h1>
              <p className="text-gray-400 mb-4">
                Topic: {quizData.topic} | Difficulty: {quizData.difficulty}
              </p>
              <h2 className="text-2xl font-bold text-indigo-300 mb-6">
                Quiz Completed!
              </h2>

              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Score</p>
                  <p className="text-2xl font-bold">
                    {score} / {quizData.questions.length}
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Percentage</p>
                  <p className="text-2xl font-bold">
                    {Math.round((score / quizData.questions.length) * 100)}%
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="text-2xl font-bold">{formatTime(timeSpent)}</p>
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${(score / quizData.questions.length) * 100}%`,
                    background:
                      score === quizData.questions.length
                        ? "linear-gradient(to right, #10b981, #84cc16)"
                        : score >= quizData.questions.length * 0.7
                        ? "linear-gradient(to right, #3b82f6, #6366f1)"
                        : "linear-gradient(to right, #ef4444, #f97316)",
                  }}
                ></div>
              </div>
              <p className="text-sm mb-6 text-gray-400">
                {score === quizData.questions.length
                  ? "Perfect score! 🎯"
                  : score >= quizData.questions.length * 0.7
                  ? "Well done! 👍"
                  : "Keep practicing! 💪"}
              </p>
            </div>

            {isSendingResults && (
              <div className="mb-4 p-3 bg-indigo-900/30 text-indigo-300 rounded-md flex items-center justify-center">
                <FiLoader className="animate-spin mr-2" />
                Saving your results...
              </div>
            )}

            {apiError && (
              <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-md">
                {apiError}
              </div>
            )}

            <div className="flex justify-center">
              <Link
                to="/quiz"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <FiArrowLeft className="mr-2" />
                Back to Quiz Generator
              </Link>
            </div>
          </motion.div>
        ) : quizData.questions.length > 0 ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl border border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate("/quiz")}
                className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back
              </button>
              <div className="flex items-center text-sm text-gray-400">
                <FiClock className="mr-1" />
                {formatTime(timeSpent)}
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-indigo-400">
                {quizData.quizName}
              </h1>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-400">
                  Question {currentIndex + 1} of {quizData.questions.length}
                </p>
                <p className="text-sm bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full">
                  {quizData.difficulty}
                </p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{
                    width: `${
                      ((currentIndex + 1) / quizData.questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <motion.div
              key={`question-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-xl font-medium text-gray-200 mb-6">
                {quizData.questions[currentIndex]?.question}
              </h3>

              <div className="space-y-3">
                {quizData.questions[currentIndex]?.options &&
                  Object.entries(quizData.questions[currentIndex].options).map(
                    ([key, value]) => {
                      const isCorrect =
                        key === quizData.questions[currentIndex].answer;
                      const isSelected = selectedAnswer === key;

                      let optionClass =
                        "bg-gray-700/50 hover:bg-gray-700 border-gray-600";
                      let icon = null;

                      if (selectedAnswer) {
                        if (isCorrect) {
                          optionClass = "bg-emerald-900/30 border-emerald-500";
                          icon = <FiCheck className="text-emerald-400" />;
                        } else if (isSelected) {
                          optionClass = "bg-rose-900/30 border-rose-500";
                          icon = <FiX className="text-rose-400" />;
                        } else {
                          optionClass =
                            "bg-gray-700/20 border-gray-600 opacity-80";
                        }
                      }

                      return (
                        <motion.div
                          key={key}
                          whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${optionClass}`}
                          onClick={() =>
                            !selectedAnswer && handleAnswerClick(key)
                          }
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center 
                              ${
                                selectedAnswer
                                  ? isCorrect
                                    ? "bg-emerald-500 text-white"
                                    : isSelected
                                    ? "bg-rose-500 text-white"
                                    : "bg-gray-600"
                                  : "bg-gray-600"
                              }`}
                            >
                              {selectedAnswer ? icon : key.toUpperCase()}
                            </div>
                            <span>{value}</span>
                          </div>
                        </motion.div>
                      );
                    }
                  )}
              </div>
            </motion.div>

            {selectedAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-750/50 p-4 rounded-lg border border-gray-700 mb-6"
              >
                <div className="flex items-start">
                  <div className="bg-indigo-900/30 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-400 mb-1">
                      Explanation
                    </h4>
                    <p className="text-gray-300">
                      {quizData.questions[currentIndex].explanation ||
                        "The correct answer is " +
                          quizData.questions[currentIndex].answer.toUpperCase()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 text-center shadow-2xl border border-gray-700">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              No Questions Found
            </h3>
            <p className="text-gray-400 mb-6">Please generate a quiz first</p>
            <Link
              to="/quiz"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Quiz Generator
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quize;
