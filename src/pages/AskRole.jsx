import React from "react";
import { useNavigate } from "react-router-dom";

const AskRole = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    // Agar admin roli tanlansa, adminni login sahifasiga yo'naltiramiz
    if (role === "admin") {
      navigate("/login"); // Login sahifasiga yo'naltirish
    } else if (role === "student") {
      navigate("/studentLogin");
    } else if (role === "teacher") {
      navigate("/teacherLogin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <div
          onClick={() => handleSelection("admin")}
          className="flex flex-col items-center justify-center p-6 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
        >
          <h3 className="text-xl font-semibold mb-2">Admin</h3>
          <p>Admin sifatida tizimga kirish</p>
        </div>
        <div
          onClick={() => handleSelection("student")}
          className="flex flex-col items-center justify-center p-6 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition"
        >
          <h3 className="text-xl font-semibold mb-2">O'quvchi</h3>
          <p>O'quvchi sifatida tizimga kirish</p>
        </div>
        <div
          onClick={() => handleSelection("teacher")}
          className="flex flex-col items-center justify-center p-6 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition"
        >
          <h3 className="text-xl font-semibold mb-2">O'qituvchi</h3>
          <p>O'qituvchi sifatida tizimga kirish</p>
        </div>
      </div>
    </div>
  );
};

export default AskRole;
