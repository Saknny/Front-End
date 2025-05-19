import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidbar/Sidbar";
import Navbar from "../Components/Navbar/Navbar";
import AdminDashboard from "../Pages/ADMIN/AdminDashboard/AdminDashboard";
import Requests from "../Pages/ADMIN/Requests/Requests";
import RequestDetails from "../Components/RequestDetails/RequestDetails";
import Settings from "../Components/Settings/Settings";
import UsersAccounts from "../Pages/ADMIN/UsersAccounts/UsersAccounts";
import { LoginContext } from "../Context/Login/Login";
import "./Layout.scss"; // Import your CSS file for styling
import AdminIncompleteUsers from "../Pages/ADMIN/Complete Profile/User/AdminIncompleteUsers";
import CompleteProfileDetails from "../Components/CompleteProfileDetails/CompleteProfileDetails";
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
            <Route
              path="/complete-profile/user"
              element={<AdminIncompleteUsers />}
            />
            <Route
              path="/complete-profile/user/:id"
              element={<CompleteProfileDetails />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
