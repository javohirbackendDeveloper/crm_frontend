import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  GroupIcon,
  User2Icon,
  UserCheck2,
  ChartNoAxesColumn,
  ShareIcon,
  CheckCircle,
  CircleDollarSign,
  Store,
  StoreIcon,
  ShoppingCart,
  ListOrdered,
  TruckIcon,
} from "lucide-react";
import authStore from "../stores/auth.store";

function Sidebar({ sidebartoggle }) {
  const user = JSON.parse(window.localStorage.getItem("user")) || null;
  const [isLoggedInTeacher, setIsLoggedInTeacher] = useState(false);
  const [isLoggedInStudent, setIsLoggedInStudent] = useState(false);
  // Sahifa yuklanganda localStorage'dan qiymatlarni olish
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

  const isSidebarVisible =
    (!user && !isLoggedInTeacher && !isLoggedInStudent) || sidebartoggle;

  return (
    <div
      className={`${
        isSidebarVisible ? "hidden" : "block"
      } w-64 bg-gray-800 fixed h-full px-4 py-2 transition-all duration-300`}
    >
      <div className="my-2 mb-4">
        <h1 className="text-2xl text-white font-bold">
          {isLoggedInTeacher && "Teacher Dashboard"}
          {isLoggedInStudent && "Student Dashboard"}
          {user && "Admin Dashboard"}
        </h1>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold">
        {/* Home link */}
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link className="px-3" to="/">
            <Home className="inline-block w-6 h-6 mr-2 -mt-2" />
            Home
          </Link>
        </li>

        {/* Admin Links */}
        {user && !isLoggedInTeacher && !isLoggedInStudent && (
          <>
            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/teachers">
                <UserCheck2 className="inline-block w-6 h-6 mr-2 -mt-2" />
                Teachers
              </Link>
            </li>
            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/post">
                <ShareIcon className="inline-block w-6 h-6 mr-2 -mt-2" />
                Post joylash
              </Link>
            </li>
            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/payment">
                <CircleDollarSign className="inline-block w-6 h-6 mr-2 -mt-2" />
                To'lov qilish
              </Link>
            </li>
          </>
        )}

        {/* Teacher or Admin Links */}
        {(user || isLoggedInTeacher || !isLoggedInStudent) && (
          <>
            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/students">
                <User2Icon className="inline-block w-6 h-6 mr-2 -mt-2" />
                Students
              </Link>
            </li>
          </>
        )}
        {(user || !isLoggedInTeacher || isLoggedInStudent) && (
          <>
            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/orders">
                <TruckIcon className="inline-block w-6 h-6 mr-2 -mt-2" />
                {(user && "Buyurtmalar") ||
                  (isLoggedInStudent && "Buyurtmalarim")}
              </Link>
            </li>
          </>
        )}

        {/* Teacher, Admin or Student Links */}
        {(user || isLoggedInTeacher || isLoggedInStudent) && (
          <>
            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/groups">
                <GroupIcon className="inline-block w-6 h-6 mr-2 -mt-2" />
                Groups
              </Link>
            </li>

            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/statistics">
                <ChartNoAxesColumn className="inline-block w-6 h-6 mr-2 -mt-2" />
                Statistics
              </Link>
            </li>
            <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <Link className="px-3" to="/market">
                <ShoppingCart className="inline-block w-6 h-6 mr-2 -mt-2" />
                Do'kon
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
