import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { IoSend } from "react-icons/io5";

const Chatbot = () => {
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
          <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl p-6">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
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
            
            <div className="flex items-center space-x-3 bg-white p-2 rounded-full" style={{ background: 'linear-gradient(to left, #d4e4ff 0%, #ffff 30%)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a prompt..."
                className="flex-1 p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Send message on Enter key
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                <IoSend size={24} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;