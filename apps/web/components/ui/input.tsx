"use client";

import { error } from "console";
import React, { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	className?: string;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ id, label, className, error, ...rest }, ref) => {
		return (
			<>
				<label
					htmlFor={id}
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					{label}
					{rest.required && <span className="text-red-500 ml-1">*</span>}
				</label>
				<div className="mt-2">
					<input
						ref={ref}
						name={id}
						id={id}
						autoComplete={id}
						className={`block w-full outline-none rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
						{...rest}
					/>
				</div>
				{error && <span className="text-red-600 text-sm ml-2">{error}</span>}
			</>
		);
	}
);

Input.displayName = "Input";

export default Input;
