import React, { Component } from 'react';
import io from 'socket.io-client';
import NavBar from '../NavBar';

//Predictive Alarm Description

class PredictiveAlarm extends Component {
  //Backend to Frontend logic
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      messages: [],
      stateChangeTimes: {},
      dangerHistory: [],
    };
    this.callAPI = this.callAPI.bind(this);
    this.clearTable = this.clearTable.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/test1")
      .then((res) => res.text())
      .then((res) => {
        this.updateStateChangeTimes(JSON.parse(res));
        this.setState({ apiResponse: JSON.parse(res) });
      })
      .catch((err) => console.error("Fetch error: ", err));
  }

  componentDidMount() {
    this.callAPI();
    this.interval = setInterval(() => {
      this.callAPI(); 
    }, 1000); 

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
  //Logic for Alarm chart status, time change, and danger chart
  updateStateChangeTimes(newApiResponse) {
    const { stateChangeTimes, apiResponse, dangerHistory } = this.state;
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
        if (newState === 'Danger') {
          dangerHistory.push({ time: newStateChangeTimes[key], key, value: newApiResponse[key], state: newState });
        }
      }
    });
    this.setState({ stateChangeTimes: newStateChangeTimes, dangerHistory });
  }

   // Clear the dangerHistory
  clearTable() {
    this.setState({ dangerHistory: [] });
  }

  render() {
    //Configuration for tables
    const { apiResponse, stateChangeTimes, dangerHistory } = this.state;

    const descriptions = {
      X_axis_RMS_Velocity_mmPerSec_1: "Displays the velocity of the motor on the X-axis beam",
      Z_axis_RMS_Velocity_mmPerSec_1: "Displays the velocity of the motor on the Z-axis beam",
      Temperature_C_1: "Displays the Temperature of the motor in Celsius",
      X_axis_RMS_Velocity_mmPerSec_2: "Displays the velocity of the pump on the X-axis beam",
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
        <div class="myStyle">
          <NavBar></NavBar>
          <header className="PredictiveAlarm-header">
            <br></br>
            <h2 className="table-title">Maintenance Alarms</h2>
            <div className="table-height">
              <table className="table table-hover bordered-table blurred-table">
                <thead>
                  <tr className='first-row'>
                    <th scope="col">#</th>
                    <th scope="col">Time</th>
                    <th scope="col">Keys</th>
                    <th scope="col">Description</th>
                    <th scope="col">Value</th>
                    <th scope="col" style={{ position: 'relative' }}>
                      <div style={{ display: 'inline-block' }}>
                        State
                      </div>
                      <button
                        className="btn btn"
                        style={{
                          backgroundColor: "#d11d1d",
                          color: "white",
                          height: "28px",
                          position: 'absolute',
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)', // Center the button vertically
                        }}
                        type="button"
                        onClick={this.clearTable} // Attach the click handler
                      >
                        <img src={"https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/Recycle_Bin_Full.png"} style={{ width: '20px', height: "20px", marginRight: '2px' }} />
                        Clear
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dangerHistory.map((entry, index) => {
                    const rowClass = entry.state === "Danger" ? "danger-row" : entry.state === "Warning" ? "warning-row" : "normal-row";
                    const stateImg = entry.state === "Danger" ? <img src={"https://cdn1.iconfinder.com/data/icons/toolbar-std/512/error-512.png"} style={{ width: '20px', height: '20px', marginRight: '2px', paddingBottom: '3px' }} /> : entry.state === "Warning" ? <img src={"https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/warning_alert_attention_search-512.png"} style={{ width: '20px', height: '20px', marginRight: '2px', paddingBottom: '3px' }}
                    /> : "";
                    return (
                      <tr key={index}>
                        <th scope="row" style={{ color: "#ffffff" }}>{index + 1}</th>
                        <td className={rowClass}>{entry.time}</td>
                        <td className={rowClass}>{entry.key}</td>
                        <td className={rowClass}>{descriptions[entry.key]}</td>
                        <td className={rowClass}>{entry.value}</td>
                        <td className={rowClass}>{stateImg} {entry.state}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <br></br>
            <h2 className="table-title">Maintenance Status</h2>
            <div className="table-container">
              <table className="table table-hover bordered-table blurred-table">
                <thead>
                  <tr className='first-row'>
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
                    const stateImg = state === "Danger" ? <img src={"https://cdn1.iconfinder.com/data/icons/toolbar-std/512/error-512.png"} alt={state} style={{ width: '20px', height: '20px', marginRight: '2px', paddingBottom: '3px' }} /> : state === "Warning" ? <img src={"https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/warning_alert_attention_search-512.png"} alt={state} style={{ width: '20px', height: '20px', marginRight: '2px', paddingBottom: '3px' }}
                    /> : "";
                    return (
                      <tr key={index}>
                        <th className={rowClass1} scope="row">{index + 1}</th>
                        <td className={rowClass1}>{stateChangeTimes[key] || 'N/A'}</td>
                        <td className={rowClass1}>{key}</td>
                        <td className={rowClass1}>{descriptions[key]}</td>
                        <td className={rowClass1}>{apiResponse[key]}</td>
                        <td className={rowClass1}>{stateImg} {state}</td>
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
