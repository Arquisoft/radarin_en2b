import { useState } from "react";
import { getTagLocations } from "../services/crudPod";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyles from "./MapStyles.js";

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

const TagsMap = (props) => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    var center ={
        lat: crd.latitude, 
        lng: crd.longitude
    };

    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY",
        libraries
    });

    /*
        onClick={(event) => {
                    setMarkers((current) => [
                        ...current,
                        {
                            position: {lat: event.latLng.lat(), lng: event.latLng.lng()}
                        }
                    ]);
                }
            }

        <Marker icon={{url: "/iconTag.png"}} key={index} position={marker.position} onClick={() => handleMarkerClick(marker)}>
                    {marker.showInfo ? (<InfoWindow onCloseClick={() => handleMarkerClose(marker)}>
                            <div>
                                <h3>{marker.name}</h3>
                                <h5>{marker.description}</h5>
                            </div>
                        </InfoWindow>): null }
                </Marker>

    function handleMarkerClick (targetMarker) {
        console.log("click");
        markers.map(marker => {
            if (marker === targetMarker) {
                return {
                    ...marker,
                    showInfo: true
                };
            }
            return marker;
        });
        setMarkers(markers);
    };

    function handleMarkerClose (targetMarker) {
        console.log("close");
        markers.map(marker => {
            if (marker === targetMarker) {
                return {
                    ...marker,
                    showInfo: false
                };
            }
        });
        setMarkers(markers);
    };*/

    return isLoaded ? (
        <div data-testid="mainDiv" style={{width: "100vw", height: "90vh", padding: "1.25em"}}>
            <h1>My tags</h1>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                center={center}
                zoom={16} 
                options={options}
                onLoad={() => {
                        getTagLocations(props.webId).then((list) => 
                            list.forEach((tag) => {
                                    var splited = tag.split(", ");
                                    setMarkers((current) => [
                                        ...current,
                                        {
                                            name: splited[0],
                                            description: splited[1],
                                            position: {lat: parseFloat(splited[2]), lng: parseFloat(splited[3])}
                                        }
                                    ]);
                                }
                            )
                        );
                    }
                }>
                {markers.map((marker, index) => (
                    <Marker icon={{url: "/pushpin-tag.png"}} key={index} position={marker.position} onClick={() => setSelected(marker)}>
                        {selected ? (<InfoWindow onCloseClick={() => setSelected(null)}>
                                <div>
                                    <h3>{marker.name}</h3>
                                    <h5>{marker.description}</h5>
                                </div>
                            </InfoWindow>): null }
                    </Marker>
                ))}
            </GoogleMap>
        </div>
    ): <div data-testid="mainDiv" style={{width: "100vw", height: "90vh", padding: "1.25em"}}>
        <h1>My tags</h1>
        {loadError}</div>;
};

export default TagsMap;
