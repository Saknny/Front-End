import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidbar/Sidbar";
import Navbar from "../Components/Navbar/Navbar";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import Requests from "../Pages/Requests/Requests";
import RequestDetails from "../Components/RequestDetails/RequestDetails";
import Settings from "../Components/Settings/Settings";
import UsersAccounts from "../Pages/UsersAccounts/UsersAccounts";
import { LoginContext } from "../Context/Login/Login";
import "./Layout.scss"; // Import your CSS file for styling
function AdminLayout() {
  const { darkMode } = useContext(LoginContext);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className={`content ${darkMode === "dr" ? "dr" : ""}`}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/requests/:id" element={<RequestDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/UsersAccounts" element={<UsersAccounts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
