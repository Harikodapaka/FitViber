import LogoutForm from "@/components/forms/logoutForm";
import ProfileHeader from "./profileHeader";

interface ProfileLayoutProps {
	children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
	return (
		<div className="flex flex-col w-full md:max-w-lg">
			<ProfileHeader />
			{children}
			<div>
				<LogoutForm className="w-full" />
			</div>
		</div>
	);
};

export default ProfileLayout;
