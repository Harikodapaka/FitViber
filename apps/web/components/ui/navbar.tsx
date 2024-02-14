"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface NavBarItem {
	path: string;
	name: string;
	outlineIcon: ReactNode;
	fillIcon: ReactNode;
}

const NavBar: React.FC<{ navItems: NavBarItem[] }> = ({ navItems }) => {
	const pathname = usePathname();
	return (
		<nav className="flex justify-around items-center">
			{navItems.map((item) => (
				<Link href={item.path} key={item.name}>
					<span className="sr-only">{item.name}</span>
					<span>
						{pathname === item.path ? item.fillIcon : item.outlineIcon}
					</span>
				</Link>
			))}
		</nav>
	);
};

NavBar.displayName = "NavBar";

export default NavBar;
