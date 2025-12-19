/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from "react";
import { ProjectList } from "../../utils/ProjectList";
import DynamicFAIcon from "../../common/DynamicFaIcon";
import Badge from "../../common/Badge";

export const ProjectsPage = () => {
	return (
		<>
			<div className="text-lg space-y-4">
				<h1 className="text-4xl font-semibold mb-8">My Projects</h1>
				<div className="flex flex-wrap gap-10">
					{ProjectList.map((project) => (
						<Fragment key={project.title}>
							<div className="border-2 border-(--foreground-muted) rounded-2xl w-90 flex flex-col overflow-hidden relative">
								<Badge
									text={project.type.title}
									icon={project.type.icon}
									absolute={true}
								/>
								<div>
									<img
										src={project.imageUrl}
										alt={project.title}
										className="w-full h-auto object-cover"
									/>
								</div>
								<div className="bg-[#222] p-4">
									<h1 className="font-bold text-xl">{project.title}</h1>
									<p className="mt-2 text-(--foreground-muted) text-[1rem]">
										{project.description}
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
											<DynamicFAIcon
												exportName="faGithub"
												size="lg"
												className=""
											/>
											<DynamicFAIcon
												exportName="faExternalLinkSquareAlt"
												size="lg"
												className=""
											/>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};
