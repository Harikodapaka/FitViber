"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/ui/navbar";
import { NavItems } from "@/components/navItems";

const Footer: React.FC = () => {
	const [inStandaloneMode, setInStandaloneMode] = useState(false);
	useEffect(() => {
		if (window?.matchMedia("(display-mode: standalone)")?.matches) {
			setInStandaloneMode(true);
		}
	}, []);
	return (
		<footer
			className={`bg-white py-2 border-solid border-t-2 border-zinc-200 ${
				inStandaloneMode ? "h-16" : "h-14"
			}`}
		>
			<NavBar navItems={NavItems} />
		</footer>
	);
};

Footer.displayName = "Footer";

export default Footer;
