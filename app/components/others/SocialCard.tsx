import { Card } from "../common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SocialCardProps {
	href: string;
	icon: IconDefinition;
	title: string;
	description: string;
}

export const SocialCard = (props: SocialCardProps) => {
	return (
		<>
			<Link
				href={props.href}
				target="_blank"
				rel="me noopener noreferrer"
				className="group relative block">
				<div className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 transition duration-200 absolute inset-0 backdrop-blur-sm rounded-lg flex items-center justify-center">
					<FontAwesomeIcon
						size="lg"
						className="text-white"
						icon={faArrowUpRightFromSquare}
					/>
				</div>
				<Card className="flex items-center gap-3 text-lg">
					<FontAwesomeIcon icon={props.icon} size="lg" className="shrink-0" />
					<div className="min-w-0">
						<p className="text-sm text-neutral-400 truncate">{props.title}</p>
						<p className="text-base md:text-lg truncate">
							{props.description}
						</p>
					</div>
				</Card>
			</Link>
		</>
	);
};
