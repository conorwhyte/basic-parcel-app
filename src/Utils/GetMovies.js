import { formatMovieData } from '../Constants/MovieObject';

export default function GetMovies(setMovies, pageNumber, query) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () =>  { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            const arrayOfMovieId = getMovieId(xmlHttp.responseText);
            getScoreForEach(setMovies, arrayOfMovieId); 
        }
    };
    xmlHttp.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=fd8cac2a86bb9b684c683110cc4ef0d1&language=en-US" + query + pageNumber, true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

function getIndividualMovie(getRottenTomatoesScore, moviesId) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let jsonResponse = JSON.parse(xmlHttp.responseText);
            getMovieRating(getRottenTomatoesScore, jsonResponse.imdb_id); 
        }
    };
    xmlHttp.open("GET", "https://api.themoviedb.org/3/movie/" + moviesId + "?api_key=fd8cac2a86bb9b684c683110cc4ef0d1", true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

function getMovieRating(getRottenTomatoesScore, imdbId) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let jsonResponse = JSON.parse(xmlHttp.responseText);
            const movie = formatMovieData(jsonResponse)
            getRottenTomatoesScore(movie); 
        }
    };
    xmlHttp.open("GET", "https://www.omdbapi.com/?i="+ imdbId + "&apikey=7768f02f", true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

function getScoreForEach(setMovies, arrayOfMovies) {
    arrayOfMovies.map((movieId) => {
        getIndividualMovie(setMovies, movieId.id); 
    });
}

function getMovieId(response) {
    const jsonResponse = JSON.parse(response);
    const results = jsonResponse.results; 

    return results.map((movie) => {
        return {id: movie.id}; 
    }); 
}