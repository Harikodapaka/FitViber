"use server";

import { auth } from "@/auth";
import {
	ProfileSchemaType,
	profileSchema,
} from "@/components/forms/schemas/profileSchema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateProfile = async (data: ProfileSchemaType) => {
	const session = await auth();
	const validatedFields = profileSchema.safeParse(data);

	if (!validatedFields.success) return { error: "Invalid profile details" };

	if (!session?.user?.id) return { error: "User session is invalid" };
	try {
		await db.user.update({
			where: {
				id: session?.user?.id,
			},
			data: {
				...validatedFields.data,
			},
		});
		revalidatePath('/profile');
		return { ok: true, message: "Profile updated successfully" };
	} catch (err: any) {
		return { ok: false, message: err.message || "Failed to update profile" };
	}
};
