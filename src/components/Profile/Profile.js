import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ProgressBar } from "react-bootstrap";
import * as actionType from "../../actions/actionType";
import { checkLoginUser } from "../../actions/actions";
import { storage } from "../../utils/firebase";
import { updateUser } from "../../actions/actions";
import * as constant from "../../utils/constants";
import "./Profile.css";

class Profile extends Component {
  componentWillMount() {
    const data_user = localStorage.getItem(constant.TOKEN_USER);
    if (data_user) {
      this.props.checkLogin(data_user).catch(err => console.log(err));
    }
  }

  constructor() {
    super();
    this.state = {
      username: "",
      name: "",
      password: "",
      picture: "",
      gender: "",
      type: "",
      progress: 0,
      isLoading: false,
      constructor: false
    };
  }

  updateImage = () => {
    const image = this.fileUpload.files[0];
    if (image != null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({
            isLoading: true,
            progress: progress
          });
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.setState({
                isLoading: false,
                picture: url
              });
            });
        }
      );
    }
  };

  handleChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    if (name === "picture") {
      this.updateImage();
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const user = this.state;
    this.props.updateUser(user);
    if (!this.props.user.isLoading) {
      this.props.history.push("/");
    }
  };

  initState = () => {
    if (this.state.constructor === false) {
      this.setState({
        username: this.props.user.username,
        name: this.props.user.name,
        password: this.props.user.password,
        picture: this.props.user.picture,
        gender: this.props.user.gender,
        type: this.props.user.type,
        progress: 0,
        isLoading: false,
        constructor: true
      });
    }
  };

  componentWillUpdate() {
    this.initState();
  }

  render() {
    const { username, name, type, picture } = this.state;
    return (
      <div className="container" style={{ width: "50%" }}>
        <div className="d-block mt-5">
          <h2 className="dh-font-color text-center">Persional Info</h2>
        </div>
        <form className="mt-5" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="dh-font-color">Username</label>
            <input
              className="form-control"
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
              disabled
            ></input>
          </div>
          <div className="form-group">
            <label className="dh-font-color">Name</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
              disabled={this.state.isLoading}
            ></input>
          </div>
          {type === "local" ? (
            <div className="form-group">
              <label className="dh-font-color">New password</label>
              <input
                className="form-control"
                name="password"
                type="password"
                onChange={this.handleChange}
                disabled={this.state.isLoading}
              ></input>
            </div>
          ) : null}
          <div className="form-group d-flex flex-column">
            <img className="dh-picture mb-2 mt-4" src={picture} alt=""></img>
            <ProgressBar
              now={this.state.progress}
              label={`${this.state.progress}%`}
            ></ProgressBar>
            <input
              type="file"
              name="picture"
              className="form-control"
              onChange={this.handleChange}
              ref={ref => (this.fileUpload = ref)}
              disabled={this.state.isLoading}
            ></input>
          </div>
          <div className="mt-5 d-flex justify-content-center">
            <button
              className="btn btn-primary dh-btn-2 justify-content-center"
              type="submit"
            >
              SAVE
              <i className="ml-2 fa fa-check"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.users.isLogin,
    user: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetUser: () => dispatch({ type: actionType.RESET_USER }),
    setUser: (name, value) =>
      dispatch({ type: actionType.SET_INFO_USER, name: name, value: value }),
    checkLogin: token => dispatch(checkLoginUser(token)),
    updateUser: user => dispatch(updateUser(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
