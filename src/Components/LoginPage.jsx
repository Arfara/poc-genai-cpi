import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg_image from '../Assets/bg.png';
import comp_logo from '../Assets/comp_logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [modalAnimating, setModalAnimating] = useState(false);

  const handleSignIn = async () => {
    console.log('Attempting login with username:', username);

    const requestData = new URLSearchParams();
    requestData.append('grant_type', 'password');
    requestData.append('username', username);
    requestData.append('password', password);
    requestData.append('scope', '');
    requestData.append('client_id', '');
    requestData.append('client_secret', '');

    try {
      const response = await fetch('http://10.1.3.28:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestData.toString(),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, received token:', data.access_token);
        
        localStorage.setItem('access_token', data.access_token); 
        navigate('/chatbot'); 
      } else {
        const errorData = await response.json();
        console.log('Login failed, error:', errorData);
        setError('Login failed: ' + (errorData.detail || 'Unknown error'));
        openModal();
      }
    } catch (error) {
      console.log('Error during login request:', error);
      setError('Login failed: ' + error.message);
      openModal();
    }
  };

  const openModal = () => {
    setShowErrorModal(true);
    setTimeout(() => setModalAnimating(true), 10);
  };

  const closeModal = () => {
    setModalAnimating(false);
    setTimeout(() => {
      setShowErrorModal(false);
      setError(null);
    }); 
  };

  return (
    <div className="flex h-screen">
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div
        className="flex w-full md:w-1/2 items-center justify-center p-4"
        style={{ background: 'linear-gradient(to right, #d4e4ff 0%, #ffff 50%)' }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-center items-center mb-4">
            <img src={comp_logo} className="w-24 h-24 md:w-20 md:h-20" alt="Company Logo" />
          </div>
          <p className="text-center text-gray-600 mb-6 mt-6 text-lg">Charoen Pokphand Generative AI</p>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-gray-600 hover:text-gray-800 cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignIn}
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Create an Account
              </a>
            </div>
          </form>

          {/* Copyright Section */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            &copy; 2024 PT Smartnet Magna Global. All rights reserved.
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ease-out duration-500">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm transition-transform duration-500 ease-out ${
              modalAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <h2 className="text-xl font-semibold text-red-600">Login Failed</h2>
            <p className="mt-2 text-gray-700">{error}</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
