import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import io from 'socket.io-client';
import NavBar from './NavBar';
import GaugeComponent from 'react-gauge-component'
import guage from './Guage.css'
import font from './Guage.css'
import { blue } from '@mui/material/colors';
import background from './background.png';


class VibPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      messages: [],
    };
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/test1")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: JSON.parse(res)}))
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
    const { apiResponse, messages } = this.state;
    const myStyle = {
      backgroundImage: `url(${background})`,
      height: "100vh",
      marginTop: "-70px",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
      //backgroundRepeat: "no-repeat",

  };
    return (
      <div className="VIB">
        <NavBar></NavBar>
        <div style={myStyle}> <br></br><br></br>
        <header className="VIB-header">
        <br></br><br></br><br></br><br></br>
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
          <GaugeComponent 
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
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
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
              length: 0.80,
              width: 15,
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
            
          />
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
          <GaugeComponent 
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
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
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
              length: 0.80,
              width: 15,
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
            value={apiResponse.Temperature_C_2}
            minValue={0}
            maxValue={360}
            
          />
          </div>
          </Box>
            </div>
            <div class="col">
              
            </div>
          </div>
          <br></br><br></br><br></br>
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
            
          <GaugeComponent 
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
            
          />
          </div>
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
            
          <GaugeComponent 
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
            
          />
          </div>
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
            
          <GaugeComponent 
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
            
          />
          </div>
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
            
          <GaugeComponent 
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
            
          />
          </div>
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
        </header>
        </div>
      </div>
    );
  }
}

export default VibPage;
