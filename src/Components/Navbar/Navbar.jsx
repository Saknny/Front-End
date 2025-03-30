import "./Navbar.scss";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Context/Login/Login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
function Navbar() {
  const { setIsAuthenticated, toggleDarkMode, darkMode } =
    useContext(LoginContext);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  }
  const { language, toggleLanguage } = useContext(LoginContext);

  return (
    <nav
      className={`navbar ps-4 pe-4 justify-content-end ${
        darkMode == "dr" ? "dark" : ""
      }`}
    >
      <button
        className={`theme-toggle ${darkMode == "dr" ? "dr" : ""}`}
        onClick={toggleDarkMode}
      >
        <Sun className="icon sun-icon" size={16} />
        <div className="toggle-circle">
          <Moon className="icon moon-icon" size={16} />
        </div>
      </button>

      <button
        className={`language-toggle ${language}`}
        onClick={toggleLanguage}
      >
        <span className="toggle-circle">{language}</span>
      </button>

      <div className="right dropdown">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          className="profile dropdown-toggle"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        />
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
        >
          <li>
            <p className="dropdown-item text-muted">{userEmail}</p>
          </li>
          <li>
            <button
              onClick={() => navigate("/forgot-password")}
              className="dropdown-item btn btn-primary"
            >
              Change Password
            </button>
          </li>
          <li>
            <button className="logout-btn" onClick={logOut}>
              Logout
              <i className="bx bx-log-out bx-rotate-180"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
