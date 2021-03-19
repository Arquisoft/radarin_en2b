import {React, Component} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nearby: []
    }
  }

  render() {
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

  //Calling the RestAPI for the nearby friends
  componentDidMount() {
    fetch('/users/location/near')
    .then(res => res.json())
    .then((data) => {
      this.setState({ nearby: data })
    })
    .catch(console.log)
  }
}

function Map() {
  return (
    <GoogleMap defaultZoom={15} //Starting zoom and position
      defaultCenter={{lat: 1, lng: 1}}> 
      
    </GoogleMap>
  );
}

//Wrap the map so that react can handle it
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default MapView;