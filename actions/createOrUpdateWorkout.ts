"use server";

import { WorkoutSchemaType } from "@/components/forms/schemas/workoutSchema";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
	filterNonUpdatedWorkouts,
	isWorkoutUpdated,
	validateUserSession,
	validateWorkoutFields,
} from "@/actions/utils";
import { getWorkoutByIdWithExercises } from "@/data/workout";

export const createOrUpdateWorkout = async (
	data: WorkoutSchemaType,
	workoutId?: string
): Promise<{
	ok: boolean;
	message: string;
}> => {
	const session = await auth();
	const validation = validateWorkoutFields(data);
	if (!validation.ok) return validation;

	const userSessionValidation = validateUserSession(session);
	if (!userSessionValidation.ok) return userSessionValidation;

	if (workoutId) {
		try {
			await db.$transaction(async (tx) => {
				const workout = await getWorkoutByIdWithExercises(workoutId, tx);
				console.info(`Workout ${workout?.id} found, starting transaction.`);
				if (workout?.exercises.length) {
					const exercisesToDelete = workout?.exercises.filter(
						(e) => !data.exercises.some((exe) => exe.id === e.id)
					);
					if (exercisesToDelete.length) {
						const deleteIds = exercisesToDelete.map((e) => e.id || "");
						console.info(`Deleting ${deleteIds.length} exercises.`);
						await tx.exercise.deleteMany({
							where: {
								id: {
									in: deleteIds,
								},
							},
						});
					}
				}

				if (workout && isWorkoutUpdated(workout, data)) {
					console.info(`Updating workout`);
					await tx.workout.update({
						where: {
							id: workoutId,
						},
						data: {
							type: data.type,
							status: data.status,
						},
					});
				}
				const exercisesToBeUpdated = filterNonUpdatedWorkouts(
					data.exercises,
					workout?.exercises
				);
				console.info(`Updating ${exercisesToBeUpdated.length} exercises`);
				await Promise.all(
					exercisesToBeUpdated.map((exercise) => {
						// eslint-disable-next-line no-unused-vars
						const { id, ...exeDetails } = exercise;
						return db.exercise.upsert({
							where: { id: exercise.id || "65d264228b16cda5b1597599" },
							update: { ...exeDetails },
							create: { ...exeDetails, workoutId },
						});
					})
				);
			});
			revalidatePath("/workout");
			revalidatePath("/home");
			console.info(`Transaction completed`);
			return {
				ok: true,
				message: `Workout saved successfully`,
			};
		} catch (err: any) {
			console.error("createWorkout error:", err.message);
			return { message: err.message || "Saving workout failed", ok: false };
		}
	}
	return createWorkout(session, data);
};

const createWorkout = async (session: any, data: WorkoutSchemaType) => {
	try {
		console.info("Creating workout");
		await db.workout.create({
			data: {
				userId: session.user.id,
				type: data.type,
				status: WorkoutStatus.INPROGRESS,
				exercises: {
					// eslint-disable-next-line no-unused-vars
					create: data.exercises.map(({ id, ...exercise }) => exercise),
				},
			},
			select: {
				exercises: true,
			},
		});
		revalidatePath("/workout");
		revalidatePath("/home");
		return {
			ok: true,
			message: "Workout created successfully",
		};
	} catch (err: any) {
		console.error("createWorkout error:", err.message);
		return { message: err.message || "Saving workout failed", ok: false };
	}
};
