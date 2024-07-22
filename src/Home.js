import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';
import Caresoul1 from './Caresoul1.png'
import Caresoul2 from './Caresoul2.png'
import Caresoul3 from './Caresoul3.png'
import homefontfont from './Guage.css'
import NavBar from './NavBar';
import background from './background.png';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const myStyle = {
      backgroundImage: `url(${background})`,
      minHeight: "100vh", // Full viewport height
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflowX: "hidden",
      overflowY: "hidden"
    };

    return (
      
      <div className='Home'>
        
        <div style={myStyle}> 
        <NavBar></NavBar>
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
        <br></br><br></br><br></br>
        <div class="row">
          
        {/* <div class="col ms-5">
          </div> */}
          <div class="col">
        <Box
              //backgroundColor={"#7f93a1AA"}
              gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              >
                <Typography variant="h3" fontWeight="600" color={"#FFFFFF"}>
          Featured Statistics
          </Typography>
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner ms-4">
    <div class="carousel-item ms-5 ps-5 active">
      <img src={Caresoul3} class="d-block w-75" alt="..."/>
    </div>
    <div class="carousel-item ms-5 ps-5">
      <img src={Caresoul3} class="d-block w-75" alt="..."/>
    </div>
    <div class="carousel-item ms-5 ps-5">
      <img src={Caresoul3} class="d-block w-75" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

</Box>  
<br />
</div>
<div class="col">
        <Box
              //backgroundColor={"#7f93a1AA"}
              gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              >
                <Typography variant="h3" fontWeight="600" color={"#FFFFFF"}>
          Past 24Hr Alarms
          </Typography>
          
              </Box>
</div>

        </div>
        <br /><br /><br />
        <div class="row">
          <div class="col-2"></div>
          <div class="col">
          <Box
              //backgroundColor={"#7f93a1AA"}
              gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              >
<Typography variant="h5" fontWeight="600" color={"#FFFFFF"} justifyContent={'center'} class="homefont" >
          <p class="font">We are a responsible and committed full service solutions provider and systems integrator delivering turnkey automation and energy optimization solutions 
            to manufacturing companies across the MENA region. Partnering with world pioneers in robotics and automation, ARIA Technologies is a certified robot system
             integrator leading the digitalization of industrial technology. We provide our customers with the ability to reduce costs; and increase productivity, 
             flexibility and precision of day-to-day operations.</p>
          <br></br>
          <p>This platform holds our Industrial IoT (IIOT)</p>
          </Typography> 

              </Box>
          </div>
          <div class="col-2"></div>
        </div>
        
        {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
        </div>
      </div>
    );
  }
}

export default Home;


