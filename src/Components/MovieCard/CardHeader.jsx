import React, { Component } from 'react';
import './CardHeader.css';

class CardHeader extends Component {
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
    return (
      <div className="movieHeaderContainer"> 
        <div className="movieHeaderContainerTitle">{this.state.movieName}</div>
        <div className="movieHeaderContainerYear">{this.state.movieYear}</div>
      </div>
    );
  }
}
export default CardHeader;
  