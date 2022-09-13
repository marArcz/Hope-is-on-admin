import React, { useState, useEffect } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import HeaderComponent from "./HeaderComponent";
import LogoComponent from "./LogoComponent";
import SidebarComponent from "./SidebarComponent";
import StatisticsComponent from "./StatisticsComponent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadCrumbComponent from "./BreadCrumbComponent";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import PetsPage from "./PetsPage";
import sidebarMenus from './SideBarMenuItems';
import { PetModel } from "../Models/TypeModels";
import axios from 'axios';

type Props = {};

const HomePage = (props: Props) => {
  const [activeKey, setActiveKey] = useState<string>("/success");
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    axios.get<Array<PetModel>>("/pets")
    .then((res:any)=>{
      setPetList(res);
      console.log("pets: ", petList)
    })
  }, [])


  return (
    <>
      <SidebarComponent
        onItemSelect={(key) => setActiveKey(key)}
        activeKey={activeKey}
        sidebarMenus={sidebarMenus}
      />
      <HeaderComponent />

      <main className="home full-h bg-light rounded-5">
        <Container className="h-100 mt-4 mb-3 ">
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="/pets" element={<PetsPage />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default HomePage;
