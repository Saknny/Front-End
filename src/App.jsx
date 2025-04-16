import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import "./App.scss";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidbar/Sidbar";
import Requests from "./Pages/Requests/Requests";
import RequestDetails from "./Components/RequestDetails/RequestDetails";
import Settings from "./Components/Settings/Settings";
import UsersAccounts from "./Pages/UsersAccounts/UsersAccounts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import LoginForm from "./Pages/LoginForm/LoginForm";
import { LoginContext } from "./Context/Login/Login";
import React from "react";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./Components/Forgot-reset-password/ForgotPassword";
import ResetPassword from "./Components/Forgot-reset-password/ResetPassword";
import Loading from "./Components/Loading/Loading";
import ProviderDashboard from "./Pages/ProviderDashboard/ProviderDashboard";
import InvalidRole from "./Pages/InvalidRole/InvalidRole";
function App() {
  const { isAuthenticated, darkMode, userRole } = useContext(LoginContext);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        {!isAuthenticated ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : userRole === "ADMIN" ? (
          <Route
            path="*"
            element={
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className={`content ${darkMode === "dr" ? "dr" : ""}`}>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/requests" element={<Requests />} />
                      <Route
                        path="/requests/:id"
                        element={<RequestDetails />}
                      />
                      <Route path="/settings" element={<Settings />} />
                      <Route
                        path="/UsersAccounts"
                        element={<UsersAccounts />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        ) : userRole === "PROVIDER" ? (
          <Route
            path="*"
            element={
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className={`content ${darkMode === "dr" ? "dr" : ""}`}>
                    <Routes>
                      <Route path="/" element={<ProviderDashboard />} />
                      <Route path="/requests" element={<Requests />} />
                      {/* راوتات إضافية للبروفايدر */}
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        ) : (
          <Route path="*" element={<InvalidRole />} />
        )}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
