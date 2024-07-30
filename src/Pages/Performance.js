import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../NavBar';
import background from '../Images/background.png';
import { TextField } from '@mui/material';

class Performance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cycleNumber: 0,
            cycleTime: 0,
            robotStatus: 0,
                };

        // Bind the handleChange method
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, field) {
        this.setState({ [field]: event.target.value });
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
                    <br></br>
                    <div class="row">
                        <div class="col">
                            <Box
                                backgroundColor={"#156B998C"}
                                gridColumn="span 4"
                                display="flex"
                                alignItems="center"
                                // justifyContent="center"
                                // flexDirection="column"
                                borderRadius="8px" // Adjust the radius as needed
                                padding="10px" // Optional: Add padding to provide spacing inside the box
                                border="2px solid #333333" // White borders
                                boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                                marginLeft={{ xs: "0px", sm: "74px" }}
                                width={{ xs: "100%", sm: "400px" }}
                                height={{ xs: "100%", sm: "70px" }}
                                mb={2}
                            >
                                <Box
                                    width="100%" // Make the inner Box take the full width
                                    // display="flex"
                                    // justifyContent="flex-start"
                                >
                                    <Typography className='title1' fontWeight="400" fontSize={"22px"}>
                                        Cycle Number
                                    </Typography>
                                </Box>
                                <TextField
                                    type="number"
                                    value={this.state.cycleNumber}
                                    onChange={(e) => this.handleChange(e, 'cycleNumber')}
                                    
                                    inputProps={{ min: 0 }} // Optional: Set the minimum value
                                    variant="outlined" // Optional: Change the variant if needed
                                    sx={{
                                        color: '#FFFFFF',
                                        backgroundColor: 'transparent', // Make the background transparent
                                        borderRadius: '4px', // Add border radius
                                        width: '150px',
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
                                            fontSize: '22px', // Increase the font size
                                            //   textAlign: 'Left', // Center align the text
                                            paddingRight: '5px',
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
                                //   justifyContent="center"
                                //   flexDirection="column"
                                borderRadius="8px" // Adjust the radius as needed
                                padding="10px" // Optional: Add padding to provide spacing inside the box
                                border="2px solid #333333" // White borders
                                boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                                marginLeft={{ xs: "0px", sm: "74px" }}
                                width={{ xs: "100%", sm: "400px" }}
                                height={{ xs: "100%", sm: "70px" }}

                                mb={2}
                            >
                                <Box
                                    width="100%" // Make the inner Box take the full width

                                >
                                    <Typography className='title1' fontWeight="400" fontSize={"22px"}>
                                        Cycle Time
                                    </Typography>
                                </Box>
                                <TextField
                                    type="number"
                                    value={this.state.cycleTime}
                                    onChange={(e) => this.handleChange(e, 'cycleTime')}
                                    inputProps={{ min: 0 }} // Optional: Set the minimum value
                                    variant="outlined" // Optional: Change the variant if needed
                                    sx={{
                                        color: '#FFFFFF',
                                        backgroundColor: 'transparent', // Make the background transparent
                                        borderRadius: '4px', // Add border radius
                                        width: '150px',
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
                                            fontSize: '25px', // Increase the font size
                                            //   textAlign: 'Left', // Center align the text
                                            paddingRight: '5px',
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
                                // justifyContent="center"
                                // flexDirection="column"
                                borderRadius="8px" // Adjust the radius as needed
                                padding="10px" // Optional: Add padding to provide spacing inside the box
                                border="2px solid #333333" // White borders
                                boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                                marginLeft={{ xs: "0px", sm: "74px" }}
                                width={{ xs: "100%", sm: "400px" }}
                                height={{ xs: "100%", sm: "70px" }}

                                mb={2}
                            >
                                <Box
                                    width="100%" // Make the inner Box take the full width
                                >
                                    <Typography className='title1' fontWeight="400" fontSize={"22px"}>
                                        Robot Status
                                    </Typography>
                                </Box>
                                <TextField
                                    type="number"
                                    value={this.state.robotStatus}
                                    onChange={(e) => this.handleChange(e, 'robotStatus')}
                                    inputProps={{ min: 0 }} // Optional: Set the minimum value
                                    variant="outlined" // Optional: Change the variant if needed
                                    sx={{
                                        color: '#FFFFFF',
                                        backgroundColor: 'transparent', // Make the background transparent
                                        borderRadius: '4px', // Add border radius
                                        width: '150px',
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
                                            fontSize: '25px', // Increase the font size
                                            //   textAlign: 'Left', // Center align the text
                                            paddingRight: '5px',
                                        },
                                    }}
                                />


                            </Box>
                        </div>

                    </div>
                    {/* <video width="520" height="440" controls>
                    <source src="RobotVideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> */}
                </div>
            </div>

        );
    }
}

export default Performance;


