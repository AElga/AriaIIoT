import React, { Component } from 'react';
import io from 'socket.io-client';
import NavBar from '../NavBar';
import background from '../Images/background.png';
class MPMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      messages: [],
    };
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/test3")
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
    const myStyle = {
      backgroundImage: `url(${background})`,
      minHeight: "100vh", // Full viewport height
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflowX: "hidden",
      overflowY: "hidden",
      margin: '0 auto',
      // maxWidth: '1200px'
    };
    return (

      <div className="MP">
        <div style={myStyle}><NavBar></NavBar>
          <header className="MP-header">
            <h1 class="font">MP measurements</h1>
            <p class="font">{apiResponse}</p>
          </header>
        </div></div>
    );
  }
}

export default MPMonitoring;
