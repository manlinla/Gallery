import React from 'react';
import {API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from '../constants';
import { Tabs, Button, Spin } from 'antd';
import $ from 'jquery';
import { Gallery } from "./Gallery"

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        // state management: start with false, set to true after loaded
        loadingPosts: false,
        error: '',
    }

    componentDidMount() {
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        this.setState({loadingGeoLocation: true, error: ''}); // reset error when load successfully
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({ error: 'geo location is not supported D:'});
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({loadingGeoLocation: false, error: ''});
        console.log(position);
        const { latitude, longtitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({ lat: latitude, lon: longtitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = (error) => {
        this.setState({loadingGeoLocation: false, error: 'Failed to load geo location D:'});
        console.log(error);
    }

    loadNearbyPosts = () => {
        this.setState({ loadingPosts: true , error: ''});
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=2000`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then((response) => {
            this.setState({ loadingPosts: false, error: '' });
            console.log(response);
            }, (response) => {
            this.setState({ loadingPosts: false , error: 'Failed to load posts D:'});
            console.log(response.responseText);
        }).catch((error) => {
            console.log(error);
        });
    }

    getGalleyPanelContent = () => {
        if (this.state.error) { //this.state!!
            return <div>
                {this.state.error}
            </div>;
        }
        else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading Geo Location"/>;
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading Posts"/>;
        } else if (this.state.posts && this.state.posts.length > 0) {
            const images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                    caption: post.message,
                }
            });
            return <Gallery images={images}/>;
        }
        else {
            return null;
        }
    }

    // conditional render
    render() {
        const operations = <Button type="primary">Create New Post</Button>;

        return (
            <div className="main-tabs">
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab="Gallery" key="1">
                        {this.getGalleyPanelContent()}
                    </TabPane>
                    <TabPane tab="Map" key="2">Content of tab 2</TabPane>
                </Tabs>
            </div>
        );
    }
}