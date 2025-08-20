import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import "./SignUp.css";

function SignUp({ onLoginClick }) {
  const [Fullname, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  function saveUserLocally(email, password) {
    const users = JSON.parse(localStorage.getItem("hazelUsers") || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("Email already registered");
    }
    users.push({ email, password });
    localStorage.setItem("hazelUsers", JSON.stringify(users));
    return { email };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (Password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!Fullname || !Email || !Password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    try {
      saveUserLocally(Email, Password);

      if (typeof onLoginClick === "function") onLoginClick();
    } catch (err) {
      setError(err.message || "Failed to create account.");
    }
  };

  return (
    <div className="SignUp-wrapper">
      
      
      <form onSubmit={handleSubmit} className="signup-box">
        <h2>PC Planner</h2>
        <h3>Create an Account</h3>
        <p>Sign up to save your PC Builds and get personalized recommendations</p>

        {/* Full Name */}
        <label>Full Name</label>
        <div className="fullNameInput">
          <input
            type="text"
            placeholder="Enter your full name"
            value={Fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <label>Email</label>
        <div className="E_Input">
          <input
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="Pass-btn">
          <label>Password</label>
          <div className="Pass_Input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-button-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password"
            >
              {showPassword ? <FaRegEyeSlash style={{ color: "white" }} /> : <FaRegEye style={{ color: "white" }} />}
            </button>
          </div>

          {/* Confirm Password */}
          <label>Confirm Password</label>
          <div className="Confirm_Input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-button-icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label="Toggle confirm password"
            >
              {showConfirmPassword ? <FaRegEyeSlash style={{ color: "white" }} /> : <FaRegEye style={{ color: "white" }} />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit Button */}
        <button type="submit" className="signUp-btn">
          Sign Up
        </button>

        {/* Switch to Login */}
        <p className="signUp">
          Already have an Account?{' '}
          <a className="signUp-link" onClick={onLoginClick} style={{ cursor: 'pointer', color: '#2196f3' }}>
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
