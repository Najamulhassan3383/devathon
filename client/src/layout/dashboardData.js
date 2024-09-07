import { LuLayoutDashboard } from 'react-icons/lu';
import { AiOutlineInfoCircle, AiOutlineUser, AiOutlineCompass, AiOutlineSetting, AiOutlineMessage } from 'react-icons/ai';
import { IoMdStats } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';
import { FiPhoneCall } from 'react-icons/fi';
const items = [
    {
        to: 'enrollment-journy',
        label: 'Enrollment Journey',
        icon: <LuLayoutDashboard size={25} />,
        subnavs: [],
    },
    {
        to: 'document-library',
        label: 'Document Library',
        icon: <AiOutlineInfoCircle size={25} />,
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
    {
        to: 'screen-8',
        label: 'Mobile App Stats',
        icon: <RxDashboard size={25} />,
        subnavs: [],
    },
    {
        to: 'screen-9',
        label: 'ADDITIONAL',
        icon: <FiPhoneCall size={1} />,
        subnavs: [
            {
                to: 'screen-9',
                label: 'Messages',
                icon: <AiOutlineMessage size={22} />,
            },
            {
                to: 'screen-10',
                label: 'Settings',
                icon: <AiOutlineSetting size={22} />,
            },
            {
                to: 'screen-11',
                label: 'Email Support',
                icon: <FiPhoneCall size={22} />,
            },
        ],
    },
];




export { items };
