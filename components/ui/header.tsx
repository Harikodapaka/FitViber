"use client";

import Image from "next/image";

const Header: React.FC = () => {
	return (
		<header className="bg-white py-2 flex justify-center shadow-md">
			<div>
				<Image
					src="/images/logo.svg"
					width={100}
					height={100}
					priority
					alt="FitViber Logo"
				/>
			</div>
		</header>
	);
};

Header.displayName = "Header";

export default Header;
