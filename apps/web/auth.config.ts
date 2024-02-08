import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextSecret = process.env.NEXTAUTH_SECRET;

export default {
	providers: [
		Google({
			clientId: googleClientId,
			clientSecret: googleClientSecret,
		}),
	],
	secret: nextSecret,
} satisfies NextAuthConfig;
