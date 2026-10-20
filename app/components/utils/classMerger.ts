import { twMerge } from "tailwind-merge";

export const buildButtonClassName = (
	primaryClassName: string,
	overrideClassName?: string,
) => {
	return twMerge(primaryClassName, overrideClassName);
};
