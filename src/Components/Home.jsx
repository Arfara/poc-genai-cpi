import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import comp_logo from '../Assets/comp_logo.png';

const Chatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100 relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} overflow-hidden flex flex-col relative`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        
        <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
          <img src={comp_logo} alt="Watermark" className="w-1/4 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
