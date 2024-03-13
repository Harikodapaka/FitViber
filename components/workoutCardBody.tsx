import React from "react";
import { Exercise } from "@prisma/client";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { FaDumbbell } from "react-icons/fa6";

export const WorkoutCardBody = ({ exercises }: { exercises: Exercise[] }) => {
	return exercises.map((e) => (
		<Card key={e.id} className="flex gap-3 my-2 ring-primary-blue-200/8">
			<div className="flex w-10 h-10 rounded-full bg-primary-blue-200 items-center justify-center self-center shrink-0 shadow-[0_0_0_4px_rgba(34,139,232,0.3)]">
				<FaDumbbell size={20} color="white" />
			</div>

			<div className="flex flex-col items-start">
				<p className="text-2xl font-bold ml-1">{e.name}</p>
				<div>
					<Badge>⏱️ Duration: {e.duration} Mins</Badge>
					<Badge>🔥 Calories: {e.calories}</Badge>
					{e.sets && <Badge>💪 Sets: {e.sets}</Badge>}
					{e.reps && <Badge>🔄 Reps: {e.reps}</Badge>}
					{!!e.weight && <Badge>🏋️‍♂️ Weight: {e.weight} lbs</Badge>}
				</div>
			</div>
		</Card>
	));
};
