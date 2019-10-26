import React, { Component } from "react";
import Register from "../../components/Register/Register";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionType from "../../actions/actionType";

class RegisterPage extends Component {
  render() {
    return (
      <div>
        <Register></Register>
        <Modal show={this.props.success}>
          <Modal.Header closeButton>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Hi <b>{this.props.username}</b>, congratulation on your successful
            registration!
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.users.username,
    success: state.users.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetUser: () => dispatch({ type: actionType.RESET_USER })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
