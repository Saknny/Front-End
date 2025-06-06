import React, { useContext, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { LoginContext } from "./Context/Login/Login";
const LoginForm = lazy(() => import("./Pages/LoginForm/LoginForm"));
const ForgotPassword = lazy(() =>
  import("./Components/Forgot-reset-password/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./Components/Forgot-reset-password/ResetPassword")
);

const ProviderLayout = lazy(() => import("./Layouts/ProviderLayout"));
import AdminLayout from "./Layouts/AdminLayout";
const InvalidRole = lazy(() => import("./Pages/InvalidRole/InvalidRole"));
import Loading2 from "./Components/Loading2/Loading2";

function App() {
  const { isAuthenticated, userRole } = useContext(LoginContext);

  return (
    <Suspense fallback={<Loading2 />}>
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
    </Suspense>
  );
}

export default App;
