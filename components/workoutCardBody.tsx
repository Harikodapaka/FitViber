import React from "react";
import { Exercise } from "@prisma/client";
import Card from "./ui/card";
import { FaDumbbell } from "react-icons/fa6";

export const WorkoutCardBody = ({ exercises }: { exercises: Exercise[] }) => {
	return exercises.map((e) => (
		<Card key={e.id} className="flex gap-3 my-2 bg-zinc-50">
			<div className="flex w-10 h-10 rounded-full bg-primary-blue-200 items-center justify-center self-center">
				<FaDumbbell size={20} color="white" />
			</div>
			<div>
				<p>Name: {e.name}</p>
				<p>Duration: {e.duration} Mins</p>
				<p>Calories Burned: {e.calories}</p>
				{e.sets && (
					<p>
						Sets: {e.sets} | Reps: {e.reps}
					</p>
				)}
				{e.weight && <p>Weight: {e.weight}</p>}
			</div>
		</Card>
	));
};
