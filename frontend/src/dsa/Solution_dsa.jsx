import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
const Solution_dsa = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title") || "Solution";
  const [language, setLanguage] = useState("Python");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      setError("API key missing. Check .env file and restart server.");
      console.error("Missing REACT_APP_GEMINI_API_KEY");
    } else {
      setApiReady(true);
    }
  }, []);

  const generateSolution = async () => {
    if (!title || !apiReady) {
      setError(!title ? "No question provided" : "API not configured");
      return;
    }

    setIsLoading(true);
    setError("");
    setSolution("");

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GEMINI_API_KEY
      );

      // Updated to use the correct API version and model
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest", // Updated model name
        apiVersion: "v1", // Updated API version
      });

      const prompt = `Provide a only function solution in ${language} for "${title} without explanation and without use "`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setSolution(response.text());
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.message.includes("quota")
          ? "API quota exceeded"
          : "Failed to generate solution. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4 bg-[#0D0E26] min-h-screen text-gray-200 relative">
      {/* Close Button (X) - Top Right */}
      <Link to="/dsa">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>

      <div className="max-w-4xl mx-auto pt-2">
        {" "}
        {/* Added pt-2 for spacing */}
        <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
        <div className="bg-[#1A1B38] rounded-lg border border-[#2A2B4A] p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Get Solution
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full rounded-md border border-[#2A2B4A] px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-[#1A1B38] text-white"
                disabled={isLoading}
              >
                {["Python", "JavaScript", "Java", "C++", "C"].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateSolution}
              disabled={isLoading || !apiReady}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                isLoading || !apiReady
                  ? "bg-gray-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  loading...
                </>
              ) : apiReady ? (
                "Solution"
              ) : (
                "No Solution Available"
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        {solution && (
          <div className="bg-[#1A1B38] rounded-lg border border-[#2A2B4A] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Solution in {language}
            </h2>
            <pre className="whitespace-pre-wrap font-mono text-gray-300 bg-[#2A2B4A] p-4 rounded-md">
              {solution}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solution_dsa;
