import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Chatbot from './Components/Chatbot';
import SmartAnalytics from './Components/SmartAnalytics';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/smart-analytics" element={<SmartAnalytics />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
