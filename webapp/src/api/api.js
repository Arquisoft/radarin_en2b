
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production
export async function getUsers(){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    console.log(apiEndPoint);
    let response = await fetch(apiEndPoint + "/users/list");
    return await response.json();
};

export async function addUser(webId, location, authKey){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint + "/users/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"webId": webId, "location": location, "authKey": authKey})
    });
    return await response.json();
};

export async function updateUserLocation(webId, location){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint + "/users/location/submit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"webId": webId, "location": location})
    });
    return await response.json();
};

export async function getNearbyFriends(userLocation, friends){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint + "/users/location/near", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"userLocation": userLocation, "friends": friends})
    });
    return await response.json();
};
