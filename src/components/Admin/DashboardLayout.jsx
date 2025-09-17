import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow pt-16 pl-64 px-5 bg-gray-100">
        {/* Added padding-top for navbar and padding-left for sidebar */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
