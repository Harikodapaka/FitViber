import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
	if (!req.auth) {
		return NextResponse.redirect(new URL("/api/auth/signin", req.url));
	}
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
