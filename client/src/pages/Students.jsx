import React, { useState, useEffect } from 'react'
import { Space, Table, Avatar, Tag, Button, Select } from 'antd';
import { AiOutlineEye } from "react-icons/ai";
import axios from 'axios';
import { SERVER_URL } from '../key';
import { Modal } from 'antd';



const Students = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({});
    const [status, setStatus] = useState('');


    const fetchData = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/user/all-students`);
            console.log(res.data)
            setData(res?.data?.students);
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

    const handleCancel = () => {
        setOpen(false)
        setStudent({})
    }

    const handleChangeStatus = async () => {
        try {
            const res = await axios.put(`${SERVER_URL}/api/user/update-status/${student._id}`, { status })
            console.log(res.data)
            setOpen(false)
            fetchData()
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
            title: 'FIRST NAME',
            dataIndex: 'fName',
            key: "fName",
        },
        {
            title: 'LAST NAME',
            dataIndex: 'lName',
            key: "lName",
        },
        {
            title: 'STATUS',
            key: 'status',
            dataIndex: 'status',
            render: (status) => (
                <Tag
                    className='w-[100px] text-center capitalize'
                    color={status === 'active' ? '#82C43C' : '#AB0534'}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'VIEW',
            key: "details",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <AiOutlineEye onClick={() => handleView(record)} size={25} style={{ color: "grey" }} />
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
                onCancel={handleCancel}
                footer={null}
            >
                <div>
                    <h1 className='text-2xl font-bold'>Student Details</h1>
                    <div>
                        <p>First Name: {student.fName}</p>
                        <p>Last Name: {student.lName}</p>
                        <p>Email: {student.email}</p>
                        <p>Status: {student.status}</p>
                    </div>

                    {/* Change Status */}
                    <div className='flex items-center gap-2'>
                        <p>Change Status</p>
                        <Select
                            className='w-[150px]'
                            value={status}
                            onChange={(value) => setStatus(value)}
                        >
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="suspended">Suspend</Select.Option>
                        </Select>
                        <Button
                            onClick={handleChangeStatus}
                            className='bg-blue-500 text-white px-4 py-2 rounded-md'
                        >Change</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Students
