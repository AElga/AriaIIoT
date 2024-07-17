import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import io from 'socket.io-client';
import NavBar from './NavBar';
import Chart from 'chart.js/auto';
import GaugeComponent from 'react-gauge-component'
import guage from './Guage.css'
import font from './Guage.css'
import { blue } from '@mui/material/colors';
import background from './background.png';
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";
//import CanvasJSReact from '@canvasjs/react-charts';


//var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class EnergyMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      messages: [],
    };
    this.callAPI = this.callAPI.bind(this);
    //this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  // generateDataPoints(noOfDps, dd) {
	// 	var xVal = 1, yVal = 100;
	// 	var dps = [];
	// 	for(var i = 0; i < noOfDps; i++) {
	// 		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
	// 		dps.push({x: xVal , y: yVal});	
	// 		xVal++;
	// 	}
	// 	return dps;
	// }

  

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
    this.socket.off('update');
    this.socket.disconnect();
  }

  

  render() {

    const Chart = require("react-chartjs-2").Chart;

    const chartColors = {
      red: "rgb(255, 99, 132)",
      orange: "rgb(255, 159, 64)",
      yellow: "rgb(255, 205, 86)",
      green: "rgb(75, 192, 192)",
      blue: "rgb(54, 162, 235)",
      purple: "rgb(153, 102, 255)",
      grey: "rgb(201, 203, 207)"
    };
    
    //const color = Chart.helpers.color;
    const data = {
      datasets: [
        {
          label: "Current Graph (Amp)",
          backgroundColor: "#aec312",
          borderColor: chartColors.red,
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }
      ]
    };
    
    const options = {
      // elements: {
      //   line: {
      //     tension: 0.5
      //   }
      // },
      scales: {
        x: [
          {
            type: "realtime",
            // distribution: "linear",
            realtime: {
              onRefresh: function(chart) {
                chart.data.datasets[0].data.push({
                  x: moment(),
                  y: Math.random()
                });
              },
              delay: 3000,
              time: {
                displayFormat: "h:mm"
              }
            },
            ticks: {
              displayFormats: 1,
              maxRotation: 0,
              minRotation: 0,
              stepSize: 1,
              maxTicksLimit: 30,
              // minUnit: "second",
              source: "auto",
              autoSkip: true,
              callback: function(value) {
                return moment(value, "HH:mm:ss").format("mm:ss");
              }
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 10
            }
          }
        ]
      }
    };
    const myStyle = {
     // backgroundImage: `url(${background})`,
      // height: "110vh",
      marginTop: "-70px",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
      //backgroundRepeat: "no-repeat",
      // backgroundAttachment: "fixed"

  };
  const { apiResponse, messages } = this.state;

  
    
    
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
            {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
            </div>
             <div class="row">
              <div class="col"> 

              <Line data={data} options={options} />
              {/* <CanvasJSChart options = {{
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Try Zooming and Panning"
    },
    data: [{
      type: "area",
      dataPoints: this.generateDataPoints(20, apiResponse.Current_2)
    }]
  }} 
				/* onRef={ref => this.chart = ref} */
              }
              </div>
            </div>
        </header>
        </div>
        
      </div>
    );
  }
}

export default EnergyMonitoring;
