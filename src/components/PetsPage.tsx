import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DogImage from '../images/dog.jpg'
import { CategoryModel, PetModel } from "../Models/TypeModels";
import AddCategoryModal from "./AddCategoryModal";
import AddPetModal from "./AddPetModal";
import PetComponent from "./PetsComponents/PetComponent";
type Props = {
  petList:PetModel[] | [],
  categories:CategoryModel[] | []
};

const PetsPage = (props: Props) => {


  return (
    <div className="pt-2">
      <h4 className="mb-3 text-success">
        <i className="material-icons">pets</i> Pets
      </h4>
      <hr />
      <div className="d-flex">
        <Form.Check type={"checkbox"} id="select-all" label="SELECT ALL" />
        <div className="ms-auto">
          <Link to="/success/pets/add" className="btn btn-poppy text-light" type="button">Add New</Link>
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
        {props.petList ? (
          <Row lg={3} xl={4} md={2} className="gy-3 mt-3">
            {props.petList.map((pet: PetModel, index) => (
              <Col key={index}>
                <PetComponent photo={pet.photos[0]} name={pet.name} description={pet.description} age={pet.age} address={pet.address} gender={pet.gender} />
              </Col>
            ))
            }
          </Row>
        ) : (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

      </div>
    </div>
  );
};

export default PetsPage;
