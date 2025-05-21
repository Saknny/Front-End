// 📁 components/ActionButtons.js
import React, { useContext } from "react";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

const ActionButtons = ({ onApprove, onReject }) => {
  const { language } = useContext(LoginContext);

  return (
    <div className="section text-center pt-4 mt-4 d-flex justify-content-center">
      <button className="btn btn-success mx-2" onClick={onApprove}>
        ✅ {t.accept?.[language] || "Accept"}
      </button>
      <button className="btn btn-danger mx-2" onClick={onReject}>
        ❌ {t.reject?.[language] || "Reject"}
      </button>
    </div>
  );
};

export default ActionButtons;
