import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import io from 'socket.io-client';
import NavBar from './NavBar';
import GaugeComponent from 'react-gauge-component'
import guage from './Guage.css'
import font from './Guage.css'
import { blue } from '@mui/material/colors';
import background from './background.png';
import CanvasJSReact from '@canvasjs/react-charts';

class PredictiveAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      messages: [],
      stateChangeTimes: {},
    };
    this.callAPI = this.callAPI.bind(this);  }

  callAPI() {
    fetch("http://localhost:5000/test1")
      .then((res) => res.text())
      .then((res) => {
        this.updateStateChangeTimes(JSON.parse(res));
        this.setState({ apiResponse: JSON.parse(res) });
      })      
      .catch((err) => console.error("Fetch error: ", err));
  }

  updateStateChangeTimes(newApiResponse) {
    const { stateChangeTimes, apiResponse } = this.state;
    const newStateChangeTimes = { ...stateChangeTimes };

    const ranges = {
      X_axis_RMS_Velocity_mmPerSec_1: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Z_axis_RMS_Velocity_mmPerSec_1: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Temperature_C_1: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      X_axis_RMS_Velocity_mmPerSec_2: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Z_axis_RMS_Velocity_mmPerSec_2: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Temperature_C_2: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
    };

    const getState = (key, value) => {
      const range = ranges[key];
      if (!range) return 'Normal';

      if (value >= range.danger[0] && value <= range.danger[1]) {
        return 'Danger';
      } else if (value >= range.warning[0] && value <= range.warning[1]) {
        return 'Warning';
      } else {
        return 'Normal';
      }
    };

    Object.keys(newApiResponse).forEach((key) => {
      const newState = getState(key, newApiResponse[key]);
      const oldState = getState(key, apiResponse[key]);
      if (newState !== oldState) {
        newStateChangeTimes[key] = new Date().toLocaleString();
      }
    });

    this.setState({ stateChangeTimes: newStateChangeTimes });
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
    const { apiResponse, stateChangeTimes } = this.state;
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

    const descriptions = {
      X_axis_RMS_Velocity_mmPerSec_1: "Displays the velocity of the motor on the X-axis beam",
      Z_axis_RMS_Velocity_mmPerSec_1: "Displays the velocity of the motor on the Z-axis beam",
      Temperature_C_1: "Displays the Temperature of the motor in Celsius",
      X_axis_RMS_Velocity_mmPerSec_2: "Displays the velocity of the pump on the X-axis beam" ,
      Z_axis_RMS_Velocity_mmPerSec_2: "Displays the velocity of the motor on the Z-axis beam",
      Temperature_C_2: "Displays the Temperature of the pump in Celsius",
    }

    const ranges = {
      X_axis_RMS_Velocity_mmPerSec_1: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Z_axis_RMS_Velocity_mmPerSec_1: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Temperature_C_1: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      X_axis_RMS_Velocity_mmPerSec_2: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Z_axis_RMS_Velocity_mmPerSec_2: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
      Temperature_C_2: { normal: [0, 10], warning: [11, 40], danger: [41, Infinity] },
    }; 

    const getState = (key, value) => {
      const range = ranges[key];
      if (!range) return 'Normal'; // Default state if no range is defined
    
      if (value >= range.danger[0] && value <= range.danger[1]) {
        return 'Danger';
      } else if (value >= range.warning[0] && value <= range.warning[1]) {
        return 'Warning';
      } else {
        return 'Normal';
      }
    };

  const keys = Object.keys(apiResponse).filter(key => descriptions[key]);



    return (
      <div className="PredictiveAlarm">
        
        <div style={myStyle}> 
        <NavBar></NavBar>
        <header className="PredictiveAlarm-header">
        <br></br>
        <div className="table-container">
        <table className="table table-striped table-hover bordered-table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Time</th>
      <th scope="col">Alarms</th>
      <th scope="col">Description</th>
      <th scope="col">Value</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {keys.map((key, index) => {
                  const state = getState(key, apiResponse[key]);
                  const rowClass1 = state === "Danger" ? "danger-row" : state === "Warning" ? "warning-row" : "normal-row";

                  return (
                    <tr key={index}>
                      <th className={rowClass1} scope="row">{index + 1}</th>
                      <td className={rowClass1}>{stateChangeTimes[key] || 'N/A'}</td>
                      <td className={rowClass1}>{key}</td>
                      <td className={rowClass1}>{descriptions[key]}</td>
                      <td className={rowClass1}>{apiResponse[key]}</td>
                      <td className={rowClass1}>{state}</td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
              </div>
        </header>
        </div>
      </div>
    );
  }
}

export default PredictiveAlarm;
