import React from "react";
import { Workout } from "@prisma/client";
import { FcSurvey, FcLike } from "react-icons/fc";

export const WorkoutCardHeader = ({
	workout: { status, type, createdAt },
}: {
	workout: Workout;
}) => {
	return (
		<div className="flex gap-3">
			<div className="flex w-12 h-12 rounded-full bg-gray-200 items-center justify-center self-center">
				{status === "INPROGRESS" ? (
					<FcLike size={32} className="animate-pulse" />
				) : (
					<FcSurvey size={32} />
				)}
			</div>
			<div>
				<p>State: {status}</p>
				<p>Type: {type}</p>
				<p>Date: {createdAt.toDateString()}</p>
			</div>
		</div>
	);
};
