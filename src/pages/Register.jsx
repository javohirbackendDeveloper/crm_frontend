import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import authStore from "../stores/auth.store";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, loading } = authStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Username
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <User className="text-gray-600 w-5 h-5 mr-3" />
              <input
                type="text"
                id="username"
                className="w-full focus:outline-none border-none"
                placeholder="Enter your username"
                value={formData.username} // formData.username dan olingan qiymat
                onChange={
                  (e) => setFormData({ ...formData, username: e.target.value }) // formData-ni yangilash
                }
                required
              />
            </div>
          </div>

          {/* Email input */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Email Address
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <Mail className="text-gray-600 w-5 h-5 mr-3" />
              <input
                type="email"
                id="email"
                className="w-full focus:outline-none border-none"
                placeholder="Enter your email"
                value={formData.email} // formData.email dan olingan qiymat
                onChange={
                  (e) => setFormData({ ...formData, email: e.target.value }) // formData-ni yangilash
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
                value={formData.password} // formData.password dan olingan qiymat
                onChange={
                  (e) => setFormData({ ...formData, password: e.target.value }) // formData-ni yangilash
                }
                required
              />
            </div>
          </div>

          {/* Confirm Password input */}
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-gray-600 mb-2"
            >
              Confirm Password
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2">
              <Lock className="text-gray-600 w-5 h-5 mr-3" />
              <input
                type="password"
                id="confirmPassword"
                className="w-full focus:outline-none border-none"
                placeholder="Confirm your password"
                value={formData.confirmPassword} // formData.confirmPassword dan olingan qiymat
                onChange={
                  (e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    }) // formData-ni yangilash
                }
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
