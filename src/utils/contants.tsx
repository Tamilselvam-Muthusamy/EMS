import { MdOutlineAnalytics } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegRectangleList } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { FiRefreshCcw } from "react-icons/fi";
import { IconChecklist } from "@tabler/icons-react";

export const navLinks = [
  {
    title: "Home",
    to: "dashboard",
    icon: <MdOutlineAnalytics className="h-6 w-6" />,
  },
  {
    title: "Users",
    to: "users",
    icon: <FaPeopleGroup className="h-6 w-6" />,
  },
  {
    title: "Controller",
    to: "subjects",
    icon: <FaRegRectangleList className="h-6 w-6" />,
  },
  {
    title: "Access",
    to: "results",
    icon: <TbReportAnalytics className="h-6 w-6" />,
  },
  {
    title: "Reports",
    to: "positions",
    icon: <IconChecklist className="h-6 w-6" />,
  },
  {
    title: "Reassign",
    to: "reassign",
    icon: <FiRefreshCcw className="h-6 w-6" />,
  },
];

export const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
