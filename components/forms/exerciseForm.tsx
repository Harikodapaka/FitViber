import { useFieldArray, useFormContext } from "react-hook-form";
import { WorkoutType } from "@prisma/client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Card from "@/components/ui/card";
import { WorkoutSchemaType } from "@/components/forms/schemas/workoutSchema";
import { MdDelete } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";

export default function ExerciseForm() {
	const {
		register,
		control,
		watch,
		formState: { errors },
	} = useFormContext<WorkoutSchemaType>();
	const { fields, append, remove } = useFieldArray({
		name: "exercises",
		control,
	});
	const workoutType = watch("type");

	return (
		<>
			<Button
				onClick={() => append({ id: "", duration: "", name: "" })}
				className="my-3 mx-auto gap-3"
			>
				<GiWeightLiftingUp size={20} />
				<span>Add Exercise</span>
			</Button>
			{fields.map((exercise, i) => (
				<Card key={exercise.name + i} className="my-2">
					<div className="flex justify-end absolute top-2 right-4">
						<Button
							className="p-2.5"
							onClick={() => {
								remove(i);
							}}
						>
							<MdDelete size={16} />
							<span className="sr-only">Delete Exercise {exercise.name}</span>
						</Button>
					</div>
												<Input
								id={`exercise-name-${i}`}
								label="Exercise Name"
																error={errors.exercises?.[i]?.name?.message}
								required
							{...register(`exercises.${i}.name`, { required: true })}
					/>
					<Input
						id={`exercise-duration-${i}`}
						label="Exercise Duration"
						error={errors.exercises?.[i]?.duration?.message}
						addOnText="Mins"
						required
						{...register(`exercises.${i}.duration`, { required: true })}
					/>
					{workoutType !== WorkoutType.CARDIO && (
						<div className="flex justify-between">
							<Select
								{...register(`exercises.${i}.sets`)}
								label="Sets"
								id={`exercise-sets-${i}`}
								options={Array.from({ length: 10 }, (x, i) => ({
									value: (i + 1).toString(),
								}))}
								placeholder="Select Exercise Sets"
								error={errors.exercises?.[i]?.sets?.message}
							/>
							<Select
								{...register(`exercises.${i}.reps`)}
								label="Reps"
								id={`exercise-reps-${i}`}
								options={Array.from({ length: 20 }, (x, i) => ({
									value: (i + 1).toString(),
								}))}
								placeholder="Select Exercise Reps"
								error={errors.exercises?.[i]?.reps?.message}
							/>
							<Input
								id={`exercise-reps-${i}`}
								label="Weight"
								placeholder="Weight in Lbs"
								addOnText="Lbs"
								error={errors.exercises?.[i]?.weight?.message}
								{...register(`exercises.${i}.weight`)}
							/>
						</div>
					)}
				</Card>
			))}
		</>
	);
}
