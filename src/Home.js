import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';
import NavBar from './NavBar';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      
      <div className='Home'>
        <NavBar></NavBar>
        <h1>Welcome to Aria Technologies!</h1>
      </div>
    );
  }
}

export default Home;
