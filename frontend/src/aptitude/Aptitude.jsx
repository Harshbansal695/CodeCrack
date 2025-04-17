import React from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Using slim version for better performance

const Aptitude = () => {
  const navigate = useNavigate();

  // Initialize particles
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Card data with route paths
  const cards = [
    {
      title: "Quantitative Aptitude",
      topics: ["Percentage", "Profit & Loss", "Time & Work", "Algebra"],
      gradient: "from-purple-600 to-blue-600",
      hoverGradient: "from-purple-700 to-blue-700",
      textColor: "text-blue-100",
      route: "/aptitude/quantitative",
      icon: (
        <svg
          className="w-10 h-10 mb-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Logical Reasoning",
      topics: ["Puzzles", "Syllogism", "Coding-Decoding", "Blood Relations"],
      gradient: "from-indigo-600 to-purple-600",
      hoverGradient: "from-indigo-700 to-purple-700",
      textColor: "text-purple-100",
      route: "/aptitude/logical",
      icon: (
        <svg
          className="w-10 h-10 mb-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Verbal Ability",
      topics: ["Grammar", "Vocabulary", "Comprehension", "Para Jumbles"],
      gradient: "from-blue-600 to-teal-600",
      hoverGradient: "from-blue-700 to-teal-700",
      textColor: "text-teal-100",
      route: "/aptitude/verbal",
      icon: (
        <svg
          className="w-10 h-10 mb-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Data Interpretation",
      topics: ["Tables", "Charts", "Graphs", "Case Studies"],
      gradient: "from-teal-600 to-emerald-600",
      hoverGradient: "from-teal-700 to-emerald-700",
      textColor: "text-emerald-100",
      route: "/aptitude/data-interpretation",
      icon: (
        <svg
          className="w-10 h-10 mb-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  const handlePracticeClick = (route) => {
    navigate(route);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {" "}
        {/* Added explicit dimensions */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false }, // Disable fullscreen to work with your layout
            background: {
              color: "transparent",
            },
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.3,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.1,
                  sync: false,
                },
              },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                outModes: "out",
                bounce: false,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                onClick: {
                  enable: true,
                  mode: "push",
                },
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 0.5,
                  },
                },
                push: {
                  quantity: 4,
                },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 pt-24">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Aptitude Preparation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 group`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="mb-6">
                  {card.icon}
                  <h2 className={`text-2xl font-bold mb-4 text-white`}>
                    {card.title}
                  </h2>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {card.topics.map((topic, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-white mr-3"></span>
                      <span className="text-white/90">{topic}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePracticeClick(card.route)}
                  className={`w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white mt-auto`}
                >
                  Practice Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aptitude;
