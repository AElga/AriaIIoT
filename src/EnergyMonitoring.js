import React, { Component } from 'react';
import io from 'socket.io-client';

class EnergyMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      messages: [],
    };
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/test2")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
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
      <div className="Energy">
        <header className="Energy-header">
          <h1>Enegy monitoring</h1>
          <p>{apiResponse}</p>
          
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                Topic: {msg.topic}, Data: {JSON.stringify(msg.data)}
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default EnergyMonitoring;
