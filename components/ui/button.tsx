"use client";

import React, { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, ...rest }, ref) => {
		const classNames = cn(
			"bg-primary-blue-200 hover:bg-primary-blue-100 text-white",
			"disabled:bg-gray-500 disabled:opacity-70",
			"focus:bg-primary-blue-100 focus:ring-2 focus:ring-inset focus:ring-primary-blue-hover",
			"py-2 px-4 rounded-full",
			"outline-none",
			"flex items-center justify-center",
			className
		);
		return (
			<button className={classNames} {...rest} ref={ref}>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;
