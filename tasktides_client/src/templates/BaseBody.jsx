import React from "react";

import NavBar from "../components/NavBar.jsx";

import { Outlet } from "react-router-dom";

const BaseBody = () => {
  return (
    <div className="base-body">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default BaseBody;
