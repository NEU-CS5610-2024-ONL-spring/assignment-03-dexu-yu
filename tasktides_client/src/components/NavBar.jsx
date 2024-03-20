import React from "react";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/checklists">Checklists</Link>
        </li>
        <li>
          <Link to="/timeblocks">Time Blocks</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
