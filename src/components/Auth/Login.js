import React, { useState } from "react";
import loginImage from "../../assets/images/login.svg";
import { Link } from "react-router-dom";
import "./Auth.scss";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("abc1@gmail.com");
  const [password, setPassword] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    dispatch(login({ email, password })).then(() => {
      navigate("/");
    });
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
