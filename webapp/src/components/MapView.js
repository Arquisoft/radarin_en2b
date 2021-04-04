import React, {useState} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import FriendData from '../jsons/nearbyFriends.json';

var markerImage = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png';

function Map() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  return (
    <GoogleMap defaultZoom={15} //Starting zoom and position
      defaultCenter={{lat: 43.36029, lng: -5.84476}}> 
      {FriendData.map((friend) => (
        <Marker icon={markerImage} key={friend._id} position={{lat: friend.location.coordinates[0], 
          lng: friend.location.coordinates[1]}}
        onClick={() => {
          setSelectedFriend(friend);
        }}
        //icon={{url: markerImage, scaledSize: new window.google.maps.Size(1000, 1000)}}
        />
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
            <h2>{selectedFriend.webId}</h2>
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
    <div style={{width: '100vw', height: '90vh', padding: '20px'}}>
      <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
          libraries=geometry,drawing,places&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY`}
        loadingElement={<div style={{height: '100%'}} /> } 
        containerElement={<div style={{height: '100%'}} /> }
        mapElement={<div style={{height: '100%'}} /> }
      />
    </div>
  );
}