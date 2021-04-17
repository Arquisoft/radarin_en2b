import React from "react";
import { getTagLocations } from "../services/crudPod";

import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import mapStyles from "./MapStyles.js";

var crd = [];

navigator.geolocation.getCurrentPosition(function position(position){
    crd = position.coords;
});

const MapGoogleMaps = withScriptjs(withGoogleMap(props => (
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
            });            
        });
        
        setTimeout(() => {
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

}

export default Prueba;