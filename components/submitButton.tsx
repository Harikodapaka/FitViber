import React, { ReactNode } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SubmitButton = ({
	disabled,
	submitting,
	className,
	children,
}: {
	disabled: boolean;
	submitting?: boolean;
	className?: string;
	children: ReactNode;
}) => {
	return (
		<Button
			type="submit"
			disabled={disabled}
			className={cn(className)}
		>
			{submitting ? (
				<div role="status">
					<TbFidgetSpinner className="animate-spin" size={24} />
				</div>
			) : (
				children
			)}
		</Button>
	);
};
