"use client";
import React from "react";
import NavBar from "@/components/ui/navbar";
import { NavItems } from "@/components/navItems";

const Footer: React.FC = () => {
	return (
		<footer className="h-14 bg-white py-2 border-solid border-t-2 border-zinc-200">
			<NavBar navItems={NavItems} />
		</footer>
	);
};

Footer.displayName = "Footer";

export default Footer;
