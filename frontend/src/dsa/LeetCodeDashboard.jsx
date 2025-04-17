import React, { useState, useEffect, useMemo, useCallback } from "react";
import Papa from "papaparse";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";
const URL = "https://codecrack-jmqf.onrender.com";

// ====================== UI Components ======================
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl bg-[#0F1020] border border-[#1A1B38] shadow-2xl backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`border-b border-[#1A1B38] p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-bold text-white ${className}`}>{children}</h3>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-400 mt-2">{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Table = ({ children }) => (
  <table className="min-w-full divide-y divide-[#1A1B38]">{children}</table>
);

const TableHeader = ({ children }) => <thead>{children}</thead>;

const TableBody = ({ children }) => (
  <tbody className="divide-y divide-[#1A1B38]">{children}</tbody>
);

const TableRow = ({ children }) => (
  <tr className="hover:bg-[#1A1B38] transition-all duration-300">{children}</tr>
);

const TableHead = ({ children, className = "" }) => (
  <th
    className={`px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-[#0F1020] ${className}`}
  >
    {children}
  </th>
);

const TableCell = ({ children, className = "" }) => (
  <td
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300 bg-[#0F1020] ${className}`}
  >
    {children}
  </td>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`block w-full rounded-xl border border-[#1A1B38] px-4 py-2.5 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all duration-200 bg-[#0F1020] text-white placeholder-gray-500 ${className}`}
    {...props}
  />
);

const Select = ({ value, onChange, children, className = "" }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`block w-full rounded-xl border border-[#1A1B38] px-3 py-2.5 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-sm bg-[#0F1020] text-white ${className}`}
  >
    {children}
  </select>
);

