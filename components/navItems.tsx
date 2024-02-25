import { NavBarItem } from "@/components/ui/navbar";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";

import { BsPlusCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { FaUser, FaRegUser } from "react-icons/fa6";

export const NavItems: NavBarItem[] = [
	{
		name: "Home",
		path: "/home",
		outlineIcon: <AiOutlineHome size={32} />,
		fillIcon: <AiFillHome size={32} fill="#0b64b3" />,
	},
	{
		name: "Workout",
		path: "/workout",
		outlineIcon: <BsPlusCircle size={32} />,
		fillIcon: <BsFillPlusCircleFill size={32} fill="#0b64b3" />,
	},
	{
		name: "Profile",
		path: "/profile",
		outlineIcon: <FaRegUser size={32} />,
		fillIcon: <FaUser size={32} fill="#0b64b3" />,
	},
];
