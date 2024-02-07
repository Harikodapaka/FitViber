import { auth, signOut } from "@/auth";

export default async function Home() {
	const session = await auth();
	return (
		<main className="flex min-h-screen flex-col items-center gap-10 p-24">
			<h1>👋🏼 from Fit Viber</h1>
			<p>User Session : {JSON.stringify(session || {}) || "Not Found"}</p>
			{session && <SignOut />}
		</main>
	);
}

function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<button type="submit">Sign Out</button>
		</form>
	);
}
