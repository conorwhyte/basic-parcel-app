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
    const browser = window.chrome ? 'Chrome' : 'Other';
    const userName = 'Conor';
    const pageState = {
      fromHome: true, 
      browser,
      ...this.state,
    }; 

    return ( 
      <div className="App">
        <div className="App-body">
          <div className='App-body-navbar'> 
            <ul> 
              <Link id='homePage' to="/">Home</Link>
              <Link
                to={{
                  pathname: '/info',
                  search: `?name=${userName}`,
                  state: { ...pageState },
                }}> Info</Link>
            </ul>
          </div> 
        </div> 
      </div> 
    ); 
  }
}
export default App;
