import { db } from "@/lib/db";

export const getExerciseNames = async () => {
	try {
		const exercises = await db.exercise.findMany({
			select: {
				name: true,
			},
		});
		const names = exercises.map((e) => e.name);
		return Array.from(new Set(names));
	} catch (err: any) {
		console.error("getExerciseNames error:", err.message);
		return [];
	}
};
