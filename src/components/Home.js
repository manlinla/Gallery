
import React from 'react';
import $ from 'jquery';
import { Tabs, Spin } from 'antd';
import { GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY, API_ROOT } from '../constants';
import { Gallery } from './Gallery';
import { CreatePostButton } from './CreatePostButton';
import { WrappedMap } from "./Map";

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        // state management: start with false, set to true after loaded
        loadingPosts: false,
        error: '',
        posts: [],
    }

    componentDidMount() {
        this.setState({ loadingGeoLocation: true, error: '' }); // reset error when load successfully
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeolocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({ error: 'Your browser does not support geolocation!' });
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({ loadingGeoLocation: false, error: '' });
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeolocation = () => {
        this.setState({ loadingGeoLocation: false, error: 'Failed to load geo location!' });
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {  //this.state!!
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading geo location..."/>;
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading posts..."/>;
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

    loadNearbyPosts = () => {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        this.setState({ loadingPosts: true, error: ''});
        return $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response) => {
            this.setState({ posts: response, loadingPosts: false, error: '' });
            console.log(response);
        }, (error) => {
            this.setState({ loadingPosts: false, error: error.responseText });
            console.log(error);
        }).catch((error) => {
            console.log(error);
        });
    }

    // conditional render
    // const operations = <Button type="primary">Create New Post</Button>;
    // replace operations with modal button
    render() {
        const createPostButton = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;

        return (
            <Tabs tabBarExtraContent={createPostButton} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">
                    <WrappedMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        posts={this.state.posts}
                        loadNearByPosts={this.loadNearByPosts}
                    />
                </TabPane>
            </Tabs>
        );
    }
}


//
//
//
// import React from 'react';
// import {API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from '../constants';
// import { Tabs, Spin } from 'antd';
// import $ from 'jquery';
// import { Gallery } from "./Gallery"
// import { CreatePostButton } from "./CreatePostButton"
//
// const TabPane = Tabs.TabPane;
//
//
// export class Home extends React.Component {
//     state = {
//         loadingGeoLocation: false,
//         // state management: start with false, set to true after loaded
//         loadingPosts: false,
//         error: '',
//         posts: [],
//     }
//
//     componentDidMount() {
//         //this.setState({ loadingGeoLocation: true, error: '' });
//         this.getGeoLocation();
//     }
//
//     getGeoLocation = () => {
//         this.setState({loadingGeoLocation: true, error: ''}); // reset error when load successfully
//         if ("geolocation" in navigator) {
//             navigator.geolocation.getCurrentPosition(
//                 this.onSuccessLoadGeoLocation,
//                 this.onFailedLoadGeoLocation,
//                 GEO_OPTIONS,
//             );
//         } else {
//             this.setState({ error: 'geo location is not supported D:'});
//         }
//     }
//
//     onSuccessLoadGeoLocation = (position) => {
//         this.setState({loadingGeoLocation: false, error: ''});
//         console.log(position);
//         const { latitude, longtitude } = position.coords;
//         localStorage.setItem(POS_KEY, JSON.stringify({ lat: latitude, lon: longtitude}));
//         this.loadNearbyPosts();
//     }
//
//     onFailedLoadGeoLocation = (error) => {
//         this.setState({loadingGeoLocation: false, error: 'Failed to load geo location D:'});
//         console.log(error);
//     }
//
//     loadNearbyPosts = () => {
//         this.setState({ loadingPosts: true , error: ''});
//         const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
//         $.ajax({
//             url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=2000`,
//             method: 'GET',
//             headers: {
//                 Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
//             },
//         }).then((response) => {
//             this.setState({ loadingPosts: false, error: '' });
//             console.log(response);
//             }, (response) => {
//             this.setState({ loadingPosts: false , error: 'Failed to load posts D:'});
//             console.log(response.responseText);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }
//
//     getGalleyPanelContent = () => {
//         if (this.state.error) { //this.state!!
//             return <div>
//                 {this.state.error}
//             </div>;
//         }
//         else if (this.state.loadingGeoLocation) {
//             return <Spin tip="Loading Geo Location"/>;
//         } else if (this.state.loadingPosts) {
//             return <Spin tip="Loading Posts"/>;
//         } else if (this.state.posts && this.state.posts.length > 0) {
//             const images = this.state.posts.map((post) => {
//                 return {
//                     user: post.user,
//                     src: post.url,
//                     thumbnail: post.url,
//                     thumbnailWidth: 400,
//                     thumbnailHeight: 300,
//                     caption: post.message,
//                 }
//             });
//             return <Gallery images={images}/>;
//         }
//         else {
//             return null;
//         }
//     }
//
//
//     render() {
//         // conditional render
//         // const operations = <Button type="primary">Create New Post</Button>;
//         // replace operations with modal button
//         const operations = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
//         return (
//             <div className="main-tabs">
//                 <Tabs tabBarExtraContent={operations}>
//                     <TabPane tab="Gallery" key="1">
//                         {this.getGalleyPanelContent()}
//                     </TabPane>
//                     <TabPane tab="Map" key="2">Content of tab 2</TabPane>
//                 </Tabs>
//             </div>
//         );
//     }
// }