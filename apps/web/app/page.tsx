import { redirect } from "next/navigation";

export default async function LandingPage() {
	redirect("/home");
}
