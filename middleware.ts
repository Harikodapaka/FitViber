import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
	if (req.nextUrl.pathname === "/auth/login") {
		return null;
	}
	if (!req.auth) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}
});

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|images|icons|manifest).*)",
	],
};
