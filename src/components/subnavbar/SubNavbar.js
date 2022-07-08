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
    <div
      className="col-md-3 d-flex align-items-center justify-content-end"
      style={{ marginLeft: "auto", marginRight: "5%" }}
    >
      <Navbar bg="light" variant={"light"}>
        <Nav>
          <Nav.Item>
            <p className="h-100 my-0 mr-2 me-3 mt-1 ml-auto">
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
    </div>
  );
};

export default SubNavbar;