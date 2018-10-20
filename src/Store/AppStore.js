import { EventEmitter } from 'events'; 
import dispatcher from '../dispatcher'; 

class AppStore extends EventEmitter {
  constructor() {
    super();
    this.user = 'User'; 
    this.mobile = window.innerWidth <= 760; 
    this.showAlert = {};
    this.allUsers = ['Conor']; 
  }

  changeMobile(flag) {
    this.mobile = flag; 
  }

  getMobile() {
    return this.mobile; 
  }

  changeUser(newUser) {
    this.user = newUser; 

    this.emit('change'); 
  }

  getUser() {
    return this.user; 
  }

  changeAlertStatus(newFlag, user, movie) {
    this.showAlert = {flag: newFlag, user, movie}; 
    this.emit('changeAlert'); 
  }

  getAlertStatus() {
    return this.showAlert; 
  }

  setAllUsers(newUsers) {
    this.allUsers = newUsers; 
  }

  getAllUsers() {
    return this.allUsers;
  }

  handleActions(action) {
    switch(action.type) {
    case 'CHANGE_USER': {
      this.changeUser(action.text);
      break;
    }
    case 'CHANGE_MOBILE': {
      this.changeMobile(action.text);
      break;
    }
    case 'SET_ALL_USERS': {
      this.setAllUsers(action.text);
      break;
    }
    case 'SHOW_ALERT': {
      this.changeAlertStatus(action.text, action.user, action.movie);
      break;
    }
    }
  }
}

const appStore = new AppStore; 
dispatcher.register(appStore.handleActions.bind(appStore)); 

export default appStore; 