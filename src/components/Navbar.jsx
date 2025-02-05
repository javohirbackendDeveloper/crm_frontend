import React, { useEffect, useState } from "react";
import { Tally3, CircleUser, Bell, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import authStore from "../stores/auth.store";
import { teacherCrm } from "../stores/teacher.crm";
import studentCrm from "../stores/student.crm";

function Navbar({ sidebartoggle, setsidebartoggle }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedInTeacher, setIsLoggedInTeacher] = useState(false);
  const [isLoggedInStudent, setIsLoggedInStudent] = useState(false);

  const user = JSON.parse(window.localStorage.getItem("user")) || null;

  const { logout } = authStore();
  const { currentTeacher, logoutTeacher } = teacherCrm();
  const { currentStudent, logoutStudent } = studentCrm();

  useEffect(() => {
    const teacherStatus = window.localStorage.getItem("isLoggedInTeacher");
    const studentStatus = window.localStorage.getItem("isLoggedInStudent");

    if (teacherStatus) {
      setIsLoggedInTeacher(true);
    }

    if (studentStatus) {
      setIsLoggedInStudent(true);
    }
  }, []);

  console.log(user);

  return (
    <nav className="bg-gray-800 px-4 py-3 flex justify-between w-full">
      <div className="flex items-center text-xl">
        <Tally3
          className="text-white me-4 cursor-pointer"
          onClick={() => setsidebartoggle(!sidebartoggle)}
        />
        <span className="text-white font-semibold">
          Salom{" "}
          {(user && user?.username) ||
            (isLoggedInTeacher && currentTeacher?.firstname) ||
            (isLoggedInStudent && currentStudent?.firstname) ||
            "Obunachim"}{" "}
          👋
        </span>
      </div>

      {user || isLoggedInTeacher || isLoggedInStudent ? (
        <div className="flex items-center gap-x-5">
          <div className="text-white">
            <Bell className="w-6 h-6" />
          </div>
          <div className="relative">
            <button
              className="text-white"
              onClick={() => setDropdownOpen(!isDropdownOpen)} // Dropdownni boshqarish
            >
              <CircleUser className="w-6 h-6 mt-1" />
            </button>
            {/* Click orqali ro'yxatni ko'rsatish */}
            {isDropdownOpen && (
              <div className="absolute bg-gray-800 text-white rounded-lg shadow-md w-32 top-full right-0 mt-2">
                <ul className="py-2 text-sm">
                  <Link
                    to="/profile"
                    className="px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <a href="">Profile</a>
                  </Link>

                  <Link to="/askRole">
                    <li className="px-4 py-2 rounded hover:bg-blue-600">
                      <a
                        onClick={async () => {
                          if (user) {
                            const res = await logout();
                            if (res) {
                              <Link to="/askRole"></Link>;
                            }
                          } else if (isLoggedInTeacher) {
                            const res = await logoutTeacher();
                            if (res) {
                            }
                            window.localStorage.removeItem("isLoggedInTeacher");
                          } else if (isLoggedInStudent) {
                            window.localStorage.removeItem("isLoggedInStudent");
                            await logoutStudent();
                          }
                        }}
                      >
                        Logout{" "}
                      </a>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-5">
          <Link to="/login" className="text-white flex items-center">
            <LogIn className="w-6 h-6 mr-2" /> Login
          </Link>
          <Link to="/register" className="text-white flex items-center">
            <UserPlus className="w-6 h-6 mr-2" /> Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
