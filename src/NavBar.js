import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';


const NavBar = () => {

  return (
          <nav class="navbar sticky-top navbar-expand-lg nav-underline" style={{backgroundColor: "#999698"}} >
    <div class="container-fluid" >
    <a class="navbar-brand" href="/">
        <img src={ariaLogo} alt="Logo" width="116 px" height="57 px" class="d-inline-block align-text-top"/> 
      </a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
        <NavLink className="nav-link ms-4" to="/Vib">
              <h4>Predictive Maintenance</h4>
            </NavLink>
            <NavLink className="nav-link ms-4" to="/Energy">
              <h4>Energy Monitoring</h4>
            </NavLink>
            <NavLink className="nav-link ms-4" to="/MP">
              <h4>Performance Monitoring</h4>
            </NavLink>
        </div>
      </div>
    </div>
  </nav>
    );
  
}

export default NavBar;