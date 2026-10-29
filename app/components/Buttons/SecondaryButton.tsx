import ButtonBase, { type AppButtonProps } from "./ButtonBase";
import { BUTTON_TRANSITION } from "./buttonConstants";

const SECONDARY_BUTTON_CLASSNAME = `inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${BUTTON_TRANSITION}
    border border-red-400/30 bg-red-500/10 text-white/90 
    hover:bg-red-500/20 hover:scale-[1.02] hover:shadow-md
    active:bg-red-700/30 active:scale-[0.97]
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
