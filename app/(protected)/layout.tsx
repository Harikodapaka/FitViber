import React from "react";
import { Toaster } from "sonner";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="h-dvh flex flex-col bg-icedBlue-100">
			<Toaster richColors position="top-center" />
			<Header />
			<main className="flex flex-1 min-h-0">
				<div className="flex-1 overflow-auto p-2">{children}</div>
			</main>
			<Footer />
		</div>
	);
};

export default ProtectedLayout;
