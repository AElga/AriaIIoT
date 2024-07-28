import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import io from 'socket.io-client';
import NavBar from '../NavBar';
import GaugeComponent from 'react-gauge-component'
import guage from '../Guage.css'
import font from '../Guage.css'
import { blue } from '@mui/material/colors';
import background from '../Images/background.png';
import CanvasJSReact from '@canvasjs/react-charts';
import CustomGauge from '../components/CustomGauge';
import CustomGauge2 from '../components/CustomGauge2';
import CustomLine from '../components/CustomLinechart';

var CanvasJSChartM = CanvasJSReact.CanvasJSChart;
var dms = [];
var dms2 = [];
var xVal = 0;
var yVal = 0;
var yVal2 = 0;
var updateInterval = 3000;

var CanvasJSChartP = CanvasJSReact.CanvasJSChart;
var dps = [];
var dps2 = [];
var xval = 0;
var yval = 0;
var yval2 = 0;
var updateInterval = 3000;

var CanvasJSChartTemp = CanvasJSReact.CanvasJSChart;
var dts = [];
var dts2 = [];
var Xval = 0;
var Yval = 0;
var Yval2 = 0;
var updateInterval = 3000;


class VibPage extends Component {
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
    fetch("http://localhost:5000/test1")
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

    yVal = parseFloat(this.state.apiResponse.X_axis_RMS_Velocity_mmPerSec_1);
    yVal2 = parseFloat(this.state.apiResponse.Z_axis_RMS_Velocity_mmPerSec_1);
    xVal = new Date(); // Get the current time


    dms.push({ x: xVal, y: yVal });
    dms2.push({ x: xVal, y: yVal2 });
    // xVal++;

    if (dms.length > 20) {
      dms.shift();
    }
    if (dms2.length > 20) {
      dms2.shift();
    }
    this.chart.render();

    yval = parseFloat(this.state.apiResponse.X_axis_RMS_Velocity_mmPerSec_2);
    yval2 = parseFloat(this.state.apiResponse.Z_axis_RMS_Velocity_mmPerSec_2);
    xval = new Date();

    dps.push({ x: xval, y: yval });
    dps2.push({ x: xval, y: yval2 });
    // xval++;

    if (dps.length > 20) {
      dps.shift();
    }
    if (dps2.length > 20) {
      dps2.shift();
    }
    this.chart.render();

    Yval = parseFloat(this.state.apiResponse.Temperature_C_1);
    Yval2 = parseFloat(this.state.apiResponse.Temperature_C_2);
    Xval = new Date();

    dts.push({ x: Xval, y: Yval });
    dts2.push({ x: Xval, y: Yval2 });
    // xval++;

