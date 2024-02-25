import LogoutForm from "@/components/forms/logoutForm";
import ProfileHeader from "./profileHeader";

interface ProfileLayoutProps {
	children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
	return (
		<div className="flex flex-col gap-3 h-full">
			<ProfileHeader />
			{children}
			<LogoutForm className="w-full text-center" />
		</div>
	);
};

export default ProfileLayout;
