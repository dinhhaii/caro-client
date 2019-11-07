import React, { Component } from "react";
import { connect } from "react-redux";
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
      gender: "",
      type: "",
      progress: 0
    };
  }

  updateInfo = () => {
    const image = this.fileUpload.files[0];
    if (image != null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
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
              const user = {
                ...this.state,
                picture: url
              };
              console.log("UPLOAD IMAGE ", user);
            });
        }
      );
    }
  };

  handleChange = e => {
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
    this.updateInfo();
  };

  render() {
    const { username, name, password, picture, type } = this.props.user;
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="dh-font-color">Name</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
            ></input>
          </div>
          {type === "facebook" || type === "google" ? (
            <div className="form-group">
              <label className="dh-font-color">New password</label>
              <input
                className="form-control"
                name="password"
                type="password"
                onChange={this.handleChange}
              ></input>
            </div>
          ) : null}
          <div className="form-group">
            <img src={this.props.picture} alt=""></img>
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
            ></input>
          </div>
          <button className="btn btn-primary" type="submit">
            SAVE
          </button>
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
)(Profile);
