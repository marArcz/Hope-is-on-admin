import React, { useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import LogoComponent from "./LogoComponent";
type Props = {};

const LoginPage = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const formOnSubmit = () => {
    navigate("/success");
  };
  return (
    <div className="full-h position-relative">
      <div className="sign-btn-group position-absolute top-0 start-0 bg-opacity-50 bg-secondary">
        <div className="content">
          <button type="button" className="d-flex align-items-center">
            <span className="text-light me-1"><small>Forgot Password</small></span>
            <small><i className="bx bx-help-circle bx-sm text-light"></i></small>
          </button>
        </div>
      </div>
      <Row className="h-100">
        <Col md={6} className="p-5 bg-light">
          <Row className="justify-content-center h-100">
            <Col md={5}>
              <div className="d-flex h-100">
                <Container className="align-self-center">
                  <LogoComponent />
                </Container>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={6} className="shadow-sm">
          <div className="bg-white d-flex h-100">
            <Container className="p-5 align-self-center mb-5">
              <Form onSubmit={formOnSubmit} className="form active">
                <div className="mb-">
                  <p className="fs-1 text-success">Sign In Here!</p>
                  <p className="fs-6">To manage system you need to sign in.</p>
                </div>
                {/* <br /> */}
                <hr className="text-light" />
                <div className="">
                  <div className="mb-4">
                    <Form.Label className="fw-light">Email Address:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      className="rounded-0"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <Form.Label className="fw-light">Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      className="rounded-0 fs-5 mb-3"
                    />
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        className="text-secondary"
                        type="checkbox"
                        label="Keep me logged in."
                      />
                    </Form.Group>
                  </div>

                  <Button
                    variant="secondary"
                    className="px-4 py-2 rounded-1 fs-6"
                    type="submit"
                  >
                    SIGN IN
                  </Button>
                </div>
              </Form>
            </Container>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
