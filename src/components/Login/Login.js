import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { loginUser, loginGoogleAndFacebook } from "../../actions/actions";
import queryString from "query-string";
import * as actionType from "../../actions/actionType";
import * as constant from "../../utils/constants";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      this.props.loginGoogleFacebook(query);
      this.props.history.push("/");
    }
  }

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    if (value !== "") {
      this.setState({
        [name]: value
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const user = this.state;
    this.props.loginUser(user);
    this.props.history.push("/");
  };

  render() {
    const data_user = localStorage.getItem(constant.TOKEN_USER);
    if (data_user && this.props.isLogin) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="limiter">
        <div className="container-login100 bg-dark">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form p-l-55 p-r-55 p-t-178"
              onSubmit={this.onSubmit}
            >
              <span className="login100-form-title">Sign In</span>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Please enter username"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                  placeholder="Password"
                ></input>
                <span className="focus-input100"></span>
              </div>

              <div className="text-right p-t-13 p-b-23">
                <span className="txt1">Forgot </span>
                <span className="txt2">Username / Password?</span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit">
                  Sign in
                </button>
                <a
                  href={`${constant.API_URL}/user/google`}
                  className="login100-form-btn google-btn"
                >
                  Google
                </a>
                <a
                  href={`${constant.API_URL}/user/facebook`}
                  className="login100-form-btn facebook-btn"
                >
                  Facebook
                </a>
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

const mapStateToProps = state => {
  return {
    username: state.users.username,
    password: state.users.password,
    isLogin: state.users.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    setUser: (name, value) =>
      dispatch({ type: actionType.SET_INFO_USER, name: name, value: value }),
    loginGoogleFacebook: user => dispatch(loginGoogleAndFacebook(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
