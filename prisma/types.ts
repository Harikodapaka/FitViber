import { Prisma } from "@prisma/client";

export type WorkoutWithExercises = Prisma.WorkoutGetPayload<{
	include: { exercises: true };
}>;
