import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ariaLogo from './ariaLogo.png';
import NavBar from './NavBar';
import background from './background.png';

class Performance extends Component {
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
      
      <div className='Performance'>
        
        <div style={myStyle}> 
        <NavBar></NavBar>
        <div class="row">
            <div class="col">
            <Box
             backgroundColor={"#156B998C"}
             gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              borderRadius="8px" // Adjust the radius as needed
              padding="10px" // Optional: Add padding to provide spacing inside the box
              border="2px solid #333333" // White borders
              boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
              marginLeft={{ xs: "0px", sm: "74px" }}
              width={{ xs: "100%", sm: "400px" }}
              mb={2}
            >
              <Box 
        width="100%" // Make the inner Box take the full width
        display="flex"
        justifyContent="flex-start"
      >
        <Typography className='title1' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
          Cycle Number
        </Typography>
      </Box>
          <Typography class='value1' fontWeight="600" color={"#FFFFFF"}>
            0
          </Typography>

            </Box>
            </div>
            
            <div class="col">
            <Box
             backgroundColor={"#156B998C"}
             gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              borderRadius="8px" // Adjust the radius as needed
              padding="10px" // Optional: Add padding to provide spacing inside the box
              border="2px solid #333333" // White borders
              boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
              marginLeft={{ xs: "0px", sm: "74px" }}
              width={{ xs: "100%", sm: "400px" }}
              mb={2}
            >
              <Box 
        width="100%" // Make the inner Box take the full width
        display="flex"
        justifyContent="flex-start"
      >
        <Typography className='title1' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
          Cycle Time
        </Typography>
      </Box>
          <Typography class='value1' fontWeight="600" color={"#FFFFFF"}>
            0
          </Typography>

            </Box>
            </div>
            <div class="col">
            <Box
             backgroundColor={"#156B998C"}
             gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              borderRadius="8px" // Adjust the radius as needed
              padding="10px" // Optional: Add padding to provide spacing inside the box
              border="2px solid #333333" // White borders
              boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
              marginLeft={{ xs: "0px", sm: "74px" }}
              width={{ xs: "100%", sm: "400px" }}
              mb={2}
            >
              <Box 
        width="100%" // Make the inner Box take the full width
        display="flex"
        justifyContent="flex-start"
      >
        <Typography className='title1' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
          Robot Status
        </Typography>
      </Box>
          <Typography class='value1' fontWeight="600" color={"#FFFFFF"}>
            0
          </Typography>

            </Box>
            </div>

            </div>
        </div>
        </div>

        );
        }
}

export default Performance;


