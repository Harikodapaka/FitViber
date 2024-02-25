import { auth } from "@/auth";
import ProfileForm from "@/components/forms/profileForm";
import { getUserById } from "@/data/user";

const ProfilePage = async () => {
	const session = await auth();
	const user = await getUserById(session?.user?.id);
	return <ProfileForm user={user} />;
};

export default ProfilePage;
