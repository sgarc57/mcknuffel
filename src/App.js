import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from './img/mcknuffel_bear.png';
import './App.css';
import * as Helper from './helper.js';
import ImageUpload from './components/ImageUpload';

// Wrap your Helper.Home in a page component
function HomePage() {
  return <Helper.Home products={Helper.products} />;
}

// Dashboard page with image upload
function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ImageUpload />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

