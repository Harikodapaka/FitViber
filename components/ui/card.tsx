"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}
const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
	const classNames = cn(
		"relative bg-white text-black p-2.5 shadow-xl",
		"ring-1 ring-gray-900/5 rounded-lg",
		className
	);
	return (
		<div className={classNames} {...rest}>
			{children}
		</div>
	);
};

Card.displayName = "Card";

export default Card;
