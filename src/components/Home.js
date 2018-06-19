import React from 'react';
import { GEO_OPTIONS } from '../constants';
import { Tabs, Button } from 'antd';

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    componentDidMount() {
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
        console.log(position);
    }

    onFailedLoadGeoLocation = (error) => {
        console.log(error);
    }

    render() {
        const operations = <Button type="primary">Create New Post</Button>;

        return (
            <div>
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab="Gallery" key="1">Content of tab 1</TabPane>
                    <TabPane tab="Map" key="2">Content of tab 2</TabPane>
                </Tabs>
            </div>
        );
    }
}