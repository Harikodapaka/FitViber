import { auth, signOut } from "@/auth";
import LogoutForm from "@/components/forms/logoutForm";
import Card from "@/components/ui/card";

export default async function Home() {
	const session = await auth();
	return (
		<main className="flex min-h-screen flex-col items-center gap-10 p-24">
			<h1>👋🏼 from Fit Viber</h1>
			<p>User Session : {JSON.stringify(session || {}) || "Not Found"}</p>
			<Card>
				<p>Hello How are you, This is card components</p>
			</Card>
			{session && <LogoutForm />}
		</main>
	);
}
