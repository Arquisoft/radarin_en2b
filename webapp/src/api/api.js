//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production
async function getUserById(webId){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    var response = await fetch(apiEndPoint + "/users/getById", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000/api/users/getById", "Control-Allow-Methods": "POST"},
        body: JSON.stringify({"webId": webId})
    });
    return await response.json();
}

async function removeUserById(webId){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    var response = await fetch(apiEndPoint + "/users/removeById", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000/api/users/getById", "Control-Allow-Methods": "POST"},
        body: JSON.stringify({"webId": webId})
    });
    return await response.json();
}

async function getUsers(){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    var response = await fetch(apiEndPoint + "/users/list");
    return await response.json();
}

async function getNormalUsers(){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    var response = await fetch(apiEndPoint + "/users/normal/list");
    return await response.json();
}

async function addUser(webId, location){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    var response = await fetch(apiEndPoint + "/users/add", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000/api/users/add", "Control-Allow-Methods": "POST"},
        body: JSON.stringify({"webId": webId, "location": location})
    });
    return await response.json();
}

async function getNearbyFriends(userLocation, friends){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    var response = await fetch(apiEndPoint + "/users/location/near", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:5000/api/users/location/near", "Control-Allow-Methods": "POST"},
        body: JSON.stringify({"userLocation": userLocation, "friends": friends})
    });
    return await response.json();
}

export { getUserById, removeUserById, getUsers, getNormalUsers, addUser, getNearbyFriends };
