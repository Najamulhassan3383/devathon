import React from 'react'
import { Tabs} from 'antd';
import DocumentType from './DocumentType';
import SubDocuments from './SubDocuments';
import StudentList from './StudentList';


const { TabPane } = Tabs;
const DocumentLibrary = () => {
    
    return (
        <div className="sm:m-9 m-3">
            <Tabs defaultActiveKey="1"
            >
                <TabPane tab="Document Type" key="1">
                    <DocumentType />
                </TabPane>
                <TabPane tab="Sub Document" key="2">
                    <SubDocuments />
                </TabPane>
                <TabPane tab="Student list" key="3">
                    <StudentList />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default DocumentLibrary
