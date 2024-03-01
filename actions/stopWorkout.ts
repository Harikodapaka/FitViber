"use server";

import { db } from "@/lib/db";
import { WorkoutStatus } from "@prisma/client";

export const stopWorkout = async (workoutId?: string) => {
	try {
		if (!workoutId) return { ok: false, message: "Invalid request" };
		console.info(`Updating workout COMPLETE status: ${workoutId}`);
		await db.workout.update({
			where: {
				id: workoutId,
			},
			data: {
				status: WorkoutStatus.COMPLETED,
			},
		});
		return { ok: true, message: "Workout completed" };
	} catch (err: any) {
		console.error("stopWorkout error:", err.message);
		return { ok: false, message: "Something went wrong" };
	}
};
