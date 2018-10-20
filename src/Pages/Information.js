import React, { Component } from 'react';
import './Information.scss'; 

class Information extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return ( 
      <div> 
        Information Container 
      </div>
    ); 
  }
}
export default Information;
