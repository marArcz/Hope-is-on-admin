import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
type Props = {};

const BreadCrumbComponent = (props: Props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active><small>App</small></Breadcrumb.Item>
      <Breadcrumb.Item active><small>Home</small></Breadcrumb.Item>
      {/* <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
