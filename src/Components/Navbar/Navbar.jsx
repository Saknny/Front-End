import "./Navbar.scss";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Context/Login/Login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchProviderProfile } from "../../Api/api";
function Navbar() {
  const {
    setIsAuthenticated,
    toggleDarkMode,
    darkMode,
    language,
    toggleLanguage,
  } = useContext(LoginContext);
  const [data, setData] = useState(null);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  }
  useEffect(() => {
    fetchProviderProfile().then(setData);
  }, []);
  console.log("Navbar data:", data);

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
        <i className="fa-solid fa-sun icon sun-icon" size={16}></i>
        <div className="toggle-circle">
          <i className="fa-solid fa-moon icon moon-icon" size={16}></i>
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
          src={
            data?.image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
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
            <p className="dropdown-item text-muted">
              {data?.firstName} {data?.lastName}
            </p>
          </li>
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
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
