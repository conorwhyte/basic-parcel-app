import * as AppActions from '../Actions/AppActions'; 

export function putUser(user, movie) {
  const xhr = new XMLHttpRequest();
  const movieRequestBody = {
    user, 
    movie
  }; 

  xhr.open('POST', 'http://ec2-54-76-176-138.eu-west-1.compute.amazonaws.com/v1/user', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onreadystatechange = () => {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      return;
    } 
  };
  xhr.send(JSON.stringify(movieRequestBody)); 
}

export function putMoviePreference(user, movie) {
  const userId = user && user._id ? 
    user._id.$oid 
    : 'N?A';
  const xhr = new XMLHttpRequest();
  const movieRequestBody = {
    movies: [{
      name: movie.name,
      date: movie.date, 
      rating: movie.rottenTomatoesScore, 
      overview: movie.description, 
      runtime: movie.runtime, 
      image_source: movie.image,  
      imdb: movie.imdbRating,  
      rotten_tomatoes: movie.rottenTomatoesScore,
      dbId: '4400', 
      liked_by_users: `[${userId}]`
    }]
  }; 

  xhr.open('POST', 'http://ec2-54-76-176-138.eu-west-1.compute.amazonaws.com/v1/movie', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onreadystatechange = (response) => {
    if (response.currentTarget.status === 200) {
      AppActions.showAlert(true, user.name, movie.name, 'success');
    }
  };
  xhr.send(JSON.stringify(movieRequestBody)); 
}