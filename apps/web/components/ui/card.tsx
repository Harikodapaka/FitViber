"use client";

import React, { ReactNode } from "react";

interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
	return (
		<div
			className={`relative bg-white text-black p-2.5 shadow-xl ring-1 ring-gray-900/5 rounded-lg ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
};

Card.displayName = "Card";

export default Card;
