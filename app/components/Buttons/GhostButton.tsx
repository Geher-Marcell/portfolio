import ButtonBase, { type AppButtonProps } from "./ButtonBase";
import { BUTTON_TRANSITION_COLORS } from "./buttonConstants";

const GHOST_BUTTON_CLASSNAME =
	`inline-flex cursor-pointer items-center justify-center bg-transparent text-sm font-semibold text-white/85 ${BUTTON_TRANSITION_COLORS} hover:text-red-400 hover:scale-[1.02] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60`;

const GhostButton = ({ className, ...props }: AppButtonProps) => {
	return (
		<ButtonBase
			defaultClassName={GHOST_BUTTON_CLASSNAME}
			className={className}
			{...props}
		/>
	);
};

export default GhostButton;
