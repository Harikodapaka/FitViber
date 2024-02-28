import { getWorkoutsByUserId } from "@/actions/getWorkoutsByUserId";
import { auth } from "@/auth";
import Card from "@/components/ui/card";

const HomePage = async () => {
	const session = await auth();
	const workouts = await getWorkoutsByUserId(session?.user?.id);
	return (
		<div className="flex flex-col">
			<h1>Workout Summary</h1>
			{workouts.length ? (
				workouts?.map((workout) => (
					<Card key={workout.id} className="my-2 text-sm">
						<p>Workout State: {workout.status}</p>
						<p>Workout Type: {workout.type}</p>
						<hr className="my-2" />
						<p className="text-lg text-center">Exercises</p>
						<hr className="my-2" />
						{workout.exercises.map((e) => (
							<div key={e.id}>
								<p>Name: {e.name}</p>
								<p>Calories Burned: {e.calories}</p>
								{e.sets && (
									<p>
										Sets: {e.sets} | Reps: {e.reps}
									</p>
								)}
								<hr className="my-2" />
							</div>
						))}
					</Card>
				))
			) : (
				<p>No Workouts found</p>
			)}
		</div>
	);
};

export default HomePage;
