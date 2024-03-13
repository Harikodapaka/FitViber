"use client";

import React, { ReactNode, forwardRef, useState } from "react";
import Card from "@/components/ui/card";

interface CollapsibleCardProps
	extends React.ButtonHTMLAttributes<HTMLDivElement> {
	header: ReactNode;
	children: ReactNode;
	className?: string;
}

const CollapsibleCard = forwardRef<HTMLDivElement, CollapsibleCardProps>(
	({ header, children, className, ...rest }, ref) => {
		const [visible, setVisible] = useState(false);
		return (
			<Card className={className} ref={ref} {...rest}>
				<header
					onClick={() => {
						setVisible(!visible);
					}}
				>
					{header}
				</header>
				{visible && <main>{children}</main>}
			</Card>
		);
	}
);

CollapsibleCard.displayName = "CollapsibleCard";

export default CollapsibleCard;
