import React, { Component } from 'react';
import io from 'socket.io-client';
import NavBar from '../NavBar';
import './Guage.css'

//Energy Alarm Description

class EnergyAlarm extends Component {
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
    fetch("http://localhost:5000/test2")
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

  //Logic for Alarm chart status, time change, and danger chart
  updateStateChangeTimes(newApiResponse) {
    const { stateChangeTimes, apiResponse, dangerHistory } = this.state;
    const newStateChangeTimes = { ...stateChangeTimes };
    const ranges = {
      V12: { normal: [0, 360], warning: [361, 369], danger: [370, Infinity] },
      V23: { normal: [0, 360], warning: [361, 369], danger: [370, Infinity] },
      V31: { normal: [0, 360], warning: [361, 369], danger: [370, Infinity] },
      TotEnergy: { normal: [0, 999], warning: [1000, 200], danger: [2001, Infinity] },
      Current_1: { normal: [0, 39], warning: [40, 49], danger: [50, Infinity] },
      Current_2: { normal: [0, 39], warning: [40, 49], danger: [50, Infinity] },
      Current_3: { normal: [0, 39], warning: [40, 49], danger: [50, Infinity] },
      Power: { normal: [0, 99], warning: [100, 200], danger: [201, Infinity] },
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

  clearTable() {
    this.setState({ dangerHistory: [] }); // Clear the dangerHistory
  }

  render() {
     //Configuration for tables
    const { apiResponse, stateChangeTimes, dangerHistory } = this.state;

    const descriptions = {
      V12: "Displays Voltage between line 1 and line 2",
      V23: "Displays Voltage between line 2 and line 3",
      V31: "Displays Voltage between line 3 and line 1",
      TotEnergy: "Displays Total Energy Consumption",
      Power: "Displays Total Power Consumption",
      Current_1: "Displays the current flowing in line 1 in amperes",
      Current_2: "Displays the current flowing in line 2 in amperes",
      Current_3: "Displays the current flowing in line 3 in amperes"
    }

    const ranges = {
      V12: { normal: [0, 360], warning: [361, 369], danger: [370, Infinity] },
      V23: { normal: [0, 360], warning: [361, 369], danger: [370, Infinity] },
      V31: { normal: [0, 360], warning: [361, 369], danger: [370, Infinity] },
      TotEnergy: { normal: [0, 999], warning: [1000, 200], danger: [2001, Infinity] },
      Current_1: { normal: [0, 39], warning: [40, 49], danger: [50, Infinity] },
      Current_2: { normal: [0, 39], warning: [40, 49], danger: [50, Infinity] },
      Current_3: { normal: [0, 39], warning: [40, 49], danger: [50, Infinity] },
      Power: { normal: [0, 99], warning: [100, 200], danger: [201, Infinity] },
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
      <div className="EnergyAlarm">
        <div class="myStyle">
          <NavBar></NavBar>
          <header className="EnergyAlarm-header">
            <br></br>
            <div class="container">
              <div class="row align-items-center">
                <div class="col-12 col-md text-center">
                  <h2 className="table-title">Energy Alarms</h2>
                </div>
                <div class="col-12 col-md-auto">
                </div>
              </div>
            </div>
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
            <h2 className="table-title">Energy Status</h2>
            <div className="table-container">
              <table className="table table-hover bordered-table blurred-table">
                <thead>
                  <tr className='first-row'>
                    <th scope="col">#</th>
                    <th scope="col">Time</th>
                    <th scope="col">Keys</th>
                    <th scope="col">Description</th>
                    <th scope="col">Value</th>
                    <th scope="col">State</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((key, index) => {
                    const state = getState(key, apiResponse[key]);
                    const rowClass = state === "Danger" ? "danger-row" : state === "Warning" ? "warning-row" : "normal-row";
                    const stateImg = state === "Danger" ? <img src={"https://cdn1.iconfinder.com/data/icons/toolbar-std/512/error-512.png"} alt={state} style={{ width: '20px', height: '20px', marginRight: '2px', paddingBottom: '3px' }} /> : state === "Warning" ? <img src={"https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/warning_alert_attention_search-512.png"} alt={state} style={{ width: '20px', height: '20px', marginRight: '2px', paddingBottom: '3px' }}
                    /> : "";
                    return (
                      <tr key={index}>
                        <th scope="row" style={{ color: "#ffffff" }}>{index + 1}</th>
                        <td className={rowClass}>{stateChangeTimes[key] || 'N/A'}</td>
                        <td className={rowClass}>{key}</td>
                        <td className={rowClass}>{descriptions[key]}</td>
                        <td className={rowClass}>{apiResponse[key]}</td>
                        <td className={rowClass}>{stateImg} {state}</td>
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

export default EnergyAlarm;
