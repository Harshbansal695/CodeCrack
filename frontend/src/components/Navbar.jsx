import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ user, setUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `${
              process.env.REACT_APP_URL
            }/api/v1/user/by-email?email=${encodeURIComponent(user.email)}`
          );
          if (response.data.success) {
            setUserDetails(response.data.user);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [isLoggedIn, user]);

  const handleLogout = async () => {
    setShowDropdown(false);

    try {
      await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      sessionStorage.removeItem("user");

      setUser(null);
      setUserDetails(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      setUser(null);
      setUserDetails(null);
      toast.error("Session expired. Please log in again.");
      navigate("/");
    }
  };

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      toast.warning("Please log in to access this feature");
      navigate("/login", { state: { from: path } });
    }
  };

  return (
    <>
      <div className="h-20" />
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0E26]/95 backdrop-blur-md py-2 shadow-xl"
            : "bg-[#0D0E26] py-3"
        } border-b border-[#1A1B38]/50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 group-hover:from-purple-500 group-hover:via-pink-600 group-hover:to-rose-600 transition-all duration-500">
                  Code
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-500">
                  Crack
                </span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-[#C5C6EF] hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
                </Link>
                <button
                  onClick={() => handleProtectedNavigation("/dsa")}
                  className="text-[#C5C6EF] hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  DSA
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
                </button>
                <button
                  onClick={() => handleProtectedNavigation("/aptitude")}
                  className="text-[#C5C6EF] hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  Aptitude
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
                </button>
                <button
                  onClick={() => handleProtectedNavigation("/quiz")}
                  className="text-[#C5C6EF] hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  Quiz
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-2 focus:outline-none group"
                    >
                      {userDetails?.images?.[0] ? (
                        <img
                          src={userDetails.images[0]}
                          alt="Profile"
                          className="h-9 w-9 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              userDetails?.fullname || "U"
                            )}&background=random`;
                          }}
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all duration-300">
                          <span className="text-white text-sm font-bold">
                            {userDetails?.fullname?.charAt(0).toUpperCase() ||
                              "U"}
                          </span>
                        </div>
                      )}
                      <svg
                        className={`w-4 h-4 text-[#C5C6EF] transition-transform duration-200 ${
                          showDropdown ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {showDropdown && (
                      <div
                        className="absolute right-0 mt-2 w-56 bg-[#1A1B38] rounded-xl shadow-2xl py-1 z-50 border border-[#3A3B6E] overflow-hidden"
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        <div className="px-4 py-3 border-b border-[#3A3B6E]">
                          <p className="text-sm text-white font-medium">
                            {userDetails?.fullname || "User"}
                          </p>
                          <p className="text-xs text-[#9B9CE6] truncate">
                            {userDetails?.email || ""}
                          </p>
                        </div>
                        <Link
                          to="/dashboard"
                          className=" px-4 py-3 text-[#C5C6EF] hover:bg-[#0D0E26] transition-all duration-200 flex items-center space-x-2 hover:text-white"
                          onClick={() => setShowDropdown(false)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span>Dashboard</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-[#C5C6EF] hover:bg-[#0D0E26] transition-all duration-200 flex items-center space-x-2 hover:text-white"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
