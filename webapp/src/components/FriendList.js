import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Value, withWebId } from "@solid/react";
import { useSession } from "@inrupt/solid-ui-react";
import { getNearbyFriends } from "../api/api";
import Button from 'react-bootstrap/Button';
import { css } from "@emotion/css";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { getSolidDataset, getThing, setThing, saveSolidDatasetAt, removeUrl, addUrl } from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";
import lupa from "../img/lupa.png";
import userLogo from "../img/userLogo.jpg";

const geolib = require("geolib");
const { PathFactory } = require("ldflex");
const { default: ComunicaEngine } = require("@ldflex/comunica");
const { namedNode } = require("@rdfjs/data-model");

const Friends = () => {
  const { session } = useSession();
  const [activeProfile] = useState(session.info.webId);
  const [friendList, setFriendList] = useState(new Set());

  const styleAddFriendsDiv = css`
    border-style: solid;
    border-width: 5px;
    border-color: #5da1d2;
    max-width: 600px;
    margin-Left: 40px;
    border-radius: 25px;
  `;

  // The JSON-LD context for resolving properties
  const context = {
    "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "friends": "knows",
        "label": "http://www.w3.org/2000/01/rdf-schema#label",
    } 
  };

  var friendsOfUser = [];

  async function deleteFriend(webId, friend){
    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);
    let updatedProfile = removeUrl(profile, FOAF.knows, friend);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -3), myChangedDataset, { fetch: fetch });
  };

  async function addFriend(webId, friend) {
    const myDataset = await getSolidDataset(webId.slice(0, -3), { fetch: fetch });
    const profile = getThing(myDataset, webId);
    let updatedProfile = addUrl(profile, FOAF.knows, friend);

    const myChangedDataset = setThing(myDataset, updatedProfile);

    await saveSolidDatasetAt(webId.slice(0, -3), myChangedDataset, { fetch: fetch });
  };

  async function refreshFriendList(pod){
    for await (const name of pod.knows){
      var webId = `${name}profile/card#me`;
      friendsOfUser.push({webId});
      friendList.add(`${name}`);
    }
    setFriendList(new Set(friendList));
    console.log("refreshFriendList");
  }

  if(activeProfile !== undefined){
    // The query engine and its source
    const queryEngine = new ComunicaEngine(activeProfile.slice(0, -3));
    // The object that can create new paths
    const path = new PathFactory({ context, queryEngine });
    const pod = path.create({ subject: namedNode(activeProfile) });
      
    var nearbyFriends = [];

    refreshFriendList(pod);

    navigator.geolocation.getCurrentPosition(async function (position) {
      //Put all friends inside a list
      await getNearbyFriends({ type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, friendsOfUser).then((user) => nearbyFriends.push(user));

      // If there are no nearby friends
      if(nearbyFriends[0].length === 0){
        var noFriendsElement = document.createElement("p");
        noFriendsElement.style.marginLeft = "40px";
        noFriendsElement.style.marginTop = "20px";
        noFriendsElement.innerText = "There are no nearby friends";
        document.getElementById("nearbyFriends").appendChild(noFriendsElement);
      }else{  //If there are nearby friends
        //ul grande
        var lista = document.createElement("ul");

        console.log("Antes del for");
        for(let i=0; i<nearbyFriends[0].length; i++){

          var friend = nearbyFriends[0][i];

          //Big div
          var bigDiv = document.createElement("div");
          bigDiv.classList = "list-group list-group-horizontal";
          bigDiv.style.marginTop = "20px";

          // Img div
          var imgDiv = document.createElement("div");
          imgDiv.classList = "list-group-item";
          imgDiv.style.minWidth = "100px";
          imgDiv.style.minHeight = "100px";
          var image = document.createElement("img");
          image.src = userLogo;
          image.alt = "userLogo";
          image.width = "80";
          image.height = "80";
          imgDiv.appendChild(image);

          // WebId and distance Div
          var idDistDiv = document.createElement("div");
          idDistDiv.classList = "list-group-item";
          idDistDiv.style.minWidth = "300px";
          idDistDiv.style.minHeight = "100px";
          var id = document.createElement("p");
          id.setAttribute("align", "center");
          //Substring used to remove -> /profile/card#me
          id.innerHTML = "\n" + friend.webId.substring(0,friend.webId.length-15);
          var distance = document.createElement("p");
          distance.setAttribute("align", "center");
          distance.innerText = geolib.getDistance({ latitude: position.coords.latitude, longitude: position.coords.longitude }, { latitude: friend.location.coordinates[0], longitude: friend.location.coordinates[1] }) + "m away";
          idDistDiv.appendChild(id);
          idDistDiv.appendChild(distance);

          // Glass div
          var glassDiv = document.createElement("div");
          glassDiv.classList = "list-group-item";
          var glass = document.createElement("a");
          glass.href = "/map";
          var imgGlass = document.createElement("img");
          imgGlass.src = lupa;
          imgGlass.alt = "lupa";
          imgGlass.width = "50";
          imgGlass.height = "50";
          imgGlass.classList = "m-3";
          //Meter dentro del elemento <a> la <img> de la lupa
          glass.appendChild(imgGlass);
          // Meter dentro del <div> todo lo de la lupa
          glassDiv.appendChild(glass);

          // Los divs pequeños se añaden al grande
          bigDiv.appendChild(imgDiv);
          bigDiv.appendChild(idDistDiv);
          bigDiv.appendChild(glassDiv);
          //bigDiv.appendChild(dropDownDiv);

          //El div grande se añade a la lista de los demas
          lista.appendChild(bigDiv);
          
          document.getElementById("nearbyFriends").appendChild(lista);
          }
        }
      });
    }

    return(
      <div className="ml-3">
        <h2 style={{marginTop: "10px", marginLeft: "40px"}}>Nearby friends</h2>
        <div id="nearbyFriends">
            
        </div>
        <h2 style={{marginTop: "10px", marginLeft: "40px"}}>All friends</h2>
        {activeProfile &&
          <div>
              {[...friendList].map((friend) => (
                    <ListGroup horizontal key={friend} style={{marginTop: `20px`}}>
                      <ListGroup.Item horizontal style={{minWidth: "100px", minHeight: "100px"}}>
                        <img src={userLogo} alt="userLogo" width="80" height="80"></img>
                      </ListGroup.Item>
                      <ListGroup.Item style={{minWidth: "300px", minHeight: "100px"}}>
                        <p align="center"><br></br>
                          <Value src={friend}>{friend}</Value>
                        </p>
                      </ListGroup.Item>
      
                      <ListGroup.Item >
                      <Button className="m-4" onClick={ async () => {deleteFriend(activeProfile, friend);}} variant="contained" color="secondary" style={{backgroundColor: '#5da1d2'}}>
                        Remove
                      </Button>               
                     </ListGroup.Item>
                   </ListGroup>
                ))}
          </div>
        }
        <div className={styleAddFriendsDiv}>
          <h3 style={{marginTop: "20px", marginLeft: "40px"}}>Add new friends</h3>
          <input id="webFriend" style={{marginLeft: "45px", width: "26em"}} type="text" name="name" placeholder="https://uo271405.inrupt.net/"/>
          <Button className="m-4" onClick={ async () => {addFriend(activeProfile, document.getElementById("webFriend").value); document.getElementById("webFriend").value = "";}} variant="contained" color="secondary" style={{backgroundColor: '#5da1d2'}}>
            Add
          </Button>
        </div>
      </div>
    );
};

export default withWebId(Friends);