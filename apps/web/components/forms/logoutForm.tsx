import { logOut } from "@/actions/logout";
import Button from "@/components/ui/button";

export default function LogoutForm({ className }: { className?: string }) {
	return (
		<form action={logOut}>
			<Button type="submit" className={className}>
				Sign Out
			</Button>
		</form>
	);
}
