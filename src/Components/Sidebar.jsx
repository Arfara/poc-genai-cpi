import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCpu } from 'react-icons/fi';
import { AiOutlineBarChart } from 'react-icons/ai';
import comp_logo from '../Assets/comp_logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-blue-200 p-4 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0 w-64' : '-translate-x-64 w-64'}`}
    >
      <div className="flex justify-center mb-4">
        <img src={comp_logo} className="w-20 h-20" alt="Company Logo" />
      </div>
      <ul>
        <li className="mb-3">
          <Link
            to="/home"
            className={`flex items-center p-2 rounded transition-all duration-300 ease-in-out ${
              location.pathname === '/home' ? 'bg-blue-400 text-white' : 'text-black hover:bg-blue-300 hover:text-white'
            }`}
          >
            <FiHome className="mr-2" />
            Home
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/chatbot"
            className={`flex items-center p-2 rounded transition-all duration-300 ease-in-out ${
              location.pathname === '/chatbot' ? 'bg-blue-400 text-white' : 'text-black hover:bg-blue-300 hover:text-white'
            }`}
          >
            <FiCpu className="mr-2" />
            Generative AI
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/smart-analytics"
            className={`flex items-center p-2 rounded transition-all duration-300 ease-in-out ${
              location.pathname === '/smart-analytics' ? 'bg-blue-400 text-white' : 'text-black hover:bg-blue-300 hover:text-white'
            }`}
          >
            <AiOutlineBarChart className="mr-2" />
            Smart Analytics
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
