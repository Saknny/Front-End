import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {!isAuthenticated ? (
        <LoginForm setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/requests/:id" element={<RequestDetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/UsersAccounts" element={<UsersAccounts />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
