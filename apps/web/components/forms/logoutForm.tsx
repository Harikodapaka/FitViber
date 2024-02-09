import { logOut } from "@/actions/logout";
import Button from "@/components/ui/button";

export default function LogoutForm() {
	return (
		<form action={logOut}>
			<Button
				type="submit"
				// className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Sign Out
			</Button>
		</form>
	);
}
