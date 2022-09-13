import React from "react";
import Card from "react-bootstrap/Card";
type Props = {
    image: string;
    name: string;
    description: string;
    age: string;
    address: string;
    gender: string;
};

const PetComponent = ({ image, name, description, age, address, gender, }: Props) => {
    return (
        <div>
            <Card bg="light" className="rounded">
                <Card.Img variant="top" src={image} />
                <Card.Body className=" border-secondary border-2 border-start">
                    <div className="d-flex align-items-center mb-0">
                        <div className="">
                            <h5 className="card-text my-1">{name}</h5>
                            <p className="my-1 card-text text-gray">{description}</p>
                        </div>
                        <div className="text-end ms-auto">
                            <p className="my-1 card-text text-gray">
                                <i className="material-icons">{gender.toLowerCase()}</i>
                            </p>
                            <p className="my-1 card-text text-gray">{age}</p>
                        </div>
                    </div>
                    <p className="text-black-50">{address}</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PetComponent;
