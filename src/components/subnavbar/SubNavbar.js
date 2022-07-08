import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SubNavbar = () => {

  const { user } = useSelector(state => ({
    user: state.auth.user
  }), shallowEqual);
  
  const history = useHistory();

  return (
    <Navbar bg="light" variant={"light"}>
      <Nav>
        <Nav.Item>
            <p className="h-100 my-0 me-3 mt-1">
              Welcom,{" "}
              <span style={{ fontWeight: "bold" }}>{user.displayName}</span>
            </p>
        </Nav.Item>
        <Nav.Item>
          <Button
            type="button"
            variant="success"
            onClick={() => history.push("/admin/dashboard")}
            size="sm"
            bg="success"
          >
              Admin
            </Button>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default SubNavbar;