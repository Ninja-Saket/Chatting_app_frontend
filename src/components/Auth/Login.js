import React, { useState } from "react";
import loginImage from "../../assets/images/login.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3000/login", { email, password })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log({ email, password });
  };
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={loginImage} alt="Login"></img>
          </div>
          <div id="form-section">
            <h1>Welcome back</h1>
            <form onSubmit={submitForm}>
              <div className="input-field mb-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required="required"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="input-field mb-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required="required"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button>LOGIN</button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
