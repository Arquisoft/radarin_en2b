import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps";
import mapStyles from "./MapStyles.js";

var activeGeo;
var crd = [];

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

async function success(pos) {
  crd = pos.coords;
  activeGeo = true;
};

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
  activeGeo = false;
};

navigator.geolocation.getCurrentPosition(success, error, options);

function Map() {
  return (
    <GoogleMap defaultZoom={15} //Starting zoom and position
      defaultCenter={{lat: crd.latitude, lng: crd.longitude}}
      defaultOptions={{styles: mapStyles}}> 
      <Marker icon={{url: "/pushpin-you.png"}} key="You" position={{lat: crd.latitude, lng: crd.longitude}}/>
    </GoogleMap>
  );
}

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
  ); }
  else {
    return(
    <div id="noGeo">
      <h1>Geolocation is not active</h1>
    </div>
    );
  }
}