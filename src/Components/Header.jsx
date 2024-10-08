import React, { useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-blue-100 p-2 flex items-center justify-between shadow-md">
      <div
        onClick={toggleSidebar}
        className="relative flex items-center justify-center h-12 w-12 text-blue-600 text-2xl hover:text-blue-800 transition-colors cursor-pointer"
      >
        <FaBars
          className={`transition-all duration-300 transform ${isSidebarOpen ? 'opacity-0 scale-0 rotate-45' : 'opacity-100 scale-100 rotate-0'}`}
          style={{ position: 'absolute' }}
        />
        <FaTimes
          className={`transition-all duration-300 transform ${isSidebarOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-45'}`}
          style={{ position: 'absolute' }}
        />
      </div>

      <div className="flex items-center space-x-4 relative">
        <button
          onClick={handleMenuToggle}
          className="text-blue-600 text-2xl hover:text-blue-800 transition-colors"
        >
          <HiUserCircle className="text-3xl" />
        </button>

        <div
          className={`absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 ease-out ${
            menuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
        >
          <ul>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Edit Profile
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
