import React from 'react';
import { GoogleMap,  withScriptjs, withGoogleMap } from 'react-google-maps';

export class Map extends React.Component {
    reloadMarkers = () => {
        const center = this.map.getCenter();
        const location = { lat: center.lat(), lon: center.lng() };
        const range = this.getRange();
        this.props.loadNearByPosts(location, range);
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }


    render() {
        <GoogleMap
            ref={this.getMapRef}
            onDragEnd={this.reloadMarkers}
            onZoomChanged={this.reloadMarkers}
            defaultZoom={11}
            defaultCenter={{ lat: lat, lng: lon }}
        >
            {this.props.posts.map((post) => <AroundMarker key={post.url} post={post}/> )}
        </GoogleMap>
    }
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));
// with script / with googlemap -> complex behaviors wrapped in high order components
// high order component calls the og component (Map in this case), and maintain an enhanced component.
// double layer wrapped
