import React, { useState } from 'react'
import { Space, Table, Select, Dropdown } from 'antd';
import { RxDotsVertical } from 'react-icons/rx';
import { BsThreeDotsVertical, BsFilter, BsEye } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { LiaSmsSolid, LiaCheckDoubleSolid } from "react-icons/lia";
import { MdReportGmailerrorred, MdOutlineEmail } from "react-icons/md";
import { LuBellPlus } from "react-icons/lu";
import { PiClockLight } from "react-icons/pi";
import { FiDelete, FiEdit } from 'react-icons/fi';

const { Option } = Select;
const FeaturedListings = () => {
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
            createdDate: "12-08-2023",
            name: "Annual alumni Meetup",
            createdBy: "Discover the latest trends and developments shaping the world of education. From cutting-edge technologies transforming this world",
            link: "http://localhost:3000/",
            id: "000001",
        },
        {
            createdDate: "13-08-2023",
            name: "Annual alumni Meetup",
            createdBy: "Join us for a journey into the vastness of space and uncover the mysteries of the universe.",
            link: "http://localhost:3000/",
            id: "000002",
        },
        {
            createdDate: "14-08-2023",
            name: "Annual alumni Meetup",
            createdBy: "Experience the richness of diverse cultures through mesmerizing performances and captivating art displays.",
            link: "http://localhost:3000/",
            id: "000003",
        },
        {
            createdDate: "15-08-2023",
            name: "Tech Expo 2023",
            createdBy: "Get hands-on with the latest gadgets and innovations at the biggest technology exhibition of the year.",
            link: "http://localhost:3000/",
            id: "000004",
        },
        {
            createdDate: "16-08-2023",
            name: "Sustainability Summit",
            createdBy: "Join global leaders as they discuss the urgent need for sustainable practices and climate action.",
            link: "http://localhost:3000/",
            id: "000005",
        },
        {
            createdDate: "17-08-2023",
            name: "Health and Wellness Conference",
            createdBy: "Learn about the latest breakthroughs in healthcare and well-being from renowned experts.",
            link: "http://localhost:3000/",
            id: "000006",
        },
        {
            createdDate: "18-08-2023",
            name: "Future of Artificial Intelligence",
            createdBy: "Discover how AI is reshaping industries and impacting our daily lives in unprecedented ways.",
            link: "http://localhost:3000/",
            id: "000007",
        },
        {
            createdDate: "19-08-2023",
            name: "Culinary Delights from Around the World",
            createdBy: "Embark on a gastronomic adventure and savor flavors from various cuisines.",
            link: "http://localhost:3000/",
            id: "000008",
        },
        {
            createdDate: "20-08-2023",
            name: "Adventure Travel and Exploration",
            createdBy: "Thrill-seekers unite! Learn about the most exciting destinations and activities for adrenaline junkies.",
            link: "http://localhost:3000/",
            id: "000009",
        },
        {
            createdDate: "21-08-2023",
            name: "Mindfulness and Meditation Retreat",
            createdBy: "Find inner peace and relaxation in a serene retreat dedicated to mindfulness and meditation.",
            link: "http://localhost:3000/",
            id: "000010",
        },
    ]);


    const columns = [
        {
            title: 'IMAGE',
            dataIndex: 'image',
            render: (_, record) => (
                <Space>
                    <img src="https://th.bing.com/th/id/OIP.sJQa4EnP4SQrh17g6nIiNgHaE9?pid=ImgDet&rs=1"
                        alt="event" className='w-[300px] h-[65px] object-fit rounded-lg' />
                </Space>
            ),
            width: 150,
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            render: (_, record) => (
                <Space>
                    <span className='capitalize'>{record.name}</span>
                </Space>
            ),
            width: 200,
        },
        {
            title: 'CREATED DATE',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'CREATED BY',
            dataIndex: 'createdBy',
            render: (_, record) => (
                <div className='capitalize'>{record.createdBy.slice(0, 65) + "..."}</div>
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

export default FeaturedListings
