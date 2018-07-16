import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

export class Markers extends React.Component {
    state = {
        isOpen: false,
    }

    onToggleOpen = () => {
        this.setState((prevState) => {
            //return a state change
            return{
                isOpen: !prevState.isOpen,
            };
        });
    }

    render() {
        const { location } = this.props;
        return(
            <Marker
                position = {{ location }}
                onClick = {this.onToggleOpen}
            >
                {this.state.isOpen ?
                    <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>hi</div>
                    </InfoWindow> : null }
            {/*conditional render of InfoWindow; control the state of SINGLE marker*/}
            </Marker>);
    }
}