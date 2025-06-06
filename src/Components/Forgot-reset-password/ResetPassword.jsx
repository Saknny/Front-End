import React, { useState } from "react";
import { verifyOTP, resetPassword } from "../../Api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.scss";
function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleVerifyOTP = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(email, otp);

      if (response.data?.success && response.data?.data?.id) {
        setUserId(response.data.data.id);
        setIsVerified(true);
        toast.success("OTP verified! Now set your new password.");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (!passwordPattern.test(newPassword)) {
      toast.error(
        "Password must be 8-16 characters with at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    if (!isVerified) {
      toast.error("Please verify OTP first");
      return;
    }
    if (!userId) {
      toast.error("User ID is missing. Please verify OTP again.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(userId, newPassword, otp);

      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="reset-password-page">
      <div className="card">
        <h2>Reset Password</h2>
        <p>
          Enter your email and the OTP sent to you, then reset your password.
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button onClick={handleVerifyOTP} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={!isVerified}
        />
        <button onClick={handleResetPassword} disabled={loading || !isVerified}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        <button className="back-button" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
