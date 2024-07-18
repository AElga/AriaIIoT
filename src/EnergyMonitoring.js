import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import io from 'socket.io-client';
import NavBar from './NavBar';
// import Chart from 'chart.js';
import GaugeComponent from 'react-gauge-component'
import guage from './Guage.css'
import font from './Guage.css'
import { blue } from '@mui/material/colors';
import background from './background.png';
// import { Line } from "react-chartjs-2";
// import "chartjs-plugin-streaming";
import moment from "moment";
import { Chart } from 'react-google-charts';
import CanvasJSReact from '@canvasjs/react-charts';
import { color } from 'highcharts';


var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [];
var dps2 = [];
var dps3 = [];
var xVal = 0;
var yVal = 0;
var yVal2 = 0;
var yVal3 = 0;
var updateInterval = 3000;

var CanvasJSChartvolt = CanvasJSReact.CanvasJSChart;
var dvs = [];
var dvs2 = [];
var dvs3 = [];
var xval = 0;
var yval = 0;
var yval2 = 0;
var yval3 = 0;
var updateInterval = 3000;


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
    .then((res) => this.setState({ apiResponse: JSON.parse(res)}))
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
    clearInterval(this.interval2)
    this.socket.off('update');
    this.socket.disconnect();
  }

  updateChart() {  // Access apiResponse from state
    
    yVal =  parseFloat(this.state.apiResponse.Current_3);
    yVal2 =  parseFloat(this.state.apiResponse.Current_2);
    yVal3 =  parseFloat(this.state.apiResponse.Current_4);

    dps.push({x: xVal, y: yVal});
    dps2.push({x: xVal, y: yVal2});
    dps3.push({x: xVal, y: yVal3});
    xVal++;
    
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

    yval =  parseFloat(this.state.apiResponse.V12);
    yval2 =  parseFloat(this.state.apiResponse.V23);
    yval3 =  parseFloat(this.state.apiResponse.V31);

    dvs.push({x: xval, y: yval});
    dvs2.push({x: xval, y: yval2});
    dvs3.push({x: xval, y: yval3});
    xval++;
    
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

    const myStyle = {
      backgroundImage: `url(${background})`,
      // height: "110vh",
      marginTop: "-70px",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
      //backgroundRepeat: "no-repeat",
      // backgroundAttachment: "fixed"

    };
  const { apiResponse, messages } = this.state;

  const temperatureData = [
    ['Time', 'Current'],
    [2017, 32],
    [2018, 35],
    [2019, 31],
    [2020, 37],
    [2021, 30]];
    
    const options = {
			title :{
				text: "Current Measurement",
        fontColor: "#FFFFFF",
        fontFamily: "Arial", // Change this to the font you want
        fontSize: 24, // Optional: Set the font size
        fontWeight: "bold"
			},
      backgroundColor: "#156b9F6A",
      axisX: {
        title:"Time",
        labelFontColor: "#FFFFFF", // Color of x-axis labels
       lineColor: "#BBBBBB", // Color of x-axis line
        tickColor: "#FFFFFF", // Color of x-axis ticks
        titleFontColor: "#FFFFFF" // Color of x-axis title (if any)
    },
    axisY: {
      title:"Ampere",
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
          color: "#ff00ff"
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
			title :{
				text: "Voltage Measurement",
        fontColor: "#FFFFFF",
        fontFamily: "Arial", // Change this to the font you want
        fontSize: 24, // Optional: Set the font size
        fontWeight: "bold"
			},
      backgroundColor: "#156b9F6A",
      axisX: {
        title:"Time",
        labelFontColor: "#FFFFFF", // Color of x-axis labels
       lineColor: "#BBBBBB", // Color of x-axis line
        tickColor: "#FFFFFF", // Color of x-axis ticks
        titleFontColor: "#FFFFFF" // Color of x-axis title (if any)
    },
    axisY: {
      title:"Volts",
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
    
    return (
      
      <div className="Energy">
        <NavBar></NavBar>  
        <div style={myStyle}> <br></br><br></br>
        <header className="Energy-header" >
          <br></br><br></br>
          <div class="row">
            <div class="col">
            <Box
              backgroundColor={"#156b998C"}
              gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column">
              <Typography variant="h3" fontWeight="600" color={"#FFFFFF"}>
            Total Energy
          </Typography>
          <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
            {apiResponse.TotEnergy}
          </Typography>

            </Box>
            </div>
            <div class="col">
            <Box
              backgroundColor={"#7f93a1AA"}
              
              gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column">
              <Typography variant="h3" fontWeight="600" color={"#FFFFFF"}>
            Power
          </Typography>
          <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
            {apiResponse.Power} kW
          </Typography>

            </Box>
            </div>
          </div>
          <p></p>
          <div class="row">
            
          <div class="col-4 p-3 mb-2">
              <Box
              //backgroundColor={"#7f93a1AA"}
              gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              >
              <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
            Current 1
          </Typography>
          <div className="guage">
            
          <GaugeComponent 
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
            
          />
          </div>
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
              >
              <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
            Current 2
          </Typography>
          <div className="guage">
            
          <GaugeComponent 
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
            
          />
          </div>
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
              >
              <Typography variant="h5" fontWeight="600" color={"#FFFFFF"}>
            Current 3
          </Typography>
          <div className="guage">
            
          <GaugeComponent 
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
            
          />
          </div>
          <p class="font">Amp</p>
          </Box>
          </div>

          
            </div>
            <br></br><br></br>
            <div class="row">
              <div class="col-4">
              <div class="p-2">
                <Box
                border={"medium"}
                backgroundColor={"#156b998C"}
                gridColumn="span 4"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                >
              <h4 class="font">Voltage 1</h4>
              <h6 class="font">{apiResponse.V12} V</h6>
              </Box>
              </div>
              </div>
            <div class="col-4">
              <div class="p-2">
                <Box
                border={"medium"}
                backgroundColor={"#6390b08C"}
                gridColumn="span 4"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                >
              <h4 class="font">Voltage 2</h4>
              <h6 class="font">{apiResponse.V23} V</h6>
              </Box>
              </div>
            </div>
            <div class="col-4">
             < div class="p-2">
              <Box
              border={"medium"}
              backgroundColor={"#7f93a18C"}
              gridColumn="span 4"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              >
              <h4 class="font">Voltage 3</h4>
              <h6 class="font">{apiResponse.V31} V</h6>
              </Box>
              </div>
            </div>
            {/* <div class="col">
          {Object.keys(apiResponse).map((key) => (
              <p key={key}>{key}: {apiResponse[key]}</p>
            ))} 
             </div> */}
            
            </div>

             <br></br><br></br> 

             <div class="row">

              <div class="col-6"> 
              <Box
              border={"medium"}
              backgroundColor={"#7f93a18C"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              >
            <CanvasJSChart options = {options}
				      onRef={ref => this.chart = ref}/>
              </Box>
        </div>
            
            
            <div class="col"> 
            <Box
              border={"medium"}
              backgroundColor={"#7f93a18C"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              >
            <CanvasJSChartvolt options = {optionsvolt}
				      onRef={ref => this.chart = ref}/>
              </Box>

            </div>
            </div>
        </header>
        </div>
        
      </div>
    );
  }
}


export default EnergyMonitoring;
