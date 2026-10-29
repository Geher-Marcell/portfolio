import ButtonBase, { type AppButtonProps } from "./ButtonBase";
import { BUTTON_TRANSITION } from "./buttonConstants";

const PRIMARY_BUTTON_CLASSNAME = `inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${BUTTON_TRANSITION}
    bg-red-700 text-white shadow-lg
    hover:bg-red-600 hover:scale-[1.02] hover:shadow-xl
    active:bg-red-800 active:scale-[0.97]
    disabled:cursor-not-allowed disabled:opacity-60`;

const PrimaryButton = ({ className, ...props }: AppButtonProps) => {
	return (
		<ButtonBase
			defaultClassName={PRIMARY_BUTTON_CLASSNAME}
			className={className}
			{...props}
		/>
	);
};

export default PrimaryButton;
