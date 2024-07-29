import React, { Component } from 'react';
import { Box, Typography, } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../NavBar';
import { TextField } from '@mui/material';

class Performance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };

    // Bind the handleChange method
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {

    return (

      <div className='Performance'>

        <div class="myStyle">
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
                //   justifyContent="center"
                //   flexDirection="column"
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

                >
                  <Typography className='title1' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
                    Cycle Time
                  </Typography>
                </Box>
                <TextField
                  type="number"
                  value={0}
                  onChange={this.handleChange}
                  inputProps={{ min: 0 }} // Optional: Set the minimum value
                  variant="outlined" // Optional: Change the variant if needed
                  sx={{
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: 'transparent', // Make the background transparent
                    borderRadius: '4px', // Add border radius
                    width: '60px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'transparent', // Remove border
                      },
                      '&:hover fieldset': {
                        borderColor: 'transparent', // Remove border on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'transparent', // Remove border when focused
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#FFFFFF', // Change the color of the input value to white
                    },
                  }}
                />

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


