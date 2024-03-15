import { getWorkoutsByUserId } from "@/actions/getWorkoutsByUserId";
import { auth } from "@/auth";
import CollapsibleCard from "@/components/ui/collapsibleCard";
import { WorkoutCardBody } from "@/components/workoutCardBody";
import { WorkoutCardHeader } from "@/components/workoutCardHeader";

const HomePage = async () => {
	const session = await auth();
	const workouts = await getWorkoutsByUserId(session?.user?.id);
	return (
		<div className="flex flex-col">
			<h1 className="text-lg font-bold">Workout Summary</h1>
			{workouts.length ? (
				workouts?.map((workout) => (
					<CollapsibleCard
						key={workout.id}
						id={`workout-${workout.id}`}
						className="my-2 text-sm rounded-2xl"
						header={<WorkoutCardHeader workout={workout} />}
					>
						<hr className="my-2 h-0.5 text-gray-400 bg-gray-400" />
						<p className="text-lg text-center font-bold">Exercises</p>
						<WorkoutCardBody exercises={workout.exercises} />
					</CollapsibleCard>
				))
			) : (
				<p className="text-base">No Workouts found</p>
			)}
		</div>
	);
};

export default HomePage;
