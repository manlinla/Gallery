import React from 'react';
import { GoogleMap,  withScriptjs, withGoogleMap } from 'react-google-maps';

export class Map extends React.Component {
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