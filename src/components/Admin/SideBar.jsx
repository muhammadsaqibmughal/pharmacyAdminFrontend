import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdLocalPharmacy,
  MdExpandMore,
  MdCheckCircle,
  MdHourglassEmpty,
  MdAccountCircle,
  MdPerson,
  MdLock,
  MdNotifications,
  MdLogout,
  MdFormatAlignLeft,
} from "react-icons/md";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPharmacyOpen, setPharmacyOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const clearAllCookies = () => {
    localStorage.clear();
  };

  const handleLogout = () => {
    clearAllCookies();
    navigate("/admin/login");
  };

  const handleMainTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    // Close both Pharmacy and Account dropdowns when switching main tabs
    setPharmacyOpen(false);
    setAccountOpen(false);
  };

  const handlePharmacyClick = () => {
    setPharmacyOpen(!isPharmacyOpen);
    setAccountOpen(false); // auto close account when pharmacy opens
    setActiveTab("pharmacy");
  };

  const handleAccountClick = () => {
    setAccountOpen(!isAccountOpen);
    setPharmacyOpen(false); // auto close pharmacy when account opens
    setActiveTab("account");
  };

  const handleInnerTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        type="button"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-[#298aaa] focus:outline-none focus:ring-2 focus:ring-[#298aaa]"
        aria-label="Toggle sidebar"
      >
        <MdFormatAlignLeft className="w-6 h-6 transition-transform" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#298aaa] shadow-md transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 flex flex-col`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-6 overflow-y-auto flex-1 flex flex-col justify-between">
          {/* Logo */}
          <div className="mb-10 flex items-center justify-center space-x-2 px-6">
            <span className="text-2xl font-extrabold text-white select-none">
              Pharma
              <span className="text-[#211221]">Connect+</span>
            </span>
          </div>

          {/* Menu */}
          <ul className="space-y-4 font-medium">
            {/* Dashboard */}
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-2 rounded-lg ${
                  activeTab === "dashboard"
                    ? "bg-[#075c79] text-white"
                    : "text-white hover:bg-[#075c79]"
                }`}
                onClick={() => handleMainTabClick("dashboard")}
              >
                <MdDashboard className="w-5 h-5" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            {/* Pharmacy dropdown */}
            <li>
              <button
                type="button"
                onClick={handlePharmacyClick}
                className={`flex items-center justify-between w-full p-2 rounded-lg ${
                  activeTab === "pharmacy"
                    ? "bg-[#075c79] text-white"
                    : "text-white"
                }`}
              >
                <div className="flex items-center">
                  <MdLocalPharmacy className="w-5 h-5" />
                  <span className="ml-3">Pharmacies</span>
                </div>
                <MdExpandMore
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isPharmacyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`${
                  isPharmacyOpen ? "block" : "hidden"
                } mt-2 space-y-2 pl-8`}
              >
                <li>
                  <Link
                    to="/admin/dashboard/pharmacy/approved"
                    className={`flex items-center p-2 rounded-lg ${
                      activeTab === "approved"
                        ? "bg-[#075c79] text-white"
                        : "text-white hover:bg-[#075c79]"
                    }`}
                    onClick={() => handleInnerTabClick("approved")}
                  >
                    <MdCheckCircle className="w-4 h-4" />
                    <span className="ml-2">Approved</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/pharmacy/pending"
                    className={`flex items-center p-2 rounded-lg ${
                      activeTab === "pending"
                        ? "bg-[#075c79] text-white"
                        : "text-white hover:bg-[#075c79]"
                    }`}
                    onClick={() => handleInnerTabClick("pending")}
                  >
                    <MdHourglassEmpty className="w-4 h-4" />
                    <span className="ml-2">Pending</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Account dropdown */}
            <li>
              <button
                type="button"
                onClick={handleAccountClick}
                className={`flex items-center justify-between w-full p-2 rounded-lg ${
                  activeTab === "account"
                    ? "bg-[#075c79] text-white"
                    : "text-white"
                }`}
              >
                <div className="flex items-center">
                  <MdAccountCircle className="w-5 h-5" />
                  <span className="ml-3">Manage Account</span>
                </div>
                <MdExpandMore
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isAccountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`${
                  isAccountOpen ? "block" : "hidden"
                } mt-2 space-y-2 pl-8`}
              >
                <li>
                  <Link
                    to="/admin/dashboard/account/profile"
                    className={`flex items-center p-2 rounded-lg ${
                      activeTab === "profile"
                        ? "bg-[#075c79] text-white"
                        : "text-white hover:bg-[#075c79]"
                    }`}
                    onClick={() => handleInnerTabClick("profile")}
                  >
                    <MdPerson className="w-4 h-4" />
                    <span className="ml-2">View Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/account/change-password"
                    className={`flex items-center p-2 rounded-lg ${
                      activeTab === "change-password"
                        ? "bg-[#075c79] text-white"
                        : "text-white hover:bg-[#075c79]"
                    }`}
                    onClick={() => handleInnerTabClick("change-password")}
                  >
                    <MdLock className="w-4 h-4" />
                    <span className="ml-2">Change Password</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Notifications */}
            <li>
              <Link
                to="/admin/dashboard/notifications"
                className={`flex items-center p-2 rounded-lg ${
                  activeTab === "notifications"
                    ? "bg-[#075c79] text-white"
                    : "text-white hover:bg-[#075c79]"
                }`}
                onClick={() => handleMainTabClick("notifications")}
              >
                <MdNotifications className="w-5 h-5" />
                <span className="ml-3">Notifications</span>
              </Link>
            </li>
          </ul>

          {/* Logout */}
          <div className="mt-auto pt-6 border-t border-[#298aaa]">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center p-2 rounded-lg text-white hover:bg-[#075c79] w-full"
            >
              <MdLogout className="w-5 h-5 text-[#D32F2F]" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
