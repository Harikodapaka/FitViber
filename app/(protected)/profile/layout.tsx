import LogoutForm from "@/components/forms/logoutForm";
import ProfileHeader from "./profileHeader";

interface ProfileLayoutProps {
	children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
	return (
		<div className="h-full">
			<div className="flex flex-col gap-3">
				<ProfileHeader />
				{children}
				<div>
					<LogoutForm className="w-full text-center" />
				</div>
			</div>
		</div>
	);
};

export default ProfileLayout;
