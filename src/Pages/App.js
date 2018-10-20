import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 

import Alert from '../Components/Alert/Alert.jsx';
import { NewHeader } from 'conorwhyte-components';
import { getAllUsers } from '../Utils/GetUsers';
import AppStore from '../Store/AppStore'; 
import * as AppActions from '../Actions/AppActions'; 

import './App.less'; 

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      user: AppStore.getUser(),
      users: 'Conor, Rory, Brian, Ben, Karl, Tim',
      loading: false,
      showAlert: false, 
    }; 
  }

  saveCurrentUsers(users) {
    this.setState({
      allUsers: users
    });
    AppActions.setAllUsers(users);
  }

  getCurrentUser(newUser) {
    const { allUsers } = this.state;
    const currentUserId = allUsers.find((user) => {
      return user.name === newUser; 
    });

    return currentUserId;
  }

  hideAlert() {
    this.setState({
      showAlert: false
    });
  }

  showAlert() {
    setTimeout(this.hideAlert.bind(this), 2000);
  }

  componentDidMount() {
    getAllUsers(this.saveCurrentUsers.bind(this));
    
    AppStore.on('changeAlert', () => {
      const alertStatus = AppStore.getAlertStatus();
      const alertFlag = alertStatus.flag; 

      this.setState({
        user: AppStore.getUser(), 
        showAlert: alertFlag,
        alertUser: alertStatus.user, 
        alertMovie: alertStatus.movie,
      });

      if (alertFlag) {
        this.showAlert();
      }
    });
  }

  changeUser(user) {
    let newUser = this.getCurrentUser(user); 
    AppActions.changeUser(newUser); 
  }

  navbar() {
    return (
      <div className='app-navbar'> 
        <ul> 
          <Link id='homePage' to="/">Discover</Link>
          <Link id='userListPage' to="/likedMovies">Liked Movies</Link>
        </ul>
      </div> 
    );
  }

  render() {
    const { alertUser, alertMovie, showAlert } = this.state; 
    const shouldShowAlert = showAlert && alertUser !== undefined; 

    return ( 
      <div className="App">
        <NewHeader changeUserCallback={this.changeUser.bind(this)}/>
        <div className="App-body">
          {shouldShowAlert && <Alert user={alertUser} movie={alertMovie}/>}
          
          {this.navbar()}
        </div> 
      </div> 
    ); 
  }
}
export default App;
