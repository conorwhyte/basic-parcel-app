import { formatMovieData } from '../Constants/MovieObject';

export function getMoviesWithGenre(genreId, pageNumber, callbackFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () =>  { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            const movies = JSON.parse(xmlHttp.responseText); 
            getScoreForEach(movies.results, callbackFunction);
        }
    };
    xmlHttp.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=fd8cac2a86bb9b684c683110cc4ef0d1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&with_genres=" + genreId, true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

export function getAllMovieGenres(callbackFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () =>  { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            const movieGenres = JSON.parse(xmlHttp.responseText); 
            callbackFunction(movieGenres);
        }
    };
    xmlHttp.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=fd8cac2a86bb9b684c683110cc4ef0d1&language=en-US", true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

function getIndividualMovie(moviesId, callbackFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let jsonResponse = JSON.parse(xmlHttp.responseText);
            getMovieRating(jsonResponse.imdb_id, callbackFunction); 
        }
    };
    xmlHttp.open("GET", "https://api.themoviedb.org/3/movie/" + moviesId + "?api_key=fd8cac2a86bb9b684c683110cc4ef0d1", true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

function getMovieRating(imdbId, callbackFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let jsonResponse = JSON.parse(xmlHttp.responseText);
            if (jsonResponse.Title !== undefined) {
                const movie = formatMovieData(jsonResponse);
                callbackFunction(movie);
            }  
        }
    };
    xmlHttp.open("GET", "https://www.omdbapi.com/?i="+ imdbId + "&apikey=7768f02f", true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

function getScoreForEach(arrayOfMovies, callbackFunction) {
    arrayOfMovies.map((movieId) => {
        getIndividualMovie(movieId.id, callbackFunction); 
    });
}

function formatResponse(data) {
    let searchArray = [];
    data.map((movie) => {
        const newMovie = formatMovieData(movie);
        searchArray.push(newMovie);
    });
    return searchArray; 
}