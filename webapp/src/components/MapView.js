import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps";
import mapStyles from "./MapStyles.js";
import { useState } from "react";
import { getNearbyFriends } from "../api/api";
import { useSession } from "@inrupt/solid-ui-react";

var activeGeo;
var crd = [];

/*
const MapView = () => {
  let nearbyFriends = [];
  var friends = [];
  var friendsOfUser = [];
  var crd = [];
*/

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

/*
const { session } = useSession();
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

  async function showPerson(person) {
      for await (const name of person.knows){
        var webId = `${name}`+"profile/card#me";
        friendsOfUser.push({webId});
      }
      friends = await friendsOfUser.filter(onlyUnique);
  }

  async function onlyUnique(value, index, self){
    return self.indexOf(value) === index;
  }
  */

async function success(pos) {
  crd = pos.coords;
  activeGeo = true;
  /*
  await showPerson(pod);
  await getNearbyFriends({ type: "Point", coordinates: [pos.coords.latitude, pos.coords.longitude] }, friends).then((user)=> {
    nearbyFriends.push(user);
  });
  */
};

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
  activeGeo = false;
};

navigator.geolocation.getCurrentPosition(success, error, options);

function Map() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  return (
    <GoogleMap defaultZoom={15} //Starting zoom and position
      defaultCenter={{lat: crd.latitude, lng: crd.longitude}}
      defaultOptions={{styles: mapStyles}}> 
      <Marker icon={{url: "/pushpin-you.png"}} key="You" position={{lat: crd.latitude, lng: crd.longitude}}/>
      {FriendData.map((friend) => (
        <Marker icon={{url: "/pushpin-friends.png"}} key={friend._id} position={{lat: friend.location.coordinates[0], 
          lng: friend.location.coordinates[1]}}
        onClick={() => {
          setSelectedFriend(friend);
        }}/>
      ))}
      {selectedFriend && (
        <InfoWindow
          position= {{lat: selectedFriend.location.coordinates[0],
            lng: selectedFriend.location.coordinates[1]}} 
          onCloseClick={() => {
            setSelectedFriend(null);
          }}
          >
          <div>
            <h4>{selectedFriend.webId}</h4>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

/*
      {FriendData.map((friend) => (
        <Marker icon={{url: "/pushpin-friends.png"}} key={friend._id} position={{lat: friend.location.coordinates[0], 
          lng: friend.location.coordinates[1]}}
        onClick={() => {
          setSelectedFriend(friend);
        }}/>
      ))}
      {selectedFriend && (
        <InfoWindow
          position= {{lat: selectedFriend.location.coordinates[0],
            lng: selectedFriend.location.coordinates[1]}} 
          onCloseClick={() => {
            setSelectedFriend(null);
          }}
          >
          <div>
            <h4>{selectedFriend.webId}</h4>
          </div>
        </InfoWindow>
      )}
      */

//Wrap the map so that react can handle it
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapView() {
  if (activeGeo) {
    return (
      <div style={{width: "100vw", height: "90vh", padding: "20px"}}>
        <h1>Map</h1>
        <WrappedMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
            libraries=geometry,drawing,places&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY`}
          loadingElement={<div style={{height: "100%"}} /> } 
          containerElement={<div style={{height: "100%"}} /> }
          mapElement={<div style={{height: "100%"}} /> }
        />
      </div>
    ); 
  }
  else {
    return(
      <div id="noGeo">
        <h1>Geolocation is not active</h1>
      </div>
    );
  }
};