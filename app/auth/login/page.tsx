import { Suspense } from "react";
import LoginForm from "@/components/forms/loginForm";
import Image from "next/image";
import ErrorText from "./errorText";

export default function LogIn() {
	return (
		<main className="relative flex h-dvh flex-col justify-center overflow-hidden py-6 sm:py-12 bg-icedBlue-100">
			<div className="relative bg-white px-6 pt-10 pb-8 m-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg rounded-lg sm:px-50 text-center md:min-w-96 flex flex-col items-center text-gray-600">
				<Image
					src="/images/logo.svg"
					alt="fit viber logo"
					width={200}
					height={200}
					priority
				/>
				<h1 className="pt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Welcome to FitViber
				</h1>
				<span>Your workout 🏋️‍♀️ wiz</span>
				<div className="py-5 flex flex-col gap-3">
					<Suspense>
						<ErrorText />
					</Suspense>
					<LoginForm />
				</div>
			</div>
		</main>
	);
}
