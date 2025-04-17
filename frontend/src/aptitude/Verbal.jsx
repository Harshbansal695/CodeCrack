import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Verbal = () => {
  // Topic data with examples
  const topics = [
    {
      name: "Grammar",
      description:
        "Master English grammar rules, sentence correction, and error detection.",
      example: "Identify the error: 'She go to school every day.'",
      icon: "📝",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      name: "Vocabulary",
      description:
        "Expand your word power with synonyms, antonyms, and word usage.",
      example: "What's the antonym of 'benevolent'?",
      icon: "📖",
      gradient: "from-blue-500 to-teal-500",
    },
    {
      name: "Comprehension",
      description:
        "Practice reading passages and answering inference-based questions.",
      example: "Read 300-word passage and answer 5 questions",
      icon: "🔍",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Para Jumbles",
      description: "Rearrange jumbled sentences to form coherent paragraphs.",
      example: "Arrange 5 sentences in logical order",
      icon: "🧩",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  // Vocabulary word of the day
  const wordOfTheDay = {
    word: "Ephemeral",
    meaning: "Lasting for a very short time",
    example: "The ephemeral nature of social media trends",
  };

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
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400 mb-4">
            Verbal Ability
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Enhance your English language skills for competitive exams
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

        {/* Word of the Day */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10 p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-900/50"
        >
          <div className="flex items-center mb-3">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-300">
              Word of the Day
            </h3>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {wordOfTheDay.word}
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-indigo-200">Meaning:</span>{" "}
            {wordOfTheDay.meaning}
          </p>
          <p className="text-gray-400 italic mt-2">"{wordOfTheDay.example}"</p>
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
                  <div>
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">
                      {topic.name}
                    </h2>
                    <p className="text-gray-400 mb-4">{topic.description}</p>

                    <div className="bg-gray-700/50 p-3 rounded-lg mb-5 border border-gray-600/30 backdrop-blur-sm">
                      <span className="font-medium text-indigo-300 text-sm">
                        EXAMPLE:
                      </span>
                      <p className="mt-1 text-gray-200">{topic.example}</p>
                    </div>

                    <Link
                      to={`/aptitude/verbal/${topic.name.toLowerCase()}`}
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

        {/* Grammar Tips Section */}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-100">
              Essential Grammar Rules
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-indigo-300 mb-3">
                Subject-Verb Agreement
              </h4>
              <ul className="space-y-3">
                {[
                  "Singular subjects take singular verbs",
                  '"The team is playing" (not are)',
                  "Collective nouns usually take singular verbs",
                  "Compound subjects with 'and' usually take plural verbs",
                ].map((tip, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500/20">
                        <svg
                          className="h-3 w-3 text-indigo-400"
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
                    <span className="ml-3 text-gray-300">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-indigo-300 mb-3">
                Common Errors
              </h4>
              <ul className="space-y-3">
                {[
                  '"Affect" (verb) vs "Effect" (noun)',
                  '"Their" (possession) vs "There" (place) vs "They\'re" (they are)',
                  '"Your" vs "You\'re"',
                  '"Its" (possession) vs "It\'s" (it is)',
                ].map((tip, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-500/20">
                        <svg
                          className="h-3 w-3 text-indigo-400"
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
                    <span className="ml-3 text-gray-300">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Verbal;
