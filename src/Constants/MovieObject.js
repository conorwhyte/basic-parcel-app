export function formatMovieData(data) {
    const rottenTomatoesScore = data.Ratings && data.Ratings[1] ? data.Ratings[1].Value : 'N/A';
    return {
        name: data.Title, 
        rating: data.Ratings, 
        description: data.Plot, 
        image: data.Poster, 
        date: data.Year, 
        genre: data.Genre,
        actors: data.Actors,
        runtime: data.Runtime,
        imdbRating: data.imdbRating,
        rottenTomatoesScore
    }; 
}

export function formatResponse(data) {
    let searchArray = [];
    data.map((movie) => {
        const newMovie = formatMovieData(movie);
        searchArray.push(newMovie);
    });
    return searchArray; 
}