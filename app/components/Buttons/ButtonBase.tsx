import type { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { buildButtonClassName } from "../utils/classMerger";

export type AppButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"className" | "disabled" | "onClick"
> & {
	className?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

type ButtonBaseProps = AppButtonProps & {
	defaultClassName: string;
};

const ButtonBase = ({
	defaultClassName,
	className,
	type = "button",
	...props
}: ButtonBaseProps) => {
	return (
		<button
			type={type}
			className={buildButtonClassName(defaultClassName, className)}
			{...props}
		/>
	);
};

export default ButtonBase;
