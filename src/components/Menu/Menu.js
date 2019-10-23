import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
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
        <div>
          <button className="mr-3">Username</button>

          <Link className="btn btn-primary mr-3" to="/login">
            LOGIN
          </Link>

          <Link className="btn btn-success mr-3" to="/register">
            REGISTER
          </Link>
          <button className="btn btn-outline-danger">LOGOUT</button>
        </div>
      </Navbar>
    );
  }
}

export default Menu;
