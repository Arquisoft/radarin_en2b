import { useState } from "react";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyles from "./MapStyles.js";

import { getNearbyFriends } from "../api/api";

const { PathFactory } = require("ldflex");
const { default: ComunicaEngine } = require("@ldflex/comunica");
const { namedNode } = require("@rdfjs/data-model");

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

const MapView = (props) => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    var center = {
        lat: crd.latitude, 
        lng: crd.longitude
    };

    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY",
        libraries
    });

    async function onlyUnique(value, index, self){
        return self.indexOf(value) === index;
    }

    return isLoaded ? (
        <div data-testid="wholeDiv" style={{width: "100vw", height: "90vh", padding: "1.25em"}}>
            <h1 style={{color:"white"}}>My current location and friends</h1>
            <div data-testid="mapDiv">
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    center={center}
                    zoom={16}
                    options={options}
                    onLoad={async () => {
                            setMarkers((current) => [
                                ...current,
                                {
                                    name: "You",
                                    description: "Current position",
                                    position: {lat: crd.latitude, lng: crd.longitude},
                                    iconUrl: "/pushpin-you.png"
                                }
                            ]);

                            const context = {
                                "@context": {
                                    "@vocab": "http://xmlns.com/foaf/0.1/",
                                    "friends": "knows",
                                    "label": "http://www.w3.org/2000/01/rdf-schema#label",
                                } 
                            };

                            if(props.activeProfile !== undefined){
                                const queryEngine = new ComunicaEngine(props.activeProfile.slice(0, -3));
                                const path = new PathFactory({ context, queryEngine });
                                const pod = path.create({ subject: namedNode(props.activeProfile) });

                                var friendsOfUser = [];
                                var friends = [];
                                var nearbyFriends = [];

                                for await (const name of pod.knows){
                                    var webId = `${name}profile/card#me`;
                                    friendsOfUser.push({webId});
                                }
                                friends = await friendsOfUser.filter(onlyUnique);

                                await getNearbyFriends({ type: "Point", coordinates: [crd.latitude, crd.longitude] }, friends).then((user) => nearbyFriends.push(user));

                                for(let i=0; i<nearbyFriends[0].length; i++){
                                    setMarkers((current) => [
                                        ...current,
                                        {   
                                            name: nearbyFriends[0][i].webId,
                                            position: {lat: nearbyFriends[0][i].location.coordinates[0], lng: nearbyFriends[0][i].location.coordinates[1]},
                                            iconUrl: "/pushpin-friends.png"
                                        }
                                    ]);
                                }
                            }
                        }
                    }>
                    {markers.map((marker, index) => (
                        <Marker icon={{url: marker.iconUrl}} key={index} position={marker.position} onClick={() => setSelected(marker) }>
                            {selected ? (<InfoWindow onCloseClick={() => setSelected(null) }>
                                    <div>
                                        <h5>{marker.name}</h5>
                                        <p>{marker.description}</p>
                                    </div>
                                </InfoWindow>): null }
                        </Marker>
                    ))}
                </GoogleMap>
        </div>
        </div>
    ): (<div data-testid="wholeDiv" style={{width: "100vw", height: "90vh", padding: "1.25em"}}>
        <h1>My current location and friends</h1>
        <p>{loadError}</p>
        </div>);
};

export default MapView;
