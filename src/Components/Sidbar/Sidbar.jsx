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
              to="/complete-profile/user"
              className={({ isActive }) =>
                isActive ? "active-li" : "inactive-li"
              }
            >
              <i className="bx bx-user"></i>
              <span>Complete Profile</span>
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

          {/* <li className="nav-item dropdown ">
            <NavLink
              className=" dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bx bxs-user-check"></i>
              <span>Complete Profile</span>
            </NavLink>
            <ul className="dropdown-menu">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active-li dropdown-item"
                      : "inactive-li dropdown-item"
                  }
                  to="/complete-profile/user"
                >
                  <i className="bx bxs-user-pin"></i>
                  User
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active-li dropdown-item"
                      : "inactive-li dropdown-item"
                  }
                  to="/complete-profile/provider"
                >
                  <i className="bx bxs-user-voice"></i>
                  Provider
                </NavLink>
              </li>
            </ul>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidbar;
