import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Row, Form, Button, Image } from "react-bootstrap";
import LogoComponent from "./LogoComponent";
import { AdminModel } from "../Models/TypeModels";
import ProfilePic from '../images/profile.jpg';
type Props = {
    onSignUp: (admin: AdminModel) => void
};

const SignUpPage = ({ onSignUp }: Props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState<any>(ProfilePic);

    let navigate = useNavigate();
    const formOnSubmit = () => {
        // onSignUp({

        // })
    };
    return (
        <Container>
            <Row className="justify-content-center max-h align-items-center">
                <Col md={10} className="p-2">
                    <Card className="shadow border p-0">
                        <Card.Body className="p-0 position-relative">
                            <Row className="">
                                <Col className="">
                                    <div className="bg-success p-5">
                                        <Form onSubmit={formOnSubmit} className="form active">
                                            <div className="mb-">
                                                <p className="fs-1 text-light">Create An Account!</p>
                                                <p className="fs-6">
                                                    To manage system you need to sign in.
                                                </p>
                                            </div>
                                            <hr className="text-light" />
                                            <div className="">
                                                <div className="mb-4">
                                                    <Row className="justify-content-cente">
                                                        <Col lg={3} md={4} sm={4} className="text-center">
                                                            <div className="position-relative">
                                                            <Image fluid src={photo} thumbnail />
                                                            <label htmlFor="" className="position-absolute top-0 start-0 text-warning"><i className="material-icons">camera</i></label>
                                                            </div>
                                                            <p className="form-text text-light mb-0"><small>Account Photo</small></p>
                                                        </Col>
                                                    </Row>
                                                </div>

                                                <Row className="mt-3">
                                                    <Col>
                                                        <div className="mb-4">
                                                            <Form.Label className=" text-light">Full Name:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                required
                                                                className="rounded-0"
                                                                onChange={(e) => setName(e.target.value)}
                                                                value={name}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="mb-4">
                                                            <Form.Label className=" text-light">Email Address</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                required
                                                                className="rounded-0"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                value={email}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="mb-4">
                                                    <Form.Label className="text-light">Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        required
                                                        value={password}
                                                        className="rounded-0 fs-5 mb-3"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicCheckbox"
                                                    >
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
                                    </div>
                                </Col>
                                <Col md className="">
                                    <div className="bg-white p-5">
                                        <Row className="h-100 justify-content-center mt-4">
                                            <Col md={8}>
                                                <LogoComponent />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpPage;
