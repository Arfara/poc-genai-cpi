import React, { useState, useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2'; 
import Header from './Header';
import Sidebar from './Sidebar';
import { IoSend } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

const SmartAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [chatId, setChatId] = useState('1');  
  const [chartData, setChartData] = useState(null); 
  const [chartType, setChartType] = useState('line');  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSendMessage = async () => {
    const token = localStorage.getItem('access_token');
    
    if (input.trim() && token) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      try {
        const response = await fetch('http://localhost:8000/chat/smartanalytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            user_message: input,
            chat_id: chatId, 
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          setMessages(prevMessages => [
            ...prevMessages,
            { text: data.respond_message, sender: 'bot' },
          ]);

          setChatId(data.chat_id);

          if (data.respond_chart) {
            const chart = {
              labels: data.respond_chart.x_axis,
              datasets: [
                {
                  label: 'Smart Analytics Data',
                  data: data.respond_chart.y_axis,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
              ],
            };
            setChartData(chart);  
            setChartType(data.respond_chart.type || 'line'); 
          }

        } else {
          console.error('Error fetching data from API');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

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

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, navigate]);

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
                {chartData ? (
                  chartType === 'bar' ? (
                    <Bar data={chartData} />
                  ) : (
                    <Line data={chartData} />
                  )
                ) : (
                  <div className="w-full h-full bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Graph will be displayed here</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </main>

        {/* Popup message */}
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

export default SmartAnalytics;
