import "./Navbar.scss";
import React, { useContext } from "react";
import { LoginContext } from "../../Context/Login/Login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { setIsAuthenticated } = useContext(LoginContext);
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  }

  return (
    <nav className="navbar ps-4 pe-4 justify-content-end">
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
