import React, { useState } from "react";
import { Link } from "react-router-dom";

const DataInter = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [activeBar, setActiveBar] = useState(null);

  // Topic data with examples
  const topics = [
    {
      name: "Tables",
      description:
        "Analyze and extract information from tabular data presentations.",
      example: "Sales data across quarters for multiple products",
      icon: "📊",
      tips: [
        "Look for row/column headers first",
        "Watch for units (thousands, millions, etc.)",
        "Check for totals and subtotals",
      ],
    },
    {
      name: "Charts",
      description:
        "Interpret bar charts, pie charts, and other visual data representations.",
      example: "Market share distribution as a pie chart",
      icon: "📈",
      tips: [
        "Note chart type and axes labels",
        "Compare relative sizes in pie charts",
        "Estimate values when exact numbers aren't given",
      ],
    },
    {
      name: "Graphs",
      description:
        "Understand line graphs, scatter plots, and complex graphical data.",
      example: "Temperature fluctuations over a year as line graph",
      icon: "📉",
      tips: [
        "Identify trends (increasing, decreasing, fluctuating)",
        "Look for intersection points",
        "Check scale of both axes",
      ],
    },
    {
      name: "Case Studies",
      description:
        "Analyze complex business scenarios with multiple data sources.",
      example: "Company performance with financial and operational data",
      icon: "📋",
      tips: [
        "Read questions before examining data",
        "Focus on relevant data points",
        "Watch for time periods in comparisons",
      ],
    },
  ];

  // Sample data for interactive chart
  const sampleChartData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    sales: [120, 190, 150, 200],
    expenses: [80, 110, 95, 120],
  };

  // Calculate profits
  const profits = sampleChartData.sales.map(
    (sale, i) => sale - sampleChartData.expenses[i]
  );
  const averageExpense = (
    sampleChartData.expenses.reduce((a, b) => a + b, 0) /
    sampleChartData.expenses.length
  ).toFixed(1);

  const handleBarHover = (index) => {
    setActiveBar(index);
  };

  const handleBarLeave = () => {
    setActiveBar(null);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">
            Data Interpretation
          </h1>
          <p className="text-gray-400">
            Develop skills to analyze and interpret complex data sets
          </p>
        </div>

        {/* Back button */}
        <Link
          to="/aptitude"
          className="inline-flex items-center mb-6 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
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

        {/* Interactive Demo */}
        <div className="mb-10 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold text-amber-400 mb-4">
            Interactive Chart Interpretation
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Interactive Chart */}
              <div className="bg-gray-750 p-5 rounded-lg">
                <div className="flex justify-between items-end h-64 border-b-2 border-l-2 border-amber-400/30 pb-2 pl-2">
                  {sampleChartData.labels.map((label, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className="flex items-end space-x-1.5 h-52"
                        onMouseEnter={() => handleBarHover(i)}
                        onMouseLeave={handleBarLeave}
                      >
                        <div
                          className={`w-5 ${
                            activeBar === i ? "bg-amber-400" : "bg-amber-500"
                          } rounded-t-md transition-all duration-200 shadow-md`}
                          style={{ height: `${sampleChartData.sales[i]}px` }}
                        ></div>
                        <div
                          className={`w-5 ${
                            activeBar === i ? "bg-amber-600" : "bg-amber-700"
                          } rounded-t-md transition-all duration-200 shadow-md`}
                          style={{ height: `${sampleChartData.expenses[i]}px` }}
                        ></div>
                      </div>
                      <span
                        className={`text-sm mt-2 ${
                          activeBar === i
                            ? "font-bold text-amber-400"
                            : "text-gray-300"
                        }`}
                      >
                        {label}
                        {activeBar === i && (
                          <span className="block text-xs font-normal text-gray-400 mt-1">
                            Sales: ${sampleChartData.sales[i]}K<br />
                            Expenses: ${sampleChartData.expenses[i]}K
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-6 mt-5">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
                    <span className="text-sm">Sales ($K)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-amber-700 rounded-sm mr-2"></div>
                    <span className="text-sm">Expenses ($K)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-4 text-gray-200">
                Questions:
              </h3>
              <ol className="list-decimal pl-5 space-y-4">
                <li className="text-base">
                  Which quarter had the highest profit margin?
                  {showAnswers && (
                    <span className="block mt-2 font-medium text-amber-400 bg-gray-700 p-2 rounded-md">
                      Answer: Q4 (Profit: ${profits[3]}K)
                    </span>
                  )}
                </li>
                <li className="text-base">
                  What was the average expense across all quarters?
                  {showAnswers && (
                    <span className="block mt-2 font-medium text-amber-400 bg-gray-700 p-2 rounded-md">
                      Answer: ${averageExpense}K
                    </span>
                  )}
                </li>
                <li className="text-base">
                  In which quarter did sales increase but expenses decrease?
                  {showAnswers && (
                    <span className="block mt-2 font-medium text-amber-400 bg-gray-700 p-2 rounded-md">
                      Answer: Q3 (Sales: +
                      {sampleChartData.sales[2] - sampleChartData.sales[1]}K,
                      Expenses: -
                      {sampleChartData.expenses[1] -
                        sampleChartData.expenses[2]}
                      K)
                    </span>
                  )}
                </li>
              </ol>
              <button
                onClick={toggleAnswers}
                className="mt-6 px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors font-medium flex items-center justify-center shadow-md hover:shadow-amber-500/20"
              >
                {showAnswers ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                    Hide Answers
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Show Answers
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700 hover:border-amber-400/30 hover:shadow-amber-400/10 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 group-hover:text-amber-400 transition-colors">
                {topic.icon}
              </div>
              <h2 className="text-xl font-semibold text-amber-400 mb-3">
                {topic.name}
              </h2>
              <p className="text-gray-300 text-sm mb-4">{topic.description}</p>

              <div className="bg-gray-750 p-3 rounded-lg mb-5 border border-gray-700">
                <span className="font-medium text-amber-400 text-sm">
                  Example:
                </span>
                <p className="text-sm mt-1 text-gray-300">{topic.example}</p>
              </div>

              <div className="mb-5">
                <h4 className="font-medium text-amber-400 text-sm mb-2">
                  Quick Tips:
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-400">
                  {topic.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/aptitude/data-interpretation/${topic.name
                    .toLowerCase()
                    .replace(/ & /g, "_")
                    .replace(/ /g, "_")}`}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 text-sm flex-1 text-center font-medium transition-colors shadow-md hover:shadow-amber-500/20 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Practice
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Data Analysis Framework */}
        <div className="mt-12 p-8 bg-gray-800 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-semibold text-amber-400 mb-6">
            Data Interpretation Framework
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700 hover:border-amber-400/30 transition-colors">
              <h4 className="font-medium text-lg mb-3 text-amber-400">
                1. Understand
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                <li>What data is presented</li>
                <li>Units of measurement</li>
                <li>Time periods covered</li>
                <li>Key variables and metrics</li>
              </ul>
            </div>
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700 hover:border-amber-400/30 transition-colors">
              <h4 className="font-medium text-lg mb-3 text-amber-400">
                2. Analyze
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                <li>Look for patterns/trends</li>
                <li>Compare different data sets</li>
                <li>Calculate percentages/ratios</li>
                <li>Identify outliers</li>
              </ul>
            </div>
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700 hover:border-amber-400/30 transition-colors">
              <h4 className="font-medium text-lg mb-3 text-amber-400">
                3. Verify
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                <li>Check calculations</li>
                <li>Ensure logical consistency</li>
                <li>Watch for distractors</li>
                <li>Cross-validate with given data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Tips Section */}
        <div className="mt-12 p-8 bg-gray-800 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-semibold text-amber-400 mb-6">
            Pro Tips for Data Interpretation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2 text-gray-200">
                  Time Management
                </h4>
                <p className="text-sm text-gray-400">
                  Allocate time based on question difficulty. Skip complex
                  calculations initially and return if time permits.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2 text-gray-200">
                  Approximation
                </h4>
                <p className="text-sm text-gray-400">
                  Use estimation techniques when exact calculations aren't
                  necessary to save time.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2 text-gray-200">
                  Annotation
                </h4>
                <p className="text-sm text-gray-400">
                  Mark important data points directly on charts/tables to
                  quickly reference them later.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-amber-500/20 p-2 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2 text-gray-200">
                  Common Traps
                </h4>
                <p className="text-sm text-gray-400">
                  Be aware of percentage vs. absolute value confusion and
                  mismatched time periods in comparisons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInter;
