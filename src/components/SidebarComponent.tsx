import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import LogoComponent from "./LogoComponent";
import ProfilePic from "../images/profile_user.jpg";
import { Link } from "react-router-dom";
import { MenuItem } from "../Models/TypeModels";
import DropdownMenuBtn from "./DropdownMenuBtn";
import { Collapse } from "react-bootstrap";
import MenuBtn from "./MenuBtn";
type Props = {
  sidebarMenus: MenuItem[];
  activeKey: string;
  onItemSelect: (key: string) => void;
};


const SidebarComponent = ({ sidebarMenus, activeKey, onItemSelect }: Props) => {
  const [isPetExpanded, setIsPetExpanded] = useState(false)

  return (
    <div className="bg-white sidebar bg-gradient shadow">
      <header className=" text-center text-light">
        <p className="text-success">ADMIN</p>
        <div
          className="user-photo"
          style={{ backgroundImage: `url('${ProfilePic}')` }}
        />
        <p className="my-3 text-black-50">John Doe</p>
        <hr />
      </header>
      <Nav
        activeKey={activeKey}
        className="flex-column mt-2"
        as={"ul"}
        onSelect={(selectedKey) => onItemSelect(selectedKey || "")}
      >
        {sidebarMenus &&
          sidebarMenus.map((item, index) => (
            <Nav.Item className="" key={index}>
              <Nav.Link as={Link} href={item.to} to={item.to} className="fs-5">
                <div className="d-flex align-items-center">
                  <i className="material-icons me-3">{item.icon}</i>
                  <span className="fs-6 text-capitalize">{item.label}</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          ))}
        {/* <Nav.Item className="">
          <DropdownMenuBtn to="/success/pets" icon="pets" label="Pets" expanded={isPetExpanded} onClick={() => setIsPetExpanded(!isPetExpanded)} />
          <Collapse in={isPetExpanded}>
            <Nav.Item>
              <MenuBtn to="/success/pets/add" icon="add" label="Add Pet" />
            </Nav.Item>
          </Collapse>
        </Nav.Item> */}
      </Nav>
    </div>
  );
};

export default SidebarComponent;
