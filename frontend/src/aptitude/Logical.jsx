import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logical = () => {
  // Topic data with examples
  const topics = [
    {
      name: "Puzzles",
      description:
        "Solve logical puzzles involving seating arrangements, rankings, and logical deductions.",
      example: "If A is taller than B but shorter than C, who is the tallest?",
      difficulty: "Medium-Hard",
      icon: "🧩",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      name: "Syllogism",
      description:
        "Practice drawing conclusions from given statements using logical reasoning.",
      example: "All A are B. Some B are C. Therefore...",
      difficulty: "Easy-Medium",
      icon: "🔍",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      name: "Coding-Decoding",
      description:
        "Decipher patterns in letter/number codes and solve encryption problems.",
      example: "If CAT = 312, how is DOG coded?",
      difficulty: "Medium",
      icon: "🔢",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Blood Relations",
      description:
        "Solve family tree problems and determine relationships between individuals.",
      example: "If X is Y's mother's brother, how is X related to Y?",
      difficulty: "Easy-Medium",
      icon: "👨‍👩‍👧‍👦",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-400 mb-4">
            Logical Reasoning
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Sharpen your analytical and problem-solving skills with interactive
            challenges
          </p>
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/aptitude"
            className="inline-flex items-center mb-8 text-teal-400 hover:text-teal-300 group transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Categories
          </Link>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden p-0.5 rounded-xl bg-gradient-to-br ${topic.gradient}`}
            >
              <div className="relative h-full p-6 bg-gray-800 rounded-[10px] group">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-white/5 to-transparent"></div>
                <div className="flex items-start relative z-10">
                  <span className="text-3xl mr-4">{topic.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold text-gray-100 mb-2">
                        {topic.name}
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          topic.difficulty === "Easy-Medium"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : topic.difficulty === "Medium"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {topic.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{topic.description}</p>

                    <div className="bg-gray-700/50 p-3 rounded-lg mb-5 border border-gray-600/30 backdrop-blur-sm">
                      <span className="font-medium text-teal-300 text-sm">
                        EXAMPLE:
                      </span>
                      <p className="italic mt-1 text-gray-200">
                        {topic.example}
                      </p>
                    </div>

                    <Link
                      to={`/aptitude/logical/${topic.name
                        .toLowerCase()
                        .replace(/\s+/g, "_")}`}
                      className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:to-teal-600 transition-all shadow-lg hover:shadow-teal-500/20"
                    >
                      Solve Problems
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reasoning Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50"
        >
          <div className="flex items-center mb-6">
            <div className="p-2 bg-teal-500/10 rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-100">
              Reasoning Strategies
            </h3>
          </div>
          <ul className="space-y-4">
            {[
              "For puzzles: Draw diagrams or tables to visualize relationships",
              "In syllogisms: Look for overlapping categories between statements",
              "Coding patterns: Check for position-based (A=1, B=2) or reverse-position coding",
              "Blood relations: Build family trees step-by-step",
              "Eliminate impossible options first in multiple-choice questions",
            ].map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex items-center justify-center h-5 w-5 rounded-full bg-teal-500/20">
                    <svg
                      className="h-3 w-3 text-teal-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="ml-3 text-gray-300">
                  <span className="font-medium text-gray-100">
                    {tip.split(":")[0]}:
                  </span>
                  {tip.split(":")[1]}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Logical;
