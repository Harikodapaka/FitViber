"use server";

import { auth } from "@/auth";
import {
	ProfileSchemaType,
	profileSchema,
} from "@/components/forms/schemas/profileSchema";
import { db } from "@/lib/db";

export const updateProfile = async (data: ProfileSchemaType) => {
	const session = await auth();
	const validatedFields = profileSchema.safeParse(data);

	if (!validatedFields.success) return { error: "Invalid profile details" };

	const { age, weight } = validatedFields.data;
	if (!session?.user?.id) return { error: "User session is invalid" };
	try {
		await db.user.update({
			where: {
				id: session?.user?.id,
			},
			data: {
				age: age,
				weight: weight,
			},
		});
		return { success: true, message: "Profile updated successfully" };
	} catch (err: any) {
		return { error: err.message || "Failed to update profile" };
	}
};
