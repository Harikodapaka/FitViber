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
import { AiOutlinePlus } from "react-icons/ai";
import { VscDebugStart } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { stopWorkout as _stopWorkout } from "@/actions/stopWorkout";
import { useRouter } from "next/navigation";

const StartWorkoutForm = ({
	workoutInProgress,
	exerciseNames,
}: {
	workoutInProgress?: WorkoutWithExercises | null;
	exerciseNames: string[];
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
			<form method="POST" onSubmit={handleSubmit(onSubmit)}>
				<div className="relative pb-14">
					<Select
						{...register("type", { required: true })}
						label="Workout Type"
						id="workout-type"
						options={enumToOptions(WorkoutType, WorkoutType.CARDIO)}
						placeholder="Select Workout Type"
						error={errors.type?.message}
						required
					/>
					<ExerciseForm
						fields={fields}
						remove={remove}
						exerciseNames={exerciseNames}
					/>
				</div>
				<div className="flex w-full absolute bottom-[55px] left-0 justify-around bg-white rounded-t-xl z-20 border border-zinc-200 border-b-0">
					<Button
						onClick={() =>
							append({ id: "", duration: 0, name: "", calories: 0 })
						}
						className="my-3 gap-3"
					>
						<AiOutlinePlus size={20} aria-hidden /> Add
					</Button>
					{workoutInProgress?.id && (
						<Button
							type="button"
							onClick={stopWorkout}
							className="my-3 bg-red-700 gap-3 hover:bg-red-600 focus:bg-red-600"
						>
							<AiOutlineClose size={20} aria-hidden /> Stop
						</Button>
					)}

					<SubmitButton
						disabled={!isDirty || !isValid || isSubmitting}
						submitting={isSubmitting}
						className="my-3 gap-3 min-w-24"
					>
						{workoutInProgress ? <FaCheck /> : <VscDebugStart />}
						{workoutInProgress ? "Update" : "Start"}
					</SubmitButton>
				</div>
			</form>
		</FormProvider>
	);
};

export default StartWorkoutForm;
