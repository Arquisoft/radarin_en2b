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
    
    function returnListNearbyFriends(friend){
      return (Node) (
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
              {friend}
            </p>
            <p align="center">
              {geolib.getDistance({ latitude: 43.616541, longitude: -5.793476 }, { latitude: friend.location.coordinates[0], longitude: friend.location.coordinates[1] })}m away
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
      );
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

      //

      for(let i=0; i<nearbyFriends[0].length; i++){

        var friend = nearbyFriends[0][i];

        console.log("holiwis");
        //var elem = document.createElement();
        //elem.innerText = nearbyFriends[0][i].webId;
        //elem.style.marginLeft = "50px";

        //ListGroup grande
        var primerListGroup = document.createElement("ListGroup");
        primerListGroup.style.marginTop = "20px";
        primerListGroup.style.marginLeft = "40px";

        //Primer ListGroup
        var listGroupUno = document.createElement("ListGroup.Item");
        var imagen = document.createElement("img");
        imagen.src={userLogo};
        imagen.alt="userLogo";
        imagen.style.width = "80";
        imagen.style.height = "80";
        imagen.className="d-inline-block align-top";
        listGroupUno.appendChild(imagen);

        //Segundo ListGroup
        var listGroupDos = document.createElement("ListGroup.Item");
        listGroupDos.style.minWidth = "300px";
        listGroupDos.style.minHeight = "100px";
        var amigo = document.createElement("p");
        amigo.style.textAlign = "center";
        amigo.innerText = friend.webId;
        listGroupDos.appendChild(amigo);
        var distance = document.createElement("p");
        distance.style.textAlign = "center";
        distance.innerText = geolib.getDistance({ latitude: 43.616541, longitude: -5.793476 }, { latitude: friend.location.coordinates[0], longitude: friend.location.coordinates[1] }) + "m away";
        listGroupDos.appendChild(distance);
        console.log(distance.textContent);

        /*
          <ListGroup.Item style={{minWidth: "300px", minHeight: "100px"}}> 
            <p align="center">
              {friendDetail.webId}
            </p>
            <p align="center">
              {geolib.getDistance({ latitude: 43.616541, longitude: -5.793476 }, { latitude: friendDetail.location.coordinates[0], longitude: friendDetail.location.coordinates[1] })}m away
            </p>
          </ListGroup.Item>
        */


        //Tercer ListGroup


        var listGroupTres = document.createElement("ListGroup.Item");

        /*
          <ListGroup.Item>
                <Link to="/map">
                  <img src={lupa} alt="lupa"
                    width="50"
                    height="50"
                    className="m-3"
                  />
                </Link>
              </ListGroup.Item>
        */


        primerListGroup.appendChild(listGroupUno);
        primerListGroup.appendChild(listGroupDos);

        //console.log(nearbyFriends[0][i].webId);
        //console.log(nearbyFriends[0][i].location.coordinates[0]);
        //console.log(nearbyFriends[0][i].location.coordinates[1]);
        
        document.getElementById('nearbyFriends').appendChild(primerListGroup);
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