    if (dts.length > 20) {
      dts.shift();
    }
    if (dts2.length > 20) {
      dts2.shift();
    }
    this.chart.render();

  }

  render() {
    const { apiResponse, messages } = this.state;
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

    const optionsM = {
      title: {
        text: "Motor 1",
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
        title: "Velocity",
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
          name: "X-axis",
          showInLegend: true,
          dataPoints: dms,
          color: "#ffff00"
        },
        {
          type: "line",
          name: "Z-axis",
          showInLegend: true,
          dataPoints: dms2,
          color: "#ff0000"
        }
      ]

    }
    const optionsP = {
      title: {
        text: "Pump 1",
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
        title: "Velocity",
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
          name: "X-axis",
          showInLegend: true,
          dataPoints: dps,
          color: "#ffff00"
        },
        {
          type: "line",
          name: "Z-axis",
          showInLegend: true,
          dataPoints: dps2,
          color: "#ff0000"
        }
      ]

    }
    const optionstemp = {
      title: {
        text: "Motor & Pump Temperatures",
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
        title: "Temperature",
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
          name: "Motor 1",
          showInLegend: true,
          dataPoints: dts,
          color: "#ffff00"
        },
        {
          type: "line",
          name: "Pump 1",
          showInLegend: true,
          dataPoints: dts2,
          color: "#ff0000"
        }
      ]

    }

    return (
      <div className="VIB">

        <div style={myStyle}> <NavBar></NavBar>
          <header className="VIB-header">
            <br></br>
            <div class="row">
              <div class="col">

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
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Motor Temperature
                  </Typography>
                  <div className="guage">
                    {/* <GaugeComponent
                      type="semicircle"
                      arc={{
                        width: 0.2,
                        padding: 0.005,
                        cornerRadius: 1,
                        gradient: true,
                        subArcs: [
                          {
                            limit: 0,
                            color: '#5BE12C',
                            showTick: true,
                            tooltip: {
                              text: 'Too low temperature!'
                            }
                          },
                          {
                            limit: 125,
                            color: '#F5CD19',
                            showTick: true,
                            tooltip: {
                              text: 'Low temperature!'
                            }
                          },
                          {
                            limit: 253,
                            color: '#F5CD19',
                            showTick: true,
                            tooltip: {
                              text: 'OK temperature!'
                            }
                          },
                          {
                            limit: 325, color: '#EA4228', showTick: true,
                            tooltip: {
                              text: 'High temperature!'
                            }
                          },
                          {
                            color: '#EA4228',
                            tooltip: {
                              text: 'Too high temperature!'
                            }
                          }
                        ]
                      }}
                      pointer={{
                        color: '#888888',
                        width: 15,
                        type: 'arrow', // Adjust the base width of the pointer

                        // elastic: true,
                      }}
                      labels={{
                        valueLabel: { formatTextValue: value => value + 'ºC' },
                        tickLabels: {
                          type: 'outer',
                          valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 },
                          ticks: [
                          ],
                        }
                      }}
                      value={apiResponse.Temperature_C_1}
                      minValue={0}
                      maxValue={360}

                    /> */}
                    <CustomGauge value={apiResponse.Temperature_C_1} />

                  </div>
                </Box>
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
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Pump Temperature (C)
                  </Typography>
                  <div className="guage">
                    {/* <GaugeComponent
                      type="semicircle"
                      arc={{
                        width: 0.2,
                        padding: 0.005,
                        cornerRadius: 1,
                        gradient: true,
                        subArcs: [
                          {
                            limit: 0,
                            color: '#5BE12C',
                            showTick: true,
                            tooltip: {
                              text: 'Too low temperature!'
                            },
                          },
                          {
                            limit: 120,
                            color: '#F5CD19',
                            showTick: true,
                            tooltip: {
                              text: 'Low temperature!'
                            }
                          },
                          {
                            limit: 240,
                            color: '#F5CD19',
                            showTick: true,
                            tooltip: {
                              text: 'OK temperature!'
                            }
                          },
                          {
                            limit: 300, color: '#EA4228', showTick: true,
                            tooltip: {
                              text: 'High temperature!'
                            }
                          },
                          {
                            color: '#EA4228',
                            tooltip: {
                              text: 'Too high temperature!'
                            }
                          }
                        ]
                      }}
                      pointer={{
                        color: '#888888',
                        width: 15,
                        // elastic: true,
                        type: 'arrow',
                      }}
                      labels={{
                        valueLabel: { formatTextValue: value => value + 'ºC' },
                        tickLabels: {
                          type: 'outer',
                          valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 },
                          ticks: [
                          ],
                        }
                      }}
                      value={apiResponse.Temperature_C_2}
                      minValue={0}
                      maxValue={360}

                    /> */}
                    <CustomGauge value={apiResponse.Temperature_C_2}></CustomGauge>

                  </div>
                </Box>
              </div>
              <div class="col">

              </div>
            </div>
            <br></br><br></br><br></br><br></br><br></br>
            <div class="row">
              <div class="col">
                <Box
                  //backgroundColor={"#7f93a1AA"}
                  gridColumn="span 4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Motor X-Axis Velocity
                  </Typography>
                  <div className="guage">

                    {/* <GaugeComponent
                      arc={{
                        subArcs: [
                          { limit: 0, color: '#', showTick: true },
                          { limit: 101, color: '#5BE12C', showTick: true },
                          { limit: 256, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
                        ],
                      }}
                      value={parseFloat(apiResponse.X_axis_RMS_Velocity_mmPerSec_1)}
                      maxValue={360}
                      minValue={0}

                    /> */}
                    <CustomGauge2 value={apiResponse.X_axis_RMS_Velocity_mmPerSec_1} />
                  </div>
                  <br /><br /> 
                  <p class="font">mm/sec</p>
                </Box>
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
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Motor Z-Axis Velocity
                  </Typography>
                  <div className="guage">

                    {/* <GaugeComponent
                      arc={{
                        subArcs: [
                          { limit: 0, color: '#', showTick: true },
                          { limit: 101, color: '#5BE12C', showTick: true },
                          { limit: 256, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
                        ],
                      }}
                      value={parseFloat(apiResponse.Z_axis_RMS_Velocity_mmPerSec_1)}
                      maxValue={360}
                      minValue={0}

                    /> */}
                    <CustomGauge2 value={apiResponse.Z_axis_RMS_Velocity_mmPerSec_1} />
                  </div>
                  <br /><br /> 
                  <p class="font">mm/sec</p>
                </Box>
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
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Pump X-Axis Velocity
                  </Typography>
                  <div className="guage">

                    {/* <GaugeComponent
                      arc={{
                        subArcs: [
                          { limit: 0, color: '#', showTick: true },
                          { limit: 101, color: '#5BE12C', showTick: true },
                          { limit: 256, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
                        ],
                      }}
                      value={parseFloat(apiResponse.X_axis_RMS_Velocity_mmPerSec_2)}
                      maxValue={360}
                      minValue={0}

                    /> */}
                     <CustomGauge2 value={apiResponse.X_axis_RMS_Velocity_mmPerSec_2} />
                  </div>
                  <br /><br /> 
                  <p class="font">mm/sec</p>
                </Box>
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
                  <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
                    Pump Z-Axis Velocity
                  </Typography>
                  <div className="guage">

                    {/* <GaugeComponent
                      arc={{
                        subArcs: [
                          { limit: 0, color: '#', showTick: true },
                          { limit: 101, color: '#5BE12C', showTick: true },
                          { limit: 256, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
                        ],
                      }}
                      value={parseFloat(apiResponse.Z_axis_RMS_Velocity_mmPerSec_2)}
                      maxValue={360}
                      minValue={0}

                    /> */}
                       <CustomGauge2 value={apiResponse.Z_axis_RMS_Velocity_mmPerSec_2} />
                  </div>
                  <br /><br /> 
                  <p class="font">mm/sec</p>
                </Box>
              </div>
            </div>
            <br></br><br></br><br></br>
            {/* {Object.keys(apiResponse).map((key) => (
              <p key={key}>{key}: {apiResponse[key]}</p>
            ))} */}
            {/* <p>Motor Temperature: {apiResponse.Temperature_C_1} C</p>
          <p>Pump Temperature: {apiResponse.Temperature_C_2} C</p>
          <p>Motor RMS Velocity On X-axis: {apiResponse.X_axis_RMS_Velocity_mmPerSec_1} mm/sec</p>
          <p>Pump RMS Velocity On X-axis: {apiResponse.X_axis_RMS_Velocity_mmPerSec_2} mm/sec</p>
          <p>Motor RMS Velocity On Z-axis: {apiResponse.Z_axis_RMS_Velocity_mmPerSec_1} mm/sec</p>
          <p>Pump RMS Velocity On Z-axis: {apiResponse.Z_axis_RMS_Velocity_mmPerSec_2} mm/sec</p> */}
            <div class="row">
              <div class="col-6">
                <Box
                  backgroundColor={"#156B998C"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  borderRadius="8px"
                  padding="3px"
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                >
                  <CanvasJSChartM options={optionsM}
                    onRef={ref => this.chart = ref} />

                    {/* <CustomLine apiResponse={apiResponse}/> */}
                </Box>
              </div>


              <div class="col">
                <Box
                  backgroundColor={"#156B998C"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  borderRadius="8px"
                  padding="3px"
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                >
                  <CanvasJSChartP options={optionsP}
                    onRef={ref => this.chart = ref} />
                </Box>

              </div>
            </div>
            <br></br><br></br>
            <div class="row">
              {/* <div class="col-3"> 
            </div> */}
              <div class="col">
                <Box
                  backgroundColor={"#156B998C"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  padding="3px"
                  borderRadius="8px"
                  border="2px solid #333333" // White borders
                  boxShadow="4px 7px 15px rgba(0, 0, 0, 0.5)"
                  width={"900pt"}
                  marginLeft={"150px"}
                >
                  <CanvasJSChartTemp options={optionstemp}
                    onRef={ref => this.chart = ref} />
                </Box>

              </div>
              {/* <div class="col-3"> 
            </div> */}
            </div>
            <br></br><br></br>
          </header>
        </div>
      </div>
    );
  }
}

export default VibPage;
