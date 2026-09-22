import ButtonBase, { type AppButtonProps } from "./ButtonBase";

const SECONDARY_BUTTON_CLASSNAME = `inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition
    border border-red-400/30 bg-red-500/10 text-white/90 
    hover:bg-red-500/20 
    active:bg-red-700 active:scale-[98%]
    disabled:cursor-not-allowed disabled:opacity-60`;

const SecondaryButton = ({ className, ...props }: AppButtonProps) => {
	return (
		<ButtonBase
			defaultClassName={SECONDARY_BUTTON_CLASSNAME}
			className={className}
			{...props}
		/>
	);
};

export default SecondaryButton;
