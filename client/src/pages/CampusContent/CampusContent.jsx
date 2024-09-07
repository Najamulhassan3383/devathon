import React from 'react'
import { Tabs} from 'antd';
import NewsList from './NewsList';
import EventList from './EventList';
import FeaturedListings from './FeaturedListings';
import Announcements from './Announcements';


const { TabPane } = Tabs;
const CampusContent = () => {
    
    return (
        <div className="sm:m-9 m-3">
            <Tabs defaultActiveKey="1"
            >
                <TabPane tab="News List" key="1">
                    <NewsList />
                </TabPane>
                <TabPane tab="Event List" key="2">
                    <EventList />
                </TabPane>
                <TabPane tab="Announcements" key="3">
                    <Announcements />
                </TabPane>
                <TabPane tab="Featured Listings" key="4">
                    <FeaturedListings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default CampusContent
