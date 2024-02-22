"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/ui/button";
import Select from "@/components/ui/select";
import { WorkoutType } from "@prisma/client";
import { TbFidgetSpinner } from "react-icons/tb";
import {
	WorkoutSchemaType,
	workoutSchema,
} from "@/components/forms/schemas/workoutSchema";
import { createOrUpdateWorkout } from "@/actions/createOrUpdateWorkout";
import ExerciseForm from "@/components/forms/exerciseForm";

const StartWorkoutForm = ({
	workoutInProgress,
}: {
	workoutInProgress?: WorkoutSchemaType | null;
}) => {
	const methods = useForm<WorkoutSchemaType>({
		resolver: zodResolver(workoutSchema),
		mode: "onTouched",
		defaultValues: {
			type: workoutInProgress?.type || WorkoutType.CARDIO,
			exercises: workoutInProgress?.exercises || [],
		},
	});
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty, isValid },
		setValue,
	} = methods;
	const onSubmit = async (data: WorkoutSchemaType) => {
		const response = await createOrUpdateWorkout(data, workoutInProgress?.id);
		if (response.ok) {
			setValue("exercises", response.exercises || []);
		}
	};
	return (
		<FormProvider {...methods}>
			<form className="mt-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
				<div className="relative">
					<Select
						{...register("type", { required: true })}
						label="Workout Type"
						id="workout-type"
						options={[
							{
								value: WorkoutType.CARDIO,
								defaultChecked: true,
							},
							{
								value: WorkoutType.RESISTANCE,
							},
							{
								value: WorkoutType.OTHER,
							},
						]}
						placeholder="Select Workout Type"
						error={errors.type?.message}
						required
					/>
					<ExerciseForm />
				</div>
				<Button
					type="submit"
					disabled={!isDirty || !isValid || isSubmitting}
					className="mt-4 w-full"
				>
					{isSubmitting ? (
						<div role="status">
							<TbFidgetSpinner className="animate-spin" size={24} />
						</div>
					) : (
						"Update Workout"
					)}
				</Button>
			</form>
		</FormProvider>
	);
};

export default StartWorkoutForm;
