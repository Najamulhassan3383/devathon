import React, { useEffect, useState } from 'react'
import { Space, Table, Avatar, Tag, message } from 'antd';
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { SERVER_URL } from '../key';
import axios from 'axios';
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Modal, Button, Select } from 'antd';




const Teachers = () => {

    const [allTeachers, setAllTeachers] = useState([])
    const [pendingTeachers, setPendingTeachers] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [teacherDetails, setTeacherDetails] = useState({})
    const [status, setStatus] = useState('')
    const fetchActiveAndSuspendedTeachers = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/user/all-teachers`)
            setAllTeachers(res.data.teachers)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPendingTeachers = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/user/all-pending-teachers`)
            setPendingTeachers(res.data.teachers)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchActiveAndSuspendedTeachers()
        fetchPendingTeachers()
    }, [])


    const handleView = (record) => {
        setTeacherDetails(record)
        setIsOpen(true)
    }
    const handleCancel = () => {
        setIsOpen(false)
    }
    const handleApprove = async (record) => {
        try {
            const res = await axios.put(`${SERVER_URL}/api/user/approve-teacher/${record._id}`)
            console.log(res.data)
            message.success("Teacher approved successfully!")
            fetchPendingTeachers()
            fetchActiveAndSuspendedTeachers()
        } catch (error) {
            console.log(error)
            message.error("Failed to approve teacher!")
        }
    }
    const handleReject = async (record) => {
        try {
            const res = await axios.put(`${SERVER_URL}/api/user/reject-teacher/${record._id}`)
            console.log(res.data)
            message.success("Teacher rejected successfully!")
            fetchPendingTeachers()
            fetchActiveAndSuspendedTeachers()
        } catch (error) {
            console.log(error)
            message.error("Failed to reject teacher!")
        }
    }

    const handleChangeStatus = async () => {
        try {
            const res = await axios.put(`${SERVER_URL}/api/user/update-status/${teacherDetails._id}`, { status })
            console.log(res.data)
            message.success("Teacher status updated successfully!")
            fetchActiveAndSuspendedTeachers()
            handleCancel()
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
    const pendingColumns = [
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
            title: 'ACTIONS',
            key: "details",
            render: (_, record) => (
                <Space className='cursor-pointer'>
                    <AiOutlineEye onClick={() => handleView(record)} size={25} style={{ color: "grey" }} />
                    <div className='flex items-center gap-2'>
                        <TiTickOutline onClick={() => handleApprove(record)} size={35} style={{ color: "green" }} />
                        <ImCross onClick={() => handleReject(record)} size={20} style={{ color: "red" }} />
                    </div>
                </Space>
            ),
        }
    ];


    return (
        <div className="sm:m-9 m-2">
            <div className="container mx-auto my-8">
                <div className='text-2xl font-semibold'>Pending Requests</div>
                <Table
                    className='table-responsive'
                    showHeader={true}
                    size='middle'
                    columns={pendingColumns}
                    dataSource={pendingTeachers}
                    pagination={false}
                />
            </div>
            <div className="container mx-auto my-8">
                <div className='text-2xl font-semibold'>All Teachers</div>
                <Table
                    className='table-responsive'
                    showHeader={true}
                    size='middle'
                    columns={columns}
                    dataSource={allTeachers}
                    pagination={false}
                />
            </div>

            <Modal
                open={isOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div>
                    <h1 className='text-2xl font-bold'>Teacher Details</h1>
                    <div>
                        <p>Name: {teacherDetails.fName} {teacherDetails.lName}</p>
                        <p>Email: {teacherDetails.email}</p>
                        <p>Status: {teacherDetails.status}</p>
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

export default Teachers
