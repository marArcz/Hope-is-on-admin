import React, { useState, useEffect } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import HeaderComponent from "./HeaderComponent";
import LogoComponent from "./LogoComponent";
import SidebarComponent from "./SidebarComponent";
import StatisticsComponent from "./StatisticsComponent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadCrumbComponent from "./BreadCrumbComponent";
import { Route, Routes, useLocation } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import PetsPage from "./PetsPage";
import sidebarMenus from './SideBarMenuItems';
import { AdminModel, CategoryModel, PetModel } from "../Models/TypeModels";
import axios from 'axios';
import AddPetPage from "./AddPetPage";
import { ToastContainer, toast } from 'react-toastify';
import BackendAPI from "../backendApi/BackendAPI";

type Props = {
  admin:{} | AdminModel
};

const HomePage = ({admin}: Props) => {
  const [activeKey, setActiveKey] = useState<string>("/success");
  const location = useLocation();
  const [categories, setCategories] = useState([])
  const [petList, setPetList] = useState<any>([]);
  
  const loadCategories = (selected: undefined | string = undefined) => { 
    axios.get<Array<CategoryModel>>("/categories")
      .then((res: any) => {
        console.log("category res:", res)
        setCategories(res.data);
        console.log(res)
      })
  }
  const loadPets = async() => {

    let pets = await BackendAPI.pets.getAll()
    setPetList(pets)
  }
  useEffect(() => {
    loadPets()
    loadCategories()
  }, [])


  useEffect(() => {
    console.log("location: ", location);
    setActiveKey(location.pathname)
  }, [location])

  const onPetsUpdate = () =>{
    loadPets();
  }

  return (
    <>
      <ToastContainer />
      <SidebarComponent
        onItemSelect={(key) => setActiveKey(key)}
        activeKey={activeKey}
        sidebarMenus={sidebarMenus}
        admin={admin}
      />
      <HeaderComponent admin={admin} />

      <main className="home full-h bg-light rounded-5">
        <Container className="h-100 mt-4 mb-3 ">
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="/pets" element={<PetsPage categories={categories} onPetsUpdate={onPetsUpdate} petList={petList} />} />
            <Route path="/pets/add" element={<AddPetPage onPetsUpdate={onPetsUpdate} />} />
          </Routes>
        </Container>
      </main>



    </>
  );
};

export default HomePage;
