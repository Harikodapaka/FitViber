"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { WorkoutType } from "@prisma/client";
import { WorkoutWithExercises } from "@/prisma/types";
import Select from "@/components/ui/select";
import ExerciseForm from "@/components/forms/exerciseForm";
import {
	WorkoutSchemaType,
	workoutSchema,
} from "@/components/forms/schemas/workoutSchema";
import { createOrUpdateWorkout } from "@/actions/createOrUpdateWorkout";
import { enumToOptions } from "@/lib/utils";
import { SubmitButton } from "@/components/submitButton";

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
						options={enumToOptions(WorkoutType, WorkoutType.CARDIO)}
						placeholder="Select Workout Type"
						error={errors.type?.message}
						required
					/>
					<ExerciseForm />
				</div>
				<SubmitButton
					disabled={!isDirty || !isValid || isSubmitting}
					submitting={isSubmitting}
				>
					{`${workoutInProgress ? "Update" : "Start"} Workout`}
				</SubmitButton>
			</form>
		</FormProvider>
	);
};

export default StartWorkoutForm;
