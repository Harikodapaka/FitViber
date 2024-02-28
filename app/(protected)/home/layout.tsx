import React from "react";

interface HomeLayoutProps {
	children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
	return <div className="container">{children}</div>;
};

export default HomeLayout;
