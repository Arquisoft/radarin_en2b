import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
  margin: '40px',
};

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      userPos: "",
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.currentCoords)
    } else {
      console.log("Location not Available");
    }
  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    this.setState(previous => ({
      userPos: {...previous.userPos, 
      lat: latitude, lng: longitude}
    }))
  };

  render() { 
    return (
      <div style={{ height: '100%', width: '100%'}}>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          centerAroundCurrentLocation={true}
        >
         <Marker
          lat={this.props.lat}
          lng={this.props.lng} 
          color="red"
          name="You"
        />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY' //Google Maps API Key 
})(MapView);