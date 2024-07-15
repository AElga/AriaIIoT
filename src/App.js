
// my name is mariam
// frontend now
//Ali Elgazzar comme
//import React, { useState, useEffect } from 'react';
//import io from 'socket.io-client';
import VibPage from './VibPage';
import Home from './Home';
import EnergyMonitoring from './EnergyMonitoring';
import MPMonitoring from './MPMonitoring';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {apiResponse: ""};
//   }
//   callAPI() {
//     fetch("http://localhost:5000/test")
//       .then(res => res.text())
//       .then(res => this.setState({ apiResponse: res }))
//       .catch(err => console.error("Fetch error: ", err));
//   }
  
//   componentDidMount() {
//     this.callAPI();
//     this.interval = setInterval(() => {
//       this.callAPI(); // Fetch data at regular intervals
//     }, 5000); // Interval in milliseconds (e.g., every 5 seconds)
//   }
//   // Clean up setInterval in componentWillUnmount
//   componentWillUnmount() {
//     clearInterval(this.interval); // Clear interval to prevent memory leaks
//   }
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>{this.state.apiResponse}</p>
//         </header>
//       </div>
//     );
//   }
// }

const App = () => {
  // const [apiResponse, setApiResponse] = useState("");
  // const [messages, setMessages] = useState([]);
  
  // const callAPI = () => {
  //   fetch("http://localhost:5000/test")
  //     .then(res => res.text())
  //     .then(res => setApiResponse(res))
  //     .catch(err => console.error("Fetch error: ", err));
  // };

  // useEffect(() => {
  //   callAPI();
  //   const interval = setInterval(() => {
  //     callAPI(); // Fetch data at regular intervals
  //   }, 500);

    
  //   // Set up WebSocket connection
  //   const socket = io('http://localhost:5000');

  //   // Listen for updates from the server
  //   // socket.on('update', (data) => {
  //   //   setMessages((prevMessages) => [...prevMessages, data]);
  //   //   callAPI();
  //   // });

  //   // Clean up the WebSocket connection
  //   return () => {
  //     clearInterval(interval);
  //     socket.off('update');
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/Vib" element={<VibPage />} exact/>
          <Route path="/Energy" element={<EnergyMonitoring />} exact/>
          <Route path="/MP" element={<MPMonitoring />} exact/>
          </Routes>
          </BrowserRouter>
    </div>
  );
};

export default App;
