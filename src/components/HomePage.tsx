import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeaderComponent from "./HeaderComponent";
import LogoComponent from "./LogoComponent";
import SidebarComponent from "./SidebarComponent";
import StatisticsComponent from "./StatisticsComponent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadCrumbComponent from "./BreadCrumbComponent";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import PetsPage from "./PetsPage";
import { MenuItem } from "../Models/TypeModels";

type Props = {};

const HomePage = (props: Props) => {
  const [activeKey, setActiveKey] = useState<string>("/success");

  const sidebarMenus: MenuItem[] = [
    { to: "/success", icon: "home", label: "Home" },
    { to: "/success/pets", icon: "pets", label: "Pets" },
    { to: "/success/adopters", icon: "groups", label: "adopters" },
  ];

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
