import React from "react";
import { BsHeartPulseFill } from "react-icons/bs";
import { Workout, WorkoutStatus } from "@prisma/client";
import {
	calculateGoalPercentage,
	capitalizeFirstLetter,
	getStatusIcon,
	getWorkoutIcon,
	hasValue,
} from "@/lib/utils";
import ProgressRing from "@/components/ui/progressRing";

const LabelValue = ({
	label,
	value,
	className,
}: {
	label: string;
	value: string;
	className?: string;
}) => {
	const labelClasses = "text-sm text-primary-blue-200 font-bold";
	const valueClasses = "text-base";

	return (
		<div className={className}>
			<p className={labelClasses}>{label}</p>
			<p className={valueClasses}>{value}</p>
		</div>
	);
};

export const WorkoutCardHeader = ({
	workout: { status, type, createdAt, duration, totalCalories },
}: {
	workout: Workout;
}) => {
	return (
		<div className="flex gap-3">
			<div className="flex w-16 h-16 rounded-full items-center justify-center self-center shrink-0">
				{status === WorkoutStatus.INPROGRESS ? (
					<BsHeartPulseFill size={38} className="animate-pulse text-red-500" />
				) : (
					<ProgressRing
						percentage={calculateGoalPercentage(totalCalories ?? 0)}
					/>
				)}
			</div>
			<div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
				<LabelValue
					label="Status"
					value={`${getStatusIcon(status)} ${capitalizeFirstLetter(status)}`}
				/>
				<LabelValue
					label="Type"
					value={`${getWorkoutIcon(type)} ${capitalizeFirstLetter(type)}`}
				/>
				<LabelValue
					label="Duration"
					value={hasValue(duration) ? `⏰ ${duration} Mins` : "-"}
				/>
				<LabelValue
					label="Total Calories"
					value={hasValue(totalCalories) ? `🔥 ${totalCalories}` : "-"}
				/>
				<LabelValue
					label="Date"
					value={`🗓️ ${createdAt.toDateString()}`}
					className="col-span-2"
				/>
			</div>
		</div>
	);
};
