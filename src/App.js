
// my name is mariam
//Ali Elgazzar comme
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }
  callAPI() {
    fetch("http://localhost:5000/test")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => console.error("Fetch error: ", err));
  }
  
  componentDidMount() {
    this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}
export default App;
