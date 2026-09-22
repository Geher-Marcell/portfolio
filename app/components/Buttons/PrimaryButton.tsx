import ButtonBase, { type AppButtonProps } from "./ButtonBase";

const PRIMARY_BUTTON_CLASSNAME = `inline-flex cursor-pointer items-center justify-center rounded-xl  px-4 py-2 text-sm font-semibold transition 
    bg-gradient-to-tr from-red-700 via-red-600 to-red-800 text-white shadow-lg
    hover:from-red-600 hover:via-red-500 hover:to-red-700 
    active:from-red-800 active:via-red-700 active:to-red-900 active:scale-[98%]
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
