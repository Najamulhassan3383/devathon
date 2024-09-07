import React, { useState } from 'react'
import { Tabs, Dropdown, Space, Button } from 'antd';
import './enrollment.css'
import { MdEditDocument } from 'react-icons/md';
import { FaWpforms, FaListUl } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { TbCurrencyDollar } from 'react-icons/tb';
import { AiOutlineCaretDown } from 'react-icons/ai'
import SubmittedApplications from './SubmittedApplications';
import PostDeposites from './PostDeposites';
import CompletedHealth from './CompletedHealth';
import ClearedEnroll from './ClearedEnroll';


const { TabPane } = Tabs;
const MainDashbord = () => {

    const items = [
        {
            label: '1st menu item',
            key: '1',
        },
    ];
    const [activeKey, setActiveKey] = useState('1');
    return (
        <div className='enrollment-dash sm:m-9 m-2'>
            <div className='sm:flex block sm:justify-between justify-center'>
                <div className='text-[25px] font-bold'>Hi Michael, <span className='text-[14px] font-bold text-gray-400'>here’s your enrollment overview for This 2022-2023 Academic Year.</span></div>
                <div className='flex'>
                    <Dropdown
                        menu={{ items }}
                    >
                        <Button>
                            <Space>
                                This Year
                                <AiOutlineCaretDown color='grey' size={20} />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Dropdown
                        className='mx-2'
                        menu={{ items }}
                    >
                        <Button>
                            <Space>
                                Filters
                                <FaListUl color='grey' size={20} />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
            </div>
            <Tabs
                onChange={(key) => {
                    setActiveKey(key);
                }}
                defaultActiveKey="1">
                <TabPane
                    tab={
                        <div className={`${activeKey === "1" ? 'text-white' : "text-primary"} font-bold flex`}>
                            <div className='mx-3'>
                                <div className='text-[14px] my-3'>Submitted Applications</div>
                                <div className='flex justify-between'>
                                    <div className='flex items-center'>
                                        <div className='text-[28px] px-3'>7,124</div>
                                        <div className='w-[60px] text-white text-center pt-1 h-[30px] rounded-2xl bg-[#8b8787a8] '>+0.5%</div>
                                    </div>
                                    <div className={`${activeKey === "1" ? 'bg-white' : "bg-primary"} p-3 ml-10 rounded-xl`} ><MdEditDocument className={`${activeKey === "1" ? 'text-primary' : "text-white"}`} size={30} /></div>
                                </div>
                            </div>
                        </div>
                    }
                    key="1"
                >
                    <div className='w-[100%]'>
                        <SubmittedApplications />
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <div className={`${activeKey === "2" ? 'text-white' : "text-primary"} font-bold flex`}>
                            <div className='mx-3'>
                                <div className='text-[14px] my-3'>Paid Deposits</div>
                                <div className='flex justify-between'>
                                    <div className='flex items-center'>
                                        <div className='text-[28px] px-3'>1,143</div>
                                        <div className='w-[60px] text-white text-center pt-1 h-[30px] rounded-2xl bg-[#8b8787a8] '>+6.5%</div>
                                    </div>
                                    <div className={`${activeKey === "2" ? 'bg-white' : "bg-primary"} p-3 ml-10 rounded-xl`} ><TbCurrencyDollar className={`${activeKey === "2" ? 'text-primary' : "text-white"}`} size={30} /></div>
                                </div>
                            </div>
                        </div>
                    }
                    key="2"
                >
                    <div className='w-[100%]'>
                        <PostDeposites />
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <div className={`${activeKey === "3" ? 'text-white' : "text-primary"} font-bold flex`}>
                            <div className='mx-3'>
                                <div className='text-[14px] my-3'>Completed Health Form</div>
                                <div className='flex justify-between'>
                                    <div className='flex items-center'>
                                        <div className='text-[28px] px-3'>597</div>
                                        <div className='w-[60px] text-white text-center pt-1 h-[30px] rounded-2xl bg-[#8b8787a8] '>+4.5%</div>
                                    </div>
                                    <div className={`${activeKey === "3" ? 'bg-white' : "bg-primary"} p-3 ml-10 rounded-xl`} ><FaWpforms className={`${activeKey === "3" ? 'text-primary' : "text-white"}`} size={30} /></div>
                                </div>
                            </div>
                        </div>
                    }
                    key="3"
                >
                    <div className='w-[100%]'>
                        <CompletedHealth />
                    </div>
                </TabPane>

                <TabPane
                    tab={
                        <div className={`${activeKey === "4" ? 'text-white' : "text-primary"} font-bold flex`}>
                            <div className='mx-3'>
                                <div className='text-[14px] my-3'>Cleared to Enroll</div>
                                <div className='flex justify-between'>
                                    <div className='flex items-center'>
                                        <div className='text-[28px] px-3'>181</div>
                                        <div className='w-[60px] text-white text-center pt-1 h-[30px] rounded-2xl bg-[#8b8787a8] '>+4.5%</div>
                                    </div>
                                    <div className={`${activeKey === "4" ? 'bg-white' : "bg-primary"} p-3 ml-10 rounded-xl`} ><IoCheckmarkSharp className={`${activeKey === "4" ? 'text-primary' : "text-white"}`} size={30} /></div>
                                </div>
                            </div>
                        </div>
                    }
                    key="4"
                >
                    <div className='w-[100%]'>
                        <ClearedEnroll />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MainDashbord
