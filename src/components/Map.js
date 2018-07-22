import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { Markers } from "./Marker";
import { POS_KEY } from "../constants";

export class Map extends React.Component {
    // reload after dragging the map
    reloadMarker = () => {
        const center = this.map.getCenter();
        const location = { lat: center.lat(), lon: center.lng() }; // new location
        const range = this.getRange();
        this.props.loadNearByPosts(location, range);
    }

    // get the new center of the map
    getMapRef = (map) => {
        this.map = map;
    }
    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        // const locations = [
        //     {lat: 123.1, lng: 150},
        //     {lat: 123.2, lng: 150},
        // ]; now using the location (an array) from this.props.post to do visualization

        return(
            <GoogleMap
                onDragEnd={this.reloadMarker}
                defaultZoom={11}
                defaultCenter={{ lat, lng: lon }}
            >
                {this.props.posts.map((post) => <Markers key={post.url} post={post}/> )}
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
