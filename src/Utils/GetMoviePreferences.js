export function getAllMovies(callbackFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () =>  { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            const response = JSON.parse(xmlHttp.responseText);
            callbackFunction(response);
        }
    };
    xmlHttp.open("GET", "http://ec2-54-76-176-138.eu-west-1.compute.amazonaws.com/v1/movies" ,true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}

export function GetMovieForUser(user, callbackFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () =>  { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            const response = xmlHttp.responseText;
        }
    };
    xmlHttp.open("GET", "http://ec2-54-76-176-138.eu-west-1.compute.amazonaws.com/v1/movies" ,true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}