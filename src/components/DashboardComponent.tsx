import React from "react";
import { Col, Row } from "react-bootstrap";
import BreadCrumbComponent from "./BreadCrumbComponent";
import LogoComponent from "./LogoComponent";
import StatisticsComponent from "./StatisticsComponent";

type Props = {};

const DashboardComponent = (props: Props) => {
  type IStatsCard = {
    title: string;
    value: string;
    bg: string;
    txtColor: string;
    icon: string;
  };

  const StatsCard = ({
    title,
    value,
    bg,
    txtColor = "text-dark",
    icon,
  }: IStatsCard) => {
    return (
      <div className={`card shadow mb-2 border-0 ${bg} ${txtColor} rounded-0`}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <p className="my-0 fs-6 fw-light">
                <i className={icon}></i> {title}
              </p>
            </div>
            <div className="">
              <p className=" fs-5 my-0 fw-light">{value}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 className="mb-2 text-dark">Welcome Back!</h3>
      <BreadCrumbComponent />
      {/* <hr className=" text-success" /> */}
      <Row className="h-100">
        <Col md={7} className="">
          <div className="card bg-white border-0 rounded-0">
            <div className="card-body">
              <p className="text-black-50">Statistics</p>
              <StatsCard
                icon="bx bx-home-heart fs-6"
                title="Animal Pets In Care"
                value="100"
                bg="bg-warning"
                txtColor="text-dark"
              />

              <StatsCard
                icon="bx bx-home-heart fs-6"
                title="Registered Adopters"
                value="100"
                bg="bg-success"
                txtColor="text-light"
              />
              <p className="mb-3 mt-5 text-black-50">Monthly Reports</p>
              <StatisticsComponent />
            </div>
          </div>
        </Col>
        <Col className="">
          <Row className="justify-content-center align-items-center h-100">
            <Col md={6}>
              <LogoComponent />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardComponent;
