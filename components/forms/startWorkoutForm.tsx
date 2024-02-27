"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { WorkoutType } from "@prisma/client";
import { WorkoutWithExercises } from "@/prisma/types";
import Button from "@/components/ui/button";
import Select from "@/components/ui/select";
import ExerciseForm from "@/components/forms/exerciseForm";
import {
	WorkoutSchemaType,
	workoutSchema,
} from "@/components/forms/schemas/workoutSchema";
import { createOrUpdateWorkout } from "@/actions/createOrUpdateWorkout";
import { TbFidgetSpinner } from "react-icons/tb";

const StartWorkoutForm = ({
	workoutInProgress,
}: {
	workoutInProgress?: WorkoutWithExercises | null;
}) => {
	const methods = useForm<WorkoutSchemaType>({
		resolver: zodResolver(workoutSchema),
		mode: "onTouched",
		defaultValues: {
			type: workoutInProgress?.type || WorkoutType.CARDIO,
			exercises: workoutInProgress?.exercises,
		},
	});
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = methods;
	const onSubmit = async (data: WorkoutSchemaType) => {
		const response = await createOrUpdateWorkout(data, workoutInProgress?.id);
		if (response.ok) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
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
				<p>{isValid}</p>
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
						`${workoutInProgress ? "Update": "Start"} Workout`
					)}
				</Button>
			</form>
		</FormProvider>
	);
};

export default StartWorkoutForm;
