import { auth } from "@/auth";

function getInitials(word?: string | null) {
	if (!word) return;
	const words = word.split(" ");
	const initialsArray = words.map((w) => w.charAt(0).toUpperCase());
	const initials = initialsArray.join("");
	return initials;
}

const ProfileHeader = async () => {
	const session = await auth();
	const initials = getInitials(session?.user?.name);
	return (
		<div className="h-44 bg-slate-600 mb-1 p-2 flex items-center gap-4 rounded-lg">
			<div className="w-28 h-28 rounded-full bg-teal-600 text-white flex justify-center items-center shrink-0">
				<p className="font-bold font-sans text-5xl">{initials}</p>
			</div>
			<div className="text-white break-words overflow-hidden">
				<p>{session?.user?.name}</p>
				<p>{session?.user?.email}</p>
			</div>
		</div>
	);
};

export default ProfileHeader;
