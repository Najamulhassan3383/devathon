import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdStats } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdInsertPageBreak } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";


const items = [
  {
    to: "dashboard",
    label: "Dashboard",
    icon: <LuLayoutDashboard size={25} />,
    subnavs: [],
  },
  {
    to: "students",
    label: "Students",
    icon: <FaUsers size={25} />,
    subnavs: [],
  },
    {
        to: 'teachers',
        label: 'Teachers',
        icon: <FaChalkboardTeacher size={25} />,
        subnavs: [],
    },
  {
    to: "test-series",
    label: "Test Series",
    icon: <MdInsertPageBreak size={25} />,
    subnavs: [],
  },
  {
    to: "tests",
    label: "Tests",
    icon: <MdInsertPageBreak size={25} />,
    subnavs: [],
  },
  {
    to: "messaging",
    label: "Messaging",
    icon: <IoMdStats size={25} />,
    subnavs: [],
  },
];

export { items };
