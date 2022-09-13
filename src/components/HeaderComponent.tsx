import React from "react";
import { Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import LogoImage from '../images/logo.png';
type Props = {};

const HeaderComponent = (props: Props) => {
  return (
    <Navbar
      fixed="top"
      variant="light"
      bg="white"
      className="navbar-main border"
    >
      <Container fluid>
        <div className="ms-4">
          {/* <div className="search-input-group">
            <i className="search-icon bx bx-search"></i>
            <Form.Control
              className="border-0 bg-light"
              placeholder="Search something..."
              type="text"
            />
          </div> */}

          {/* <img src={LogoImage} className="img-fluid" alt="" /> */}
          <div className="d-flex">
            <Image fluid src={LogoImage} width="45" />
            <span className="ms-2 mb-0 p-0 align-self-center"><small>God's Home Of Refuge</small></span>
          </div>

        </div>
        <Nav className="ms-auto">
          <Nav.Item className="me-3">
            <Nav.Link className="bg-light rounded-circle">
              <i className="material-icons">sms</i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Nav.Link className="bg-light rounded-circle">
              <i className="material-icons">notifications</i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="rounded-circle bg-secondary"
              style={{ width: "40px", height: "40px" }}
            ></Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
