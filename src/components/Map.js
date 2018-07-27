import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { Markers } from "./Marker";
import { POS_KEY } from "../constants";

export class Map extends React.Component {
    // reload after dragging the map
    reloadMarkers = () => {
        const center = this.map.getCenter();
        const location = { lat: center.lat(), lon: center.lng() }; // new location
        const range = this.getRange();
        this.props.loadNearbyPosts(location, range);//use new center location to trigger new nearby posts
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        //bounds: 4 corners
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    // get the new center of the map
    getMapRef = (map) => {
        this.map = map;
        window.map = map;
    }

    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        // const locations = [
        //     {lat: 123.1, lng: 150},
        //     {lat: 123.2, lng: 150},
        // ]; now using the location (an array) from this.props.post to do visualization

        return(
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
                defaultZoom={11}
                defaultCenter={{ lat, lng: lon }}
            >
                {this.props.posts.map((post) => <Markers key={post.url} post={post}/>)}
                {/*map an array of location into an array of marker; than display at google map
                DATA VISUALIZATION*/}
            </GoogleMap>
        );
    }
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));
// with script / with googlemap -> complex behaviors wrapped in high order components
// high order component calls the og component (Map in this case), and maintain an enhanced component.
// double layer wrapped
