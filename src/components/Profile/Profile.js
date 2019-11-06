import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionType from "../../actions/actionType";
import { checkLoginUser } from "../../actions/actions";
import { storage } from "../../utils/firebase";
import { updateUser } from "../../actions/actions";
import "./Profile.css";

class Profile extends Component {
  //   componentWillMount() {
  //     const data_user = localStorage.getItem(constant.TOKEN_USER);
  //     if (data_user) {
  //       this.props.checkLogin(data_user).catch(err => console.log(err));
  //     }
  //   }

  updateInfo = () => {
    const image = this.fileUpload.files[0];
    if (image != null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
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
                ...this.props.user,
                picture: url
              };
              this.props.updateUser(user);
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
      this.props.setUser(name, value);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.updateInfo();
  };

  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="dh-font-color">Name</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label className="dh-font-color">New password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label className="dh-font-color">Type</label>
            <select
              className="form-control"
              name="type"
              defaultValue="local"
              onChange={this.handleChange}
            >
              <option value="facebook">Facebook</option>
              <option value="google">Google</option>
              <option value="local">Local</option>
            </select>
          </div>
          <div className="form-group">
            <img src={this.props.picture} alt=""></img>
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
    name: state.users.name,
    picture: state.users.picture,
    username: state.users.username,
    type: state.users.type,
    user: state.user
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
