"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const ErrorText: React.FC = () => {
	const searchParams = useSearchParams();
	const urlError = searchParams.get("error");
	return urlError ? (
		<span
			className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
			role="alert"
		>
			Something went wrong!!
		</span>
	) : null;
};

export default ErrorText;
