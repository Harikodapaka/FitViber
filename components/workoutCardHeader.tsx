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
import Badge from "@/components/ui/badge";

export const WorkoutCardHeader = ({
	workout: { status, type, createdAt, duration, totalCalories },
}: {
	workout: Workout;
}) => {
	const statusInprogress = status === WorkoutStatus.INPROGRESS;
	return (
		<div className="flex gap-1">
			<div className="w-full flex flex-col gap-2">
				<div className="flex-1">
					<Badge
						className={`font-bold py-2 bg-violet-100 text-violet-800 ${
							statusInprogress && "animate-pulse bg-red-100 text-red-800"
						}`}
					>
						{getStatusIcon(status)} {capitalizeFirstLetter(status)}
					</Badge>
					<div className="flex gap-1 flex-wrap">
						{hasValue(totalCalories) && (
							<p className="text-2xl md:text-3xl/6 font-bold text-orange-600 mt-2">
								{`🔥 ${totalCalories} Kcal`}
							</p>
						)}
						<Badge className="text-sm mt-2 py-1 bg-gray-100 text-gray-800">
							{`${getWorkoutIcon(type)} ${capitalizeFirstLetter(type)}`}
						</Badge>
						{hasValue(duration) && (
							<Badge className="text-sm mt-2 py-1 bg-gray-100 text-gray-800">
								{`⏰ ${duration} Mins`}
							</Badge>
						)}
					</div>
				</div>
				<p className="text-xs text-gray-500">{`🗓️ ${createdAt.toDateString()}`}</p>
			</div>
			<div className="flex w-24 h-24 rounded-full items-center justify-center self-center shrink-0">
				{statusInprogress ? (
					<BsHeartPulseFill size={38} className="animate-pulse text-red-500" />
				) : (
					<ProgressRing
						percentage={calculateGoalPercentage(totalCalories ?? 0)}
					/>
				)}
			</div>
		</div>
	);
};
