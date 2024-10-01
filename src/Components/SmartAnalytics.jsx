import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { IoSend } from "react-icons/io5";

const SmartAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "Bot response here", sender: 'bot' }]);
      }, 1000);  
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} overflow-hidden flex flex-col`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        
        <main className="flex-1 p-4 overflow-auto">
          <div className="flex flex-col lg:flex-row h-full bg-white rounded-3xl shadow-xl p-4 lg:p-6 space-y-4 lg:space-y-0 lg:space-x-4">
            
            {/* Chat Section */}
            <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-xl">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-6">
                <div className="flex flex-col space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-4 rounded-3xl max-w-xs text-sm shadow-md ${message.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input bar */}
              <div className="flex items-center p-2 rounded-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a prompt..."
                  className="flex-1 min-w-0 p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 ml-2"
                >
                  <IoSend size={20} />
                </button>
              </div>
            </div>

            {/* Analytics Section */}
            <div className="flex-1 flex flex-col bg-gray-100 rounded-3xl shadow-xl p-4 lg:p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics Output</h2>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-full bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Graph will be displayed here</p>
                </div>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default SmartAnalytics;
