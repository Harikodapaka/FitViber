import { getWorkoutsByUserId } from "@/actions/getWorkoutsByUserId";
import { auth } from "@/auth";
import Card from "@/components/ui/card";

const HomePage = async () => {
	const session = await auth();
	const workouts = await getWorkoutsByUserId(session?.user?.id);
	return (
		<div className="flex flex-col h-full">
			<h1>Workout Summary</h1>
			{workouts?.map((workout) => (
				<Card key={workout.id} className="my-2">
					<p>Workout State: {workout.status}</p>
					<p>Workout Duration: {workout.duration}</p>
					<p>Workout Type: {workout.type}</p>
				</Card>
			))}
		</div>
	);
};

export default HomePage;
