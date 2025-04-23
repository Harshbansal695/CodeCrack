import React from "react";
import { FaCode, FaBrain, FaBookOpen, FaRocket } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    {
      icon: <FaCode className="text-3xl text-purple-500" />,
      title: "DSA Learning",
      description:
        "Master Data Structures and Algorithms with our interactive tutorials and challenges.",
    },
    {
      icon: <FaBookOpen className="text-3xl text-blue-500" />,
      title: "Aptitude Training",
      description:
        "Prepare for technical interviews with our comprehensive aptitude question bank.",
    },
    {
      icon: <FaBrain className="text-3xl text-pink-500" />,
      title: "Quiz System",
      description:
        "Test your knowledge with our timed quizzes and track your progress.",
    },
    {
      icon: <FaRocket className="text-3xl text-orange-500" />,
      title: "Career Boost",
      description:
        "Get interview-ready with our curated collection of company-specific questions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0E26] to-[#1A1B38] text-white pt-20 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              About CodeCrack
            </span>
          </h1>
          <p className="text-xl text-[#C5C6EF] max-w-3xl mx-auto">
            Empowering developers to master technical concepts through
            interactive learning and practice.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#1A1B38] rounded-2xl p-8 md:p-12 shadow-2xl border border-[#3A3B6E]">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Our Mission
            </span>
          </h2>
          <div className="text-center">
            <p className="text-lg text-[#C5C6EF] mb-6">
              CodeCracl is a solo project dedicated to helping developers
              improve their technical skills. I believe that mastering technical
              concepts should be accessible, engaging, and effective.
            </p>
            <p className="text-lg text-[#C5C6EF]">
              The platform combines the best learning techniques with practical
              challenges to help you excel in your technical interviews and
              coding journey, whether you're preparing for FAANG interviews or
              just starting out.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            What We Offer
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1A1B38] p-6 rounded-xl border border-[#3A3B6E] hover:border-[#6D6FCF] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-[#C5C6EF] text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            The Creator
          </span>
        </h2>
        <div className="flex justify-center">
          <div className="bg-[#1A1B38] p-8 rounded-xl border border-[#3A3B6E] max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden border-2 border-[#6D6FCF]">
                <img
                  src="/image/profile.png"
                  alt="Harsh Bansal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Harsh Bansal</h3>
            <p className="text-[#9B9CE6] mb-4">
              Full Stack Developer & DSA Enthusiast
            </p>
            <p className="text-[#C5C6EF] mb-6">
              Built this platform to help fellow developers master technical
              interview concepts through structured learning.
            </p>
            <div className="flex justify-center text-2xl">
              <a
                href="https://leetcode.com/u/harshbansal695/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D6FCF] hover:text-[#9B9CE6] transition-colors"
              >
                <SiLeetcode />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-gradient-to-r from-[#3A3B6E] to-[#1A1B38] rounded-2xl p-8 md:p-12 shadow-xl border border-[#6D6FCF]">
          <h2 className="text-3xl font-bold mb-6">
            Ready to boost your technical skills?
          </h2>
          <p className="text-xl text-[#C5C6EF] mb-8 max-w-2xl mx-auto">
            Start your journey with CodeCrack today and take your coding skills
            to the next level.
          </p>
          <Link
            to="/dsa"
            className="px-8 py-3 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
