import React, { Component } from 'react';
import io from 'socket.io-client';
import NavBar from './NavBar';
import GaugeComponent from 'react-gauge-component'
import guage from './Guage.css'

class EnergyMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      messages: [],
    };
    this.callAPI = this.callAPI.bind(this);
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
      <div className="Energy">
        <NavBar></NavBar>
        <header className="Energy-header">
          <h1>Energy monitoring</h1>
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
          {Object.keys(apiResponse).map((key) => (
              <p key={key}>{key}: {apiResponse[key]}</p>
            ))}
        </header>
      </div>
    );
  }
}

export default EnergyMonitoring;
