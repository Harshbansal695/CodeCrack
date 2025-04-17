import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LeetCodeDashboard from "./dsa/LeetCodeDashboard";
import Solution_dsa from "./dsa/Solution_dsa";
import Aptitude from "./aptitude/Aptitude";
import Quant from "./aptitude/Quant";
import Logical from "./aptitude/Logical";
import Verbal from "./aptitude/Verbal";
import Data_Inter from "./aptitude/Data_Inter";
import Login from "./components/Login";
import Register from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Quantquiz from "./aptitude/Pages/Quantquiz";
import Logicalquiz from "./aptitude/Pages/Logicalquiz";
import Verbalquiz from "./aptitude/Pages/Verbalquiz";
import DIquiz from "./aptitude/Pages/DIquiz";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quizes from "./Quiz/Quizes";
import Quize from "./Quiz/Quize";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Not_Found from "./components/Not_Found";

// Loading Component
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
  </div>
);

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
          <ToastContainer position="top-right" autoClose={5000} />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/*" element={<Not_Found user={user} />} />
            <Route
              path="/login"
              element={
                <PublicRoute user={user}>
                  <Login setUser={setUser} />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute user={user}>
                  <Register setUser={setUser} />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dsa"
              element={
                <ProtectedRoute user={user}>
                  <LeetCodeDashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dsa/solution"
              element={
                <ProtectedRoute user={user}>
                  <Solution_dsa user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude"
              element={
                <ProtectedRoute user={user}>
                  <Aptitude user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/quantitative"
              element={
                <ProtectedRoute user={user}>
                  <Quant user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/quantitative/:subtopic"
              element={
                <ProtectedRoute user={user}>
                  <Quantquiz user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/logical"
              element={
                <ProtectedRoute user={user}>
                  <Logical user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/logical/:subtopic"
              element={
                <ProtectedRoute user={user}>
                  <Logicalquiz user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/verbal"
              element={
                <ProtectedRoute user={user}>
                  <Verbal user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/verbal/:subtopic"
              element={
                <ProtectedRoute user={user}>
                  <Verbalquiz user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/data-interpretation"
              element={
                <ProtectedRoute user={user}>
                  <Data_Inter user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aptitude/data-interpretation/:subtopic"
              element={
                <ProtectedRoute user={user}>
                  <DIquiz user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute user={user}>
                  <Quizes user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quize"
              element={
                <ProtectedRoute user={user}>
                  <Quize user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutUs user={user} />} />
            <Route path="/contact" element={<ContactUs user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
