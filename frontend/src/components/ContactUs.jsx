import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/mjkyzqav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ email: "", message: "" });
        setSubmitStatus("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-[#0D0E26] to-[#1A1B38] text-white"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Contact{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Me
          </span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-[#1A1B38] p-8 rounded-xl border border-[#3A3B6E] shadow-lg"
        >
          <div className="mb-6">
            <label className="block text-[#C5C6EF] mb-2 text-lg font-medium">
              Your email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#0D0E26] border border-[#3A3B6E] text-white focus:border-[#6D6FCF] focus:outline-none focus:ring-2 focus:ring-[#6D6FCF] transition-all"
              placeholder="Email Address"
            />
          </div>

          <div className="mb-8">
            <label className="block text-[#C5C6EF] mb-2 text-lg font-medium">
              Your message:
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 rounded-lg bg-[#0D0E26] border border-[#3A3B6E] text-white focus:border-[#6D6FCF] focus:outline-none focus:ring-2 focus:ring-[#6D6FCF] transition-all"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 w-full ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
