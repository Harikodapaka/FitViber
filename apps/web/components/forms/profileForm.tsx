"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import {
	ProfileSchemaType,
	profileSchema,
} from "@/components/forms/schemas/profileSchema";
import { updateProfile } from "@/actions/updateProfile";
import Button from "../ui/button";
import Input from "../ui/input";
import { User } from "@prisma/client";
import { TbFidgetSpinner } from "react-icons/tb";

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
		},
	});

	const onSubmit = async (data: ProfileSchemaType) => {
		await updateProfile(data)
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<form className="mt-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
			<div className="relative">
				<Input
					{...register("age", { required: true })}
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
					{...register("weight", { required: true })}
					id="weight"
					label="Weight"
					type="number"
					placeholder="Weight in KGs"
					error={errors.weight?.message}
					required
				/>
			</div>
			<Button
				type="submit"
				disabled={!isDirty || !isValid || isSubmitting}
				className="disabled:bg-gray-500 disabled:opacity-70 mt-4 w-full flex justify-center"
			>
				{isSubmitting ? (
					<div role="status">
						<TbFidgetSpinner className="animate-spin" size={24} />
					</div>
				) : (
					"Update Profile"
				)}
			</Button>
		</form>
	);
};

export default ProfileForm;
