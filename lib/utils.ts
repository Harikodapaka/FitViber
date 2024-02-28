import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
