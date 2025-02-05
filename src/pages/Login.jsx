import React, { useState } from "react";
import { Lock, User } from "lucide-react"; // Lucide ikonalari
import authStore from "../stores/auth.store";
import { Link } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = authStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Email Address
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <User className="text-gray-600 w-5 h-5 mr-3" />
              <input
                type="email"
                id="email"
                className="w-full focus:outline-none border-none"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <Lock className="text-gray-600 w-5 h-5 mr-3" />
              <input
                type="password"
                id="password"
                className="w-full focus:outline-none border-none"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Forgot password link */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
            Forgot your password?
          </a>
        </div>

        {/* Sign up link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
