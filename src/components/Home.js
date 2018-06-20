import React from 'react';
import {API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from '../constants';
import { Tabs, Button } from 'antd';
import $ from 'jquery';

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        // state management: start with false, set to true after loaded
    }

    componentDidMount() {
        this.setState({loadingGeoLocation: true});
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            // geo location is not available
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({loadingGeoLocation: false});
        console.log(position);
        const { latitude, longtitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({ lat: latitude, lon: longtitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = (error) => {
        this.setState({loadingGeoLocation: false});
        console.log(error);
    }

    loadNearbyPosts = () => {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=200`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then((response) => {
            console.log(response);
            }, (response) => {
            console.log(response.responseText);
        }).catch((error) => {
            console.log(error);
        });
    }

    // conditional render
    render() {
        const operations = <Button type="primary">Create New Post</Button>;

        return (
            <div>
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab="Gallery" key="1">
                        {this.state.loadingGeoLocation ? 'Loading Geo Location' : ''}
                    </TabPane>
                    <TabPane tab="Map" key="2">Content of tab 2</TabPane>
                </Tabs>
            </div>
        );
    }
}