import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DIquiz = () => {
  const { subtopic } = useParams();
  const navigate = useNavigate();

  // 📌 Question Bank
  const questionBank = {
    tables: [
      {
        id: 1,
        question:
          "In a class of 50 students, 30 study Math, and 20 study Science. How many students study both?",
        options: ["5", "10", "15", "20"],
        correctAnswer: 1,
        explanation:
          "Using the formula: n(A ∩ B) = n(A) + n(B) - n(A ∪ B), we get 10 students.",
      },
      {
        id: 2,
        question:
          "If a table shows sales increasing from $100K to $150K over 5 years, what's the average annual growth?",
        options: ["8%", "10%", "12%", "15%"],
        correctAnswer: 1,
        explanation:
          "Compound annual growth rate formula gives approximately 8%",
      },
    ],
    charts: [
      {
        id: 1,
        question: "Which type of chart is best suited for showing proportions?",
        options: ["Line Chart", "Bar Chart", "Pie Chart", "Scatter Plot"],
        correctAnswer: 2,
        explanation: "A Pie Chart is used to represent proportions visually.",
      },
      {
        id: 2,
        question:
          "In a stacked bar chart showing quarterly sales by product, what should you check first?",
        options: [
          "Color legend",
          "X-axis labels",
          "Y-axis scale",
          "Data source",
        ],
        correctAnswer: 0,
        explanation:
          "The color legend identifies which product each color represents.",
      },
    ],
    graphs: [
      {
        id: 1,
        question: "Which graph is used to show trends over time?",
        options: ["Pie Chart", "Bar Graph", "Line Graph", "Histogram"],
        correctAnswer: 2,
        explanation: "A Line Graph is used to display trends over time.",
      },
      {
        id: 2,
        question: "What does a steep slope indicate in a line graph?",
        options: [
          "Slow change",
          "Rapid change",
          "No change",
          "Cyclical pattern",
        ],
        correctAnswer: 1,
        explanation:
          "Steeper slopes indicate more rapid changes in the variable.",
      },
    ],
    case_studies: [
      {
        id: 1,
        question:
          "A company's sales increased by 15% from last year. If last year's sales were $200,000, what are this year's sales?",
        options: ["$215,000", "$220,000", "$230,000", "$240,000"],
        correctAnswer: 1,
        explanation:
          "15% of 200,000 is 30,000, so total sales = 200,000 + 30,000 = 230,000.",
      },
      {
        id: 2,
        question:
          "If a case study shows profit margins declining while revenue grows, what might this indicate?",
        options: [
          "Increased efficiency",
          "Rising costs",
          "Market expansion",
          "Product diversification",
        ],
        correctAnswer: 1,
        explanation:
          "Declining margins with growing revenue typically suggests costs are rising faster than revenue.",
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

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const topicTitles = {
    tables: "Tables Interpretation",
    charts: "Charts Analysis",
    graphs: "Graphs Comprehension",
    case_studies: "Case Studies Evaluation",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/aptitude/data-interpretation")}
            className="flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Topics
          </button>
          <h1 className="text-3xl font-bold text-amber-400 mb-2">
            {topicTitles[subtopic] || "Data Interpretation Quiz"}
          </h1>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-amber-500 h-2.5 rounded-full"
              style={{
                width: `${
                  showResult ? 100 : (currentQuestion / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {showResult ? (
          <div className="bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-700 text-center">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold mt-4 mb-2">Quiz Completed!</h2>
              <p className="text-xl">
                Your score:{" "}
                <span className="font-bold text-amber-400">{score}</span> /{" "}
                {questions.length}
              </p>
              <p className="text-gray-400 mt-2">
                {score === questions.length
                  ? "Perfect! 🎯"
                  : score >= questions.length * 0.7
                  ? "Well done! 👍"
                  : "Keep practicing! 💪"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Retake Quiz
              </button>
              <button
                onClick={() => navigate("/aptitude/data-interpretation")}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Topics
              </button>
            </div>
          </div>
        ) : questions.length > 0 ? (
          <div className="bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-amber-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-400">
                Score: {score}
              </span>
            </div>

            <h3 className="text-xl font-medium mb-6 text-gray-200">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg border transition-all
                    ${
                      selectedOption === null
                        ? "border-gray-600 hover:border-amber-400 hover:bg-gray-750"
                        : index === questions[currentQuestion].correctAnswer
                        ? "bg-emerald-900/50 border-emerald-500"
                        : selectedOption === index
                        ? "bg-rose-900/50 border-rose-500"
                        : "border-gray-600 opacity-80"
                    }
                    ${
                      selectedOption === null
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                  onClick={() => {
                    if (!answered) {
                      setSelectedOption(index);
                      setAnswered(true);
                    }
                  }}
                  disabled={answered}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center
                      ${
                        selectedOption === null
                          ? "border-2 border-gray-500"
                          : index === questions[currentQuestion].correctAnswer
                          ? "bg-emerald-500 text-white"
                          : selectedOption === index
                          ? "bg-rose-500 text-white"
                          : "border-2 border-gray-500"
                      }`}
                    >
                      {selectedOption !== null &&
                        (index === questions[currentQuestion].correctAnswer
                          ? "✓"
                          : selectedOption === index
                          ? "✗"
                          : "")}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {answered && (
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700 mb-6">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-amber-400 mb-1">
                      Explanation
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={!answered}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center
                ${
                  !answered
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-500 text-white"
                }`}
            >
              {currentQuestion === questions.length - 1 ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Submit Quiz
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Next Question
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-8 text-center shadow-lg border border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-rose-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              No Questions Available
            </h3>
            <p className="text-gray-400 mb-6">
              There are currently no questions for this topic.
            </p>
            <button
              onClick={() => navigate("/aptitude/data-interpretation")}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Topics
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DIquiz;
