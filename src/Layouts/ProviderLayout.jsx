import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidbar/Sidbar";
import Navbar from "../Components/Navbar/Navbar";
import ProviderDashboard from "../Pages/ProviderDashboard/ProviderDashboard";
import Requests from "../Pages/Requests/Requests";
import { LoginContext } from "../Context/Login/Login";
import "./Layout.scss"; // Import your CSS file for styling
function ProviderLayout() {
  const { darkMode } = useContext(LoginContext);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className={`content ${darkMode === "dr" ? "dr" : ""}`}>
          <Routes>
            <Route path="/" element={<ProviderDashboard />} />
            <Route path="/requests" element={<Requests />} />
            {/* Add more provider-specific routes here */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ProviderLayout;
