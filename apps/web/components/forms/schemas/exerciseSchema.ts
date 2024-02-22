import z from "zod";

export const exerciseSchema = z.object({
	id: z.string().optional(),
	workoutId: z.string().optional(),
	name: z
		.string({
			required_error: "Name is required",
		})
		.min(3),
	reps: z.coerce
		.number({
			required_error: "Reps is required",
		})
		.nullable()
		.optional(),
	sets: z.coerce
		.number({
			required_error: "Sets is required",
		})
		.nullable()
		.optional(),
	weight: z.coerce
		.number({
			required_error: "Weight is required",
		})
		.nullable()
		.optional(),
	duration: z
		.string({
			required_error: "Duration is required",
		})
		.min(1)
		.nullable(),
});

export type ExerciseSchemaType = z.infer<typeof exerciseSchema>;
