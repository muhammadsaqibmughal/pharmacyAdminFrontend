import React, { useState } from 'react';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies or session storage here
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    // Navigate to the login page after logout
    navigate('/admin/login');
  };

  return (
    <div className="bg-[#298aaa] w-[80rem] h-16 flex items-center justify-between px-6  fixed top-0 z-50 sm:ml-64">

      {/* Right side (user profile and logout dropdown) */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="flex items-center text-white"
        >
          <MdAccountCircle className="w-6 h-6 mr-2" />
          <span className="hidden sm:block">Admin</span>
        </button>

        {/* Dropdown for logout */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-[#f8f8f8] rounded-md w-full"
            >
              <MdLogout className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
