import React, { Component } from "react";
import "./Register.css";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/actions";
import Menu from "../Menu/Menu";

class Register extends Component {
  constructor(props) {
    super(props);
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
    this.props.getUser(user);
  };

  render() {
    return (
      <div className="limiter">
        <Menu></Menu>
        <div className="container-login100 bg-dark">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form p-l-55 p-r-55 p-t-178"
              // method="POST"
              // action="http://localhost:3000/user/register"
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
                  value="male"
                  onChange={this.onChange}
                  checked="checked"
                ></input>
                <label className="mr-2">Female</label>
                <input
                  className="mr-2"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={this.onChange}
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
                ></input>
                <span className="focus-input100"></span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit">
                  Register
                </button>
                <hr></hr>
                <button className="login100-form-btn google-btn">Google</button>
                <button className="login100-form-btn facebook-btn">
                  Facebook
                </button>
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
    gender: state.users.gender,
    name: state.users.name
  };
};

const mapDispatchToProps = {
  getUser: fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
