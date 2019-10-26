import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Menu extends Component {
  showLogInContent = () => {
    var { name, isLogin } = this.props;

    if (isLogin) {
      return (
        <div>
          <button className="mr-3"> {name} </button>
          <button className="btn btn-outline-danger">LOGOUT</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link className="btn btn-primary mr-3" to="/login">
            LOGIN
          </Link>
          <Link className="btn btn-success mr-3" to="/register">
            REGISTER
          </Link>
        </div>
      );
    }
  };

  render() {
    var { name, isLogin } = this.props;

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <h2>Caro Game</h2>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link>Home</Nav.Link>
            <Nav.Link>Link</Nav.Link> */}
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {isLogin ? (
          <div>
            <button className="mr-3"> {name} </button>
            <button className="btn btn-outline-danger">LOGOUT</button>
          </div>
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
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.users.isLogin,
    name: state.users.name
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
