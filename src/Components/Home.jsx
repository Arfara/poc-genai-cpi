import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import comp_logo from '../Assets/comp_logo.png';

const Chatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8000/verify-token/${token}`)
      .then(response => {
        if (!response.ok) {
          localStorage.removeItem('access_token');
          setShowPopup(true); 
          setTimeout(() => {
            setShowPopup(false); 
            navigate('/login'); 
          }, 2000);
        }
      })
      .catch(() => {
        localStorage.removeItem('access_token');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false); 
          navigate('/login'); 
        }, 2000);
      });
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100 relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} overflow-hidden flex flex-col relative`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        
        <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
          <img src={comp_logo} alt="Watermark" className="w-1/4 h-auto" />
        </div>

        {showPopup && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ease-out duration-300">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
              <h2 className="text-lg font-semibold text-red-600">Your session is expired</h2>
              <p className="mt-2 text-gray-700">Please log in again to continue.</p>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Chatbot;
