import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../config/firebase";
import { loginUser } from "../../../redux/actionCreators/authActionCreators";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const disaptch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !pass || !confirmPass) {
      return toast.info("Please fill in all fields!");
    }
    if (pass.length < 8) {
      return toast.info("Password must be of length 8 or greater!");
    }
    if (pass !== confirmPass) {
      return toast.info("Passwords do not match!");
    }

    auth.createUserWithEmailAndPassword(email, pass).then(user => {
      auth.currentUser.updateProfile({
        displayName: fullName
      }).then(() => {
        const user = auth.currentUser;
        const data = {
          user: user.providerData[0],
          id: user.uid
        };
        disaptch(loginUser(data));
        toast.success("You are register and logged in successfully");
        history.push("/admin/dashboard");
      }).catch(err => {
        console.log(err);
      });
    });
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="text-dark font-weight-bolder text-center py-5">
            Fumi の Tech ブログ{" "}
            <span className="text-primary">[Admin]</span>{" "}
          </h1>
          <Col md={5} sm={12} xm={12} className="mx-auto p-3 my-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId={"fullNameBasicForm"} className="my-2">
                <Form.Control
                  type="text"
                  placeholder={"Full Name"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={"fullEmailBasicForm"} className="my-2">
                <Form.Control
                  type="email"
                  placeholder={"Email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={"fullConfirmPasswordBasicForm"} className="my-2">
                <Form.Control
                  type="password"
                  placeholder={"Password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={"fullConfirmPasswordBasicForm"} className="my-2">
                <Form.Control
                  type="password"
                  placeholder={"Re-type Password"}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={"fullSubmitBasicForm"} className="mt-5">
                <Button
                  type="submit"
                  vaniant={"dark"}
                  bg="dark"
                  className="form-control"
                >
                  Register
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;