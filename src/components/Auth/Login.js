import React from "react";
import loginImage from "../../assets/images/login.svg";
import "./Auth.scss";
const Login = () => {
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={loginImage} alt="Login"></img>
          </div>
          <div id="form-section">
            <h1>Welcome back</h1>
            <form>
              <div className="input-field mb-1">
                <input placeholder="Email" />
              </div>
              <div className="input-field mb-2">
                <input placeholder="Password" />
              </div>
              <button>lOGIN</button>
            </form>
            <p>Don't have an account? Register</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
