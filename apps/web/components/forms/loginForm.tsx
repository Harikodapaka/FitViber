import { logIn } from "@/actions/login";
import Image from "next/image";

function GoogleButton() {
	return (
		<button
			aria-label="Sign in with Google"
			className="flex items-center gap-3 bg-google-button-blue rounded-md p-0.5 pr-3 transition-colors duration-300 hover:bg-google-button-blue-hover"
			type="submit"
		>
			<div className="flex items-center justify-center bg-white w-9 h-9 rounded">
				<Image
					src="/images/google.svg"
					alt="Google logo"
					width={24}
					height={24}
				/>
			</div>
			<span className="text-sm text-white tracking-wider">
				Sign in with Google
			</span>
		</button>
	);
}

export default function LoginForm() {
	return (
		<form action={logIn}>
			<div className="px-6 sm:px-0 max-w-sm">
				<GoogleButton />
			</div>
		</form>
	);
}
