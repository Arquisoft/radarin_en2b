import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import mapStyles from "./MapStyles.js";

var crd = [];

navigator.geolocation.getCurrentPosition(function position(position){
    crd = position.coords;
});

const mapContainerStyle = {
    width: "100vw", 
    height: "60vh", 
    padding: "20px"
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const LocationMap = (locations = []) => {
    const [markers, setMarkers] = useState([]);

    var center ={
        lat: crd.latitude, 
        lng: crd.longitude
    };

    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY"
    });

    return isLoaded ? (
        <div style={{width: "100vw", height: "90vh", padding: "80px"}}>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                center={center}
                zoom={16}
                options={options}
                onLoad={() => {
                                setMarkers((current) => [
                                    ...current,
                                    {
                                        position: {locations}
                                    }
                                ]);
                            }
                }>
                {markers.map((marker) => (
                    <Marker icon={{url: "/pushpin-you.png"}} key="You" position={marker.position}/>
                ))}
            </GoogleMap>
        </div>
    ): (<div style={{width: "100vw", height: "90vh", padding: "20px"}}>
        <p>{loadError}</p>
        </div>);
}
export default LocationMap;