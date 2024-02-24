"use client";

import React, { forwardRef } from "react";
import FormLabel from "./formLabel";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	className?: string;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, className, error, ...rest }, ref) => {
		const classNames = cn(
			"block h-10 w-full",
			"outline-none rounded-md border-0 shadow-sm",
			"ring-1 ring-inset ring-gray-300",
			"py-1.5 px-2",
			"focus:ring-2 focus:ring-inset focus:ring-blue-500",
			"text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
			className
		);
		return (
			<div className="my-2">
				<FormLabel text={label} htmlFor={id} required={rest.required} />
				<div className="mt-2">
					<input
						ref={ref}
						name={id}
						id={id}
						autoComplete={id}
						className={classNames}
						{...rest}
					/>
				</div>
				{error && <span className="text-red-600 text-sm ml-2">{error}</span>}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
