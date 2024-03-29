"use server";

import { db } from "@/lib/db";
import { WorkoutStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const stopWorkout = async (
	workoutId?: string,
	duration?: number,
	caloriesBurned?: number
) => {
	try {
		if (!workoutId) return { ok: false, message: "Invalid request" };
		console.info(`Updating workout COMPLETE status: ${workoutId}`);
		await db.workout.update({
			where: {
				id: workoutId,
			},
			data: {
				status: WorkoutStatus.COMPLETED,
				duration,
				totalCalories: caloriesBurned,
			},
		});
		revalidatePath("/workout", "page");
		revalidatePath("/home", "page");
		return { ok: true, message: "Workout completed" };
	} catch (err: any) {
		console.error("stopWorkout error:", err.message);
		return { ok: false, message: "Something went wrong" };
	}
};
