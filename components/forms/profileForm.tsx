"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	ProfileSchemaType,
	profileSchema,
} from "@/components/forms/schemas/profileSchema";
import { updateProfile } from "@/actions/updateProfile";
import Input from "@/components/ui/input";
import { Gender, User } from "@prisma/client";
import Select from "@/components/ui/select";
import { enumToOptions } from "@/lib/utils";
import { SubmitButton } from "@/components/submitButton";

const ProfileForm = ({ user }: { user: User | null }) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<ProfileSchemaType>({
		resolver: zodResolver(profileSchema),
		mode: "onTouched",
		defaultValues: {
			age: user?.age || undefined,
			weight: user?.weight || undefined,
			height: user?.height || undefined,
			gender: user?.gender || undefined,
		},
	});

	const onSubmit = async (data: ProfileSchemaType) => {
		const response = await updateProfile(data);
		if (response.ok) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	};
	return (
		<form
			className="mt-3 flex-1 overflow-auto"
			method="POST"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="relative">
				<Input
					{...register("age")}
					label="Age"
					id="age"
					type="number"
					placeholder="Enter Age"
					className="appearance-none m-0"
					error={errors.age?.message}
					required
				/>
			</div>
			<div className="relative mt-1">
				<Input
					{...register("weight")}
					id="weight"
					label="Weight"
					type="number"
					placeholder="Weight in lb"
					addOnText="lb"
					error={errors.weight?.message}
					required
				/>
			</div>
			<div className="relative mt-1">
				<Input
					{...register("height")}
					id="height"
					label="Height"
					type="text"
					placeholder="Height in cm"
					addOnText="cm"
					error={errors.height?.message}
					required
				/>
			</div>
			<div className="relative mt-1">
				<Select
					{...register("gender")}
					id="gender"
					label="Gender"
					options={enumToOptions(Gender, Gender.MALE)}
					error={errors.gender?.message}
					required
				/>
			</div>
			<SubmitButton
				disabled={!isDirty || !isValid || isSubmitting}
				submitting={isSubmitting}
			>
				Update Profile
			</SubmitButton>
		</form>
	);
};

export default ProfileForm;
