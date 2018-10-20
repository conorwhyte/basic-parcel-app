export function downloadMovie(movie, year) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      console.log('SUCCESS', movie);
    }
  };
  xmlHttp.open('GET', `http://192.168.0.136:3000/movie/movie=${movie},date=${year}`, true); // true for asynchronous 
  xmlHttp.responseType = 'text';
  xmlHttp.send(null);
}