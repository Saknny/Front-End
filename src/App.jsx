import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import "./App.scss";
import Dashboard from "./Pages/Dashboard/Dashboard";
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
function App() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return <div>Loading...</div>;
  }

  const { isAuthenticated } = loginContext;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {!isAuthenticated ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          <>
            <Route
              path="*"
              element={
                <div className="app-container">
                  <Sidebar />
                  <div className="main-content">
                    <Navbar />
                    <div className="content">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
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
          </>
        )}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
