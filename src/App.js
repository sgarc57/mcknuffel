import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from 'img/mcknuffel_bear.png';
import 'App.css';
import HomePage from 'pages/Home';
import DashboardPage from 'pages/Dashboard';
import UploadPage from 'pages/UploadPage';
import "bootstrap/dist/css/bootstrap.min.css";
import BestsellersSection from "components/BestSellers";
import useFetch from "services/useFetch";
import Newsletter from "pages/NewsLetter";

// --- Main App ---
//         <header className="App-header text-white d-flex flex-column align-items-center vh-50 img-fluid w-50 rounded shadow-lg border border-3 border-primary">

function App() {
  const { data, isLoading } = useFetch(
    "https://raw.githubusercontent.com/agata604/templates/main/Jeans%20store/Bestsellers.json"
  );

    if (isLoading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Router>
      <div className="App">
        {/* Header/logo stays consistent across pages */}
        <header className="App-header">
        <row>
        <container>
        <div className="text-white border-3 border-primary img-fluid rounded-3 shadow-lg">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="text-center">Welcome to McKnuffel!</h1>
          <BestsellersSection data={data} />;
          </div>
          </container>
          </row>
        </header>


        {/* Routing */}
        <Routes>
          {/* Redirect root '/' to '/home' */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Home page */}
          <Route path="/home" element={<HomePage />} />

          {/* Dashboard page */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Upload page */}
          <Route path="/upload" element={<UploadPage />} />

          {/* Newsletter page */}
          <Route path="/newsletter" element={<Newsletter />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
