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
				rel="noopener noreferrer"
				className="relative">
				<div className="opacity-0 hover:opacity-100 transition duration-200 top-0 bottom-0 left-0 right-0 backdrop-blur-sm absolute rounded-lg flex items-center justify-center">
					<FontAwesomeIcon
						size="lg"
						className="text-white"
						icon={faArrowUpRightFromSquare}
					/>
				</div>
				<Card className="flex items-center gap-2 text-lg">
					<FontAwesomeIcon icon={props.icon} size="lg" />{" "}
					<div>
						<p className="text-sm text-neutral-400">{props.title}</p>
						<h5 className="text-lg">{props.description}</h5>
					</div>
				</Card>
			</Link>
		</>
	);
};
