import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from 'img/mcknuffel_bear.png';
import 'App.css';
import HomePage from 'pages/Home';
import DashboardPage from 'pages/Dashboard';

// --- Main App ---
function App() {
  return (
    <Router>
      <div className="App">
        {/* Header/logo stays consistent across pages */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        {/* Routing */}
        <Routes>
          {/* Redirect root '/' to '/home' */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Home page */}
          <Route path="/home" element={<HomePage />} />

          {/* Dashboard page */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
