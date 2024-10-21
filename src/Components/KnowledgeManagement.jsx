import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSend, IoAttach } from "react-icons/io5";
import Header from './Header';
import Sidebar from './Sidebar';

const KnowledgeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fileInput, setFileInput] = useState(null);
  const [input, setInput] = useState('');
  const [insights, setInsights] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8000/user/verify-token/${token}`)
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleSendMessage = () => {
    if (input.trim() || fileInput) {
      const newInsight = fileInput
        ? `Insight generated from document: ${fileInput.name}`
        : `Insight generated from your input: "${input}"`;
      setInsights([...insights, newInsight]);
      setInput('');
      setFileInput(null); // Reset file input after sending
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} overflow-hidden`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        
        <main className="flex-1 p-4 overflow-hidden">
          <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl p-6">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              <div className="flex flex-col space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 bg-gray-200 text-gray-800 rounded-3xl shadow-md max-w-xs">
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            {/* Display File Name */}
            {fileInput && (
              <div className="text-sm text-gray-600 mb-2">
                Attached document: <span className="font-medium">{fileInput.name}</span>
              </div>
            )}

            {/* Input Bar */}
            <div className="flex items-center p-3 border border-gray-300 rounded-full shadow-sm space-x-3 bg-white">
              {/* Icon Clip */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <IoAttach size={24} className="text-gray-500 hover:text-gray-700 transition" />
              </label>

              {/* Text Input */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message or attach a document..."
                className="flex-1 min-w-0 p-3 border-none focus:outline-none focus:ring-0 text-sm"
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                <IoSend size={20} />
              </button>
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
        </main>
      </div>
    </div>
  );
};

export default KnowledgeManagement;
