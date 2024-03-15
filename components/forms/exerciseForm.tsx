import {
	Controller,
	FieldArrayWithId,
	UseFieldArrayRemove,
	useFormContext,
} from "react-hook-form";
import { WorkoutType } from "@prisma/client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Card from "@/components/ui/card";
import { WorkoutSchemaType } from "@/components/forms/schemas/workoutSchema";
import Autocomplete from "@/components/ui/autoComplete";
import { MdDelete } from "react-icons/md";

export default function ExerciseForm({
	fields,
	remove,
	exerciseNames,
}: {
	remove: UseFieldArrayRemove;
	fields: FieldArrayWithId<WorkoutSchemaType, "exercises", "key">[];
	exerciseNames: string[];
}) {
	const {
		register,
		watch,
		control,
		formState: { errors },
	} = useFormContext<WorkoutSchemaType>();

	const workoutType = watch("type");

	return (
		<>
			{fields.map((exercise, i) => (
				<Card key={exercise.name + i} className="my-2">
					<div className="flex justify-end absolute top-2 right-4 z-10">
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
					<Controller
						control={control}
						name={`exercises.${i}.name`}
						render={({
							field: { onChange, value, onBlur, ref, disabled, name },
						}) => (
							<Autocomplete
								suggestions={exerciseNames}
								id={`exercise-name-${i}`}
								label="Exercise Name"
								error={errors.exercises?.[i]?.name?.message}
								required
								onBlur={onBlur}
								value={value}
								disabled={disabled}
								onChange={onChange}
								name={name}
								ref={ref}
							/>
						)}
					/>
					<div className="flex flex-col xs:flex-row xs:items-start xs:gap-3">
						<Controller
							control={control}
							name={`exercises.${i}.duration`}
							render={({ field }) => (
								<Input
									id={`exercise-duration-${i}`}
									type="number"
									label="Exercise Duration"
									error={errors.exercises?.[i]?.duration?.message}
									addOnText="Mins"
									className="pr-10"
									containerClasses="flex-grow"
									required
									{...field}
									value={field.value || ""}
								/>
							)}
						/>
						<Controller
							control={control}
							name={`exercises.${i}.calories`}
							render={({ field }) => (
								<Input
									id={`exercise-calories-${i}`}
									type="number"
									label="Calories Burned"
									containerClasses="flex-grow"
									error={errors.exercises?.[i]?.calories?.message}
									required
									{...field}
									value={field.value || ""}
								/>
							)}
						/>
					</div>
					{workoutType !== WorkoutType.CARDIO && (
						<div className="flex flex-col xs:flex-row xs:items-center xs:gap-3">
							<div className="flex items-center gap-3 basis-1/2">
								<Select
									{...register(`exercises.${i}.sets`)}
									label="Sets"
									id={`exercise-sets-${i}`}
									options={Array.from({ length: 10 }, (x, i) => ({
										value: (i + 1).toString(),
									}))}
									placeholder="Select Exercise Sets"
									error={errors.exercises?.[i]?.sets?.message}
									containerClasses="grow"
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
									containerClasses="grow"
								/>
							</div>
							<Input
								id={`exercise-reps-${i}`}
								label="Weight"
								placeholder="Weight in lb"
								className="pr-10"
								addOnText="lb"
								containerClasses="flex-grow"
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
