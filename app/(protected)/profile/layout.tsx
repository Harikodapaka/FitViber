import React from "react";
import LogoutForm from "@/components/forms/logoutForm";
import ProfileHeader from "@/app/(protected)/profile/profileHeader";

interface ProfileLayoutProps {
	children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
	return (
		<div className="container flex flex-col gap-3 h-full">
			<ProfileHeader />
			{children}
			<LogoutForm className="w-full text-center" />
		</div>
	);
};

export default ProfileLayout;
