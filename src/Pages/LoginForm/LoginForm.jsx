import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import "./LoginForm.scss";
import { useContext } from "react";
import { LoginContext } from "../../Context/Login/Login";
import React from "react";
import { toast } from "react-toastify";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useContext(LoginContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      setIsAuthenticated(true);
      toast.success("Login Successful");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password");
        toast.error("Invalid email or password");
      } else {
        setError("Failed to connect to server");
        toast.error("Failed to connect to server");
      }
    }
  };

  return (
    <div className="login-page d-flex ">
      <div className="login-image d-none d-lg-flex align-items-center justify-content-center">
        <img src="Login5.svg" alt="Login Illustration" />
      </div>
      <motion.div
        className="login-container d-flex align-items-center justify-content-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="login-box text-center"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="full-logo.png" alt="Saknny Logo" className="logo" />
          <h2>Login</h2>

          <form onSubmit={handleLogin} className="d-flex flex-column">
            <div className="input-group d-flex flex-column text-start">
              <label>Email</label>
              <div className="input-field d-flex align-items-center">
                <FaUser className="icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group d-flex flex-column text-start">
              <label>Password</label>
              <div className="input-field d-flex align-items-center">
                <FaLock className="icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
