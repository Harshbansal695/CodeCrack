import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [dsaProgress, setDsaProgress] = useState({
    easy: { solved: 0, total: 428 },
    medium: { solved: 0, total: 918 },
    hard: { solved: 0, total: 371 },
    totalSolved: 0,
    totalProblems: 1720,
    lastUpdated: "",
  });
  const [isLoadingDsa, setIsLoadingDsa] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    const fetchDsaProgress = async (email) => {
      try {
        setIsLoadingDsa(true);
        const response = await fetch(
          `${
            process.env.REACT_APP_URL
          }/api/v1/dsa/gprogress?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            return {
              easy: { solved: 0, total: 832 },
              medium: { solved: 0, total: 1751 },
              hard: { solved: 0, total: 761 },
              totalSolved: 0,
              totalProblems: 3344,
              lastUpdated: new Date().toISOString(),
            };
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.success) {
          return {
            easy: responseData.progress.easy || { solved: 0, total: 832 },
            medium: responseData.progress.medium || { solved: 0, total: 1751 },
            hard: responseData.progress.hard || { solved: 0, total: 761 },
            totalSolved: responseData.progress.totalQuestions || 0,
            totalProblems: responseData.progress.totalProblems || 3344,
            lastUpdated:
              responseData.progress.lastUpdated || new Date().toISOString(),
          };
        }
        throw new Error("Invalid DSA progress data format");
      } catch (error) {
        console.error("Error fetching DSA progress:", error);
        return {
          easy: { solved: 0, total: 832 },
          medium: { solved: 0, total: 1751 },
          hard: { solved: 0, total: 761 },
          totalSolved: 0,
          totalProblems: 3344,
          lastUpdated: new Date().toISOString(),
        };
      } finally {
        setIsLoadingDsa(false);
      }
    };

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) throw new Error("Please login to view dashboard");

        const userEmail = storedUser.email;
        if (!userEmail)
          throw new Error("Invalid user data. Please login again.");

        // Fetch user details by email
        const userResponse = await axios.get(
          `${
            process.env.REACT_APP_URL
          }/api/v1/user/by-email?email=${encodeURIComponent(userEmail)}`
        );

        if (!userResponse.data.success) {
          throw new Error("Failed to fetch user data");
        }

        const userData = userResponse.data.user;
        setUserDetails(userData);

        // Fetch DSA progress by email
        const progressData = await fetchDsaProgress(userEmail);
        setDsaProgress(progressData);

        // Fetch quizzes by user ID
        try {
          const quizzesResponse = await axios.get(
            `${process.env.REACT_APP_URL}/api/quiz/user/${userData._id}`
          );
          setQuizzes(quizzesResponse.data.quizzes || []);
        } catch (quizError) {
          if (quizError.response?.status !== 404) throw quizError;
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching your data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dsa_web"); // Your Cloudinary upload preset
      formData.append("cloud_name", "dlkalpn6z"); // Your Cloudinary cloud name

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dlkalpn6z/image/upload",
        formData
      );

      const imageUrl = uploadResponse.data.secure_url;

      // Update user profile with new image
      const updateResponse = await axios.put(
        `${process.env.REACT_APP_URL}/api/v1/user/update-profile`,
        {
          userId: userDetails._id,
          images: [imageUrl],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (updateResponse.data.success) {
        setUserDetails({
          ...userDetails,
          images: [imageUrl],
        });
        // Update local storage if needed
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...storedUser,
              images: [imageUrl],
            })
          );
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setFileInputKey(Date.now()); // Reset file input
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-900">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
        <p className="text-gray-300">{error}</p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Format the timestamp
  const formattedTimestamp = new Date(dsaProgress.lastUpdated).toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* User Profile Section - Glass Card */}
          <div className="w-full lg:w-1/3 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/30 p-6">
            <div className="flex flex-col items-center mb-6">
              {/* Profile Image with Upload Option */}
              <div className="relative group ">
                {userDetails?.images?.[0] ? (
                  <img
                    src={userDetails.images[0]}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 mx-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userDetails?.fullname || "U"
                      )}&background=random`;
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                    {userDetails?.fullname?.charAt(0) || "U"}
                  </div>
                )}

                {/* Upload Button */}
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all group-hover:opacity-100 opacity-0">
                  <input
                    type="file"
                    key={fileInputKey}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {isUploading ? (
                    <svg
                      className="w-4 h-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </label>
              </div>

              <div className="w-full text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-100">
                  {userDetails?.fullname || "User"}
                </h2>
                <p className="text-gray-400 text-sm">{userDetails?.email}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              {[
                { label: "Phone", value: userDetails?.phone || "Not provided" },
                {
                  label: "Gender",
                  value: userDetails?.gender || "Not provided",
                },
                {
                  label: "Date of Birth",
                  value: userDetails?.dob
                    ? new Date(userDetails.dob).toLocaleDateString()
                    : "Not provided",
                },
                {
                  label: "Address",
                  value: userDetails?.address || "Not provided",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between py-2 border-b border-gray-700/50"
                >
                  <span className="text-sm font-medium text-gray-400">
                    {item.label}
                  </span>
                  <span className="text-gray-200 text-sm">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* DSA Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/30 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-100">DSA Mastery</h2>
                <div className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-gray-300">
                  Updated: {formattedTimestamp}
                </div>
              </div>

              {isLoadingDsa ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Overall Progress Card */}
                  <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 p-5 rounded-xl border border-gray-700/30">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">
                          Total Problems Solved
                        </p>
                        <p className="text-3xl font-bold text-white">
                          {dsaProgress.totalSolved}
                          <span className="text-lg text-gray-400 ml-1">
                            /1720
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-400">
                          {Math.round((dsaProgress.totalSolved / 1720) * 100)}%
                        </div>
                        <p className="text-xs text-gray-400">Completion</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{
                          width: `${(dsaProgress.totalSolved / 1720) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Difficulty Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        level: "Easy",
                        solved: dsaProgress.easy.solved,
                        total: 428,
                        color: "from-green-500 to-emerald-500",
                        textColor: "text-green-400",
                      },
                      {
                        level: "Medium",
                        solved: dsaProgress.medium.solved,
                        total: 918,
                        color: "from-yellow-500 to-amber-500",
                        textColor: "text-yellow-400",
                      },
                      {
                        level: "Hard",
                        solved: dsaProgress.hard.solved,
                        total: 371,
                        color: "from-red-500 to-pink-500",
                        textColor: "text-red-400",
                      },
                    ].map((difficulty, index) => (
                      <motion.div
                        key={difficulty.level}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`bg-gradient-to-br ${difficulty.color} rounded-xl p-4 shadow-lg`}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-white">
                            {difficulty.level}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-black/20 text-white">
                            {Math.round(
                              (difficulty.solved / difficulty.total) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="mt-4">
                          <p
                            className={`text-2xl font-bold ${difficulty.textColor}`}
                          >
                            {difficulty.solved}
                            <span className="text-lg text-white/80 ml-1">
                              /{difficulty.total}
                            </span>
                          </p>
                          <div className="w-full bg-black/20 rounded-full h-2 mt-2">
                            <div
                              className="bg-white h-2 rounded-full"
                              style={{
                                width: `${
                                  (difficulty.solved / difficulty.total) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quiz Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/30 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-100">
                  Recent Quizzes
                </h2>
                <button
                  onClick={() => (window.location.href = "/quiz")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  + New Quiz
                </button>
              </div>

              {quizzes.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-12 h-12 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg mb-4">
                    No quizzes taken yet
                  </p>
                  <button
                    onClick={() => (window.location.href = "/quiz")}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Start Your First Quiz
                  </button>
                </div>
              ) : (
                <div className="relative">
                  {/* Quiz Cards Carousel */}
                  <div className="relative overflow-hidden">
                    <div
                      className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
                      style={{
                        scrollSnapType: "x mandatory",
                      }}
                    >
                      {quizzes.map((quiz, index) => (
                        <motion.div
                          key={quiz._id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
                          style={{
                            scrollSnapAlign: "start",
                          }}
                        >
                          <div className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors rounded-xl p-5 h-full border border-gray-700/30">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-white line-clamp-2">
                                  {quiz.quizName}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-600/50 text-gray-300">
                                    {quiz.topic}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      quiz.difficulty === "easy"
                                        ? "bg-green-900/50 text-green-300"
                                        : quiz.difficulty === "medium"
                                        ? "bg-yellow-900/50 text-yellow-300"
                                        : "bg-red-900/50 text-red-300"
                                    }`}
                                  >
                                    {quiz.difficulty}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`text-lg font-bold ${
                                  quiz.percentage >= 70
                                    ? "text-green-400"
                                    : quiz.percentage >= 40
                                    ? "text-yellow-400"
                                    : "text-red-400"
                                }`}
                              >
                                {quiz.percentage}%
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between text-sm text-gray-300 mb-2">
                                <span>
                                  Score: {quiz.score}/{quiz.totalQuestions}
                                </span>
                                <span className="text-gray-400">
                                  {new Date(
                                    quiz.timestamp
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-600/50 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    quiz.percentage >= 70
                                      ? "bg-green-500"
                                      : quiz.percentage >= 40
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{ width: `${quiz.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Scroll Indicators */}
                  {quizzes.length > 2 && (
                    <div className="flex justify-center mt-4">
                      <div className="flex gap-2">
                        {Array.from({
                          length: Math.ceil(quizzes.length / 2),
                        }).map((_, index) => (
                          <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === 0 ? "bg-blue-500 w-6" : "bg-gray-600"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
