// 📁 components/ActionButtons.js
import React from "react";

const ActionButtons = ({ onApprove, onReject }) => {
  return (
    <div className="section text-center pt-4 mt-4 d-flex justify-content-center">
      <button className="btn btn-success mx-2" onClick={onApprove}>
        ✅ Accept
      </button>
      <button className="btn btn-danger mx-2" onClick={onReject}>
        ❌ Reject
      </button>
    </div>
  );
};

export default ActionButtons;
