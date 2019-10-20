import React, { Component } from "react";
import "./Register.css";

class Register extends Component {
  render() {
    return (
      <div className="limiter">
        <div className="container-login100 bg-dark">
          <div className="wrap-login100">
            <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
              <span className="login100-form-title">Register</span>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Please enter username"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                ></input>
                <span className="focus-input100"></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Please enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                ></input>
                <span className="focus-input100"></span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
