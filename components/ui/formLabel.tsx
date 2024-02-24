"use client";

import React from "react";

interface FormLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
	text: string;
	required?: boolean;
}
const FormLabel: React.FC<FormLabel> = ({ id, text, required, ...rest }) => {
	return (
		<label
			htmlFor={id}
			className="block text-sm font-medium leading-6 text-gray-900"
			{...rest}
		>
			{text}
			{required && <span className="text-red-500 ml-1">*</span>}
		</label>
	);
};

FormLabel.displayName = "FormLabel";

export default FormLabel;
