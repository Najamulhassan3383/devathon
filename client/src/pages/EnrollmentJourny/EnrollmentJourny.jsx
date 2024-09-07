import React, { useState } from 'react'
import { Space, Table, Dropdown, Avatar } from 'antd';
import { BsThreeDots, BsFilter } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LiaSmsSolid, LiaCheckDoubleSolid } from "react-icons/lia";
import { MdOutlineMail, MdReportGmailerrorred, MdOutlineEmail } from "react-icons/md";
import { LuBellPlus } from "react-icons/lu";
import { PiClockLight } from "react-icons/pi";


const EnrollmentJourny = () => {
    //eslint-disable-next-line
    const [data, setData] = useState([
        {
            key: '1',
            id: "ID-000001",
            name: 'John Brown',
            gender: 'female',
            state: 'New York',
            classification: 'freshman',
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
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '5',
            id: "ID-000005",
            name: 'Joe Black',
            gender: "male",
            state: 'new york',
            classification: 'graduate',
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
            major: "economics",
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        }
    ]);


    const actionLinks = [
        {
            key: '1',
            label: 'Send Notification',
            icon: <LuBellPlus size={25} />,
            onClick: (data) => alert(`Notification Send ${data.name}`),
        },
        {
            key: '2',
            icon: <LiaSmsSolid size={25} />,
            label: 'Send SMS',
            onClick: () => alert('SMS SENT'),
        },
        {
            key: '3',
            icon: <MdOutlineEmail size={25} />,
            label: 'Send Email"',
            onClick: () => alert('Mail Send'),
        },
        {
            key: '4',
            icon: <LiaCheckDoubleSolid size={25} />,
            label: 'Send to "All Channels"',
            onClick: () => alert('sent'),
        },
        {
            key: '5',
            icon: <PiClockLight size={25} />,
            label: 'Change Time Period',
            onClick: () => alert('Change Time Period'),
        }
        ,
        {
            key: '6',
            icon: <BsFilter size={25} />,
            label: 'Filter Attributes',
            onClick: () => alert('Filter'),
        }
        ,
        {
            key: '7',
            icon: <MdReportGmailerrorred size={25} />,
            label: 'Report Issue',
            onClick: () => alert('Roported'),
        }
    ];
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
            title: 'DETAILS',
            key: "details",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <AiOutlineFileSearch onClick={() => alert(record.id)} size={25} style={{ color: "grey" }} />
                </Space>
            ),
        },
        {
            title: 'NOTIFY',
            key: "notify",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <IoMdNotificationsOutline onClick={() => alert(record.id)} size={25} style={{ color: "grey" }} />
                </Space>
            ),
        },
        {
            title: 'SMS',
            key: "sms",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <LiaSmsSolid onClick={() => alert(record.id)} size={25} style={{ color: "grey" }} />
                </Space>
            ),
        },
        {
            title: 'EMAIL',
            key: "email",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <MdOutlineMail onClick={() => alert(record.id)} size={25} style={{ color: "grey" }} />
                </Space>
            ),
        },
    ];


    return (
        <div className="">
            <div className='flex justify-end '>
                <button className="hover:bg-gray-100 p-1 rounded-full mr-4">
                    <Dropdown
                        menu={{
                            items: actionLinks
                        }}
                    >
                        <Link onClick={(e) => e.preventDefault()}>
                            <Space className='flex justify-center'>
                                <BsThreeDots size={25} />
                            </Space>
                        </Link>
                    </Dropdown>
                </button>
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

export default EnrollmentJourny
