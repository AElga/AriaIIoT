import React, { Component } from 'react';
import { Box, Typography, } from "@mui/material";
import io from 'socket.io-client';
import NavBar from '../NavBar';
// import Chart from 'chart.js';
import GaugeComponent from 'react-gauge-component'
import CustomAnalogGauge from '../Components/CustomGauge2';
import CanvasJSReact from '@canvasjs/react-charts';
import 'bootstrap/dist/css/bootstrap.min.css';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [];
var dps2 = [];
var dps3 = [];
var xVal = 0;
var yVal = 0;
var yVal2 = 0;
var yVal3 = 0;
var updateInterval = 1000;

var CanvasJSChartvolt = CanvasJSReact.CanvasJSChart;
var dvs = [];
var dvs2 = [];
var dvs3 = [];
var xval = 0;
var yval = 0;
var yval2 = 0;
var yval3 = 0;
var updateInterval = 1000;


class EnergyMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      messages: [],
    };
    this.callAPI = this.callAPI.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/test2")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: JSON.parse(res) }))
      .catch((err) => console.error("Fetch error: ", err));
  }

  componentDidMount() {
    this.callAPI();
    this.interval = setInterval(() => {
      this.callAPI(); // Fetch data at regular intervals
    }, 1000); // Adjust the interval as needed
    this.interval2 = setInterval(this.updateChart, updateInterval);

    // Set up WebSocket connection
    this.socket = io('http://localhost:5000');

    // Listen for updates from the server
    this.socket.on('update', (data) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, data],
      }));
      this.callAPI();
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
    this.socket.off('update');
    this.socket.disconnect();
  }

  updateChart() {  // Access apiResponse from state

    yVal = parseFloat(this.state.apiResponse.Current_3);
    yVal2 = parseFloat(this.state.apiResponse.Current_2);
    yVal3 = parseFloat(this.state.apiResponse.Current_4);
    xVal = new Date(); // Get the current time


    dps.push({ x: xVal, y: yVal });
    dps2.push({ x: xVal, y: yVal2 });
    dps3.push({ x: xVal, y: yVal3 });
    // xVal++;

    if (dps.length > 20) {
      dps.shift();
    }
    if (dps2.length > 20) {
      dps2.shift();
    }
    if (dps3.length > 20) {
      dps3.shift();
    }
    this.chart.render();

    yval = parseFloat(this.state.apiResponse.V12);
    yval2 = parseFloat(this.state.apiResponse.V23);
    yval3 = parseFloat(this.state.apiResponse.V31);
    xval = new Date();

    dvs.push({ x: xval, y: yval });
    dvs2.push({ x: xval, y: yval2 });
    dvs3.push({ x: xval, y: yval3 });
    // xval++;

    if (dvs.length > 20) {
      dvs.shift();
    }
    if (dvs2.length > 20) {
      dvs2.shift();
    }
    if (dvs3.length > 20) {
      dvs3.shift();
    }
    this.chart.render();

  }

  render() {

    const { apiResponse, messages } = this.state;
    const dta = {value: parseFloat(apiResponse.Current_3), minv: '0', maxv: '360', arcs: [
      { limit: 200, color: '#5BE12C', showTick: true },
      { limit: 260, color: '#F5CD19', showTick: true },
      { limit: 360, color: '#EA4228', showTick: true },
    ]}
    const dta1 = {value: parseFloat(apiResponse.Current_2), minv: '0', maxv: '360', arcs: [
      { limit: 200, color: '#5BE12C', showTick: true },
      { limit: 260, color: '#F5CD19', showTick: true },
      { limit: 360, color: '#EA4228', showTick: true },
    ]}
    const dta2 = {value: parseFloat(apiResponse.Current_4), minv: '0', maxv: '360', arcs: [
      { limit: 200, color: '#5BE12C', showTick: true },
      { limit: 260, color: '#F5CD19', showTick: true },
      { limit: 360, color: '#EA4228', showTick: true },
    ]}
    const options = {
      title: {
        text: "Current Measurement",
        fontColor: "#FFFFFF",
        fontFamily: "Arial", // Change this to the font you want
        fontSize: 24, // Optional: Set the font size
        fontWeight: "bold"
      },
      backgroundColor: "#156b9F6A",
      axisX: {
        title: "Time",
        labelFontColor: "#FFFFFF", // Color of x-axis labels
        lineColor: "#BBBBBB", // Color of x-axis line
        tickColor: "#FFFFFF", // Color of x-axis ticks
        titleFontColor: "#FFFFFF", // Color of x-axis title (if any)
        valueFormatString: "HH:mm:ss"
      },
      axisY: {
        title: "Ampere",
        labelFontColor: "#FFFFFF", // Color of y-axis labels
        lineColor: "#BBBBBB", // Color of y-axis line
        tickColor: "#FFFFFF", // Color of y-axis ticks
        titleFontColor: "#FFFFFF", // Color of y-axis title (if any)
        // gridColor: "#CCCCCC" // Color of y-axis grid lines
      },
      legend: {
        fontColor: "#FFFFFF",
        verticalAlign: "top", // Move legend to the top
        horizontalAlign: "center"
      },

      data: [
        {
          type: "line",
          name: " Current 1",
          showInLegend: true,
          dataPoints: dps,
          color: "#ffff00"
        },
        {
          type: "line",
          name: "Current 2",
          showInLegend: true,
          dataPoints: dps2,
          color: "#ff0000"
        },
        {
          type: "line",
          name: "Current 3",
          showInLegend: true,
          dataPoints: dps3,
          color: "#00ff00"
        }
      ]

    }
    const optionsvolt = {
      title: {
        text: "Voltage Measurement",
        fontColor: "#FFFFFF",
        fontFamily: "Arial", // Change this to the font you want
        fontSize: 24, // Optional: Set the font size
        fontWeight: "bold"
      },
      backgroundColor: "#156b9F6A",
      axisX: {
        title: "Time",
        labelFontColor: "#FFFFFF", // Color of x-axis labels
        lineColor: "#BBBBBB", // Color of x-axis line
        tickColor: "#FFFFFF", // Color of x-axis ticks
        titleFontColor: "#FFFFFF",// Color of x-axis title (if any)
        valueFormatString: "HH:mm:ss"

      },
      axisY: {
        title: "Volts",
        labelFontColor: "#FFFFFF", // Color of y-axis labels
        lineColor: "#BBBBBB", // Color of y-axis line
        tickColor: "#FFFFFF", // Color of y-axis ticks
        titleFontColor: "#FFFFFF", // Color of y-axis title (if any)
        // gridColor: "#CCCCCC" // Color of y-axis grid lines
      },
      legend: {
        fontColor: "#FFFFFF",
        verticalAlign: "top", // Move legend to the top
        horizontalAlign: "center"
      },
      data: [
        {
          type: "line",
          name: " Voltage 1",
          showInLegend: true,
          dataPoints: dvs,
          color: "#ffff00"
        },
        {
          type: "line",
          name: "Voltage 2",
          showInLegend: true,
          dataPoints: dvs2,
          color: "#ff0000"
        },
        {
          type: "line",
          name: "Voltage 3",
          showInLegend: true,
          dataPoints: dvs3,
          color: "#00ff00"
        }
      ]

    }
    const energyJoules = apiResponse.TotEnergy;

    // Convert to megajoules (MJ) and round to one decimal place
    const energyMJ = energyJoules / 1e6;
    const roundedEnergyMJ = Math.round(energyMJ * 100) / 100;

    const getColorForVoltage = (value) => {
      if (value < 365) {
        return '#FFFFFF'; // White
      } else if (value >= 365 && value < 370) {
        return '#FFFF00'; // Yellow
      } else if (value >= 370) {
        return '#FF0000'; // Red
      }
      return '#adadac'; // Default color
    };

    const voltageValue1 = parseFloat(apiResponse.V12);
    const voltageValue2 = parseFloat(apiResponse.V23);
    const voltageValue3 = parseFloat(apiResponse.V31);

    const voltageColor1 = getColorForVoltage(voltageValue1);
    const voltageColor2 = getColorForVoltage(voltageValue2);
    const voltageColor3 = getColorForVoltage(voltageValue3);


    return (

      <div className="Energy">

        <div class="myStyle"><NavBar></NavBar>
          <header className="Energy-header" >
            <br></br><br></br>
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
                  padding="16px" // Optional: Add padding to provide spacing inside the box
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                  marginLeft={{ xs: "0px", sm: "74px" }}
                  width={{ xs: "100%", sm: "600px" }}
                  mb={2}
                >
                  <Box
                    width="100%" // Make the inner Box take the full width
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <Typography className='title1' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
                      Total Energy
                    </Typography>
                  </Box>
                  <Typography class='value1' fontWeight="600" color={"#FFFFFF"}>
                    {roundedEnergyMJ} MJ
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
                  padding="16px" // Optional: Add padding to provide spacing inside the box
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                  marginLeft={{ xs: "0px", sm: "84px" }}
                  width={{ xs: "100%", sm: "600px" }}
                  mb={2}
                >
                  <Box
                    width="100%" // Make the inner Box take the full width
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <Typography className='title1' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
                      Power
                    </Typography>
                  </Box>
                  <Typography class='value1' fontWeight="600" color={"#FFFFFF"}>
                    {apiResponse.Power} kW
                  </Typography>

                </Box>
              </div>
            </div>
            <p></p>
            <div class="row">

              <div class="col-4 p-3 mb-2">
                <Box
                  // backgroundColor={"#6390b08C"}
                  gridColumn="span 4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  width={{ xs: "100%", sm: "400px" }}
                  marginLeft={{ xs: "0px", sm: "50px" }}

                  mb={2}
                // Adjust the width as needed
                //  borderRadius="8px" // Adjust the radius as needed
                //  padding="16px" // Optional: Add padding to provide spacing inside the box
                // border="2px solid #333333" // White borders
                //     boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                //     marginLeft={"70px"}
                >

                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"} >
                    Current 1
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Current-512.png"
                      alt="Current Icon"
                      style={{ width: '40px', height: '40px', marginRight: '8px' }}
                    />
                  </Typography>

                  <div className="guage">

                    {/* <GaugeComponent
                      arc={{
                        subArcs: [
                          { limit: 0, color: '#', showTick: true },
                          { limit: 200, color: '#5BE12C', showTick: true },
                          { limit: 260, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
                        ],
                      }}
                      value={parseFloat(apiResponse.Current_3)}
                      maxValue={360}
                      minValue={0}

                    /> */}
                    <CustomAnalogGauge dta={dta} />
                  </div>
                  <br /><br />
                  <p class="font">Amp</p>
                </Box>
              </div>

              <div class="col-4 p-3 mb-2">
                <Box
                  //backgroundColor={"#7f93a1AA"}
                  gridColumn="span 4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  width={{ xs: "100%", sm: "400px" }}
                  marginLeft={{ xs: "0px", sm: "50px" }}
                  mb={2}
                >
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Current 2
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Current-512.png"
                      alt="Current Icon"
                      style={{ width: '40px', height: '40px', marginRight: '8px' }}
                    />
                  </Typography>
                  <div className="guage">

                    {/* <GaugeComponent
                      arc={{
                        subArcs: [
                          { limit: 0, color: '#', showTick: true },
                          { limit: 200, color: '#5BE12C', showTick: true },
                          { limit: 260, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
                        ],
                      }}
                      value={parseFloat(apiResponse.Current_2)}
                      maxValue={360}
                      minValue={0}

                    /> */}
                    <CustomAnalogGauge dta={dta1} />
                  </div>
                  <br /><br />
                  <p class="font">Amp</p>
                </Box>
              </div>

              <div class="col-4 p-3 mb-2"  >
                <Box
                  border={"medium"}
                  //backgroundColor={"#7f93a1AA"}
                  gridColumn="span 4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  width={{ xs: "100%", sm: "400px" }}
                  marginLeft={{ xs: "0px", sm: "50px" }}
                  mb={2}
                >
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Current 3
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Current-512.png"
                      alt="Current Icon"
                      style={{ width: '40px', height: '40px', marginRight: '8px' }}
                    />

                  </Typography>
                  <div className="guage">

                    {/* <GaugeComponent
                      arc={{
                        subArcs: [
                          { limit: 0, color: '#', showTick: true },
                          { limit: 200, color: '#5BE12C', showTick: true },
                          { limit: 260, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
                        ],
                      }}
                      value={parseFloat(apiResponse.Current_4)}
                      maxValue={360}
                      minValue={0}

                    /> */}
                    <CustomAnalogGauge dta={dta2} />
                  </div>
                  <br /><br />
                  <p class="font">Amp</p>
                </Box>
              </div>


            </div>

            <div class="row">

              <div class="col m-4">
                <Box
                  backgroundColor={"#156B998C"}
                  gridColumn="span 4"
                  display="flex"
                  alignItems="center"
                  marginLeft={{ xs: "0px", sm: "50px" }}
                  width={{ xs: "100%", sm: "400px" }}
                  mb={2}
                  justifyContent="center"
                  flexDirection={'column'}
                  borderRadius="8px" // Adjust the radius as needed
                  padding="16px"
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)" // Ambient light shadow

                >
                  <Box
                    width="100%" // Make the inner Box take the full width
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <Typography className='font' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
                      Voltage 1
                    </Typography>
                  </Box>
                  <Typography fontSize={"35px"} color={voltageColor1}>{apiResponse.V12} V

                  </Typography>
                </Box>
              </div>
              <div class="col m-4">
                <Box
                  backgroundColor={"#156B998C"}
                  gridColumn="span 4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  borderRadius="8px" // Adjust the radius as needed
                  padding="16px"
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)" // Ambient light shadow
                  width={{ xs: "100%", sm: "400px" }}
                  marginLeft={{ xs: "0px", sm: "20px" }}
                  mb={2}
                >

                  <Box
                    width="100%" // Make the inner Box take the full width
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <Typography className='font' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
                      Voltage 2
                    </Typography>
                  </Box>
                  <Typography fontSize={"35px"} color={voltageColor2}>{apiResponse.V23} V

                  </Typography>
                </Box>
              </div>
              <div class="col m-4">
                <Box
                  backgroundColor={"#156B998C"}
                  gridColumn="span 4"
                  display="flex"
                  alignItems="center"
                  // marginLeft={"50px"}
                  justifyContent="center"
                  flexDirection="column"
                  width={{ xs: "100%", sm: "400px" }}
                  borderRadius="8px" // Adjust the radius as needed
                  padding="16px"
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)" // Ambient light shadow
                >
                  <Box
                    width="100%" // Make the inner Box take the full width
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <Typography className='font' fontWeight="400" color={"#adadac"} fontSize={"30px"}>
                      Voltage 3

                    </Typography>
                  </Box>
                  <Typography fontSize={"35px"} color={voltageColor3}>{apiResponse.V31} V

                  </Typography>
                </Box>
              </div>
              {/* <div class="col">
          {Object.keys(apiResponse).map((key) => (
              <p key={key}>{key}: {apiResponse[key]}</p>
            ))} 
             </div> */}

            </div>

            <br></br><br></br>

            <div className='container'>
              <div class="row">

                <div class="col">
                  <Box
                    // border={"medium"}
                    backgroundColor={"#156B998C"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    borderRadius="8px" // Adjust the radius as needed
                    padding="3px"
                    border="2px solid #333333" // White borders
                    boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                    width={{ xs: "100%", sm: "600px" }}
                    marginLeft={{ xs: "0px", sm: "20px" }}
                  //mb={2}              
                  >
                    <CanvasJSChart options={options}
                      onRef={ref => this.chart = ref} />
                  </Box>
                </div>


                <div class="col">
                  <Box
                    backgroundColor={"#156B998C"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    borderRadius="8px" // Adjust the radius as needed
                    padding="3px"
                    border="2px solid #333333" // White borders
                    boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                    // marginRight={"60px"}
                    width={{ xs: "100%", sm: "600px" }}
                  // marginRight={{ xs: "0px", sm: "20px auto" }}
                  // mb={2}
                  >
                    <CanvasJSChartvolt options={optionsvolt}
                      onRef={ref => this.chart = ref} />
                  </Box>

                </div>
              </div>
              <br></br><br></br>
            </div>
          </header>
        </div>

      </div>
    );
  }
}


export default EnergyMonitoring;
