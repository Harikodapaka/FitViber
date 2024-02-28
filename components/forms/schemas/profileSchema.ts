import { Gender } from "@prisma/client";
import z from "zod";

export const profileSchema = z.object({
	age: z.coerce
		.number({
			required_error: "Age is required",
			invalid_type_error: "Age must be a number",
		})
		.gte(10, { message: "Minimum age must be grater than 10" })
		.lte(100, { message: "Maximum age must be less than 100" }),
	weight: z.coerce
		.number({
			required_error: "Weight is required",
			invalid_type_error: "Weight must be a number",
		})
		.gte(20, {
			message: "Minimum weight must be grater than 20",
		})
		.lte(300, { message: "Maximum weight must be less than 300" }),
	height: z.coerce
		.number({
			required_error: "Height is required",
			invalid_type_error: "Height must be a number",
		})
		.gte(100, {
			message: "Minimum height must be grater than 100",
		})
		.lte(500, { message: "Maximum height must be less than 500" }),
	gender: z.nativeEnum(Gender, {
		required_error: "Gender is required",
	}),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
