import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const URL = "http://localhost:4000";
const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const [image, setImage] = useState(null); // For storing the uploaded image file
  const [imagePreview, setImagePreview] = useState(null); // For displaying preview
  const [imageUrl, setImageUrl] = useState(null); // For storing Cloudinary URL
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "dsa_web"); // Replace with your upload preset
        data.append("cloud_name", "dlkalpn6z"); // Replace with your cloud name

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dlkalpn6z/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await response.json();
        setImageUrl(result.secure_url); // Store the Cloudinary URL
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    const requiredFields = ["fullname", "email", "password", "confirmPassword"];
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${
          field === "fullname"
            ? "Full name"
            : field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        isValid = false;
      }
    });

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Phone validation (if provided)
    if (formData.phone && !/^[0-9+]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        ...(formData.address && { address: formData.address }),
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.dob && { dob: formData.dob }),
        ...(formData.gender && { gender: formData.gender }),
      };

      if (imageUrl) {
        userData.images = [imageUrl];
      }

      const response = await axios.post(
        `${URL}/api/v1/user/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Account created successfully! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Complete error response:", {
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error("Please fix the errors in the form");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-amber-400">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-amber-500 hover:text-amber-400"
            >
              Sign in here
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Profile Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-300"
              >
                Profile Image (Optional)
              </label>
              <div className="mt-1 flex items-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
                <div className="ml-4">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-600 cursor-pointer"
                  >
                    Choose Image
                  </label>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="name"
                required
                value={formData.fullname}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                  errors.fullname ? "border-red-500" : "border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm`}
                placeholder="John Doe"
              />
              {errors.fullname && (
                <p className="mt-1 text-sm text-red-400">{errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                Address (Optional)
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm"
                placeholder="123 Main St, City"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300"
              >
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${
                  errors.phone ? "border-red-500" : "border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm`}
                placeholder="+1234567890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-300"
              >
                Date of Birth (Optional)
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-300"
              >
                Gender (Optional)
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
