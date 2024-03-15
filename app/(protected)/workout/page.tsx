import { getWorkoutByUserIdStatus } from "@/actions/getWorkoutByUserIdStatus";
import { auth } from "@/auth";
import StartWorkoutForm from "@/components/forms/startWorkoutForm";
import { getExerciseNames } from "@/data/exercise";

const AddWorkoutPage = async () => {
	const session = await auth();
	const workoutInProgress = await getWorkoutByUserIdStatus(session?.user?.id);
	const exerciseNames = await getExerciseNames();

	return (
		<StartWorkoutForm
			workoutInProgress={workoutInProgress}
			exerciseNames={exerciseNames}
		/>
	);
};

export default AddWorkoutPage;
