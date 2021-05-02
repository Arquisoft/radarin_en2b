import { useState } from "react";
import { getLocations } from "../services/crudPod";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import mapStyles from "./MapStyles.js";

const geolib = require("geolib");

var crd = [];

navigator.geolocation.getCurrentPosition(function position(position){
    crd = position.coords;
});

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw", 
    height: "90vh", 
    padding: "1.25em"
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy"
};

const LocationsMap = (props) => {
    const [markers, setMarkers] = useState([]);

    var center ={
        lat: crd.latitude, 
        lng: crd.longitude
    };

    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY",
        libraries
    });

    return isLoaded ? (
        <div data-testid="mainDiv" style={{width: "100vw", height: "90vh", padding: "1.25em"}}>
            <h1>My locations</h1>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                center={center}
                zoom={16} 
                options={options}
                onLoad={() => {
                    var filtered = [];
                    getLocations(props.webId).then((list) => {
                        list.forEach((location) => {
                            var splited = location.split(", ");
                            var add = true;
                            filtered.forEach((crd) => {
                                var splitCrd = crd.split(", ");
                                if (geolib.getDistance({ latitude: parseFloat(splited[0]), longitude: parseFloat(splited[1]) }, { latitude: splitCrd[0], longitude: splitCrd[1]}) < 100) {
                                    add = add && false;
                                } else {
                                    add = add && true;
                                } 
                            });
                            //console.log(add);
                                if (add) {
                                    filtered.push(location);
                                }
                        });
                            //console.log(filtered);
                            filtered.forEach((location) => {
                                var splited = location.split(", ");
                                setMarkers((current) => [
                                    ...current,
                                    {
                                        position: {lat: parseFloat(splited[0]), lng: parseFloat(splited[1])}
                                    }
                                ]);
                            });
                    });      
                }}>
                {markers.map((marker, index) => (
                    <Marker icon={{url: "/pushpin-locations.png"}} key={index} position={marker.position}></Marker>
                ))}
            </GoogleMap>
        </div>
    ): (<div data-testid="mainDiv" style={{width: "100vw", height: "90vh", padding: "1.25em"}}>
    <h1>My locations</h1>
    <p>{loadError}</p>
    </div>);
};

export default LocationsMap;
