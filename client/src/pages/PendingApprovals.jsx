import React, { useState, useEffect } from 'react'
import { Space, Table, Avatar, Tag, Button, Modal, Select, message } from 'antd';
import { AiOutlineEye } from "react-icons/ai";
import axios from 'axios';
import { SERVER_URL } from '../key';
import { TiTickOutline } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';



const PendingApprovals = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({});
    const [status, setStatus] = useState('');
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/test-series/pending-approvals`);
            console.log(res.data)
            setData(res?.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleView = (record) => {
        setOpen(true)
        setStudent(record)
    }


    const handleApprove = async (record) => {
        try {
            const res = await axios.put(`${SERVER_URL}/api/test-series/approve/${record._id}`)
            console.log(res.data)
            await axios.post(`${SERVER_URL}/api/email/send-email`, {
                to: record?.teachersID?.email,
                subject: "Test Series Approved",
                text: "Your test series has been approved by the admin"
            })
            fetchData()
            message.success("Test Series Approved Successfully")
        } catch (error) {
            console.log(error)
        }
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: "_id",
        },
        {
            title: 'TEST SERIES NAME',
            dataIndex: 'test_series_name',
            key: "test_series_name",
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            render: (description) => (
                <p className='text-ellipsis overflow-hidden w-[200px]'>{description.substring(0, 100)}...</p>
            )
        },
        {
            title: 'VIEW',
            key: "details",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <AiOutlineEye onClick={() => handleView(record)} size={25} style={{ color: "grey" }} />
                    <div className='flex items-center gap-2'>
                        <TiTickOutline onClick={() => handleApprove(record)} size={35} style={{ color: "green" }} />
                    </div>
                </Space>
            ),
        }
    ];


    return (
        <div className="sm:m-9 m-2">
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

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <div>
                    <h2>Details of Test Series</h2>
                </div>
            </Modal>
        </div>
    )
}

export default PendingApprovals
