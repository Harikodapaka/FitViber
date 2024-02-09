"use server";

import { signIn } from "@/auth";

export const logIn = async () => {
	await signIn("google", { redirectTo: "/" });
};
