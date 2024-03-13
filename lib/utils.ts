import { WorkoutStatus, WorkoutType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const CALORIES_GOAL = 550;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const enumToOptions = (
	enumObject: Record<string, string>,
	defaultProp: string
): {
	value: string;
	defaultChecked: boolean;
}[] =>
	Object.values(enumObject).map((value) => ({
		value: value,
		defaultChecked: defaultProp === value,
	}));

export const capitalizeFirstLetter = (str: string) => {
	if (typeof str !== "string" || str.length === 0) {
		return str;
	}

	return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

export const hasValue = (input?: number | string | null) =>
	!!input && input !== null;

export const getStatusIcon = (status: WorkoutStatus) =>
	status === WorkoutStatus.COMPLETED ? "🟢" : "⏳";

export const getWorkoutIcon = (type: WorkoutType) => {
	if (type === WorkoutType.CARDIO) return "🫀";
	if (type === WorkoutType.RESISTANCE) return "💪";
	return `🫀 + 💪`;
};
export const calculateGoalPercentage = (calories?: number) => {
	if (calories) {
		return Math.round((calories / CALORIES_GOAL) * 100);
	}
	return 0;
};
