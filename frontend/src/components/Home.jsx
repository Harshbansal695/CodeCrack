import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DotPattern from "./magic-ui/DotPattern";
import {
  FiCode,
  FiBookOpen,
  FiAward,
  FiUser,
  FiArrowRight,
  FiSearch,
  FiClock,
  FiBarChart2,
  FiTrendingUp,
} from "react-icons/fi";

const features = [
  {
    icon: <FiCode className="w-6 h-6" />,
    title: "DSA Mastery",
    description: "Company-specific questions with visual learning",
    path: "/dsa",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <FiBookOpen className="w-6 h-6" />,
    title: "Aptitude Prep",
    description: "Quant, verbal, logical reasoning with tips",
    path: "/aptitude",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FiAward className="w-6 h-6" />,
    title: "Quiz Arena",
    description: "Practice MCQs for technical interviews",
    path: "/quiz",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <FiUser className="w-6 h-6" />,
    title: "Dashboard",
    description: "Track progress across all modules",
    path: "/dashboard",
    color: "from-teal-500 to-green-500",
  },
];

const Home = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const featureCardVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Hero Section with Animated Gradient Background */}
      <section className="relative overflow-hidden pt-32 pb-40 bg-[#0D0E26]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          />

          {/* Dot Pattern Background */}
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            dotColor="#a2a2aa"
            className="absolute inset-0 w-full h-full fill-gray-800/1500 [mask-image:radial-gradient(white,transparent_70%)]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center bg-indigo-900/20 text-indigo-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-indigo-700/50 backdrop-blur-[2px]"
              variants={itemVariants}
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400/80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400 bg-opacity-40" />
              </span>
              The Future of Tech Learning
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400">
                Master Tech Skills
              </span>{" "}
              <br className="hidden md:block" />
              Like Never Before
            </motion.h1>
            <motion.p
              className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-gray-300 mb-12"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    delay: 0.3,
                  },
                },
              }}
            >
              CodeCrack revolutionizes tech education with interactive tools,
              AI-powered guidance, and real-world simulations to accelerate your
              learning.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => navigate("/dsa")}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-xl shadow-indigo-500/30 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold sm:text-5xl mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
                Comprehensive
              </span>{" "}
              Learning Ecosystem
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-gray-400 text-lg">
              Everything you need to go from beginner to interview-ready, all in
              one platform with personalized learning paths.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onClick={() => navigate(feature.path)}
                className="group relative bg-gray-900/60 hover:bg-gray-900/80 rounded-2xl overflow-hidden shadow-xl border border-gray-800/50 hover:border-gray-700 cursor-pointer"
                variants={featureCardVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-0" />
                <div className="p-8 relative z-10">
                  <motion.div
                    className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-6`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    Explore now
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DSA Section */}
      <section className="py-24 relative overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="absolute inset-0 w-full h-full fill-purple-900/10 [mask-image:radial-gradient(white,transparent_70%)]"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="lg:w-1/2">
              <span className="inline-block bg-gradient-to-br from-purple-500 to-pink-500 text-transparent bg-clip-text text-sm font-semibold mb-4">
                DSA LEARNING
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
                Company-Specific DSA Preparation
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Master Data Structures and Algorithms with questions categorized
                by companies and difficulty levels.
              </p>
              <ul className="space-y-4 text-gray-300 mb-8">
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[0].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiSearch className="w-3 h-3 text-white" />
                  </div>
                  <span>Find questions by company (FAANG, startups, etc.)</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[0].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiCode className="w-3 h-3 text-white" />
                  </div>
                  <span>Random question generator for varied practice</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[0].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiClock className="w-3 h-3 text-white" />
                  </div>
                  <span>Timed practice sessions with performance tracking</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[0].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiTrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <span>Visual learning with algorithm animations</span>
                </motion.li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => navigate("/dsa")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore DSA Questions
                </motion.button>
              </div>
            </div>
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gray-900 rounded-3xl p-1 h-[28rem] flex items-center justify-center overflow-hidden border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/10 z-0"></div>
                <div className="relative w-full h-full bg-gray-900/50 rounded-2xl flex items-center justify-center z-10">
                  <img
                    src="./DSA.png"
                    alt="DSA questions by company"
                    className="rounded-2xl object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity p-2 "
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Aptitude Section */}
      <section className="py-24 relative overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="absolute inset-0 w-full h-full fill-blue-900/10 [mask-image:radial-gradient(white,transparent_70%)]"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row-reverse items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="lg:w-1/2">
              <span className="inline-block bg-gradient-to-br from-blue-500 to-cyan-500 text-transparent bg-clip-text text-sm font-semibold mb-4">
                APTITUDE TRAINING
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
                Comprehensive Aptitude Prep
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Master quantitative, verbal, and logical reasoning with our
                structured learning approach.
              </p>
              <ul className="space-y-4 text-gray-300 mb-8">
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[1].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiBookOpen className="w-3 h-3 text-white" />
                  </div>
                  <span>
                    Conceptual tips for quant, verbal, and logical reasoning
                  </span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[1].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiBarChart2 className="w-3 h-3 text-white" />
                  </div>
                  <span>Data interpretation practice sets</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[1].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiClock className="w-3 h-3 text-white" />
                  </div>
                  <span>Timed practice sessions with detailed solutions</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[1].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiTrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <span>Performance analytics to track improvement</span>
                </motion.li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => navigate("/aptitude")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Aptitude Prep
                </motion.button>
              </div>
            </div>
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gray-900 rounded-3xl p-1 h-[28rem] flex items-center justify-center overflow-hidden border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 z-0"></div>
                <div className="relative w-full h-full bg-gray-900/50 rounded-2xl flex items-center justify-center z-10">
                  <img
                    src="./Aptitude.png"
                    alt="Aptitude training interface"
                    className="rounded-2xl object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity p-2 "
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-24 relative overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="absolute inset-0 w-full h-full fill-amber-900/10 [mask-image:radial-gradient(white,transparent_70%)]"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="lg:w-1/2">
              <span className="inline-block bg-gradient-to-br from-amber-500 to-orange-500 text-transparent bg-clip-text text-sm font-semibold mb-4">
                QUIZ PLATFORM
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
                MCQ Interview Practice
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Prepare for technical interviews with our extensive quiz bank
                covering all major topics.
              </p>
              <ul className="space-y-4 text-gray-300 mb-8">
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[2].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiAward className="w-3 h-3 text-white" />
                  </div>
                  <span>Topic-wise quizzes (DBMS, OS, Networks, etc.)</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[2].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiClock className="w-3 h-3 text-white" />
                  </div>
                  <span>Timed tests simulating real interview conditions</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[2].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiBookOpen className="w-3 h-3 text-white" />
                  </div>
                  <span>Detailed explanations for each question</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[2].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiTrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <span>Performance tracking with analytics</span>
                </motion.li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => navigate("/quiz")}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Quizzes
                </motion.button>
              </div>
            </div>
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gray-900 rounded-3xl p-1 h-[28rem] flex items-center justify-center overflow-hidden border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-orange-900/10 z-0"></div>
                <div className="relative w-full h-full bg-gray-900/50 rounded-2xl flex items-center justify-center z-10">
                  <img
                    src="./Quiz.png"
                    alt="Quiz interface"
                    className="rounded-2xl object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity p-2 "
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-24 relative overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="absolute inset-0 w-full h-full fill-teal-900/10 [mask-image:radial-gradient(white,transparent_70%)]"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row-reverse items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="lg:w-1/2">
              <span className="inline-block bg-gradient-to-br from-teal-500 to-green-500 text-transparent bg-clip-text text-sm font-semibold mb-4">
                PERSONAL DASHBOARD
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
                Your Learning Hub
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Track all your progress in one place with our comprehensive
                dashboard.
              </p>
              <ul className="space-y-4 text-gray-300 mb-8">
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[3].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiUser className="w-3 h-3 text-white" />
                  </div>
                  <span>Personal information and account management</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[3].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiCode className="w-3 h-3 text-white" />
                  </div>
                  <span>DSA progress tracking with skill matrix</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[3].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiAward className="w-3 h-3 text-white" />
                  </div>
                  <span>Quiz performance history and analytics</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-gradient-to-br ${features[3].color} w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0`}
                  >
                    <FiTrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <span>Personalized recommendations for improvement</span>
                </motion.li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Dashboard
                </motion.button>
              </div>
            </div>
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gray-900 rounded-3xl p-1 h-[28rem] flex items-center justify-center overflow-hidden border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-green-900/10 z-0"></div>
                <div className="relative w-full h-full bg-gray-900/50 rounded-2xl flex items-center justify-center z-10">
                  <img
                    src="./DashBoard.png"
                    alt="Dashboard interface"
                    className="rounded-2xl object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity p-2 "
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-green-500/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
