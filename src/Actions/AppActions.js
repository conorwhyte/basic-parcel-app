import dispatcher from '../dispatcher'; 

export function changeMobile(text) {
  dispatcher.dispatch({
    type: 'CHANGE_MOBILE', 
    text, 
  }); 
}