import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

export default function Header({ onLogout, userId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!", {
      autoClose: 3000, 
    });
    setTimeout(() => {
      navigate("/login");
      onLogout();
    }, 1000); 
  };

  return (
    <>
      <ToastContainer />

      <header className="flex items-center justify-between px-4 py-4 bg-gray-800 text-white md:px-12">
        <div className="text-xl font-bold cursor-pointer">
          <Link to="/home">Events Partner</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="flex items-center hover:text-gray-400"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="flex items-center hover:text-gray-400"
            onClick={() => navigate("/create-event")}
          >
            Create Event
          </button>
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`absolute top-16 right-4 bg-gray-800 text-white rounded-md shadow-lg md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <button
            className="block px-4 py-2 hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-700"
            onClick={() => navigate("/create-event")}
          >
            Create Event
          </button>
        </div>
        <div className="flex gap-2 items-center space-x-4">
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
    </>
  );
}
