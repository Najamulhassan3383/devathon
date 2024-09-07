import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Space, message } from 'antd';
import {
    UserOutlined,
    BellOutlined,
} from '@ant-design/icons';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './adminDashboard.css';
import { FiSearch } from 'react-icons/fi';
import logo from "../assets/logo.png"
import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineInfoCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdStats } from 'react-icons/io';
import { useCookies } from 'react-cookie';
import { useUser } from '../context/UserContext';
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";


const { Header, Content, Sider } = Layout;

const Dashboard = () => {
    const navigate = useNavigate();
    const { isUser, setIsUser } = useUser();
    const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token']);

    useEffect(() => {
        if (isUser) {
            // User is logged in, check role
        } else {
            navigate('/login');
        }
    }, [isUser]);

    // Tabs for different user roles
    const studentTabs = [
        { to: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard size={25} /> },
        { to: "tests", label: "Tests", icon: <AiOutlineInfoCircle size={25} /> },
        { to: "messaging", label: "Messaging", icon: <IoMdStats size={25} /> },
    ];

    const adminTabs = [
        { to: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard size={25} /> },
        { to: "students", label: "Students", icon: <AiOutlineUser size={25} /> },
        { to: "teachers", label: "Teachers", icon: <FaChalkboardTeacher size={25} /> },
        { to: "pending-approvals", label: "Pending Approvals", icon: <MdOutlinePendingActions size={25} /> },
    ];

    const teacherTabs = [
        { to: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard size={25} /> },
        { to: "test-series", label: "Test Series", icon: <AiOutlineInfoCircle size={25} /> },
        { to: "messaging", label: "Messaging", icon: <IoMdStats size={25} /> },
    ];

    // Conditional items based on user role
    const items = isUser?.role === 'student' ? studentTabs 
                 : isUser?.role === 'admin' ? adminTabs 
                 : isUser?.role === 'teacher' ? teacherTabs 
                 : [];

    const navSubLinks = [
        {
            key: '2',
            label: 'Profile',
            onClick: () => {
                navigate('/profile');
            }
        },
        {
            key: '3',
            label: 'Logout',
            onClick: () => {
                setIsUser(null);
                removeCookie('x-auth-token');
                message.success('Logged out successfully');
                navigate('/login');
            }
        },
    ];

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Layout className='university-dashboard'>
            {isMobile ? (
                <Layout className="site-layout">
                    <Header className='dashboard-header sm:px-4 px-2 flex justify-between'>
                        <div className='flex'>
                            <div className='flex items-center'>
                                <div className='cursor-pointer sm:px-3 px-1'>
                                    <IoMailUnreadOutline style={{ fontSize: 30 }} />
                                </div>
                                <div className='cursor-pointer px-3'>
                                    <BellOutlined style={{ fontSize: 30 }} />
                                </div>
                            </div>
                            <div className='user-icon'>
                                <UserOutlined style={{ fontSize: 25 }} />
                            </div>
                            <div className='admin-text'>
                                <div className="admin-name">{isUser?.fName} {isUser?.lName}</div>
                            </div>
                            <Dropdown
                                className='ml-2'
                                menu={{ items: navSubLinks }}
                            >
                                <Link onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <AiOutlineCaretDown color='grey' size={20} />
                                    </Space>
                                </Link>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className="relative w-full mb-40 bg-white">
                        <div className='w-[100%]'>
                            <Outlet />
                        </div>
                    </Content>
                    <div className='fixed bottom-0 left-0 w-full bg-primary border-t text-white border-gray-300 flex justify-around p-3'>
                        {items.map((item) => (
                            <div key={item.to} className='flex flex-col items-center'>
                                <Link to={`/${item.to}`} className='text-white'>
                                    {item.icon}
                                </Link>
                            </div>
                        ))}
                    </div>
                </Layout>
            ) : (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider width={260} theme="light">
                        <div className='flex p-2 border-b-[1px]'>
                            <img className='w-[50px] h-[48px]' src={logo} alt="logo" />
                            <div className='university-text text-center pl-1 pb-0'>
                                <div className='univristy-name text-[18px] text-primary font-semibold'>VIRTUAL PREP MASTER</div>
                            </div>
                        </div>
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                            {items.map((item) => (
                                <Menu.Item key={item.to} icon={item.icon}>
                                    <Link to={`/${item.to}`}>{item.label}</Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className='dashboard-header sm:px-4 px-2 flex justify-between'>
                            <div className='flex p-2'>
                                <FiSearch color='grey' size={26} className='mt-2' />
                                <input type="text" placeholder='Search Something.....' />
                            </div>
                            <div className='flex'>
                                <div className='flex items-center'>
                                    <div className='cursor-pointer px-3'>
                                        <IoMailUnreadOutline style={{ fontSize: 30 }} />
                                    </div>
                                    <div className='cursor-pointer px-3'>
                                        <BellOutlined style={{ fontSize: 30 }} />
                                    </div>
                                </div>
                                <div className='user-icon'>
                                    <UserOutlined style={{ fontSize: 25 }} />
                                </div>
                                <div className='admin-text'>
                                    <div className="admin-name">{isUser?.fName} {isUser?.lName}</div>
                                    <div className="admin-designation">{isUser?.role}</div>
                                </div>
                                <Dropdown
                                    className='ml-2'
                                    menu={{ items: navSubLinks }}
                                >
                                    <Link onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <AiOutlineCaretDown color='grey' size={20} />
                                        </Space>
                                    </Link>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content className='relative w-[100%] p-[20px]'>
                            <div className='bg-white absolute top-0 right-0 bottom-0 left-0 overflow-auto'>
                                <Outlet />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            )}
        </Layout>
    );
};

export default Dashboard;
