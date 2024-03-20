import React from "react";
import PropTypes from "prop-types";

import NavBar from "../components/NavBar.jsx";

const BaseBody = (props) => {
  return (
    <div className="base-body">
      <NavBar />
      {props.children}
    </div>
  );
};

BaseBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseBody;
