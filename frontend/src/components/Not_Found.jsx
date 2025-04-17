import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

const Not_Found = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Animated GIF */}
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 mb-6">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJkY3V5dW1iY2V3aGJtZ3JjZ2RrZzN6eGJ2dWZ5d2R0d2J5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14uQ3cOFteDaU/giphy.gif"
              alt="404 Not Found"
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute inset-0 bg-indigo-900/10 rounded-lg mix-blend-multiply"></div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Not_Found;
