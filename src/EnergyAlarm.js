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

class EnergyAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      messages: [],
    };
    this.callAPI = this.callAPI.bind(this);  }

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



  render() {
    const {apiResponse, messages } = this.state;

    const descriptions = {
        V12: "Displays Voltage between line 1 and line 2",
        V23: "Displays Voltage between line 2 and line 3",
        V31: "Displays Voltage between line 3 and line 1",
        TotEnergy: "Displays Total Energy Consumption" ,
        Power: "Displays Total Power Consumption",
        Current_1: "Displays the current flowing in line 1 in amperes",
        Current_2: "Displays the current flowing in line 2 in amperes",
        Current_3: "Displays the current flowing in line 3 in amperes"
      }

      const ranges = {
        V12: {normal:[0,364] ,warning: [365, 369], danger: [370, Infinity] },
        V23: {normal:[0,364] ,warning: [365, 369], danger: [370, Infinity] },
        V31: {normal:[0,364] ,warning: [365, 369], danger: [370, Infinity] },
        TotEnergy: {normal:[0,999] ,warning: [1000, 200], danger: [2001, Infinity] },
        Current_1: {normal:[0,99] ,warning: [100, 200], danger: [201, Infinity] },
        Current_2: {normal:[0,99] ,warning: [100, 200], danger: [201, Infinity] },
        Current_3: {normal:[0,99] ,warning: [100, 200], danger: [201, Infinity] },
        Power: {normal: [0,99],warning: [100, 200], danger: [201, Infinity] },
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
      <div className="EnergyAlarm">
        
        <div style={myStyle}> 
        <NavBar></NavBar>
        <header className="EnergyAlarm-header">
        <br></br>
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
                  const rowClass = state === 'Danger' ? 'danger-row' : state === 'Warning' ? 'warning-row' : 'normal-row';

                  return (
                    <tr key={index} className={rowClass}>
                      <th scope="row">{index + 1}</th>
                      <td>{key}</td>
                      <td>{descriptions[key]}</td>
                      <td>{apiResponse[key]}</td>
                      <td>{state}</td>
                    </tr>
                  );
                })}
  </tbody>
</table>
        </header>
        </div>
      </div>
    );
  }
}

export default EnergyAlarm;
