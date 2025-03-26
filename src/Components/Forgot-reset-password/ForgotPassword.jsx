import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/forget-password", { email });
      if (response.status === 200) {
        toast.success("OTP has been sent to your email");
        navigate("/reset-password");
        localStorage.setItem("email", email);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive an OTP</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={handleSendOTP} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
        <button className="back-button" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
