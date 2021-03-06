import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import "./Register.css";
import { connect } from "react-redux";
import { registerUser } from "../../actions/actions";
import * as actionType from "../../actions/actionType";
import * as constant from "../../utils/constants";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      gender: "",
      name: ""
    };
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
    var user = this.state;
    this.props.registerUser(user);
  };

  render() {
    var { name, success, isLogin } = this.props;
    const data_user = localStorage.getItem(constant.TOKEN_USER);
    if (data_user && isLogin) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="limiter">
        <Modal show={success}>
          <Modal.Header closeButton>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Hi <b>{name}</b>, congratulation on your successful registration!
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.props.resetUser}>
              OK
            </button>
            <Link to="/login">
              <button
                className="btn btn-warning"
                onClick={this.props.resetUser}
              >
                Go to Login
              </button>
            </Link>
          </Modal.Footer>
        </Modal>

        <div className="container-login100 bg-dark">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form p-l-55 p-r-55 p-t-178"
              onSubmit={this.onSubmit}
            >
              <span className="login100-form-title">Register account</span>
              {/* FullName */}
              <div className="lbl-input">FullName:</div>
              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Please enter your name"
              >
                <input
                  className="input100"
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  disabled={this.props.loading}
                ></input>
                <span className="focus-input100"></span>
              </div>
              {/* Gender */}
              <div className="lbl-input">Gender:</div>
              <div className="mt-3 mb-3">
                <label className="ml-3 mr-2">Male</label>
                <input
                  className="mr-2"
                  type="radio"
                  name="gender"
                  onChange={this.onChange}
                  disabled={this.props.loading}
                  checked="checked"
                ></input>
                <label className="mr-2">Female</label>
                <input
                  className="mr-2"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={this.onChange}
                  disabled={this.props.loading}
                ></input>
              </div>
              {/* Username/Email */}
              <div className="lbl-input">Username/Email:</div>
              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Please enter username"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  disabled={this.props.loading}
                ></input>
                <span className="focus-input100"></span>
              </div>
              {/* PASSWORD */}
              <div className="lbl-input">Password:</div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Please enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  disabled={this.props.loading}
                ></input>
                <span className="focus-input100"></span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  type="submit"
                  disabled={this.props.loading}
                >
                  Register
                </button>
                <hr></hr>
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.users.loading,
    username: state.users.username,
    password: state.users.password,
    name: state.users.name,
    gender: state.users.gender,
    success: state.users.success,
    isLogin: state.users.isLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: user => dispatch(registerUser(user)),
    resetUser: () => dispatch({ type: actionType.RESET_USER }),
    setUser: (name, value) =>
      dispatch({ type: actionType.SET_INFO_USER, name: name, value: value })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
