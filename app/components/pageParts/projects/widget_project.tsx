/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import DynamicFAIcon from "../../common/DynamicFaIcon";
import Badge from "../../common/Badge";
import { ProjectProps } from "../../props/ProjectProps";
import Link from "next/link";

export const ProjectWidget = (project: ProjectProps) => {
	return (
		<Fragment key={project.name}>
			<div className="border-2 border-(--foreground-muted) rounded-2xl w-96 flex flex-col overflow-hidden relative">
				<Badge
					text={project.stargazers_count + ""}
					icon="faStar"
					absolute={true}
				/>
				<div className="relative">
					<img
						src={project.imageUrl}
						alt={project.name}
						width={400}
						height={200}
						className={`w-full h-40 object-cover ${
							project.imageUrl.includes("image.thum") ? "" : "invert-90"
						}`}
					/>
					{!project.imageUrl.includes("image.thum") && (
						<>
							{" "}
							{/* A small image to invert the inverted profile picture */}
							<div className="w-15.5 h-15.5 absolute right-6.5 top-3 rounded-lg backdrop-invert-90"></div>
						</>
					)}
				</div>
				<div className="bg-[#222] p-4 h-full flex flex-col justify-between">
					<h1 className="font-bold text-xl overflow-x-auto">{project.name}</h1>
					<p className="mt-2 text-(--foreground-muted) text-[1rem]min-h-12">
						{project.description?.substring(0, 70) ?? "No description provided"}
						{project.description?.length > 70 ? "..." : ""}
					</p>
					<div className="flex mt-2 justify-between items-center">
						{project.technologies && (
							<div className="flex flex-wrap gap-2">
								{project.technologies.slice(0, 2).map((tech) => (
									<Fragment key={tech.name}>
										<Badge
											text={tech.name}
											icon={tech.icon}
											color={tech.color}
										/>
									</Fragment>
								))}
								{project.technologies.length > 2 && (
									<div className="*:px-1">
										<Badge text="..." color="#575757" />
									</div>
								)}
							</div>
						)}
						<div className="space-x-1">
							{project.homepage &&
								(console.log("Homepage:", project.homepage),
								(
									<Link
										href={project.homepage}
										target="blank"
										rel="noopener noreferrer"
									>
										<DynamicFAIcon
											exportName="faExternalLinkSquareAlt"
											size="lg"
											className=""
										/>
									</Link>
								))}
							<Link
								href={project.html_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<DynamicFAIcon exportName="faGithub" size="lg" className="" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
