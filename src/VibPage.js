import React, { Component } from 'react';
import io from 'socket.io-client';
import NavBar from './NavBar';
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
    }, 5000); // Adjust the interval as needed

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

    return (
      <div className="VIB">
        <NavBar></NavBar>
        <header className="VIB-header">
          <h1>Predicitve Maintenance</h1>
          {/* {Object.keys(apiResponse).map((key) => (
              <p key={key}>{key}: {apiResponse[key]}</p>
            ))} */}
          <p>Motor Temperature: {apiResponse.Temperature_C_1} C</p>
          <p>Pump Temperature: {apiResponse.Temperature_C_2} C</p>
          <p>Motor RMS Velocity On X-axis: {apiResponse.X_axis_RMS_Velocity_mmPerSec_1} mm/sec</p>
          <p>Pump RMS Velocity On X-axis: {apiResponse.X_axis_RMS_Velocity_mmPerSec_2} mm/sec</p>
          <p>Motor RMS Velocity On Z-axis: {apiResponse.Z_axis_RMS_Velocity_mmPerSec_1} mm/sec</p>
          <p>Pump RMS Velocity On Z-axis: {apiResponse.Z_axis_RMS_Velocity_mmPerSec_2} mm/sec</p>
        </header>
      </div>
    );
  }
}

export default VibPage;
