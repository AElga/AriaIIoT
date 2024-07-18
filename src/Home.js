import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';
import font from './Guage.css'
import NavBar from './NavBar';
import background from './background.png';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const myStyle = {
      backgroundImage: `url(${background})`,
      height: "100vh",
      marginTop: "-70px",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
      //backgroundRepeat: "no-repeat",
      // backgroundAttachment: "fixed"

  };

    return (
      
      <div className='Home'>
        <NavBar></NavBar>
        <div style={myStyle}> <br></br><br></br><br></br><br></br>
        <div class="row">
          <div class="col-3"></div>
          <div class="col">
          <Typography variant="h2" fontWeight="600" color={"#FFFFFF"}>
          Welcome to Aria Technologies!
          </Typography>
        {/* <h1 class="font">Welcome to Aria Technologies!</h1> */}
        </div>
        {/* <div class="col-3"></div> */}
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
      </div>
    );
  }
}

export default Home;
