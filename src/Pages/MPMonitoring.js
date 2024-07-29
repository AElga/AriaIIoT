import React, { Component } from 'react';
import NavBar from '../NavBar';
import withAPI from '../withAPI';

class MPMonitoring extends Component {
  render() {
    const { apiResponse, messages } = this.props;

    return (
      <div className="MP">
        <div className="myStyle">
          <NavBar />
          <header className="MP-header">
            <h1 className="font">MP measurements</h1>
            <p className="font">{apiResponse}</p>
          </header>
        </div>
      </div>
    );
  }
}

export default withAPI(MPMonitoring, 'http://localhost:5000/test3');
