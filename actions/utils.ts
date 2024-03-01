import { ExerciseSchemaType } from "@/components/forms/schemas/exerciseSchema";
import {
	WorkoutSchemaType,
	workoutSchema,
} from "@/components/forms/schemas/workoutSchema";
import { WorkoutWithExercises } from "@/prisma/types";
import { Exercise } from "@prisma/client";

export const filterNonUpdatedWorkouts = (
	exerciseFormData: ExerciseSchemaType[],
	exerciseFromDB?: Exercise[]
) => {
	return exerciseFormData.filter(
		(e1) => !exerciseFromDB?.some((e2) => compareExercises(e1, e2))
	);
};

export const isWorkoutUpdated = (
	workoutDB: WorkoutWithExercises | null,
	workoutData: WorkoutSchemaType
) =>
	workoutDB?.status !== workoutData.status ||
	workoutDB?.type !== workoutData.type;

export const compareExercises = (
	e1: ExerciseSchemaType,
	e2: Exercise
): boolean => {
	return (
		e1.id === e2.id &&
		e1.name === e2.name &&
		e1.duration === e2.duration &&
		e1.calories === e2.calories &&
		e1.reps === e2.reps &&
		e1.sets === e2.sets &&
		e1.weight === e2.weight
	);
};

export const validateWorkoutFields = (data: WorkoutSchemaType) => {
	const validatedFields = workoutSchema.safeParse(data);
	return validatedFields.success
		? { ok: true, message: "" }
		: { ok: false, message: "Invalid workout details" };
};

export const validateUserSession = (session: any) => {
	return session?.user?.id
		? { ok: true, message: "" }
		: { ok: false, message: "User session is invalid" };
};
