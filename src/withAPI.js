import React, { Component } from 'react';
import io from 'socket.io-client';

const withAPI = (WrappedComponent, apiUrl, socketUrl = 'http://localhost:5000') => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        apiResponse: '',
        messages: [],
      };
      this.callAPI = this.callAPI.bind(this);
    }

    callAPI() {
      fetch(apiUrl)
        .then((res) => res.text())
        .then((res) => this.setState({ apiResponse: res }))
        .catch((err) => console.error('Fetch error: ', err));
    }

    componentDidMount() {
      this.callAPI();
      this.interval = setInterval(() => {
        this.callAPI();
      }, 5000);

      this.socket = io(socketUrl);
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
      return (
        <WrappedComponent
          {...this.props}
          apiResponse={this.state.apiResponse}
          messages={this.state.messages}
        />
      );
    }
  };
};

export default withAPI;
