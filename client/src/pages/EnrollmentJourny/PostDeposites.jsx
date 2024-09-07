import React,{useState,useEffect} from 'react'
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

const PostDeposites = () => {
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
    //eslint-disable-next-line
    const abbreviatedLabels = [
        "Applied Aid", // Completed Applications
        "Skipped Aid", // Awaiting Decision
        "Transcripts", // Admitted Students
        "Deposit", // Denied Students
        "Accepted", // Intending to Enroll
        "Denied", // Denied Acceptance
    ];

    // Full labels for web
    const fullLabels = [
        "Applied for Financial Aid",
        "Skipped Financial Aid",
        "Uploaded Transcripts",
        "Paid Deposit",
        "Accepted Awards",
        "Denied Awards",
    ];
    const data = {
        labels: isMobile ? abbreviatedLabels : fullLabels,
        datasets: [
            {
                label: 'Incoming Freshmen',
                backgroundColor: "#AB0534",
                borderColor: "#AB0534",
                borderWidth: 1,
                data: [50, 30, 20, 40, 35, 10],
            },
            {
                label: 'Re-Admit Students',
                backgroundColor: "#44444F",
                borderColor: "#44444F",
                borderWidth: 1,
                data: [40, 25, 15, 30, 20, 5],
            },
            {
                label: 'Transfer Students',
                backgroundColor: "#FF799F",
                borderColor: "#FF799F",
                borderWidth: 1,
                data: [35, 20, 10, 25, 15, 3],
            },
            {
                label: 'Graduate Students',
                backgroundColor: "#C6C6C8",
                borderColor: "#C6C6C8",
                borderWidth: 1,
                data: [30, 15, 8, 20, 10, 2],
            },
        ],
    };
    const options = {
        indexAxis: 'x', // Display bars horizontally
        responsive: true,
        scales: {
            x: {
                stacked: false, // Disable stacking to show separate bars
            },
            y: {
                stacked: false,
                beginAtZero: true,
            },
        },
    };


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
                        <div className='font-bold'>Student Financial Statistics by Stage</div>
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
                    <div className='my-3 mt-10 sm:flex block justify-center'>
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

export default PostDeposites
