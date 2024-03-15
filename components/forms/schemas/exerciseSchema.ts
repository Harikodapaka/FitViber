import z from "zod";

export const exerciseSchema = z.object({
	id: z.string().optional(),
	workoutId: z.string().optional(),
	name: z
		.string({
			required_error: "Name is required",
		})
		.min(3, { message: "Name requires 3 characters" })
		.transform((value) => value.trim()),
	reps: z.coerce.number().nullable().optional(),
	sets: z.coerce.number().nullable().optional(),
	weight: z.coerce.number().nullable().optional(),
	duration: z.coerce
		.number({
			required_error: "Duration is required",
		})
		.nonnegative({
			message: "Duration must be positive number",
		})
		.int({
			message: "Duration must be a number",
		})
		.gte(1, { message: "Duration is required" })
		.nullable(),
	calories: z.coerce
		.number({
			required_error: "Calories is required",
		})
		.nonnegative({
			message: "Calories must be positive number",
		})
		.int({
			message: "Calories must be a number",
		})
		.gte(1, { message: "Calories is required" })
		.nullable(),
});

export type ExerciseSchemaType = z.infer<typeof exerciseSchema>;
