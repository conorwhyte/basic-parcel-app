import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, hashHistory } from 'react-router-dom';

import './index.css';
import App from './Pages/App';
import LikedMovies from './Pages/LikedMovies'; 
import Discover from './Pages/Discover'; 

const appElement = document.getElementById('App');

ReactDOM.render(
  <BrowserRouter history={hashHistory}>
    <div>
      <App />
      <Route exact path="/" component={Discover}></Route>
      <Route path="/likedMovies" component={LikedMovies}></Route>
    </div>
  </BrowserRouter>, appElement);
