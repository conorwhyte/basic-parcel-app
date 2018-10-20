import React, { Component } from 'react';
import './Alert.less';

class Alert extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      ...props
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps
    });
  }

  render() {
    const { user, movie } = this.state; 
    return (
      <div className="AlertContainer">
        <div> 
          <h2> SUCCESS! </h2> 
          <p> {`Thanks ${user}! You liked ${movie}.`} </p>
        </div>
      </div>
    );
  }
}

export default Alert;
  