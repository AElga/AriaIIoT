import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let navigate = useNavigate();
    // const routeChangeLogin = () => {
    //     let LoginPath = newPath;
    //     navigate(LoginPath);
    // }
    // const routeChangeRegister = () => {
    //     let registerPath = newPath;
    //     navigate(registerPath);
    // }

    return (
      <React.Fragment>
        <Link to="Vib">
          <button type="button" >
            Go to Vib
          </button>
        </Link>
        <Link to="Energy">
          <button type="button" >
            Go to Energy
          </button>
        </Link>
        <Link to="MP">
          <button type="button" >
            Go to MP
          </button>
        </Link>
      </React.Fragment>
    );
  }
}

export default Home;
