import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';


const NavBar = () => {
    return (
        // <React.Fragment>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
    <a class="navbar-brand" href="/">
        <img src={ariaLogo} alt="Logo" width="106" height="57" class="d-inline-block align-text-top"/> 
      </a>
  
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link ms-4" href="Vib"><h4>Predicitve Maintenance</h4></a>
          <a class="nav-link ms-4" href="Energy"><h4>Energy Monitoring</h4></a>
          <a class="nav-link ms-4" href="MP"><h4>MP Energy Monitoring</h4></a>
        </div>
      </div>
    </div>
  </nav>
    );
}

export default NavBar;