import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import DogImage from '../images/dog.jpg'
import PetComponent from "./PetsComponents/PetComponent";
type Props = {};

const PetsPage = (props: Props) => {
  const petsArray = Array(20);
  petsArray.fill("pet", 0, 20);
  return (
    <div className="pt-2">
      <h4 className="mb-3 text-success">
        <i className="material-icons">pets</i> Pets
      </h4>
      <hr />
      <div className="d-flex">
        <Form.Check type={"checkbox"} id="select-all" label="SELECT ALL" />
        <div className="ms-auto">
          <button className="btn btn-poppy text-light" type="button">Add New</button>
        </div>
      </div>
      <div className="mb-2">
        <Row>
          <Col className="col-5">
            <div className="search-input-group">
              <i className="search-icon bx bx-search text-gray"></i>
              <Form.Control
                className="border- bg-white text-gray"
                placeholder="Search pet to manage"
                type="text"

              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="pets-container">
        <Row lg={4} className="gy-3 mt-3">
          {petsArray.map((pet, index) => (
            <Col key={index}>
              <PetComponent image={DogImage} name="Sola" description="Cute dog" age="2 months old" address="" gender="Male" />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PetsPage;
