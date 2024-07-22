import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';
import './Guage.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm nav-underline" style={{ backgroundColor: "#99969800" }}>
      <div className="container-fluid">
        <a className="navbar-brand ms-4" href="/">
          <img src={ariaLogo} alt="Logo" width="116" height="57" className="d-inline-block align-text-top" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link ms-4" to="/Vib">
              <h4 className="font">Predictive Maintenance</h4>
            </NavLink>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="predictiveDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <h4 className="font"></h4>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="predictiveDropdown">
                <li><NavLink className="dropdown-item" to="/PredictivePage">Predictive Page</NavLink></li>
                <li><NavLink className="dropdown-item" to="/PredictiveAlarm">Predictive Alarm</NavLink></li>
              </ul>
            </div>
            <NavLink className="nav-link ms-4" to="/Energy">
              <h4 className="font">Energy Monitoring</h4>
            </NavLink>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="energyDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <h4 className="font"></h4>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="energyDropdown">
                <li><NavLink className="dropdown-item" to="/EnergyPage">Energy Page</NavLink></li>
                <li><NavLink className="dropdown-item" to="/EnergyAlarm">Energy Alarm</NavLink></li>
              </ul>
            </div>
            <NavLink className="nav-link ms-4" to="/MP">
              <h4 className="font">Performance Monitoring</h4>
            </NavLink>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="performanceDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <h4 className="font"></h4>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="performanceDropdown">
                <li><NavLink className="dropdown-item" to="/PerformancePage">Performance Page</NavLink></li>
                <li><NavLink className="dropdown-item" to="/PerformanceAlarm">Performance Alarm</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
        <form className="d-flex me-5" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-light btn-bg-dark" type="submit">Search</button>
        </form>
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            ...
          </div>
        </div>
      </div>  
    </nav>
  );
}

export default NavBar;
