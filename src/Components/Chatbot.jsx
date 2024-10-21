import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { IoSend } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [chatId, setChatId] = useState('1');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSendMessage = async () => {
    const token = localStorage.getItem('access_token');
    if (input.trim() && token) {
      setMessages([...messages, { text: input, sender: 'user' }]);

      try {
        const response = await fetch('http://localhost:8000/chat/smartassistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            token: token,
            user_message: input,
            chat_id: chatId,
          }),
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.respond_message, sender: 'bot' },
        ]);

        setChatId(data.chat_id);

      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput('');
    }
  };

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

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} overflow-hidden`}>
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

            <div className="flex items-center space-x-3 p-2 rounded-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a prompt..."
                className="flex-1 min-w-0 p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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