import Header from "@/components/ui/header";
import { NavItems } from "@/components/navItems";
import Footer from "@/components/ui/footer";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<main className="h-screen flex flex-col bg-icedBlue-100">
			<Header />
			<div className="flex-1 flex justify-center overflow-auto p-2">
				{children}
			</div>
			<Footer />
		</main>
	);
};

export default ProtectedLayout;
