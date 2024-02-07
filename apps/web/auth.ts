import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextSecret = process.env.NEXTAUTH_SECRET;

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		Google({
			clientId: googleClientId,
			clientSecret: googleClientSecret,
		}),
	],
	secret: nextSecret,
});
