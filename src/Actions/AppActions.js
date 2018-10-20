import dispatcher from '../dispatcher'; 

export function changeUser(text) {
  dispatcher.dispatch({
    type: 'CHANGE_USER', 
    text, 
  }); 
}

export function changeMobile(text) {
  dispatcher.dispatch({
    type: 'CHANGE_MOBILE', 
    text, 
  }); 
}

export function setAllUsers(text) {
  dispatcher.dispatch({
    type: 'SET_ALL_USERS', 
    text, 
  }); 
}

export function showAlert(text, user, movie) {
  dispatcher.dispatch({
    type: 'SHOW_ALERT', 
    text,
    user,
    movie,
  }); 
}