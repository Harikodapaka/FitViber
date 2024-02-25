"use server";

import {
	WorkoutSchemaType,
	workoutSchema,
} from "@/components/forms/schemas/workoutSchema";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
				const exercises = await tx.exercise.findMany({
					where: { workoutId },
					select: { id: true },
				});
				if (exercises.length) {
					const exercisesToDelete = exercises.filter(
						(e) => !data.exercises.some((exe) => exe.id === e.id)
					);
					if (exercisesToDelete.length) {
						const deleteIds = exercisesToDelete.map((e) => e.id || "");
						await tx.exercise.deleteMany({
							where: {
								id: {
									in: deleteIds,
								},
							},
						});
					}
				}

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
			revalidatePath("/workout");
			const exercises = await db.exercise.findMany({
				where: {
					workoutId,
				},
			});
			return {
				ok: true,
				message: `Workout saved successfully`,
				exercises,
			};
		} catch (err: any) {
			return { message: err.message || "Saving workout failed", ok: false };
		}
	}
	try {
		await db.workout.create({
			data: {
				userId: session.user.id,
				type: data.type,
				status: WorkoutStatus.INPROGRESS,
				exercises: {
					create: data.exercises.map(({ id, ...exercise }) => exercise),
				},
			},
		});
		return {
			ok: true,
			message: "Workout created successfully",
			exercises: data.exercises,
		};
	} catch (err: any) {
		return { message: err.message || "Saving workout failed", ok: false };
	}
};
