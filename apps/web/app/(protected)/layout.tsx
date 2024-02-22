import Header from "@/components/ui/header";
import { NavItems } from "@/components/navItems";
import Footer from "@/components/ui/footer";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div className="h-screen flex flex-col bg-icedBlue-100">
			<Header />
			<main className="flex-1 p-2 overflow-auto">
				<div className="mx-auto md:max-w-lg">{children}</div>
			</main>
			<Footer />
		</div>
	);
};

export default ProtectedLayout;
