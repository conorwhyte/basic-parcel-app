export function getAllUsers(callbackFunction) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let jsonResponse = JSON.parse(xmlHttp.responseText);
            callbackFunction(jsonResponse.data.users);
        }
    };
    xmlHttp.open("GET", "http://ec2-54-76-176-138.eu-west-1.compute.amazonaws.com/v1/users", true); // true for asynchronous 
    xmlHttp.responseType = "text";
    xmlHttp.send(null);
}