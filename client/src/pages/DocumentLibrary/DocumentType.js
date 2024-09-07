import React, { useState } from 'react'
import { Space, Table, Select, Avatar, Tag, Dropdown } from 'antd';
import { HiOutlineDocumentText } from "react-icons/hi";
import { RxDotsVertical } from 'react-icons/rx';
import { BsThreeDots, BsFilter, BsEye } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { LiaSmsSolid, LiaCheckDoubleSolid } from "react-icons/lia";
import { MdReportGmailerrorred, MdOutlineEmail } from "react-icons/md";
import { LuBellPlus } from "react-icons/lu";
import { PiClockLight } from "react-icons/pi";
import { FiDelete, FiEdit } from 'react-icons/fi';

const { Option } = Select;
const DocumentType = () => {
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
            documentName: 'GENERATED APPLICATION PDF',
            noOfDocs: 5,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '2',
            id: "ID-000002",
            name: 'Jim Green',
            documentName: 'GENERATED APPLICATION PDF',
            noOfDocs: 7,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '3',
            id: "ID-000003",
            name: 'Joe Black',
            documentName: 'GENERATED APPLICATION PDF',
            noOfDocs: '3',
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '4',
            id: "ID-000004",
            name: 'Joe Black',
            documentName: 'GENERATED APPLICATION PDF',
            noOfDocs: 5,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '5',
            id: "ID-000005",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 5,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        }
        ,
        {
            key: '6',
            id: "ID-000006",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        }
        ,
        {
            key: '7',
            id: "ID-000007",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '8',
            id: "ID-000008",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '9',
            id: "ID-000009",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '10',
            id: "ID-0000010",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '11',
            id: "ID-000011",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '12',
            id: "ID-000012",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '13',
            id: "ID-000012",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '14',
            id: "ID-000012",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 2,
            image: 'https://th.bing.com/th/id/OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa?pid=ImgDet&rs=1'
        },
        {
            key: '15',
            id: "ID-000012",
            name: 'Joe Black',
            documentName: "GENERATED APPLICATION PDF",
            noOfDocs: 3,
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
            title: 'NAME',
            dataIndex: 'name',
            render: (_, record) => (
                <Space>
                    <Avatar src={record.image} />
                    <span className='capitalize'>{record.name}</span>
                </Space>
            ),
        },
        {
            title: 'DOCUMENT TYPE',
            dataIndex: 'documentType',
            render: (_, record) => (
                <Space>
                    <HiOutlineDocumentText size={25} color="grey" />
                    <span className='capitalize'>{record.documentName}</span>
                </Space>
            ),
        },
        {
            title: 'No. OF DOCUMENTS',
            dataIndex: 'noOfDocs',
            render: (_, record) => (
                <Tag color='#0062FF'>
                    <span className='capitalize'>{record.noOfDocs}</span>
                </Tag>
            ),
            align: 'center',
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

export default DocumentType
