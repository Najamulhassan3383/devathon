import React, { useState } from 'react'
import { Space, Table, Select, Dropdown } from 'antd';
import { RxDotsVertical } from 'react-icons/rx';
import { BsThreeDotsVertical, BsFilter, BsEye, BsGlobe } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { LiaSmsSolid, LiaCheckDoubleSolid } from "react-icons/lia";
import { MdReportGmailerrorred, MdOutlineEmail } from "react-icons/md";
import { LuBellPlus } from "react-icons/lu";
import { PiClockLight } from "react-icons/pi";
import { FiDelete, FiEdit } from 'react-icons/fi';

const { Option } = Select;
const Announcements = () => {
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

    const subActionLinks = [
        {
            key: '1',
            label: 'View Details',
            icon: <BsEye size={25} />,
            onClick: (data) => alert(`Notification Send ${data.id}`),
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
            data: "12-08-2023, 12:00 pm",
            name: "Annual alumni Meetup",
            description: "Discover the latest trends and developments shaping the world of education. From cutting-edge technologies transforming this world",
            link: "http://localhost:3000/",
            id: "000001",
        },
        {
            data: "13-08-2023, 12:00 pm",
            name: "Annual alumni Meetup",
            description: "Join us for a journey into the vastness of space and uncover the mysteries of the universe.",
            link: "http://localhost:3000/",
            id: "000002",
        },
        {
            data: "14-08-2023, 12:00 pm",
            name: "Annual alumni Meetup",
            description: "Experience the richness of diverse cultures through mesmerizing performances and captivating art displays.",
            link: "http://localhost:3000/",
            id: "000003",
        },
        {
            data: "15-08-2023, 12:00 pm",
            name: "Tech Expo 2023",
            description: "Get hands-on with the latest gadgets and innovations at the biggest technology exhibition of the year.",
            link: "http://localhost:3000/",
            id: "000004",
        },
        {
            data: "16-08-2023, 12:00 pm",
            name: "Sustainability Summit",
            description: "Join global leaders as they discuss the urgent need for sustainable practices and climate action.",
            link: "http://localhost:3000/",
            id: "000005",
        },
        {
            data: "17-08-2023, 12:00 pm",
            name: "Health and Wellness Conference",
            description: "Learn about the latest breakthroughs in healthcare and well-being from renowned experts.",
            link: "http://localhost:3000/",
            id: "000006",
        },
        {
            data: "18-08-2023, 12:00 pm",
            name: "Future of Artificial Intelligence",
            description: "Discover how AI is reshaping industries and impacting our daily lives in unprecedented ways.",
            link: "http://localhost:3000/",
            id: "000007",
        },
        {
            data: "19-08-2023, 12:00 pm",
            name: "Culinary Delights from Around the World",
            description: "Embark on a gastronomic adventure and savor flavors from various cuisines.",
            link: "http://localhost:3000/",
            id: "000008",
        },
        {
            data: "20-08-2023, 12:00 pm",
            name: "Adventure Travel and Exploration",
            description: "Thrill-seekers unite! Learn about the most exciting destinations and activities for adrenaline junkies.",
            link: "http://localhost:3000/",
            id: "000009",
        },
        {
            data: "21-08-2023, 12:00 pm",
            name: "Mindfulness and Meditation Retreat",
            description: "Find inner peace and relaxation in a serene retreat dedicated to mindfulness and meditation.",
            link: "http://localhost:3000/",
            id: "000010",
        },
    ]);


    const columns = [
        {
            title: 'Date',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            render: (_, record) => (
                <Space>
                    <span className='capitalize'>{record.name}</span>
                </Space>
            ),
            width: 280,
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            render: (_, record) => (
                <div className='capitalize'>{record.description.slice(0, 90) + "..."}</div>
            ),
            width: 400,
        },
        {
            title: 'EMBED LINK',
            dataIndex: 'link',
            render: (_, record) => (
                <Space className='flex justify-center'>
                    <BsGlobe color='grey' className='cursor-pointer' onClick={() => alert(record.link)} size={25} />
                </Space>
            ),
            width: 100,
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
                <button className="hover:bg-gray-100 p-1 rounded-full mr-4">
                    <Dropdown
                        menu={{
                            items: actionLinks
                        }}
                    >
                        <Link onClick={(e) => e.preventDefault()}>
                            <Space className='flex justify-center'>
                                <BsThreeDotsVertical size={25} />
                                Threshold
                            </Space>
                        </Link>
                    </Dropdown>
                </button>
                <Select style={{ width: 150 }} defaultValue={"Upload"}>
                    <Option value="Upload">Upload</Option>
                </Select>
            </div>
            <div className="container mx-auto my-8">
                <Table
                    className='table-responsive'
                    showHeader={true}
                    size='middle'
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    responsive={true}
                />
            </div>
        </div>
    )
}

export default Announcements
