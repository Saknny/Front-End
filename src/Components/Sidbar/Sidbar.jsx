import { NavLink } from "react-router-dom";
import "./Sidbar.scss";
import React from "react";
import { useContext } from "react";
import { LoginContext } from "../../Context/Login/Login";
function Sidbar() {
  const { darkMode } = useContext(LoginContext);
  return (
    <aside className={`sidebar ${darkMode == "dr" ? "dark" : ""}`}>
      <div className="image">
        <NavLink to="/" className={`d-flex justify-content-center`}>
          <img className="d-none d-md-block" src="/full-logo.png" alt="logo" />
          <img className="d-block d-md-none" src="/Logo.png" alt="LOGO" />
        </NavLink>
      </div>

      <nav className="links">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-li" : "inactive-li"
              }
            >
              <i className="bx bxs-dashboard"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive ? "active-li" : "inactive-li"
              }
            >
              <i className="bx bx-git-pull-request"></i>
              <span>Requests</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/UsersAccounts"
              className={({ isActive }) =>
                isActive ? "active-li" : "inactive-li"
              }
            >
              <i className="bx bxs-user-account"></i>
              <span>Users Accounts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "active-li" : "inactive-li"
              }
            >
              <i className="bx bxs-cog"></i>
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidbar;
