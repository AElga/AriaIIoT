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
      <NavBar></NavBar>
      //   <Link to="Vib">
      //     <button type="button" >
      //       Go to Vib
      //     </button>
      //   </Link>
      //   <Link to="Energy">
      //     <button type="button" >
      //       Go to Energy
      //     </button>
      //   </Link>
      //   <Link to="MP">
      //     <button type="button" >
      //       Go to MP
      //     </button>
      //   </Link>
      // </React.Fragment>
    );
  }
}

export default Home;
