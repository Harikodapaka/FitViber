import { db } from "@/lib/db";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getWorkoutById = async (
	id: string,
	$transaction: Omit<
		PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
		"$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
	>
) => {
	try {
		let workout = null;
		if ($transaction) {
			workout = await $transaction.workout.findUnique({ where: { id } });
		}
		workout = await db.workout.findUnique({ where: { id } });

		return workout;
	} catch {
		return null;
	}
};

export const getWorkoutByIdWithExercises = async (
	id: string,
	$transaction: Omit<
		PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
		"$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
	>
) => {
	try {
		let workout = null;
		if ($transaction) {
			workout = await $transaction.workout.findUnique({
				where: { id },
				include: {
					exercises: true,
				},
			});
		}
		workout = await db.workout.findUnique({
			where: { id },
			include: {
				exercises: true,
			},
		});

		return workout;
	} catch {
		return null;
	}
};
