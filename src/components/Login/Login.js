import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="limiter">
        <div className="container-login100 bg-dark">
          <div className="wrap-login100">
            <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
              <span className="login100-form-title">Sign In</span>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Please enter username"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username/Email"
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

              <div className="text-right p-t-13 p-b-23">
                <span className="txt1">Forgot </span>
                <span className="txt2">Username / Password?</span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Sign in</button>
                <button className="login100-form-btn google-btn">Google</button>
                <button className="login100-form-btn facebook-btn">
                  Facebook
                </button>
              </div>

              <div className="flex-col-c p-t-100 p-b-40">
                <span className="txt1 p-b-9">Don’t have an account?</span>

                <p className="txt3">Register now</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
