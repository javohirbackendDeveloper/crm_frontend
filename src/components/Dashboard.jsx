import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Home from "../pages/Home"; // Home sahifasini import qilish

function Dashboard({ sidebartoggle, setsidebartoggle }) {
  return (
    <div className="flex">
      <Sidebar sidebartoggle={sidebartoggle} />
      <div className={`flex-1 ${sidebartoggle ? "ml-0" : "ml-64"}`}>
        <Navbar
          sidebartoggle={sidebartoggle}
          setsidebartoggle={setsidebartoggle}
        />
        <Home />
      </div>
    </div>
  );
}

export default Dashboard;
