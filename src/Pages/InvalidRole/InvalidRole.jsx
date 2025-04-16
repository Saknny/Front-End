import React from "react";
import { useNavigate } from "react-router-dom";
import "./InvalidRole.scss";
function InvalidRole() {
  const navigate = useNavigate();
  return (
    <div className="invalid-role-container">
      <div className="content">
        <h2>🚫 Invalid Role</h2>
        <p>You do not have access to this platform. Please contact support.</p>
        <button onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    </div>
  );
}

export default InvalidRole;
