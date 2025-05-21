import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import "./App.scss";
import LoginForm from "./Pages/LoginForm/LoginForm";
import ForgotPassword from "./Components/Forgot-reset-password/ForgotPassword";
import ResetPassword from "./Components/Forgot-reset-password/ResetPassword";
import Loading from "./Components/Loading/Loading";
import InvalidRole from "./Pages/InvalidRole/InvalidRole";
import { LoginContext } from "./Context/Login/Login";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import AdminLayout from "./Layouts/AdminLayout";
import ProviderLayout from "./Layouts/ProviderLayout";

function App() {
  const { isAuthenticated, userRole, language } = useContext(LoginContext);

  // useEffect(() => {
  //   document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
  // }, [language]);

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
          <Route path="*" element={<AdminLayout />} />
        ) : userRole === "PROVIDER" ? (
          <Route path="*" element={<ProviderLayout />} />
        ) : (
          <Route path="*" element={<InvalidRole />} />
        )}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
