import React, { useState, useEffect } from "react";
import {jwtDecode }from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"; // Ensure this line is present to import your app.css

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    if (res.ok) {
      const data = await res.json();
      const userType = data.userType;
      toast.success(`Logged in as : ${userType}`);
      return navigate("/home");
    } else {
      toast.error(`Please check your credentials`);
      return navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={loginSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="login-button">
              Login
            </button>
            <Link to="#" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          <p className="signup-link">
            Don't have an account?{" "}
            <Link to="/sign-up" className="sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const getUserType = () => {
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authtoken"))
    ?.split("=")[1];

  if (!authToken) return null;

  const decoded = jwtDecode(authToken);
  const userType = decoded.userType;
  return userType;
};

export { LoginPage as default, getUserType };
