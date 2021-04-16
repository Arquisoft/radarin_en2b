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
        image.alt = "userLogo";
        image.width = "50%";
        image.height = "50%";
        imgDiv.appendChild(image);

        //document.getElementById("first").setAttribute("align", "center");

        // WebId and distance Div
        var idDistDiv = document.createElement("div");
        idDistDiv.classList = "list-group-item";
        idDistDiv.style.minWidth = "300px";
        idDistDiv.style.minHeight = "100px";
        var id = document.createElement("p");
        id.setAttribute("align", "center");
        id.innerHTML = "\n" + friend.webId;
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
        imgGlass.setAttribute("src", {lupa});
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
