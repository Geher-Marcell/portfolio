import DynamicFAIcon from "./DynamicFaIcon";

const Badge: React.FC<{
	text: string;
	icon?: string;
	absolute?: boolean;

	color?: string;
}> = ({ text, icon, absolute = false, color }) => {
	return (
		<>
			<div
				className="bg-(--background-muted) rounded-lg w-fit"
				style={{
					position: absolute ? "absolute" : "relative",
					right: absolute ? "0rem" : "unset",
					top: absolute ? "0rem" : "unset",
					margin: absolute ? "0.5rem" : "unset",

					border: color ? `1px solid ${color}` : "none",
				}}
			>
				<p className="text-center text-sm px-2 py-1">
					{icon && (
						<DynamicFAIcon exportName={icon} className="mr-1" size="sm" />
					)}
					{text}
				</p>
			</div>
		</>
	);
};

export default Badge;
