import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as constant from "../../utils/constants";
import { logoutUser, checkLoginUser } from "../../actions/actions";
import "./Menu.css";
class Menu extends Component {
  componentDidMount() {
    const data_user = localStorage.getItem(constant.TOKEN_USER);
    if (data_user) {
      this.props.checkLogin(data_user).catch(err => console.log(err));
    }
  }

  render() {
    var { name, isLogin, picture } = this.props;
    const data_user = localStorage.getItem(constant.TOKEN_USER);
    return (
      <Navbar bg="light" expand="lg" style={{ zIndex: 999 }}>
        <Navbar.Brand>
          <Link to="/">
            <h2>Caro Game</h2>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {data_user && isLogin ? (
            <Nav>
              <img
                src={picture}
                className="rounded-circle mr-3 avatar align-middle"
                alt={picture}
              ></img>
              <NavDropdown title={name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">History</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.props.logout}>
                  <i className="fa fa-power-off"></i> Sign out
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>
                <i className="fa fa-cog"></i>
              </Nav.Link>
            </Nav>
          ) : (
            <div>
              <Link className="btn btn-primary mr-3" to="/login">
                LOGIN
              </Link>
              <Link className="btn btn-success mr-3" to="/register">
                REGISTER
              </Link>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.users.isLogin,
    name: state.users.name,
    picture: state.users.picture
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
    checkLogin: token => dispatch(checkLoginUser(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
