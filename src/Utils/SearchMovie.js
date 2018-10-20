import { formatResponse } from '../Constants/MovieObject';

export function searchForMovie(searchString, pageNumber, callbackFunction) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            const jsonResponse = JSON.parse(xmlHttp.responseText);
            const data = formatResponse(jsonResponse.Search);
            callbackFunction(data); 
        }
    };
    xmlHttp.open("GET", "https://www.omdbapi.com/?s=" + encodeURIComponent(searchString) + "&page=" + pageNumber + "&apikey=7768f02f", true);
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}