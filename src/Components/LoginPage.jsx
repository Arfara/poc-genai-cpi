import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg_image from '../Assets/bg.png';
import comp_logo from '../Assets/comp_logo.png';

const LoginPage = () => {
  const navigate = useNavigate(); 

  const handleSignIn = () => {
    navigate('/chatbot');
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
      
      {/* Main login container */}
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
