"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Badge: React.FC<{ className?: string; children: ReactNode }> = ({
	className,
	children,
}) => {
	const classNames = cn(
		"inline-block rounded-full",
		"bg-indigo-100 text-indigo-800 text-xs font-medium",
		"m-1 px-2.5 py-0.5",
		className
	);
	return <span className={classNames}>{children}</span>;
};

Badge.displayName = "Badge";

export default Badge;
