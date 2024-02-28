"use server";

import { db } from "@/lib/db";

export const deleteExerciseById = async (exerciseId?: string) => {
	try {
		if (!exerciseId) return { ok: false, message: "Invalid request" };
		await db.workout.delete({
			where: {
				id: exerciseId,
			},
		});
		return { ok: true, message: "Deleted exercise" };
	} catch (err: any) {
		console.error("getWorkoutsByUserId error:", err.message);
		return { ok: false, message: "Something went wrong" };
	}
};
