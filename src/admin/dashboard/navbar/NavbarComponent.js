import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const NavbarComponent = ({ logout }) => {

  const { isLoggedIn, user } = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  }), shallowEqual);
  
  return (
    <Navbar bg="dark" variant={"dark"}>
      <Navbar.Brand
        as={Link}
        to="/admin/dashboard"
        style={{ marginLeft: "10%" }}
      >
        Admin Pannel
      </Navbar.Brand>
      <Nav>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/admin/dashboard">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/admin/dashboard/addPost">
            Add Post
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/admin/dashboard/posts">
            Posts
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div
        className="col-md-3 d-flex align-items-center justify-content-end"
        style={{ marginLeft: "auto", marginRight: "5%" }}
      >
        {isLoggedIn && (
          <>
            <p className="text-white h-100 my-0">
              Welcom,{" "}
              <span style={{ fontWeight: "bold" }}>{user.displayName}</span>
            </p>
            &nbsp;&nbsp;
            <Button
              type="button"
              variant="success"
              onClick={() => logout()}
              size="sm"
              bg="success"
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default NavbarComponent;