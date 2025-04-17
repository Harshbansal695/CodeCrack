import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const questionBank = {
  percentage: [
    {
      id: 1,
      question: "What is 20% of 80?",
      options: ["10", "16", "20", "24"],
      correctAnswer: 1,
      explanation: "20% of 80 = (20/100) × 80 = 16",
    },
    {
      id: 2,
      question:
        "A price of a shirt is increased by 25%. If its new price is $125, what was the original price?",
      options: ["$100", "$110", "$120", "$90"],
      correctAnswer: 0,
      explanation: "Let original price be X. X + 25% of X = 125 → X = 100",
    },
    {
      id: 3,
      question:
        "A number is increased by 20% and then decreased by 20%. What is the net effect?",
      options: ["No change", "4% decrease", "4% increase", "8% decrease"],
      correctAnswer: 1,
      explanation:
        "Increase of 20% → 1.2x, then decrease of 20% → 0.8 * 1.2x = 0.96x (4% decrease).",
    },
  ],

  profit_loss: [
    {
      id: 1,
      question:
        "A man buys an article for $200 and sells it for $250. What is the profit percentage?",
      options: ["20%", "25%", "30%", "50%"],
      correctAnswer: 1,
      explanation: "Profit = 250 - 200 = 50. Profit% = (50/200) × 100 = 25%",
    },
    {
      id: 2,
      question:
        "If the cost price of an item is $500 and the loss is 10%, what is the selling price?",
      options: ["$450", "$475", "$490", "$400"],
      correctAnswer: 0,
      explanation: "Selling price = 500 - (10% of 500) = 500 - 50 = 450",
    },
    {
      id: 3,
      question:
        "A shopkeeper allows a discount of 20% on marked price and still makes a 25% profit. If the cost price is $600, what is the marked price?",
      options: ["$900", "$1000", "$960", "$850"],
      correctAnswer: 1,
      explanation:
        "Let the marked price be X. Selling price = 0.8X. Since profit is 25%, 0.8X = 1.25 × 600 → X = 1000.",
    },
  ],

  time_work: [
    {
      id: 1,
      question:
        "A can complete a work in 10 days, B in 15 days. How many days will they take together?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation:
        "Work done per day: A = 1/10, B = 1/15. Total = (1/10 + 1/15) = 1/6. So, together in 6 days.",
    },
    {
      id: 2,
      question:
        "If 6 workers complete a task in 12 days, how many workers are needed to complete it in 8 days?",
      options: ["9", "10", "7", "6"],
      correctAnswer: 0,
      explanation:
        "Workers × Days = Constant. (6 × 12) = (X × 8) → X = 9 workers.",
    },
    {
      id: 3,
      question:
        "A does half the work in 10 days and B completes the rest in 5 days. How long will they take together?",
      options: ["6 days", "7.5 days", "8 days", "5 days"],
      correctAnswer: 1,
      explanation:
        "A's full work = 20 days, B's full work = 10 days. Together: (1/20 + 1/10) = 1/6.67. Total = 7.5 days.",
    },
  ],

  algebra: [
    {
      id: 1,
      question: "Solve for x: 2x + 5 = 15",
      options: ["5", "10", "7", "15"],
      correctAnswer: 0,
      explanation: "2x = 10 → x = 5",
    },
    {
      id: 2,
      question: "Solve for x: x² - 5x + 6 = 0",
      options: ["1, 6", "2, 3", "3, 5", "4, 2"],
      correctAnswer: 1,
      explanation: "x² - 5x + 6 = 0 → (x - 2)(x - 3) = 0 → x = 2, 3",
    },
    {
      id: 3,
      question: "If 3x - 4 = 11, what is x?",
      options: ["2", "5", "6", "4"],
      correctAnswer: 1,
      explanation: "3x = 15 → x = 5",
    },
  ],
};

const topicTitles = {
  percentage: "Percentage Problems",
  profit_loss: "Profit & Loss",
  time_work: "Time & Work",
  algebra: "Algebra Basics",
};

const Quantquiz = () => {
  const { subtopic } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);
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

  // Fetch questions when component loads
  useEffect(() => {
    if (!subtopic) {
      setError("Subtopic is missing in the URL.");
      return;
    }

    const topicKey = subtopic.toLowerCase();
    if (questionBank[topicKey]) {
      setQuestions(questionBank[topicKey]);
    } else {
      setError("No quiz available for this subtopic.");
    }
  }, [subtopic]);

  // Handle answer selection
  const handleAnswerSelection = (index) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const correctIndex = questions[currentQuestion]?.correctAnswer;
    const isCorrect = index === correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  // Handle Next button
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeSpent(0);
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/aptitude/quantitative")}
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
            Back to Quantitative
          </button>

          <h1 className="text-3xl font-bold text-amber-400 mb-2">
            {topicTitles[subtopic] || "Quantitative Quiz"}
          </h1>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Time: {formatTime(timeSpent)}
            </span>
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {error ? (
          <div className="bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-700">
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
              Error Loading Quiz
            </h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => navigate("/aptitude/quantitative")}
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
        ) : showResult ? (
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
                Score: <span className="font-bold text-amber-400">{score}</span>{" "}
                / {questions.length}
              </p>
              <p className="text-gray-400 mt-2">
                Time taken: {formatTime(timeSpent)}
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${(score / questions.length) * 100}%`,
                      background:
                        score === questions.length
                          ? "linear-gradient(to right, #10b981, #84cc16)"
                          : score >= questions.length * 0.7
                          ? "linear-gradient(to right, #3b82f6, #6366f1)"
                          : "linear-gradient(to right, #ef4444, #f97316)",
                    }}
                  ></div>
                </div>
                <p className="text-sm mt-2 text-gray-400">
                  {score === questions.length
                    ? "Perfect score! 🎯"
                    : score >= questions.length * 0.7
                    ? "Well done! 👍"
                    : "Keep practicing! 💪"}
                </p>
              </div>
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
                onClick={() => navigate("/aptitude/quantitative")}
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
            <h3 className="text-xl font-medium mb-6 text-gray-200">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrectAnswer =
                  index === questions[currentQuestion].correctAnswer;
                const isSelected = selectedOption === index;
                let buttonClass =
                  "border-gray-600 hover:border-amber-400 hover:bg-gray-750";

                if (selectedOption !== null) {
                  if (isCorrectAnswer) {
                    buttonClass = "bg-emerald-900/50 border-emerald-500";
                  } else if (isSelected) {
                    buttonClass = "bg-rose-900/50 border-rose-500";
                  } else {
                    buttonClass = "border-gray-600 opacity-80";
                  }
                }

                return (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${buttonClass}`}
                    onClick={() => handleAnswerSelection(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center
                        ${
                          selectedOption === null
                            ? "border-2 border-gray-500"
                            : isCorrectAnswer
                            ? "bg-emerald-500 text-white"
                            : isSelected
                            ? "bg-rose-500 text-white"
                            : "border-2 border-gray-500"
                        }`}
                      >
                        {selectedOption !== null &&
                          (isCorrectAnswer ? "✓" : isSelected ? "✗" : "")}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
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
              disabled={selectedOption === null}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center
                ${
                  selectedOption === null
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
          <div className="bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-amber-500 mb-4"
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
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              Loading Quiz...
            </h3>
            <p className="text-gray-400">
              Please wait while we prepare your questions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quantquiz;
