import React, { useState } from "react";
import "./Login.css";
import { FaRegEye, FaRegEyeSlash, FaArrowLeft } from "react-icons/fa";

function Login({ onSignUpClick, onLoginSuccess, onBackClick }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const defaultAccount = {
    email: "user@example.com",
    password: "123456",
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  function authenticateLocally(email, password) {
    const users = JSON.parse(localStorage.getItem("hazelUsers") || "[]");
    return users.find((u) => u.email === email && u.password === password);
  }

  const handleSignIn = () => {
    const typedEmail = Email.trim().toLowerCase();
    const typedPassword = Password;

    if (
      typedEmail === defaultAccount.email.toLowerCase() &&
      typedPassword === defaultAccount.password
    ) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid email or password");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const email = Email.trim().toLowerCase();
    const password = Password;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    const user = authenticateLocally(email, password);
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    if (typeof onLoginSuccess === "function") onLoginSuccess();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div className="login-wrapper">
      <div className="back-home">
        <button className="home-button" onClick={onBackClick}>
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back
        </button>
      </div>

      <div className="login-box">
        <div className="login-top">
          <h2>PC Planner</h2>
          <h3>Sign in to your Account</h3>
          <p>
            Enter your email and password to access your PC builds and
            recommendations
          </p>

          <label>Email</label>
          <div className="emailInput">
            <input
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
          </div>

          <label>Password</label>
          <div className="passwordInput">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            {Password && (
              <button
                type="button"
                className="toggle-button-icon"
                onClick={togglePassword}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            )}
          </div>

          {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="signin-btn" onClick={handleSignIn}>
            Sign In
          </button>

          <div className="divider">Or login with</div>

          <div className="socials">
            <button className="google-button">
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
              />
            </button>
            <button className="facebook">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
              />
            </button>
            <button className="twitter">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
              />
            </button>
          </div>
        </div>

        <p className="signIn">
          Don’t have an account?{" "}
          <a
            className="signUp-link"
            onClick={onSignUpClick}
            style={{ cursor: "pointer", color: "#21b8f3ff" }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
