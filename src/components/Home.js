import React from 'react';
import { GEO_OPTIONS } from '../constants';
import { Tabs, Button } from 'antd';

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
    }

    onFailedLoadGeoLocation = (error) => {
        this.setState({loadingGeoLocation: false});
        console.log(error);
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