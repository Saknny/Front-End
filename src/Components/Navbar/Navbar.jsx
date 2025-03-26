import "./Navbar.scss";
import React from "react";
import { useContext } from "react";
import { LoginContext } from "../../Context/Login/Login";
import { toast } from "react-toastify";
function Navbar() {
  const { setIsAuthenticated } = useContext(LoginContext);

  function logOut() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  }
  return (
    <nav className="navbar ps-4 pe-4 justify-content-end ">
      <div className="right">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          className="profile "
        />
      </div>
      <button className="logout-btn" onClick={logOut}>
        <i className="bx bx-log-out bx-rotate-180"></i>
      </button>
    </nav>
  );
}

export default Navbar;
