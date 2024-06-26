import React from "react";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/app">TaskTides</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/app/checklists">Checklists</NavLink>
            <NavLink className="nav-link" to="/app/thoughts">Thoughts</NavLink>
            <NavLink className="nav-link" to="/app/profile">Profile</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
