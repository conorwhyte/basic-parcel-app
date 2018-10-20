import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 

import AppStore from '../Store/AppStore'; 
import * as AppActions from '../Actions/AppActions'; 

import './App.less'; 

class App extends Component {
  constructor() {
    super();

    this.state = {
      isMobile: AppStore.getMobile()
    };
  }

  navbar() {
    return (
      <div className='App-body-navbar'> 
        <ul> 
          <Link id='homePage' to="/">Home</Link>
          <Link id='userListPage' to="/likedMovies">Info</Link>
        </ul>
      </div> 
    );
  }

  render() {
    return ( 
      <div className="App">
        <div className="App-body">
          {this.navbar()}
        </div> 
      </div> 
    ); 
  }
}
export default App;
