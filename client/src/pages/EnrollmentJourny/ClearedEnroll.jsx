import React from 'react'
import { Doughnut, Pie } from "react-chartjs-2";
import { Dropdown, Space } from 'antd';
import { CategoryScale, LinearScale, ArcElement, BarElement, Chart } from 'chart.js';
import { BsThreeDots, BsFilter } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { LiaSmsSolid, LiaCheckDoubleSolid } from "react-icons/lia";
import { MdReportGmailerrorred, MdOutlineEmail } from "react-icons/md";
import { LuBellPlus } from "react-icons/lu";
import { PiClockLight } from "react-icons/pi";
import EnrollmentJourny from './EnrollmentJourny';


Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(ArcElement);

const ClearedEnroll = () => {

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


    const dataa = {
        labels: ['Men', 'Women', 'Transgender', 'Other'],
        datasets: [
            {
                label: ['Men', 'Women', 'Transgender', 'Other'],
                data: [40, 35, 15, 10], // Replace these values with the actual data
                backgroundColor: ['#44444F', '#AB0534', '#FF799F', '#C6C6C8'], // Use different colors for each gender
            },
        ],
    };

    const dougData = {
        labels: ['Cleared to Enroll', 'Waiting to be Cleared'],
        datasets: [
            {
                label: 'Clearing',
                data: [12, 19],
                backgroundColor: ['#44444F', '#AB0534'],
            },
        ],
    }
    const dougData2 = {
        labels: ['Campus', 'Housing', 'Class'],
        datasets: [
            {
                label: 'check in',
                data: [12, 19, 6],
                backgroundColor: ['#44444F', '#AB0534', '#FF799F'],
            },
        ],
    }
    return (
        <div className=''>
            <div className='sm:flex block mt-4'>
                <div className='border-[1px] rounded-lg flex justify-center sm:w-[50%] w-[100%] mr-3'>
                    <div className='sm:w-[90%] sm:py-10 w-[100%] py-2'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>Student Clearing Statistics</div>
                            <button className="hover:bg-gray-100 p-1 rounded-full mr-4">
                                <Dropdown
                                    menu={{
                                        items: actionLinks
                                    }}
                                >
                                    <Link onClick={(e) => e.preventDefault()}>
                                        <Space className='flex justify-center'>
                                            <BsThreeDots color='grey' size={25} />
                                        </Space>
                                    </Link>
                                </Dropdown>
                            </button>
                        </div>
                        <div className='w-[300px] h-[300px] m-[auto]'>
                            <Doughnut
                                data={dougData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                        <div className='my-3 mt-10 sm:flex block justify-center'>
                            {dougData.datasets[0].data.map((item, index) => (
                                <div className='flex items-center mx-3' key={index}>
                                    <div className='w-12 h-7 rounded-md mr-2' style={{ backgroundColor: dougData.datasets[0].backgroundColor[index] }}></div>
                                    <div className='mr-2'>{dougData.labels[index]}</div>
                                    <div>{item}</div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className='border-[1px] rounded-lg flex justify-center sm:w-[50%] w-[100%]'>
                    <div className='sm:w-[90%] sm:py-10 w-[100%] py-2'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>Student Application Statistics by Stage</div>
                            <button className="hover:bg-gray-100 p-1 rounded-full mr-4">
                                <Dropdown
                                    menu={{
                                        items: actionLinks
                                    }}
                                >
                                    <Link onClick={(e) => e.preventDefault()}>
                                        <Space className='flex justify-center'>
                                            <BsThreeDots color='grey' size={25} />
                                        </Space>
                                    </Link>
                                </Dropdown>
                            </button>
                        </div>
                        <div className='w-[300px] h-[300px] m-[auto]'>
                            <Doughnut
                                data={dougData2}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                        <div className='my-3 mt-10 sm:flex block justify-center'>
                            {dougData2.datasets[0].data.map((item, index) => (
                                <div className='flex items-center mx-3' key={index}>
                                    <div className='w-4 h-4 rounded-full mr-2' style={{ backgroundColor: dougData2.datasets[0].backgroundColor[index] }}></div>
                                    <div className='mr-2'>{dougData2.labels[index]}</div>
                                    <div>{item}</div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>


            <div className='sm:flex block mt-4'>
                <div className='border-[1px] rounded-lg flex justify-center sm:w-[35%] w-[100%] mr-3'>
                    <div className='sm:w-[90%] sm:py-10 w-[100%] py-2'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>Student Application Statistics by Stage</div>
                            <button className="hover:bg-gray-100 p-1 rounded-full mr-4">
                                <Dropdown
                                    menu={{
                                        items: actionLinks
                                    }}
                                >
                                    <Link onClick={(e) => e.preventDefault()}>
                                        <Space className='flex justify-center'>
                                            <BsThreeDots color='grey' size={25} />
                                        </Space>
                                    </Link>
                                </Dropdown>
                            </button>
                        </div>
                        <div className='w-[300px] h-[300px] m-[auto]'>
                            <Pie
                                data={dataa}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                        <div className='my-3 mt-10 sm:flex block justify-center'>
                            {dataa.datasets[0].data.map((item, index) => (
                                <div className='flex items-center mx-1' key={index}>
                                    <div className='w-4 h-4 rounded-full mr-1' style={{ backgroundColor: dataa.datasets[0].backgroundColor[index] }}></div>
                                    <div className='mr-1'>{dataa.labels[index]}</div>
                                    <div>{item}</div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className='border-[1px] rounded-lg flex justify-center sm:w-[65%] w-[100%]'>
                    <div className='sm:w-[90%] sm:py-10 w-[100%] py-2'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>Student Application Statistics by Stage</div>
                            <button className="hover:bg-gray-100 p-1 rounded-full mr-4">
                                <Dropdown
                                    menu={{
                                        items: actionLinks
                                    }}
                                >
                                    <Link onClick={(e) => e.preventDefault()}>
                                        <Space className='flex justify-center'>
                                            <BsThreeDots color='grey' size={25} />
                                        </Space>
                                    </Link>
                                </Dropdown>
                            </button>
                        </div>
                        <div>
                            <Pie
                                data={dataa}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                        <div className='my-3 mt-10 sm:flex block justify-center'>
                            {dataa.datasets[0].data.map((item, index) => (
                                <div className='flex items-center mx-3' key={index}>
                                    <div className='w-4 h-4 rounded-full mr-2' style={{ backgroundColor: dataa.datasets[0].backgroundColor[index] }}></div>
                                    <div className='mr-2'>{dataa.labels[index]}</div>
                                    <div>{item}</div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <EnrollmentJourny />
        </div>
    )
}

export default ClearedEnroll
