"use client";

import React, { ReactNode, forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, ...rest }, ref) => {
		return (
			<button
				className={`bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-full ${className}`}
				{...rest}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;