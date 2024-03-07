import { getWorkoutsByUserId } from "@/actions/getWorkoutsByUserId";
import { auth } from "@/auth";
import CollapsibleCard from "@/components/ui/collapsible-card";
import { WorkoutCardBody } from "@/components/workoutCardBody";
import { WorkoutCardHeader } from "@/components/workoutCardHeader";

const HomePage = async () => {
	const session = await auth();
	const workouts = await getWorkoutsByUserId(session?.user?.id);
	return (
		<div className="flex flex-col">
			<h1>Workout Summary</h1>
			{workouts.length ? (
				workouts?.map((workout) => (
					<CollapsibleCard
						key={workout.id}
						className="my-2 text-sm"
						header={<WorkoutCardHeader workout={workout} />}
					>
						<hr className="my-2" />
						<p className="text-lg text-center">Exercises</p>
						{/* <hr className="my-2" /> */}
						<WorkoutCardBody exercises={workout.exercises} />
					</CollapsibleCard>
				))
			) : (
				<p>No Workouts found</p>
			)}
		</div>
	);
};

export default HomePage;
