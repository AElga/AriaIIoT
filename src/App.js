
// my name is mariam
// frontend now
//Ali Elgazzar comme
//import React, { useState, useEffect } from 'react';
//import io from 'socket.io-client';
import VibPage from './Pages/VibPage';
import Home from './Pages/Home';
import Login from './Login/Login'
import EnergyMonitoring from './Pages/EnergyMonitoring';
import MPMonitoring from './Pages/MPMonitoring';
import EnergyAlarm from './Pages/EnergyAlarm'
import SignUp from './Login/SignUp';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PredictiveAlarm from './Pages/PredictiveAlarm';
import Performance from './Pages/Performance';


document.addEventListener("contextmenu", function (event) {
  alert("Inspect Elements Not Allowed");
  event.preventDefault();
})
document.addEventListener("keydown", function (event) {
  if (event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && event.key === "I") ||
    (event.ctrlKey && event.shiftKey && event.key === "J") ||
    (event.ctrlKey && event.key === "U")) {
    alert("Inspect Elements Not Allowed");
    event.preventDefault();
  }
})

var devtoolsOpen = false;
var threshold = 160;
setInterval(function () {
  if ((window.outerWidth - window.innerWidth) > threshold ||
    (window.outerHeight - window.innerHeight) > threshold) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      alert("Developer Tools Detected. Please close them.");
    }
  } else {
    devtoolsOpen = false;
  }
}, 1000)




const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Start/>} exact /> */}
          <Route path="/" element={<Login />} exact />
          <Route path="/SignUp" element={<SignUp />} exact />
          <Route path="/Home" element={<Home />} exact />
          <Route path="/Vib" element={<VibPage />} exact />
          <Route path="/Energy" element={<EnergyMonitoring />} exact />
          <Route path="/MP" element={<MPMonitoring />} exact />
          <Route path="/EnergyAlarm" element={<EnergyAlarm />} exact />
          <Route path="/PredictiveAlarm" element={<PredictiveAlarm />} exact />
          <Route path="/Performance" element={<Performance />} exact />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
