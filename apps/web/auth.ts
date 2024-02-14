import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		// @ts-ignore
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
		maxAge: 1 * 24 * 60 * 60,
	},
	...authConfig,
});
