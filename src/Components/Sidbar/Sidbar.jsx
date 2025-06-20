import { NavLink } from "react-router-dom";
import "./Sidbar.scss";
import React, { useContext } from "react";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

function Sidbar() {
  const { darkMode, userRole, language } = useContext(LoginContext);

  return (
    <aside className={`sidebar ${darkMode === "dr" ? "dark" : ""}`}>
      <div className="image">
        <NavLink to="/" className="d-flex justify-content-center">
          <img className="d-none d-md-block" src="/full-logo.webp" alt="logo" />
          <img className="d-block d-md-none" src="/Logo.webp" alt="LOGO" />
        </NavLink>
      </div>

      <nav className="links">
        <ul>
          {userRole === "ADMIN" && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-li" : "inactive-li"
                  }
                >
                  <i className="bx bxs-dashboard"></i>
                  <span>{t.dashboard[language]}</span>
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
                  <span>{t.requests[language]}</span>
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
                  <span>{t.usersAccounts[language]}</span>
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
                  <span>{t.completeProfile[language]}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blocked-apartments"
                  className={({ isActive }) =>
                    isActive ? "active-li" : "inactive-li"
                  }
                >
                  <i className="fa-solid fa-shield"></i>
                  <span>{t.BlockedApartments[language]}</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? "active-li" : "inactive-li"
                  }
                >
                  <i className="bx bxs-cog"></i>
                  <span>{t.settings[language]}</span>
                </NavLink>
              </li> */}
            </>
          )}

          {userRole === "PROVIDER" && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-li" : "inactive-li"
                  }
                >
                  <i className="bx bxs-dashboard"></i>
                  <span>{t.dashboard[language]}</span>
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
                  <span>{t.requests[language]}</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidbar;
