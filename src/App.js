import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Pages
import HomePage from 'pages/Home';
import DashboardPage from 'pages/Dashboard';
import UploadPage from 'pages/UploadPage';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Basket from 'pages/Basket';
import Newsletter from 'pages/NewsLetter';

// Components
import Navigation from 'components/Navigation';
import BestsellersSection from "components/BestSellers";

// Services
import useFetch from "services/useFetch";

// --- Main App ---
//         <header className="App-header text-white d-flex flex-column align-items-center vh-50 img-fluid w-50 rounded shadow-lg border border-3 border-primary">

function App() {
  const { data, isLoading } = useFetch(
    "https://raw.githubusercontent.com/agata604/templates/main/Jeans%20store/Bestsellers.json"
  );

    if (isLoading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />
        
        {/* Add padding-top to account for fixed navbar */}
        <main className="flex-grow-1" style={{ paddingTop: '76px' }}>
          {/* Hero Section - Only on Home Page */}
          {window.location.pathname === '/' || window.location.pathname === '/home' ? (
            <header className="App-header py-5 bg-primary text-white">
              <div className="container text-center">
                <img 
                  src="/logo512.png" 
                  className="App-logo mb-4" 
                  alt="McKnuffel Logo" 
                  style={{ height: '120px' }}
                />
                <h1 className="display-4 fw-bold mb-4">Welcome to McKnuffel!</h1>
                <p className="lead">Discover our amazing collection of plush toys</p>
                <BestsellersSection data={data} />
              </div>
            </header>
          ) : (
            <div className="container py-4">
              <h1 className="mb-4">
                {window.location.pathname === '/login' && 'Login'}
                {window.location.pathname === '/signup' && 'Create an Account'}
                {window.location.pathname === '/basket' && 'Your Shopping Basket'}
                {window.location.pathname === '/dashboard' && 'Dashboard'}
                {window.location.pathname === '/upload' && 'Upload'}
                {window.location.pathname === '/newsletter' && 'Newsletter'}
              </h1>
            </div>
          )}

          <div className="container">
            <Routes>
              {/* Redirect root '/' to '/home' */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* Home page */}
              <Route path="/home" element={<HomePage />} />

              {/* Dashboard page */}
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Upload page */}
              <Route path="/upload" element={<UploadPage />} />
              
              {/* Auth pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Basket page */}
              <Route path="/basket" element={<Basket />} />
              
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </main>
        
        <footer className="bg-light py-4 mt-auto">
          <div className="container text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} McKnuffel. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
