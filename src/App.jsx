import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Groups from "./pages/Groups";
import Statistics from "./pages/Statistics";
import Post from "./pages/Post";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import AskRole from "./pages/AskRole";
import authStore from "./stores/auth.store";
import { teacherCrm } from "./stores/teacher.crm";
import studentCrm from "./stores/student.crm";
import GetOneStudent from "./pages/GetOneStudent";
import GetOneGroup from "./pages/GetOneGroup";
import GetOneTeacher from "./pages/GetOneTeacher";
// import Attendance from "./pages/Attendance";
import Market from "./pages/Market";
import GetOneProduct from "./pages/GetOneProduct";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Payments from "./pages/Payments";

function App() {
  const [sidebartoggle, setsidebartoggle] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user")) || null;
  // const { checkAuth } = authStore();

  const isLoggedInTeacher = window.localStorage.getItem("isLoggedInTeacher");
  const isLoggedInStudent = window.localStorage.getItem("isLoggedInStudent");
  const currentStudent = window.localStorage.getItem("currentStudent");
  const currentTeacher = window.localStorage.getItem("currentTeacher");

  // useEffect(() => {
  //   checkAuth();
  // }, [
  //   checkAuth,
  //   currentStudent,
  //   currentTeacher,
  //   isLoggedInStudent,
  //   isLoggedInTeacher,
  // ]);

  const shouldRedirectToAskRole =
    !user && !isLoggedInTeacher && !isLoggedInStudent;

  console.log(user);

  return (
    <>
      <div className="flex">
        <Sidebar sidebartoggle={sidebartoggle} />
        <div className={`flex-1 ${sidebartoggle ? "ml-0" : "ml-64"}`}>
          {user || isLoggedInTeacher || isLoggedInStudent ? (
            <Navbar
              sidebartoggle={sidebartoggle}
              setsidebartoggle={setsidebartoggle}
            />
          ) : (
            ""
          )}

          <Routes>
            <Route
              path="/"
              element={shouldRedirectToAskRole ? <AskRole /> : <Home />}
            />
            <Route
              path="/register"
              element={
                user || isLoggedInTeacher ? <Navigate to="/" /> : <Register />
              }
            />
            <Route
              path="/login"
              element={
                user || isLoggedInTeacher ? <Navigate to="/" /> : <Login />
              }
            />
            <Route
              path="/students"
              element={user || isLoggedInTeacher ? <Students /> : <AskRole />}
            />
            <Route
              path="/teachers"
              element={user ? <Teachers /> : <AskRole />}
            />
            <Route
              path="/groups"
              element={
                user || isLoggedInTeacher || isLoggedInStudent ? (
                  <Groups />
                ) : (
                  <AskRole />
                )
              }
            />
            <Route
              path="/statistics"
              element={
                user || isLoggedInTeacher || isLoggedInStudent ? (
                  <Statistics />
                ) : (
                  <AskRole />
                )
              }
            />
            <Route path="/post" element={user ? <Post /> : <AskRole />} />
            <Route path="/studentLogin" element={<StudentLogin />} />
            <Route path="/teacherLogin" element={<TeacherLogin />} />
            <Route path="/askRole" element={<AskRole />} />
            <Route
              path="/student/getOneStudent/:id"
              element={<GetOneStudent />}
            />
            <Route path="/group/getOneGroup/:id" element={<GetOneGroup />} />
            <Route
              path="/teacher/getOneTeacher/:teacher_id"
              element={<GetOneTeacher />}
            />
            <Route path="/payment" element={<Payments />} />
            <Route path="/market" element={<Market />} />
            <Route
              path="/getOneProduct/:product_id"
              element={<GetOneProduct />}
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
