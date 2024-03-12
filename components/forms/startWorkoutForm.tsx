"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { WorkoutStatus, WorkoutType } from "@prisma/client";
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
import Button from "@/components/ui/button";
import { GiWeightLiftingUp, GiStopwatch } from "react-icons/gi";
import { stopWorkout as _stopWorkout } from "@/actions/stopWorkout";
import { useRouter } from "next/navigation";

const StartWorkoutForm = ({
	workoutInProgress,
}: {
	workoutInProgress?: WorkoutWithExercises | null;
}) => {
	const router = useRouter();

	useEffect(() => {
		reset({
			type: workoutInProgress?.type,
			status: workoutInProgress?.status,
			exercises: workoutInProgress?.exercises,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workoutInProgress]);

	const methods = useForm<WorkoutSchemaType>({
		resolver: zodResolver(workoutSchema),
		mode: "onTouched",
		defaultValues: {
			type: workoutInProgress?.type || WorkoutType.CARDIO,
			status: workoutInProgress?.status || WorkoutStatus.INPROGRESS,
			exercises: workoutInProgress?.exercises || [],
		},
	});
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty, isValid },
		reset,
		control,
		getValues,
	} = methods;
	const { fields, remove, append } = useFieldArray({
		name: "exercises",
		control,
		keyName: "key",
	});

	const onSubmit = async (data: WorkoutSchemaType) => {
		const response = await createOrUpdateWorkout(data, workoutInProgress?.id);
		if (response.ok) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	};

	const stopWorkout = async () => {
		const caloriesBurned = getValues("exercises").reduce(
			(sum, e) => (e.calories ? sum + e.calories : sum),
			0
		);
		const duration = getValues("exercises").reduce(
			(sum, e) => (e.duration ? sum + e.duration : sum),
			0
		);
		const response = await _stopWorkout(
			workoutInProgress?.id,
			Math.round(duration),
			caloriesBurned
		);
		if (response.ok) {
			toast.success(response.message);
			router.push("/home");
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
					<div className="flex">
						<Button
							onClick={() =>
								append({ id: "", duration: 0, name: "", calories: 0 })
							}
							className="my-3 mx-auto gap-3"
						>
							<GiWeightLiftingUp size={20} aria-hidden />
							<span>Add Exercise</span>
						</Button>
						{workoutInProgress?.id && (
							<Button
								type="button"
								onClick={stopWorkout}
								className="my-3 mx-auto bg-red-700 gap-3 hover:bg-red-600 focus:bg-red-600"
							>
								<GiStopwatch size={20} className="animate-bounce" aria-hidden />
								<span>Stop Workout</span>
							</Button>
						)}
					</div>
					<ExerciseForm fields={fields} remove={remove} />
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
