import React, { useState } from "react";
import { getTagLocations } from "../services/crudPod";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
//import { withScriptjs, withGoogleMap } from "react-google-maps";
import mapStyles from "./MapStyles.js";

var crd = [];

navigator.geolocation.getCurrentPosition(function position(position){
    crd = position.coords;
});

/*const MapGoogleMaps = withScriptjs(withGoogleMap(props => (
    <GoogleMap defaultZoom={15} //Starting zoom and position
    defaultCenter={{lat: crd.latitude, lng: crd.longitude}}
    defaultOptions={{styles: mapStyles}}>
    {console.log(props.markers)}
    {props.markers.map((marker, index) => (
        <Marker icon={{url: "/iconTag.png"}} key={index} position={marker.position} onClick={() => props.onMarkerClick(marker)}>
        {marker.showInfo && (<InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                <div>
                    <h3>{marker.name}</h3>
                    <h5>{marker.description}</h5>
                </div>
            </InfoWindow>)}
        </Marker>
      ))}
    </GoogleMap>
)));

class Prueba extends React.Component{

    constructor(props) {
        super(props);
        this.webId = props.webId;
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMarkerClose = this.handleMarkerClose.bind(this);
        this.state = {
          markers: []
        };
    }

    componentDidMount(){
        Load();

        var markers = [];
        getTagLocations(this.webId).then((list) => {
            list.forEach(tag => {
                var splited = tag.split(", ");
                var aux = {
                    name: splited[0],
                    description: splited[1],
                    position: {lat: parseInt(splited[2]), lng: parseInt(splited[3])},
                    showInfo: false
                };
                markers.push(aux);
                this.setState({markers: this.state.markers.concat([aux])});
            });            
        });
        
        /*setTimeout(() => {
            this.setState({markers: markers});
        }, 1000);
    };

    handleMarkerClick (targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: true
                    };
                }
                return marker;
            })
        });
    };

    handleMarkerClose (targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: false
                    };
                }
                return marker;
            })
        });
    };

    render() {
        return (
            <div style={{width: "100vw", height: "90vh", padding: "20px"}}>
                <MapGoogleMaps
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
                    libraries=geometry,drawing,places&key=AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY`}
                    loadingElement={<div style={{height: "100%"}} /> } 
                    containerElement={<div style={{height: "100%"}} /> }
                    mapElement={<div style={{height: "100%"}} /> }
                    markers={this.state.markers}
                    onMarkerClick={this.handleMarkerClick}
                    onMarkerClose={this.handleMarkerClose}
                />
            </div>
        );
    }

};*/

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw", 
    height: "90vh", 
    padding: "20px"
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const Prueba = (props) => {
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
    */

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
    };

    return isLoaded ? (
        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            center={center}
            zoom={16} 
            options={options}
            onLoad={() => {
                    getTagLocations(props.webId).then((list) => 
                        list.forEach(tag => {
                                var splited = tag.split(", ");
                                setMarkers((current) => [
                                    ...current,
                                    {
                                        name: splited[0],
                                        description: splited[1],
                                        position: {lat: parseFloat(splited[2]), lng: parseFloat(splited[3])},
                                        showInfo: false
                                    }
                                ]);
                            }
                        )
                    )
                }
            }>
            {markers.map((marker, index) => (
                <Marker icon={{url: "/iconTag.png"}} key={index} position={marker.position} onClick={() => setSelected(marker)}>
                    {selected ? (<InfoWindow onCloseClick={() => setSelected(null)}>
                            <div>
                                <h3>{marker.name}</h3>
                                <h5>{marker.description}</h5>
                            </div>
                        </InfoWindow>): null }
                </Marker>
            ))}
        </GoogleMap>
    ): <div>{loadError}</div>;
}

export default Prueba;