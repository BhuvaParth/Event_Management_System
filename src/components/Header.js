import React, { useState } from "react";
import { FaCog, FaBell as NotificationIcon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ onLogout, userId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-12 py-4 bg-gray-800 text-white">
      <div className="text-xl font-bold cursor-pointer">
        <Link to="/home">Events Partner</Link>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="flex items-center hover:text-gray-400"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="flex items-center hover:text-gray-400"
          onClick={() => navigate("/search")}
        >
          Search
        </button>
        <button
          className="flex items-center hover:text-gray-400"
          onClick={() => navigate("/expo-events")}
        >
          Expo Events
        </button>
        <button
          className="flex items-center hover:text-gray-400"
          onClick={() => navigate("/music-events")}
        >
          Music Events
        </button>
        <button
          className="flex items-center hover:text-gray-400"
          onClick={() => navigate("/create-event")}
        >
          Create Event
        </button>
      </div>

      <div className="flex gap-2 items-center space-x-4">
        <button className="relative hover:text-gray-400">
          <NotificationIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center hover:text-gray-400"
          >
            <FaCog className="w-6 h-6" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
