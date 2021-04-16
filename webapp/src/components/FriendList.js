import { createElement, useEffect, useRef, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Dropdown from "react-bootstrap/Dropdown";
//import saw from "../img/saw.png";
import lupa from "../img/lupa.png";
/*import batman from "../img/batman.webp";
import chica from "../img/chica.png";*/
import { Link } from "react-router-dom";
import userLogo from "../img/userLogo.jpg";

import {  Value, List, withWebId } from "@solid/react";
import { useSession } from "@inrupt/solid-ui-react";
import { getNearbyFriends } from "../api/api";

const geolib = require("geolib");
const { PathFactory } = require("ldflex");
const { default: ComunicaEngine } = require("@ldflex/comunica");
const { namedNode } = require("@rdfjs/data-model");

const Friends = () => {

  const { session } = useSession();
  const [activeProfile] = useState(session.info.webId);

  // The JSON-LD context for resolving properties
  const context = {
    "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "friends": "knows",
        "label": "http://www.w3.org/2000/01/rdf-schema#label",
    }
  };
  // The query engine and its source
  const queryEngine = new ComunicaEngine(session.info.webId.slice(0, -3));
  // The object that can create new paths
  const path = new PathFactory({ context, queryEngine });

  const pod = path.create({ subject: namedNode(session.info.webId) });

  
  var nearbyFriends = [];

  

  useEffect(()=>{
  
    async function onlyUnique(value, index, self){
      return self.indexOf(value) === index;
    }    

    navigator.geolocation.getCurrentPosition(async function (position) {
      var friendsOfUser = [];
      var friends = [];

      //Put all friends inside a list
      for await (const name of pod.knows){
        var webId = `${name}` + "profile/card#me";
        friendsOfUser.push({webId});
      }
      friends = await friendsOfUser.filter(onlyUnique);
      
      await getNearbyFriends({ type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, friends).then((user) => nearbyFriends.push(user));
      /*console.log(nearbyFriends);*/
      //console.log(nearbyFriends[0]);
      //console.log(nearbyFriends[0][0].webId);
      //console.log(nearbyFriends[0].length);

      //ul grande
      var lista = document.createElement("ul");

      for(let i=0; i<nearbyFriends[0].length; i++){

        var friend = nearbyFriends[0][i];

        console.log("holiwis");
        //var elem = document.createElement();
        //elem.innerText = nearbyFriends[0][i].webId;
        //elem.style.marginLeft = "50px";

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
        image.src="/static/media/userLogo.db7219e3.jpg";
        image.alt = {userLogo};
        image.width = "80";
        image.height = "80";
        imgDiv.appendChild(image);

        //document.getElementById("first").setAttribute("align", "center");

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
        imgGlass.classList = "m-3";
        imgGlass.src = "data:image/png;base64,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"
        imgGlass.alt = "lupa";
        imgGlass.width = "50";
        imgGlass.height = "50";
        //Meter dentro del elemento <a> la <img> de la lupa
        glass.appendChild(imgGlass);
        // Meter dentro del <div> todo lo de la lupa
        glassDiv.appendChild(glass);

        // Dropdown div
        var dropDownDiv = document.createElement("div");
        dropDownDiv.classList = "list-group-item";
        var downDiv = document.createElement("div");
        downDiv.classList = "m-4 dropdown";
        var button = document.createElement("button");
        button.setAttribute("aria-haspopup","true");
        button.setAttribute("aria-expanded","false");
        button.setAttribute("id","dropdown.basic");
        button.setAttribute("type","button");
        button.classList = "dropdown-toggle btn btn-primary";

        downDiv.appendChild(button);
        dropDownDiv.appendChild(downDiv);

        // Los divs pequeños se añaden al grande
        bigDiv.appendChild(imgDiv);
        bigDiv.appendChild(idDistDiv);
        bigDiv.appendChild(glassDiv);
        bigDiv.appendChild(dropDownDiv);

        //El div grande se añade a la lista de los demas
        lista.appendChild(bigDiv);

        //console.log(nearbyFriends[0][i].webId);
        //console.log(nearbyFriends[0][i].location.coordinates[0]);
        //console.log(nearbyFriends[0][i].location.coordinates[1]);
        
        document.getElementById('nearbyFriends').appendChild(lista);
      }
    });
    
  });

  /*
    {nearbyFriends.map((friendDetail, index) => {
        return <div>
          <ListGroup horizontal style={{marginTop: "20px", marginLeft: "40px"}}>
            <ListGroup.Item>
              <img src={userLogo} alt="userLogo"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
            </ListGroup.Item>
            
            <ListGroup.Item style={{minWidth: "300px", minHeight: "100px"}}> 
              <p align="center">
                {friendDetail.webId}
              </p>
              <p align="center">
                {geolib.getDistance({ latitude: 43.616541, longitude: -5.793476 }, { latitude: friendDetail.location.coordinates[0], longitude: friendDetail.location.coordinates[1] })}m away
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <Link to="/map">
                  <img src={lupa} alt="lupa"
                    width="50"
                    height="50"
                    className="m-3"
                  />
                </Link>
              </ListGroup.Item>

            <ListGroup.Item >
              <Dropdown className="m-4" >
                <Dropdown.Toggle id="dropdown-basic">

                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Delete friend</Dropdown.Item>
                  <Dropdown.Item>Info</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          </ListGroup>

        </div>
        })
      }
  */

  return(
    <div className="ml-3">
      <h2 style={{marginTop: "10px", marginLeft: "40px"}}>Nearby friends</h2>
      <div id="nearbyFriends">
          
      </div>
      <h2 style={{marginTop: "10px", marginLeft: "40px"}}>All friends</h2>
      {activeProfile &&
        <div>
          <List src={`[${activeProfile}].friends`}>{friend =>
            <ListGroup horizontal key={friend} style={{marginTop: `20px`}}>
              <ListGroup.Item horizontal style={{minWidth: "100px", minHeight: "100px"}}>
                <img src={userLogo} alt="userLogo" width="80" height="80"></img>
              </ListGroup.Item>

              <ListGroup.Item style={{minWidth: "300px", minHeight: "100px"}}>
                <p align="center"><br></br>
                  <Value src={`[${friend}].name`}>{`${friend}`}</Value>
                </p>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Link to="/map">
                  <img src={lupa} alt="lupa"
                    width="50"
                    height="50"
                    className="m-3"
                  />
                </Link>
              </ListGroup.Item>

              <ListGroup.Item >
                <Dropdown className="m-4" >
                  <Dropdown.Toggle id="dropdown-basic">
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Delete friend</Dropdown.Item>
                    <Dropdown.Item>Info</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            </ListGroup>
          }
          </List>
        </div>
      }
    </div>
  );
}

export default withWebId(Friends);
