import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 

import AppStore from '../Store/AppStore'; 
import * as AppActions from '../Actions/AppActions'; 

import './App.scss'; 

class App extends Component {
  constructor() {
    super();

    this.state = {
      isMobile: AppStore.getMobile()
    };
  }

  render() {
    return ( 
      <div className="App">
        <div className="App-body">
          <div className='App-body-navbar'> 
            <ul> 
              <Link id='homePage' to="/">Home</Link>
              <Link id='infoPage' to="/info">Info</Link>
            </ul>
          </div> 
        </div> 
      </div> 
    ); 
  }
}
export default App;
