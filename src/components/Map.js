import React from 'react';
import { GoogleMap,  Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import { Marker } from "./Marker";

export class Map extends React.Component {


    render() {
        const locations = [
            {lat: 123.1, lng: 150},
            {lat: 123.2, lng: 150},
        ];

        return(
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: 35, lng: 150 }}
            >
                {locations.map( (loc) => <Marker location = {loc}/> )}
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
