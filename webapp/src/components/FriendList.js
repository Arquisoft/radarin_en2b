import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Dropdown from "react-bootstrap/Dropdown";
//import saw from "../img/saw.png";
import lupa from "../img/lupa.png";
/*import batman from "../img/batman.webp";
import chica from "../img/chica.png";*/
import { Link } from "react-router-dom";
//import FriendData from "../jsons/friendList.json"
import userLogo from "../img/userLogo.jpg";

import {  Value, List, withWebId } from "@solid/react";
import { useSession } from "@inrupt/solid-ui-react";
import { getNearbyFriends } from "../api/api";
//import { UserComments } from "rdf-namespaces/dist/schema";

const geolib = require("geolib");

const Friends = () => {
  const { session } = useSession();
  const [activeProfile] = useState(session.info.webId);

  /*var friendsOfUser = [];
  var friends = [];
  var pepito = [];

  //////////////////////////

  const { PathFactory } = require("ldflex");
  const { default: ComunicaEngine } = require("@ldflex/comunica");
  const { namedNode } = require("@rdfjs/data-model");

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
  showPerson(pod);

  async function showPerson(person) {
    for await (const name of person.knows){
      var webId = `${name}` + "profile/card#me";
      friendsOfUser.push({webId});
    }
    friends = await friendsOfUser.filter(onlyUnique);
  }

  async function onlyUnique(value, index, self){
    return self.indexOf(value) === index;
  }
  
  navigator.geolocation.getCurrentPosition(async function (position) {
    showPerson(pod);
    console.log(friends);
    await getNearbyFriends({ type: "Point", coordinates: [position.coords.latitude, position.coords.longitude] }, friends).then((user) => pepito.push(user));
  });*/

  return(
    <div className="ml-3">
      <h2 style={{marginTop: "10px", marginLeft: "40px"}}>Nearby friends</h2>
      <p style ={{marginLeft: "50px"}}>Not available yet</p>
      {/*pepito.map((friendDetail, index) => {
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
      */}
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
export default withWebId(Friends)