const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className="h-4 w-4 rounded border-[#1A1B38] text-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-[#0F1020]"
  />
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const LoadingSpinner = ({ className = "" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const DifficultyBadge = ({ difficulty }) => {
  const colorMap = {
    Easy: "bg-green-900/30 text-green-300 border border-green-500/30",
    Medium: "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30",
    Hard: "bg-red-900/30 text-red-300 border border-red-500/30",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[difficulty]}`}
    >
      {difficulty}
    </span>
  );
};

const SolutionButton = ({ questionId, title }) => {
  return (
    <Button className="bg-green-900 text-green-300 hover:bg-green-800">
      <Link to={`/dsa/solution?title=${encodeURIComponent(title)}`}>
        Solution
      </Link>
    </Button>
  );
};

const TopicDropdown = ({ options, selectedOptions, setSelectedOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTopic = (topic) => {
    if (selectedOptions.includes(topic)) {
      setSelectedOptions(selectedOptions.filter((t) => t !== topic));
    } else {
      setSelectedOptions([...selectedOptions, topic]);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#2A2B4A] text-gray-300 hover:bg-[#3A3B5A]"
      >
        Topics
      </Button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-[#1A1B38] border border-[#2A2B4A]">
          <div className="py-1 max-h-60 overflow-y-auto">
            {options.map((topic) => (
              <div key={topic} className="px-4 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                    className="h-4 w-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500 bg-[#1A1B38]"
                  />
                  <span className="ml-2 block text-sm text-gray-300">
                    {topic}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Utility function
const capitalizeWords = (str) => {
  if (!str) return "";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// ====================== Main Component ======================
const LeetCodeDashboard = () => {
  // State management
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [checkedItems, setCheckedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPage, setGoToPage] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

  const companyNames = [
    "accenture",
    "accolite",
    "activision",
    "adobe",
    "aetion",
    "affinity",
    "affirm",
    "airbnb",
    "airtel",
    "akamai",
    "akuna-capital",
    "alation",
    "alibaba",
    "allincall",
    "alphonso",
    "altimetrik",
    "amazon",
    "american-express",
    "analytics-quotient",
    "appdynamics",
    "apple",
    "aqr-capital-management-llc",
    "arcesium",
    "arista-networks",
    "asana",
    "ascend",
    "athenahealth",
    "atlassian",
    "audible",
    "avalara",
    "baidu",
    "barclays",
    "bitgo",
    "blackrock",
    "blizzard",
    "bloomberg",
    "bolt",
    "bookingcom",
    "box",
    "bridgewater-associates",
    "bytedance",
    "c3-iot",
    "canonical",
    "capgemini",
    "capital-one",
    "cashfree",
    "cisco",
    "citadel",
    "citrix",
    "clari",
    "cloudera",
    "code-studio",
    "codeagon",
    "codenation",
    "coderbyte",
    "cognizant",
    "cohesity",
    "coinbase",
    "commvault",
    "coupang",
    "coursera",
    "cruise-automation",
    "dailyhunt",
    "databricks",
    "dataminr",
    "de-shaw",
    "dell",
    "deloitte",
    "deutsche-bank",
    "didi",
    "directi",
    "discord",
    "docusign",
    "doordash",
    "drawbridge",
    "dropbox",
    "drw",
    "dunzo",
    "duolingo",
    "ebay",
    "edabit",
    "electronic-arts",
    "epam-systems",
    "epic-systems",
    "epifi",
    "expedia",
    "facebook",
    "factset",
    "fallible",
    "fleetx",
    "flipkart",
    "forusall",
    "fourkites",
    "fpt",
    "garena",
    "ge-digital",
    "ge-healthcare",
    "general-electric",
    "gilt-groupe",
    "godaddy",
    "goldman-sachs",
    "google",
    "grab",
    "groupon",
    "gsn-games",
    "hbo",
    "helix",
    "honeywell",
    "hotstar",
    "houzz",
    "hrt",
    "huawei",
    "hudson-river-trading",
    "hulu",
    "ibm",
    "iit-bombay",
    "indeed",
    "info-edge",
    "infosys",
    "inmobi",
    "instacart",
    "instagram",
    "intel",
    "intuit",
    "ixl",
    "jane-street",
    "jeavio",
    "jingchi",
    "jpmorgan",
    "jump-trading",
    "juspay",
    "kakao",
    "karat",
    "leap-motion",
    "lending-club",
    "linkedin",
    "liveramp",
    "lowe",
    "lucid",
    "lyft",
    "machine-zone",
    "machinezone",
    "makemytrip",
    "maq-software",
    "mathworks",
    "medianet",
    "mercari",
    "microsoft",
    "mindtickle",
    "mindtree",
    "mishipay",
    "mobisy",
    "moengage",
    "morgan-stanley",
    "myntra",
    "nagarro",
    "national-instruments",
    "netease",
    "netflix",
    "netsuite",
    "nextjump",
    "nutanix",
    "nvidia",
    "opendoor",
    "opentext",
    "optum",
    "oracle",
    "palantir-technologies",
    "paypal",
    "paypay",
    "paytm",
    "payu",
    "persistent-systems",
    "phonepe",
    "pickrr",
    "pinterest",
    "pocket-gems",
    "point72",
    "ponyai",
    "poshmark",
    "postmates",
    "poynt",
    "pure-storage",
    "qualcomm",
    "qualtrics",
    "quince",
    "quip",
    "quora",
    "rackspace",
    "radius",
    "razorpay",
    "reddit",
    "redfin",
    "retailmenot",
    "riot-games",
    "robinhood",
    "roblox",
    "rubrik",
    "salesforce",
    "samsung",
    "sap",
    "sapient",
    "servicenow",
    "sharechat",
    "shopee",
    "siemens",
    "snapchat",
    "snapdeal",
    "societe-generale",
    "softwire",
    "sony",
    "soundhound",
    "splunk",
    "spotify",
    "sprinklr",
    "square",
    "strava",
    "sumologic",
    "swiggy",
    "t-mobiles",
    "t-system",
    "tableau",
    "tcs",
    "tencent",
    "tesla",
    "thomson-reuters",
    "tiaa",
    "tiger-analytics",
    "tiktok",
    "toptal",
    "trilogy",
    "tripadvisor",
    "triplebyte",
    "tusimple",
    "twilio",
    "twitch",
    "twitter",
    "two-sigma",
    "uber",
    "united-health-group",
    "valve",
    "veritas",
    "vimeo",
    "virtu",
    "visa",
    "vmware",
    "walmart-labs",
    "warnermedia",
    "wayfair",
    "wayve",
    "wealthfront",
    "wish",
    "wix",
    "works-applications",
    "xing",
    "yahoo",
    "yandex",
    "yatra",
    "yelp",
    "zappos",
    "zenefits",
    "zeta-suite",
    "zillow",
    "zoho",
    "zomato",
    "zoom",
    "zopsmart",
    "zscaler",
    "zynga",
  ];

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const allQuestions = [];
        let loadedCount = 0;

        for (const company of companyNames) {
          try {
            const response = await fetch(`/data/${company}.csv`);
            const csvText = await response.text();
            const parsed = Papa.parse(csvText, { header: true });

            const questions = parsed.data.slice(0, -1).map((q) => ({
              ...q,
              company,
              ID: q.id || q.ID,
              Title: q.title || q.Title,
              URL: q.url || q.URL || "",
              Difficulty: q.difficulty || q.Difficulty,
              "Acceptance %": q.acceptance || q["Acceptance %"],
              "Frequency %": q.frequency || q["Frequency %"],
              Topics: q.topics || q.Topics || "",
            }));

            allQuestions.push(...questions);
            loadedCount++;
            setProgress(Math.round((loadedCount / companyNames.length) * 100));
          } catch (err) {
            console.error(`Error loading ${company}.csv`, err);
          }
        }

        setQuestions(allQuestions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Load completed questions when component mounts
  useEffect(() => {
    const loadCompletedQuestions = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.email) return;

      try {
        setIsLoadingCompleted(true);
        const response = await fetch(
          `${URL}/api/v1/dsa/gprogress?email=${storedUser.email}`
        );

        if (!response.ok) {
          if (response.status === 404) return;
          const errorResponse = await response.json();
          throw new Error(
            errorResponse.error ||
              errorResponse.message ||
              `HTTP error! status: ${response.status}`
          );
        }

        const responseData = await response.json();

        if (
          responseData.success &&
          Array.isArray(responseData.progress.markedQuestions)
        ) {
          const completedQuestions = {};
          questions.forEach((question) => {
            if (responseData.progress.markedQuestions.includes(question.ID)) {
              completedQuestions[`${question.ID}-${question.company}`] = true;
            }
          });
          setCheckedItems(completedQuestions);
        }
      } catch (error) {
        console.error("Error loading completed questions:", error);
      } finally {
        setIsLoadingCompleted(false);
      }
    };

    loadCompletedQuestions();
  }, [questions]);

  // Calculate statistics and filtered data
  const totalQuestions = questions.length;

  const uniqueTopics = useMemo(() => {
    const topicsSet = new Set();
    questions.forEach((question) => {
      const topics = question.Topics?.split(",") || [];
      topics.forEach((topic) => {
        const trimmedTopic = topic.trim();
        if (trimmedTopic) topicsSet.add(trimmedTopic);
      });
    });
    return Array.from(topicsSet);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    const queryWords = searchQuery.trim().toLowerCase().split(/\s+/);
    return questions.filter((question) => {
      const matchesSearch = queryWords.every(
        (word) =>
          question.Title?.toLowerCase().includes(word) ||
          question.company?.toLowerCase().includes(word) ||
          question.Topics?.toLowerCase()
            .split(",")
            .some((topic) => topic.trim().includes(word))
      );
      const matchesDifficulty =
        difficultyFilter === "all" ||
        question.Difficulty?.toLowerCase() === difficultyFilter.toLowerCase();
      const matchesTopic =
        selectedTopics.length === 0 ||
        selectedTopics.every((topic) =>
          question.Topics?.split(",")
            .map((t) => t.trim())
            .includes(topic)
        );

      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [questions, searchQuery, difficultyFilter, selectedTopics]);

  const statistics = useMemo(() => {
    // Get all unique question IDs in the filtered list
    const uniqueQuestionIds = new Set(filteredQuestions.map((q) => q.ID));

    // Count difficulties for all unique questions
    const difficultyCounts = {};
    filteredQuestions.forEach((q) => {
      if (!difficultyCounts[q.ID]) {
        // Only count each question once
        const difficulty = q.Difficulty.toLowerCase();
        difficultyCounts[difficulty] = (difficultyCounts[difficulty] || 0) + 1;
        difficultyCounts[q.ID] = true; // Mark this ID as counted
      }
    });

    // Count solved questions (each unique ID only once)
    const solvedCounts = {};
    const countedSolvedIds = new Set();
    filteredQuestions.forEach((q) => {
      if (checkedItems[`${q.ID}-${q.company}`] && !countedSolvedIds.has(q.ID)) {
        const difficulty = q.Difficulty.toLowerCase();
        solvedCounts[difficulty] = (solvedCounts[difficulty] || 0) + 1;
        countedSolvedIds.add(q.ID);
      }
    });

    const totalUnique = Object.keys(difficultyCounts).filter(
      (k) => k !== "true"
    ).length;
    const totalSolvedUnique = Object.values(solvedCounts).reduce(
      (sum, count) => sum + count,
      0
    );

    return {
      total: totalUnique,
      totalSolved: totalSolvedUnique,
      easy: difficultyCounts.easy || 0,
      easySolved: solvedCounts.easy || 0,
      medium: difficultyCounts.medium || 0,
      mediumSolved: solvedCounts.medium || 0,
      hard: difficultyCounts.hard || 0,
      hardSolved: solvedCounts.hard || 0,
    };
  }, [filteredQuestions, checkedItems]);

  const pagination = useMemo(() => {
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredQuestions.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return {
      totalPages,
      currentItems,
      goToFirstPage: () => setCurrentPage(1),
      goToLastPage: () => setCurrentPage(totalPages),
      goToPreviousPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
      goToNextPage: () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
    };
  }, [filteredQuestions, currentPage, itemsPerPage]);

  const handleCheckboxChange = useCallback(
    async (question, value) => {
      if (!question) return;

      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.email) return;

      try {
        // Update local state for all instances of this question
        const newCheckedItems = { ...checkedItems };
        questions.forEach((q) => {
          if (q.ID === question.ID) {
            newCheckedItems[`${q.ID}-${q.company}`] = value;
          }
        });
        setCheckedItems(newCheckedItems);

        // Prepare the request body
        const requestBody = {
          email: storedUser.email,
          questionId: question.ID, // Only using ID now to identify unique questions
          difficulty: question.Difficulty,
          isCompleted: value,
        };

        // Make API call to update progress
        const response = await fetch(`${URL}/api/v1/dsa/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          // Revert changes if API call fails
          const originalCheckedItems = { ...checkedItems };
          setCheckedItems(originalCheckedItems);
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update progress");
        }
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    },
    [checkedItems, questions]
  );

  const handleRandomQuestion = useCallback(() => {
    if (filteredQuestions.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const randomQuestion = filteredQuestions[randomIndex];
    setRandomQuestion(randomQuestion);

    const questionIndex = filteredQuestions.findIndex(
      (q) => q.ID === randomQuestion.ID && q.company === randomQuestion.company
    );

    if (questionIndex >= 0) {
      const newPage = Math.floor(questionIndex / itemsPerPage) + 1;
      setCurrentPage(newPage);
    }
  }, [filteredQuestions, itemsPerPage]);

  useEffect(() => {
    if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
      setCurrentPage(pagination.totalPages);
    }
  }, [pagination.totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredQuestions]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0B1A] p-4 text-white">
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Loading questions... {progress}%
          </h2>
          <div className="w-full bg-[#1A1B38] rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="p-4 bg-[#0D0E26] text-red-400">Error: {error}</div>;
  if (!questions.length)
    return (
      <div className="p-4 bg-[#0D0E26] text-white">No questions found</div>
    );

  return (
    <div className="p-6 bg-[#0A0B1A] min-h-screen text-gray-200">
      {/* Random Question Modal */}
      {randomQuestion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl relative">
            <Button
              onClick={() => setRandomQuestion(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-[#1A1B38] text-gray-300 hover:bg-[#2A2B4A]"
            >
              <X className="h-5 w-5" />
            </Button>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                {randomQuestion.Title}
              </CardTitle>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/30 text-blue-300 border border-blue-500/30">
                  {capitalizeWords(randomQuestion.company)}
                </span>
                <DifficultyBadge difficulty={randomQuestion.Difficulty} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Topics</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {randomQuestion.Topics?.split(",").map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/30 text-blue-300 border border-blue-500/30"
                      >
                        {topic.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">
                    Acceptance Rate
                  </h4>
                  <p className="text-white mt-1">
                    {randomQuestion["Acceptance %"]}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://leetcode.com${randomQuestion.URL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      View on LeetCode
                    </Button>
                  </a>
                  <SolutionButton
                    questionId={randomQuestion.ID}
                    title={randomQuestion.Title}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>
            Browse through {totalQuestions.toLocaleString()} LeetCode questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#0F1020]">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-baseline">
                    <div className="text-2xl font-bold text-white">
                      {statistics.totalSolved}
                    </div>
                    <div className="text-sm text-gray-400">
                      / {statistics.total}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Total Solved</div>
                  <div className="mt-2">
                    <div className="w-full bg-[#1A1B38] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                        style={{
                          width: `${
                            (statistics.totalSolved / statistics.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Easy Card */}
              <Card className="bg-[#0F1020]">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-baseline">
                    <div className="text-2xl font-bold text-green-400">
                      {statistics.easySolved}
                    </div>
                    <div className="text-sm text-gray-400">
                      / {statistics.easy}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Easy</div>
                  <div className="mt-2">
                    <div className="w-full bg-[#1A1B38] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-500 ease-out"
                        style={{
                          width: `${
                            (statistics.easySolved / statistics.easy) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medium Card */}
              <Card className="bg-[#0F1020]">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-baseline">
                    <div className="text-2xl font-bold text-yellow-400">
                      {statistics.mediumSolved}
                    </div>
                    <div className="text-sm text-gray-400">
                      / {statistics.medium}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Medium</div>
                  <div className="mt-2">
                    <div className="w-full bg-[#1A1B38] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-500 ease-out"
                        style={{
                          width: `${
                            (statistics.mediumSolved / statistics.medium) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hard Card */}
              <Card className="bg-[#0F1020]">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-baseline">
                    <div className="text-2xl font-bold text-red-400">
                      {statistics.hardSolved}
                    </div>
                    <div className="text-sm text-gray-400">
                      / {statistics.hard}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Hard</div>
                  <div className="mt-2">
                    <div className="w-full bg-[#1A1B38] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-300 transition-all duration-500 ease-out"
                        style={{
                          width: `${
                            (statistics.hardSolved / statistics.hard) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Search by title, company, or topic..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-full pl-10 pr-4 py-2.5 ${
                      isSearchFocused
                        ? "ring-2 ring-blue-500 border-blue-500"
                        : ""
                    }`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <Select
                value={difficultyFilter}
                onChange={setDifficultyFilter}
                className="w-full md:w-52"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Select>

              <TopicDropdown
                options={uniqueTopics}
                selectedOptions={selectedTopics}
                setSelectedOptions={setSelectedTopics}
              />

              <Button
                onClick={handleRandomQuestion}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
              >
                Random Question
              </Button>
            </div>

            {/* Questions Table */}
            {filteredQuestions.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No questions found, try adjusting your filters
              </div>
            ) : (
              <div className="rounded-xl border border-[#1A1B38] bg-[#0F1020] overflow-hidden shadow-2xl">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-4"></TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Topics</TableHead>
                      <TableHead className="text-right">Acceptance</TableHead>
                      <TableHead className="text-right">Frequency</TableHead>
                      <TableHead className="text-left">Solution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagination.currentItems.map((question, index) => (
                      <TableRow key={`${question.ID}-${question.company}`}>
                        <TableCell className="w-4">
                          <Checkbox
                            checked={
                              checkedItems[
                                `${question.ID}-${question.company}`
                              ] || false
                            }
                            onChange={(value) =>
                              handleCheckboxChange(question, value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://leetcode.com${question.URL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 hover:underline"
                          >
                            {question.Title}
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="capitalize text-gray-300">
                            {capitalizeWords(question.company)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DifficultyBadge difficulty={question.Difficulty} />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {question.Topics?.split(",").map((topic, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-900/30 text-blue-300 border border-blue-500/30"
                              >
                                {topic.trim()}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-gray-300">
                          {question["Acceptance %"]}
                        </TableCell>
                        <TableCell className="text-right text-gray-300">
                          {question["Frequency %"]}
                        </TableCell>
                        <TableCell>
                          <SolutionButton
                            questionId={question.ID}
                            title={question.Title}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-6 gap-4 border-t border-[#1A1B38]">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-center">
                      <Button
                        onClick={pagination.goToFirstPage}
                        disabled={currentPage === 1}
                        className="hidden sm:flex bg-[#1A1B38] text-gray-300 hover:bg-[#2A2B4A]"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        First
                      </Button>
                      <Button
                        onClick={pagination.goToPreviousPage}
                        disabled={currentPage === 1}
                        className="bg-[#1A1B38] text-gray-300 hover:bg-[#2A2B4A]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline ml-2">Previous</span>
                      </Button>
                      <div className="text-sm font-medium text-gray-300 whitespace-nowrap">
                        {currentPage} / {pagination.totalPages}
                      </div>
                      <Button
                        onClick={pagination.goToNextPage}
                        disabled={currentPage === pagination.totalPages}
                        className="bg-[#1A1B38] text-gray-300 hover:bg-[#2A2B4A]"
                      >
                        <span className="hidden sm:inline mr-2">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={pagination.goToLastPage}
                        disabled={currentPage === pagination.totalPages}
                        className="hidden sm:flex bg-[#1A1B38] text-gray-300 hover:bg-[#2A2B4A]"
                      >
                        Last
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeetCodeDashboard;
