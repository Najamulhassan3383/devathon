import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineInfoCircle, AiOutlineUser, AiOutlineCompass } from 'react-icons/ai';
import { IoMdStats } from 'react-icons/io';
import { FaUsers } from "react-icons/fa";
import { MdInsertPageBreak } from "react-icons/md";

const items = [
    {
        to: 'dashboard',
        label: 'Dashboard',
        icon: <LuLayoutDashboard size={25} />,
        subnavs: [],
    },
    {
        to: 'users',
        label: 'Users',
        icon: <FaUsers size={25} />,
        subnavs: [],
    },
    {
        to: 'tests',
        label: 'Tests',
        icon: <MdInsertPageBreak size={25} />,
        subnavs: [],
    },
    {
        to: 'messaging',
        label: 'Messaging',
        icon: <IoMdStats size={25} />,
        subnavs: [],
    },
    {
        to: 'student-list',
        label: 'Student Record',
        icon: <AiOutlineUser size={25} />,
        subnavs: [
            {
                to: 'student-record',
                label: 'Record',
                icon: <AiOutlineUser size={1} />,
            },
            {
                to: 'student-list',
                label: 'List of Students',
                icon: <AiOutlineUser size={1} />,
            },
            {
                to: 'enrollment-document',
                label: 'Enrollment Documents',
                icon: <AiOutlineUser size={1} />,
            },
            {
                to: 'sub-documents',
                label: 'Sub Documents',
                icon: <AiOutlineUser size={1} />,
            },
        ],
    },
    {
        to: 'campus-content',
        label: 'Campus Content',
        icon: <AiOutlineCompass size={25} />,
        subnavs: [],
    },
];




export { items };
