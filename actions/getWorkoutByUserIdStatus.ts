"use server";

import { db } from "@/lib/db";
import { WorkoutStatus } from "@prisma/client";

export const getWorkoutByUserIdStatus = async (
	userId?: string,
	status = WorkoutStatus.INPROGRESS
) => {
	try {
		if (!userId) return null;
		const workout = await db.workout.findFirst({
			where: {
				userId,
				status,
			},
			include: {
				exercises: true,
			},
		});
		return workout;
	} catch (err: any) {
		return null;
	}
};
