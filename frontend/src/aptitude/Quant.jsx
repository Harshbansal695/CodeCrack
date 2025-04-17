import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Quant = () => {
  // Topic data with descriptions
  const topics = [
    {
      name: "Percentage",
      description:
        "Practice problems on calculating percentages, increase/decrease, and applications.",
      formula: "x% of y = (x/100) × y",
      icon: "🧮",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      name: "Profit & Loss",
      description:
        "Solve problems related to cost price, selling price, profit percentage, and discounts.",
      formula: "Profit = SP - CP | Loss = CP - SP",
      icon: "💰",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      name: "Time & Work",
      description:
        "Calculate work efficiency, time taken, and problems involving multiple workers.",
      formula: "Work = Rate × Time",
      icon: "⏱️",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Algebra",
      description:
        "Practice linear equations, quadratic equations, and algebraic expressions.",
      formula: "ax² + bx + c = 0",
      icon: "✖️",
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
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 mb-4">
            Quantitative Aptitude
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Master essential math skills for competitive exams with interactive
            practice problems
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
            className="inline-flex items-center mb-8 text-indigo-400 hover:text-indigo-300 group transition-colors"
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
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
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
                  <div>
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">
                      {topic.name}
                    </h2>
                    <p className="text-gray-400 mb-4">{topic.description}</p>

                    {topic.formula && (
                      <div className="bg-gray-700/50 p-3 rounded-lg mb-5 border border-gray-600/30 backdrop-blur-sm">
                        <span className="font-medium text-indigo-300 text-sm">
                          KEY FORMULA:
                        </span>
                        <p className="font-mono mt-1 text-gray-100">
                          {topic.formula}
                        </p>
                      </div>
                    )}

                    <Link
                      to={`/aptitude/quantitative/${topic.name
                        .toLowerCase()
                        .replace(/ & /g, "_")
                        .replace(/ /g, "_")}`}
                      className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg hover:to-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/20"
                    >
                      Start Practice
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

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50"
        >
          <div className="flex items-center mb-6">
            <div className="p-2 bg-indigo-500/10 rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-100">Quick Tips</h3>
          </div>
          <ul className="space-y-4">
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20">
                  <svg
                    className="h-3 w-3 text-emerald-400"
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
                  Memorize percentages:
                </span>{" "}
                1/2 = 50%, 1/4 = 25%, 1/5 = 20% for faster calculations
              </span>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20">
                  <svg
                    className="h-3 w-3 text-emerald-400"
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
                  Profit/Loss problems:
                </span>{" "}
                Always clearly identify Cost Price (CP) and Selling Price (SP)
                first
              </span>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20">
                  <svg
                    className="h-3 w-3 text-emerald-400"
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
                <span className="font-medium text-gray-100">Time & Work:</span>{" "}
                Consider work rates as work/day or work/hour for easier
                calculations
              </span>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/20">
                  <svg
                    className="h-3 w-3 text-emerald-400"
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
                <span className="font-medium text-gray-100">Mental math:</span>{" "}
                Practice multiplication tables up to 20 and common square roots
              </span>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Quant;
