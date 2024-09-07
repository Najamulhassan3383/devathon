import React, { useEffect, useState, useRef } from 'react'
import { Bar, Pie } from "react-chartjs-2";
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

const SubmittedApplications = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as per your needs
        };

        handleResize(); // Check initially
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const chartRef = useRef();
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
    const abbreviatedLabels = [
        "Comp App", // Completed Applications
        "Awaiting", // Awaiting Decision
        "Admitted", // Admitted Students
        "Denied", // Denied Students
        "Intend", // Intending to Enroll
        "Deny Acc", // Denied Acceptance
        "Deferred", // Deferred Admittance
    ];

    // Full labels for web
    const fullLabels = [
        "Completed Applications",
        "Awaiting Decision",
        "Admitted Students",
        "Denied Students",
        "Intending to Enroll",
        "Denied Acceptance",
        "Deferred Admittance",
    ];
    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the default legend
            },
        },
    };
    const data = {
        labels: isMobile ? abbreviatedLabels : fullLabels,
        datasets: [
            {
                label: "Incoming Freshman",
                data: [10, 40, 60, 70, 80, 110, 120],
                backgroundColor: "#AB0534",
            },
            {
                label: "Re-Admit Students",
                data: [5, 15, 25, 35, 45, 55, 65,],
                backgroundColor: "#44444F",
            },
            {
                label: "Transfer Students",
                data: [15, 25, 35, 45, 55, 65, 10],
                backgroundColor: "#FF799F",
            }, {
                label: "Graduate Students",
                data: [15, 25, 35, 45, 55, 65, 10],
                backgroundColor: "#C6C6C8",
            },
        ],
    };

    useEffect(() => {
        // Access the chart instance using the ref
        const chartInstance = chartRef.current?.chartInstance;
        if (chartInstance) {
            // Update the labels once when the component mounts
            chartInstance.data.labels = window.innerWidth < 768 ? abbreviatedLabels : fullLabels;
            chartInstance.update();
        }
        //eslint-disable-next-line
    }, []);


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

    return (
        <div className=''>
            <div className='border-[1px] rounded-lg flex justify-center'>
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
                    <Bar data={data} options={options} />
                    <div className='block my-3 mt-10 sm:flex justify-center'>
                        {data.datasets.map((item, index) => (
                            <div className='flex items-center mx-3' key={index}>
                                <div className='w-4 h-4 rounded-full mr-2' style={{ backgroundColor: item.backgroundColor }}></div>
                                <div className='mr-2'>{item.label}</div>
                                <div>{item.data.reduce((a, b) => a + b, 0)}</div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>


            <div className='sm:flex mt-4 block'>
                <div className='border-[1px] rounded-lg sm:flex block justify-center sm:w-[35%] w-[100%] mr-3'>
                    <div className='sm:w-[90%] block sm:py-10 w-[100%] py-2'>
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
                <div className='border-[1px] rounded-lg sm:flex block justify-center sm:w-[65%] w-[100%]'>
                    <div className='sm:w-[90%] block sm:py-10 w-[100%] py-2'>
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

export default SubmittedApplications
