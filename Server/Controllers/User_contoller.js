const User = require("../Models/User_models");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      confirmPassword,
      address,
      phone,
      dob,
      gender,
      images,
    } = req.body;

    // Validate required fields
    const requiredFields = { fullname, email, password, confirmPassword };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      const errors = missingFields.reduce((acc, field) => {
        acc[field] = `${
          field === "fullname"
            ? "Full name"
            : field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        errors,
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        errors: { email: "Please enter a valid email address" },
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
        errors: { confirmPassword: "Passwords must match" },
      });
    }

    // Validate phone if provided
    if (phone && !/^[0-9+]{10,15}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
        errors: { phone: "Please enter a valid phone number" },
      });
    }

    // Validate date if provided
    if (dob && isNaN(new Date(dob).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
        errors: { dob: "Please enter a valid date" },
      });
    }

    // Validate gender if provided
    if (gender && !["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender",
        errors: { gender: "Gender must be Male, Female, or Other" },
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
        errors: { email: "This email is already registered" },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullname,
      email: email.toLowerCase(),
      password: hashedPassword,
      ...(address && { address }),
      ...(phone && { phone }),
      ...(dob && { dob: new Date(dob) }),
      ...(gender && { gender }),
      images: images || [],
    });

    // Return response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        address: user.address,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
const login = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body is missing",
        success: false,
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        errors: {
          email: !email ? "Email is required" : undefined,
          password: !password ? "Password is required" : undefined,
        },
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        errors: { email: "No account found with this email" },
      });
    }

    // Check password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
        errors: { password: "Incorrect password" },
      });
    }

    // Return complete user data (except password)
    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        address: user.address,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    console.log("Fetching user with email:", email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prepare response
    const responseData = {
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dob: user.dob,
        images: user.images || [],
      },
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { userId, images } = req.body;

    // Validate input
    if (!userId || !images || !Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { images } },
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password from the response

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUserByEmail,
  updateProfile,
};
