"use server";

import { db } from "@/lib/db";

export const getWorkoutsByUserId = async (userId?: string) => {
	try {
		if (!userId) return [];
		const workouts = await db.workout.findMany({
			where: {
				userId,
			},
			include:{
				exercises: true,
			}
		});
		return workouts;
	} catch (err: any) {
		return [];
	}
};
