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
			<main className="flex-1 p-2 overflow-auto">
				<div className="mx-auto md:max-w-lg">{children}</div>
			</main>
			<Footer />
		</div>
	);
};

export default ProtectedLayout;
