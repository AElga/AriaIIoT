
// my name is mariam
// frontend now
//Ali Elgazzar comme
//import React, { useState, useEffect } from 'react';
//import io from 'socket.io-client';
import VibPage from './VibPage';
import Home from './Home';
import Login from './Login/Login'
import EnergyMonitoring from './EnergyMonitoring';
import MPMonitoring from './MPMonitoring';
import SignUp from './Login/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// class Start extends Comment {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
      
//     );
//   }
// }

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Start/>} exact /> */}
          <Route path="/Login" element={<Login/>} exact />
          <Route path="/SignUp" element={<SignUp/>} exact />
          <Route path="/Home" element={<Home/>} exact />
          <Route path="/Vib" element={<VibPage />} exact/>
          <Route path="/Energy" element={<EnergyMonitoring />} exact/>
          <Route path="/MP" element={<MPMonitoring />} exact/>
          </Routes>
          </BrowserRouter>
    </div>
  );
};

export default App;
