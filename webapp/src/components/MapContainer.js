import {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import CurrentLocation from './Map';

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false, //Hides or shows the infowindow
        activeMarker: {}, //Shows the active marker upon click
        selectedPlace: {} //Shows the infowindow to the selected place upon a marker
    };
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        onClose = props => {
            if (this.state.showingInfoWindow) {
                this.setState({
                    showingInfoWindow: false,
                    activeMarker: null
                });
            }
        }

    render() {
        return (
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
                >
                <Marker
                onClick={this.onMarkerClick}
                name={'You'}
                />
                <InfoWindow
                marker = {this.state.activeMarker}
                visible = {this.state.showingInfoWindow}
                onClose = {this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
                </CurrentLocation>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyClIZED8kODn9vaGf-_ke73ETRNbFC9IhY'
}) (MapContainer);