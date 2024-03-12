const ProgressRing = ({
	percentage,
	ringColor = "text-orange-600",
}: {
	percentage: number;
	ringColor?: string;
}) => {
	const circleRadius = 40;
	const circumference = 2 * Math.PI * circleRadius;
	const progressOffset = circumference - (circumference * percentage) / 100;

	return (
		<svg className="w-full h-full" viewBox="0 0 100 100">
			{/* Background circle */}
			<circle
				className="text-gray-200 stroke-current"
				strokeWidth="10"
				cx="50"
				cy="50"
				r={circleRadius}
				fill="transparent"
			/>
			{/* Progress circle */}
			<circle
				className={`${ringColor} progress-ring__circle stroke-current`}
				strokeWidth="10"
				strokeLinecap="round"
				cx="50"
				cy="50"
				r={circleRadius}
				fill="transparent"
				strokeDasharray={`${circumference},${circumference}`}
				strokeDashoffset={progressOffset}
				transform="rotate(-90 50 50)"
			/>
			{/* Center text */}
			<text
				x="50"
				y="50"
				fontFamily="Verdana"
				fontSize="14"
				textAnchor="middle"
				alignmentBaseline="middle"
			>
				{percentage}%
			</text>
		</svg>
	);
};

ProgressRing.displayName = "ProgressRing";

export default ProgressRing;
