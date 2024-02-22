"use server";

import {
	WorkoutSchemaType,
	workoutSchema,
} from "@/components/forms/schemas/workoutSchema";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutStatus, WorkoutType } from "@prisma/client";
import { ObjectId } from "mongodb";

export const createOrUpdateWorkout = async (
	data: WorkoutSchemaType,
	workoutId?: string
) => {
	const session = await auth();
	const validatedFields = workoutSchema.safeParse(data);
	if (!validatedFields.success)
		return { ok: false, error: "Invalid workout details" };

	if (!session?.user?.id)
		return { ok: false, error: "User session is invalid" };
	if (workoutId) {
		try {
			const response = await db.$transaction(async (tx) => {
				await tx.workout.update({
					where: {
						id: workoutId,
					},
					data: {
						type: data.type,
						duration: data.duration,
						intensity: data.intensity,
						status: data.status,
					},
				});
				for (const exercise of data.exercises) {
					const { id, ...exeToUpdate } = exercise;
					await db.exercise.upsert({
						where: {
							id: exercise.id || "65d264228b16cda5b1597599",
						},
						update: { ...exeToUpdate },
						create: { ...exeToUpdate, workoutId },
					});
				}
			});
			const exercises = await db.exercise.findMany({
				where: {
					workoutId,
				},
			});
			return {
				ok: true,
				message: "Workout created successfully",
				exercises,
			};
		} catch (err: any) {
			return { error: err.message || "Saving Workout failed", ok: false };
		}
	}
	try {
		await db.workout.create({
			data: {
				userId: session.user.id,
				type: data.type,
				status: WorkoutStatus.INPROGRESS,
				exercises: {
					create: data.exercises.map((exercise) => ({
						...exercise,
					})),
				},
			},
		});
		return { ok: true, message: "Workout created successfully" };
	} catch (err: any) {
		return { error: err.message || "Saving Workout failed", ok: false };
	}
};
