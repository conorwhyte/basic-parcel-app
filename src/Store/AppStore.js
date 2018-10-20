import { EventEmitter } from 'events'; 
import dispatcher from '../dispatcher'; 

class AppStore extends EventEmitter {
  constructor() {
    super();
    this.mobile = window.innerWidth <= 760; 
  }

  changeMobile(flag) {
    this.mobile = flag; 
  }

  getMobile() {
    return this.mobile; 
  }

  handleActions(action) {
    switch(action.type) {
    case 'CHANGE_MOBILE': {
      this.changeMobile(action.text);
      break;
    }
    }
  }
}

const appStore = new AppStore; 
dispatcher.register(appStore.handleActions.bind(appStore)); 

export default appStore; 