"use client";

import React, { forwardRef } from "react";
import FormLabel from "@/components/ui/formLabel";
import { capitalizeFirstLetter, cn } from "@/lib/utils";

interface SelectOptions extends React.InputHTMLAttributes<HTMLOptionElement> {
	value: string;
}

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	id: string;
	label: string;
	options: SelectOptions[];
	className?: string;
	containerClasses?: string;
	error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{ id, label, options, className, error, containerClasses, ...rest },
		ref
	) => {
		const classNames = cn(
			"h-10 w-full block rounded-lg p-2.5",
			"bg-gray-50",
			"border border-gray-300 outline-none",
			"text-gray-900 text-sm",
			"focus:ring-2 focus:ring-inset focus:ring-blue-500",
			className
		);
		
		return (
			<div className={containerClasses}>
				<FormLabel text={label} htmlFor={id} required={rest.required} />
				<div className="mt-2">
					<select id={id} className={classNames} ref={ref} {...rest}>
						{options.map((option, i) => (
							<option
								{...option}
								key={`${i}-${option.value || ""}`}
								label={capitalizeFirstLetter(option.value)}
								value={option.value}
							/>
						))}
					</select>
				</div>
				{error && <span className="text-red-600 text-sm ml-2">{error}</span>}
			</div>
		);
	}
);

Select.displayName = "Select";

export default Select;
