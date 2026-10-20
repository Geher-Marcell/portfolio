"use client";
import type { ReactNode } from "react";
import { buildButtonClassName } from "../utils/classMerger";

export const TextAreaComponent = (props: {
	label?: string;
	name?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	absoluteChildren?: ReactNode;
	rows?: number;
	textAreaClassName?: string;
	labelClassName?: string;
	maxLength?: number;
	autoComplete?: string;
	ignorePasswordManager?: boolean;
}) => {
	const {
		label,
		name,
		value,
		placeholder,
		onChange,
		absoluteChildren,
		rows = 2,
		maxLength,
		autoComplete,
		ignorePasswordManager,
	} = props;

	const labelClass = "text-sm font-semibold text-white/70";
	const textAreaClass =
		"w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/20";

	return (
		<div>
			<div className="flex items-center justify-between px-3">
				{label && (
					<label
						htmlFor={label}
						className={buildButtonClassName(labelClass, props.labelClassName)}>
						{label}
					</label>
				)}
				{maxLength && (
					<p className="text-xs text-gray-500">
						{value.length}/{maxLength}
					</p>
				)}
			</div>
			<div className={`${absoluteChildren ? "relative" : "block"}`}>
				<textarea
					name={name ?? label}
					placeholder={placeholder}
					value={value || undefined}
					onChange={onChange}
					rows={rows}
					maxLength={maxLength}
					autoComplete={
						autoComplete ?? (ignorePasswordManager ? "off" : undefined)
					}
					className={buildButtonClassName(
						textAreaClass,
						props.textAreaClassName,
					)}
					data-bwignore={ignorePasswordManager ? "true" : undefined}
					data-lpignore={ignorePasswordManager ? "true" : undefined}
					data-1p-ignore={ignorePasswordManager ? "true" : undefined}
				/>
				{absoluteChildren}
			</div>
		</div>
	);
};
