import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant={"dark"} className="shadow-lg">
      <Navbar.Brand
        as={Link}
        to="/admin/dashboard"
        style={{ marginLeft: "10%" }}
      >
        React + Redux Firebase Blog
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/posts">
            Posts
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;