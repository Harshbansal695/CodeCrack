import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { FiLoader, FiArrowRight } from "react-icons/fi";
import { FaBrain, FaTrophy, FaChartLine, FaLightbulb } from "react-icons/fa";

const Quizes = () => {
  const [quizParams, setQuizParams] = useState({
    quizName: "",
    topic: "",
    difficulty: 2, // 0: easy, 1: medium, 2: hard
    totalQuestions: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiReady, setApiReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      setError("API key missing. Check .env file and restart server.");
      console.error("Missing REACT_APP_GEMINI_API_KEY");
    } else {
      setApiReady(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizParams({
      ...quizParams,
      [name]: name === "totalQuestions" ? parseInt(value, 10) : value,
    });
  };

  const handleDifficultyChange = (value) => {
    setQuizParams({
      ...quizParams,
      difficulty: parseInt(value, 10),
    });
  };

  const getDifficultyText = () => {
    const levels = ["Easy", "Medium", "Hard"];
    return levels[quizParams.difficulty];
  };

  const generateQuestions = async () => {
    if (!quizParams.quizName.trim() || !quizParams.topic.trim() || !apiReady) {
      setError(
        !quizParams.quizName.trim()
          ? "Please enter a quiz name"
          : !quizParams.topic.trim()
          ? "Please enter a topic"
          : "API not configured"
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Verify the API key is being loaded correctly
      console.log(
        "Using API Key:",
        process.env.REACT_APP_GEMINI_API_KEY ? "Exists" : "Missing"
      );

      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Using the newer flash model
        apiVersion: "v1beta", // Matching the endpoint version
      });

      const difficultyText = ["easy", "medium", "hard"][quizParams.difficulty];

      const prompt = `
      Generate ${quizParams.totalQuestions} ${difficultyText} difficulty multiple-choice questions on "${quizParams.topic}".
      Format output as JSON:
      {
        "quizName": "${quizParams.quizName}",
        "topic": "${quizParams.topic}",
        "difficulty": "${difficultyText}",
        "questions": [
          {
            "question": "Question text?",
            "options": {
              "a": "Option A",
              "b": "Option B",
              "c": "Option C",
              "d": "Option D"
            },
            "answer": "a"
          }
        ]
      }
      Return only the JSON with no additional text or markdown.
    `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // More robust JSON parsing
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse quiz questions. Response: " + text);
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      localStorage.setItem(
        "generatedQuiz",
        JSON.stringify({
          quizName: quizParams.quizName,
          ...parsedData,
        })
      );
      navigate("/quize");
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.message.includes("API_KEY_INVALID") || err.message.includes("400")
          ? "Invalid API key. Please check your API key configuration."
          : "Failed to generate questions. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl w-full mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center mb-4"
            >
              <FaBrain className="text-indigo-400 text-4xl mr-3" />
              <motion.h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Quiz Generator
              </motion.h1>
            </motion.div>
            <p className="text-gray-400 max-w-md mx-auto">
              Create custom quizzes in seconds with AI. Perfect for learning,
              teaching, or testing your knowledge.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="sm:col-span-2"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quiz Name:
                </label>
                <input
                  type="text"
                  name="quizName"
                  value={quizParams.quizName}
                  onChange={handleInputChange}
                  placeholder="My Awesome Quiz"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Topic:
                </label>
                <input
                  type="text"
                  name="topic"
                  value={quizParams.topic}
                  onChange={handleInputChange}
                  placeholder="e.g. JavaScript, History, Biology"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty:{" "}
                  <span className="text-indigo-300">{getDifficultyText()}</span>
                </label>
                <div className="pt-2">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    value={quizParams.difficulty}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Easy</span>
                    <span>Medium</span>
                    <span>Hard</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Questions:
                </label>
                <input
                  type="number"
                  name="totalQuestions"
                  min="1"
                  max="20"
                  value={quizParams.totalQuestions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </motion.div>
            </div>

            {/* Features grid - Updated to use flexbox for options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="flex-1 min-w-[150px] bg-gray-700/50 p-4 rounded-lg text-center border border-gray-600">
                  <FaLightbulb className="text-indigo-400 text-2xl mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-300">
                    AI-Powered
                  </p>
                </div>
                <div className="flex-1 min-w-[150px] bg-gray-700/50 p-4 rounded-lg text-center border border-gray-600">
                  <FaChartLine className="text-purple-400 text-2xl mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-300">
                    Customizable
                  </p>
                </div>
                <div className="flex-1 min-w-[150px] bg-gray-700/50 p-4 rounded-lg text-center border border-gray-600">
                  <FaTrophy className="text-pink-400 text-2xl mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-300">
                    Challenging
                  </p>
                </div>
                <div className="flex-1 min-w-[150px] bg-gray-700/50 p-4 rounded-lg text-center border border-gray-600">
                  <FiLoader className="text-blue-400 text-2xl mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-300">Instant</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col items-center pt-6 space-y-4"
            >
              <button
                onClick={generateQuestions}
                disabled={isLoading || !apiReady}
                className={`px-8 py-4 rounded-lg font-medium flex items-center space-x-3 ${
                  isLoading || !apiReady
                    ? "bg-indigo-800 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                } transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/20`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Generating Your Quiz...</span>
                  </>
                ) : (
                  <>
                    <span>Create My Quiz</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center max-w-md">
                By creating a quiz, you agree to our terms of service. Quizzes
                are generated by AI and may require verification.
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-900/50 border border-red-700 text-red-100 rounded-lg"
              >
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: #818cf8;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #6366f1;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #818cf8;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #6366f1;
        }
      `}</style>
    </div>
  );
};

export default Quizes;
