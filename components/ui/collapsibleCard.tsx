"use client";

import React, { ReactNode, forwardRef, useState } from "react";
import Card from "@/components/ui/card";

interface CollapsibleCardProps {
	id: string;
	header: ReactNode;
	children: ReactNode;
	className?: string;
}

const CollapsibleCard = forwardRef<HTMLDivElement, CollapsibleCardProps>(
	({ header, children, className, id }, ref) => {
		const [visible, setVisible] = useState(false);

		const toggleVisibility = () => {
			setVisible((prevVisible) => !prevVisible);
		};

		const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggleVisibility();
			}
		};
		return (
			<Card
				id={id}
				className={className}
				ref={ref}
				onKeyDown={handleKeyPress}
				role="button"
				tabIndex={0}
				aria-expanded={visible}
				aria-controls={`section-${id}`}
				onClick={() => {
					setVisible(!visible);
				}}
			>
				{header}
				{visible && (
					<section id={`section-${id}`} aria-labelledby={id}>
						{children}
					</section>
				)}
			</Card>
		);
	}
);

CollapsibleCard.displayName = "CollapsibleCard";

export default CollapsibleCard;
