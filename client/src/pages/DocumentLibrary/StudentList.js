import React, { useState } from 'react'
import { Space, Table, Avatar, Select,Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { BsPlus, BsEye } from "react-icons/bs";
import { FiEdit,FiDelete } from 'react-icons/fi';
import {RxDotsVertical} from 'react-icons/rx';


const { Option } = Select;
const DocumentType = () => {
    const subActionLinks = [
        {
            key: '1',
            label: 'View Details',
            icon: <BsEye size={25} />,
            onClick: (data) => alert(`Notification Send ${data.name}`),
        },
        {
            key: '2',
            label: 'Edit',
            icon: <FiEdit size={25} />,
            onClick: () => alert('SMS SENT'),
        },
        {
            key: '3',
            label: 'Remove Item',
            icon: <FiDelete size={25} />,
            onClick: () => alert('Mail Send'),
        }
    ];
    //eslint-disable-next-line
    const [data, setData] = useState([
        {
            key: '1',
            id: "ID-000001",
            name: 'John Brown',
            gender: 'female',
            state: 'New York',
            classification: 'freshman',
            lastActivity:"12-08-2023",
            major: "economics",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '2',
            id: "ID-000002",
            name: 'Jim Green',
            gender: 'female',
            state: 'London',
            classification: 'transfer',
            major: "economics",
            lastActivity:"12-08-2023",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '3',
            id: "ID-000003",
            name: 'Joe Black',
            gender: 'female',
            state: 'virginia',
            classification: 'graduate',
            major: "economics",
            lastActivity:"12-08-2023",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '4',
            id: "ID-000004",
            name: 'Joe Black',
            gender: 'male',
            state: 'new york',
            major: "economics",
            classification: 'freshman',
            lastActivity:"12-08-2023",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '5',
            id: "ID-000005",
            name: 'Joe Black',
            gender: "male",
            state: 'new york',
            classification: 'graduate',
            lastActivity:"12-08-2023",
            major: "economics",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        }
        ,
        {
            key: '6',
            id: "ID-000006",
            name: 'Joe Black',
            gender: "male",
            state: 'pennsylvania',
            classification: 'graduate',
            lastActivity:"12-08-2023",
            major: "marketing & communication",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        }
        ,
        {
            key: '7',
            id: "ID-000007",
            name: 'Joe Black',
            gender: "transgender",
            state: 'pennsylvania',
            classification: 'graduate',
            lastActivity:"12-08-2023",
            major: "marketing & communication",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '8',
            id: "ID-000008",
            name: 'Joe Black',
            gender: "transgender",
            state: 'pennsylvania',
            classification: 'freshman',
            lastActivity:"12-08-2023",
            major: "marketing & communication",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '9',
            id: "ID-000009",
            name: 'Joe Black',
            gender: "male",
            state: 'pennsylvania',
            classification: 'graduate',
            lastActivity:"12-08-2023",
            major: "marketing & communication",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '10',
            id: "ID-0000010",
            name: 'Joe Black',
            gender: "male",
            state: 'pennsylvania',
            classification: 'freshman',
            lastActivity:"12-08-2023",
            major: "marketing & communication",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '11',
            id: "ID-000011",
            name: 'Joe Black',
            gender: "male",
            state: 'pennsylvania',
            classification: 'graduate',
            lastActivity:"12-08-2023",
            major: "biology",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '12',
            id: "ID-000012",
            name: 'Joe Black',
            gender: "female",
            state: 'pennsylvania',
            classification: 'transfer',
            lastActivity:"12-08-2023",
            major: "biology",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '13',
            id: "ID-000012",
            name: 'Joe Black',
            gender: "female",
            state: 'pennsylvania',
            classification: 'transfer',
            lastActivity:"12-08-2023",
            major: "biology",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '14',
            id: "ID-000012",
            name: 'Joe Black',
            gender: "female",
            state: 'pennsylvania',
            classification: 'transfer',
            lastActivity:"12-08-2023",
            major: "biology",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '15',
            id: "ID-000012",
            name: 'Joe Black',
            gender: "female",
            state: 'virginia',
            classification: 'transfer',
            lastActivity:"12-08-202023",
            major: "economics",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        }
    ]);
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: "id",
        },
        {
            title: 'PROFILE',
            dataIndex: 'name',
            render: (_, record) => (
                <Space>
                    <Avatar src={record.image} />
                    <span className='capitalize'>{record.name}</span>
                </Space>
            ),
        },
        {
            title: 'GENDER',
            dataIndex: 'gender',
            render: (_, { gender }) => (
                <div className='capitalize'>
                    {gender}
                </div>
            ),
        },
        {
            title: 'STATE',
            dataIndex: 'state',
            render: (_, { state }) => (
                <div className='capitalize'>
                    {state}
                </div>
            ),
        }
        , {
            title: 'MAJOR',
            dataIndex: 'major',
            render: (_, { major }) => (
                <div className='capitalize'>
                    {major}
                </div>
            ),
            width: 150
        },
        {
            title: 'CLASSIFICATION',
            key: 'classification',
            dataIndex: 'classification',
            render: (classification) => (
                <Space wrap>
                    {classification && (
                        <div
                            className={`${classification.toLowerCase() === 'transfer'
                                ? 'bg-orange-500'
                                : classification.toLowerCase() === 'freshman'
                                    ? 'bg-purple-500'
                                    : 'bg-gray-400'
                                } w-2 h-2 rounded-full mr-2`}
                        ></div>
                    )}
                    <div className='capitalize'>{classification}</div>
                </Space>
            )
        },
        {
            title: 'LAST ACTIVITY',
            dataIndex: 'lastActivity',
            key: "lastActivity",
        },
        {
            title: 'VIEW DETAILS',
            key: "details",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <BsEye onClick={() => alert(record.id)} size={25} style={{ color: "grey" }} />
                </Space>
            ),
        },
        {
            title: 'VIEW DOC',
            key: "viewDoc",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <BsEye onClick={() => alert(record.id)} size={25} style={{ color: "grey" }} />
                </Space>
            ),
        },
        {
            title: 'ACTIONS',
            key: "actions",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: subActionLinks.map((action) => ({
                            ...action,
                            onClick: () => action.onClick(record), // Pass the user ID
                        })),
                    }}
                >
                    <Link onClick={(e) => e.preventDefault()}>
                        <Space className='flex justify-center'>
                            <RxDotsVertical color='grey' size={20} />
                        </Space>
                    </Link>
                </Dropdown>
            ),
        },
    ];


    return (
        <div className="sm:m-9 m-2">
            <div className='flex justify-between '>
                <Select style={{ width: 250 }} defaultValue={"Generated Application PDF"}>
                    <Option value="Generated Application PDF">Generated Application PDF</Option>
                    <Option value="Generated Intent Email PDF">Generated Intent Email PDF</Option>
                    <Option value="Generated Health form PDF">Generated Health form PDF</Option>
                    <Option value="Generated Housing form PDF">Generated Housing form PDF</Option>
                </Select>
                <div>
                    <button className="bg-primary py-1 px-3 rounded-lg text-white flex">
                        Add Document <BsPlus size={25} />
                    </button>
                </div>
            </div>
            <div className="container mx-auto my-8">
                <Table
                    className='table-responsive'
                    showHeader={true}
                    size='middle'
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default DocumentType
