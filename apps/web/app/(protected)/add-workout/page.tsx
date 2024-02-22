import { getWorkoutByUserIdStatus } from "@/actions/getWorkoutByUserIdStatus";
import { auth } from "@/auth";
import StartWorkoutForm from "@/components/forms/startWorkoutForm";

const AddWorkoutPage = async () => {
	const session = await auth();
	const workoutInProgress = await getWorkoutByUserIdStatus(session?.user?.id);
	return (
		<div>
			<StartWorkoutForm workoutInProgress={workoutInProgress} />
		</div>
	);
};

export default AddWorkoutPage;
