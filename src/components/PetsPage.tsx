import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import DogImage from '../images/dog.jpg'
import PetComponent from "./PetComponent";
type Props = {};

const PetsPage = (props: Props) => {
  const petsArray = Array(20);
  petsArray.fill("pet", 0, 20);
  return (
    <div>
      <h4 className="mb-3 text-success">
        <i className="material-icons">pets</i> Pets
      </h4>
      <hr />
      <Form.Check type={"checkbox"} id="select-all" label="SELECT ALL" />

      <div className="pets-container">
        <Row lg={4} className="gy-3 mt-3">
          {petsArray.map((pet, index) => (
            <Col key={index}>
              <PetComponent image={DogImage} name="Sola" description="Cute dog" age="2 months old" address="" gender="Male"/>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PetsPage;
