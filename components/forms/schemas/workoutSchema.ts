import z from "zod";
import { exerciseSchema } from "./exerciseSchema";
import { WorkoutStatus, WorkoutType } from "@prisma/client";

export const workoutSchema = z.object({
	id: z.string().optional(),
	workoutId: z.string().optional(),
	type: z.nativeEnum(WorkoutType, {
		required_error: "Type is required",
		invalid_type_error: "Type must be a number",
	}),
	duration: z.string().nullable().optional(),
	intensity: z.string().nullable().optional(),
	status: z.nativeEnum(WorkoutStatus).optional(),
	exercises: z.array(exerciseSchema),
});

export type WorkoutSchemaType = z.infer<typeof workoutSchema>;
