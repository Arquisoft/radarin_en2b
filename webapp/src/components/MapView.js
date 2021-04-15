import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import mapStyles from "./MapStyles.js";
import { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getNearbyFriends } from "../api/api";

function Map() {
  const [activeGeo, setActiveGeo] = useState(false);
  const [crd, setCrd] = useState([0,0]);
  const [nearbyFriends, setNearbyFriends] = useState([]);
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
  }
  // The query engine and its source
  const queryEngine = new ComunicaEngine(session.info.webId.slice(0, -3));
  // The object that can create new paths
  const path = new PathFactory({ context, queryEngine });
  const pod = path.create({ subject: namedNode(session.info.webId) });

  useEffect(() => {
      let nearby = [];
      navigator.geolocation.getCurrentPosition(async function(pos) {
          setCrd([pos.coords.latitude, pos.coords.longitude]);
          setActiveGeo(true);
          let friends = await showPerson(pod);
          await getNearbyFriends({ type: "Point", coordinates: [pos.coords.latitude, pos.coords.longitude] }, friends).then((user)=> {
          nearby.push(user);
          });
          setNearbyFriends(nearby);
      }, async function(err) {
          console.warn("ERROR(" + err.code + "): " + err.message);
          setActiveGeo(false);
      });
  }, [setCrd, setActiveGeo, showPerson, nearbyFriends, pod]);

  async function showPerson(person) {
      for await (const name of person.knows){
        var webId = `${name}`+"profile/card#me";
        var friendsOfUser = [];
        friendsOfUser.push({webId});
      }
      return friendsOfUser.filter(onlyUnique);
    }
  
    async function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

  const [selectedFriend, setSelectedFriend] = useState(null);
  console.log("Coords: "+crd);
  console.log("Nearby: "+nearbyFriends);
  console.log("Geo: "+activeGeo );
  return (
    <GoogleMap defaultZoom={15} //Starting zoom and position
      defaultCenter={{lat: crd[0], lng: crd[1]}}
      defaultOptions={{styles: mapStyles}}> 
      <Marker icon={{url: "/pushpin-you.png"}} key="You" position={{lat: crd[0], lng: crd[1]}}/>
      {nearbyFriends.map((friend) => (
      <Marker icon={{url: "/pushpin-friends.png"}} key={friend?.webId} position={{lat: friend?.location.coordinates[0], 
        lng: friend?.location.coordinates[1]}}
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
        }}>
        <div>
          <h4>{selectedFriend.webId}</h4>
        </div>
      </InfoWindow>
    )}
  </GoogleMap>
  );
}

//Wrap the map so that react can handle it
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapView() {
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