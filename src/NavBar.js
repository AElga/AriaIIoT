import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';
import './Guage.css';


const NavBar = () => {

  return (
          <nav class="navbar navbar-expand-lg nav-underline" style={{backgroundColor: "#99969800"}} >
    <div class="container-fluid" >
    <a class="navbar-brand ms-4" href="/">
        <img src={ariaLogo} alt="Logo" width="116 px" height="57 px" class="d-inline-block align-text-top"/> 
      </a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
        
        <NavLink className="nav-link ms-4" to="/Vib">
              <h4 class="font">Predictive Maintenance</h4>  
            </NavLink>    
            <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Fake Predictive Alarm</a></li>
            </ul>
            <NavLink className="nav-link ms-4" to="/Energy">
              <h4 class="font">Energy Monitoring</h4>
            </NavLink>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Fake Energy Alarm</a></li>
            </ul>
            {/* <NavLink className="nav-link ms-4" to="/MP" >
              <h4 class="font">Performance Monitoring</h4>
            </NavLink>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Fake MP Alarm</a></li>
            </ul> */}
        </div>
        
      </div>
      <form class="d-flex me-5" role="search" >
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"  />
      <button class="btn btn-outline-light btn-bg-dark" type="submit"  >Search</button>
    </form>
    {/* <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body"></div>
        </div> */}
    {/* <div>
    <nav class="navbar mh-75  fixed-bottom" style={{backgroundColor: "#999698"}}>
  <div class="container-fluid h-100" style={{backgroundColor: "#999698"}}>
    <a class="navbar-brand" href="#">Back to Top</a>
    <img src={ariaLogo} alt="Logo" width="143 px" height="70 px" class="d-inline-block align-text-top"/>
  </div>
</nav></div> */}
    </div>
  </nav>
    );
  
}

export default NavBar;