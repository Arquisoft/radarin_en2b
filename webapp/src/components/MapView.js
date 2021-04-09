import React, {useState} from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import mapStyles from "./MapStyles.js";
import { getNearbyFriends } from "../api/api";
import {getFriends} from "../services/getPodInfo.js";

var crd = [];
let friends = [];
let nearbyFriends = [];

var options = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0
};

async function nearby() {
  friends = await getFriends();
  // As this is supposed to be used later just to pass CI
  // the eslint unused variable warning will be disabled for now
  // eslint-disable-next-line no-unused-vars
  nearbyFriends = getNearbyFriends(crd, friends);
};

async function success(pos) {
  crd = pos.coords;
  nearby();
};

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
  crd.latitude = 43.3625;
  crd.longitude = -5.85027;
};

navigator.geolocation.getCurrentPosition(success, error, options);

function Map() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  return (
    <GoogleMap defaultZoom={15} //Starting zoom and position
      defaultCenter={{lat: crd.latitude, lng: crd.longitude}}
      defaultOptions={{styles: mapStyles}}> 
      <Marker icon={{url: "/pushpin-you.png"}} key="You" position={{lat: crd.latitude, lng: crd.longitude}}/>
      {friends.map((friend) => (
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
};

//Wrap the map so that react can handle it
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapView() {
  return (
    <div style={{width: "100vw", height: "90vh", padding: "20px"}}>
      <h1 style={{color: "#356ad3" }}>Map</h1>
      <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
          libraries=geometry,drawing,places&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY`}
        loadingElement={<div style={{height: "100%"}} /> } 
        containerElement={<div style={{height: "100%"}} /> }
        mapElement={<div style={{height: "100%"}} /> }
      />
    </div>
  );
};