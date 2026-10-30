import { Card } from "../common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
	faArrowRight,
	faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/app/data/projects";

const SectionHeader = ({ title }: { title: string }) => {
	return (
		<div className="flex items-center gap-2 mb-6">
			<div className="w-8 h-0.5 rounded-xl bg-red-500" />
			<p className="font-bold text-sm">{title}</p>
		</div>
	);
};

export const ProjectsPage = () => {
	// Ensure only one number 1 project exists - take the first one if multiple exist
	const featured1Projects = projects.filter((p) => p.featured === 1);
	const featured1 = featured1Projects.length > 0 ? featured1Projects[0] : null;

	// If somehow multiple featured 1 projects exist, we only take the first
	const featured2Projects = projects.filter((p) => p.featured === 2).slice(0, 2);
	const featured3Projects = projects.filter((p) => p.featured === 3);

	return (
		<>
			<div className="flex flex-col gap-8 w-full">
				<div>
					<SectionHeader title="Projects" />
					<div className="flex flex-wrap items-end justify-between gap-4">
						<h2 className="font-bold text-3xl lg:text-4xl mb-2">My Work</h2>
						<Link
							href="/projects"
							className="mb-2 flex items-center gap-2 text-sm font-semibold text-(--foreground-muted) transition-colors hover:text-(--foreground-color)">
							View all projects
							<FontAwesomeIcon icon={faArrowRight} className="text-xs" />
						</Link>
					</div>
					<p className="text-neutral-400 max-w-2xl">
						A collection of projects I&apos;ve built, ranging from featured work
						to smaller experiments.
					</p>
				</div>

				{/* Featured Project - No. 1 (Biggest, full width, 50-50 split) */}
				{featured1 && (
					<div className="w-full">
						<Card className="w-full overflow-hidden p-0">
							<div className="grid grid-cols-1 lg:grid-cols-2">
								{/* Image half */}
								<div className="relative h-64 lg:h-full min-h-[300px] bg-neutral-800">
									{featured1.image ? (
										<Image
											src={featured1.image}
											alt={
												featured1.imageAlt ??
												`${featured1.name} project screenshot`
											}
											fill
											sizes="(max-width: 1024px) 100vw, 50vw"
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center text-neutral-600">
											No Image
										</div>
									)}
								</div>
								{/* Info half */}
								<div className="p-6 lg:p-8 flex flex-col justify-evenly gap-4">
									<div className="flex items-center gap-2">
										<span className="px-2 py-1 text-xs font-bold bg-red-700 rounded-md">
											#1 Featured
										</span>
									</div>
									<h3 className="font-bold text-2xl lg:text-3xl">
										<Link
											href={`/projects/${featured1.slug}`}
											className="transition-colors hover:text-red-300">
											{featured1.name}
										</Link>
									</h3>
									<p className="text-neutral-300 text-base lg:text-lg">
										{featured1.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{featured1.tags.map((tag, index) => (
											<span
												key={index}
												className="px-2 py-1 text-xs bg-neutral-800 rounded-md text-neutral-300">
												{tag}
											</span>
										))}
									</div>
									<div className="flex flex-wrap gap-3 mt-2">
										<Link
											href={`/projects/${featured1.slug}`}
											className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors">
											<span>Read case study</span>
											<FontAwesomeIcon icon={faArrowRight} />
										</Link>
										<Link
											href={featured1.github}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
											<FontAwesomeIcon icon={faGithub} />
											<span>GitHub</span>
										</Link>
										{featured1.live && (
											<Link
												href={featured1.live}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
												<span>Live Demo</span>
											</Link>
										)}
									</div>
								</div>
							</div>
						</Card>
					</div>
				)}

				{/* Featured Projects - No. 2 (Vertical cards, 50-50 split, less big, wrap in rows > 3, centered horizontally) */}
				{featured2Projects.length > 0 && (
					<div>
						<h3 className="font-bold text-xl lg:text-2xl mb-4">
							Other Featured
						</h3>
						<div className="flex flex-wrap justify-center gap-4">
							{featured2Projects.map((project) => (
								<Card
									key={project.id}
									className="overflow-hidden p-0 flex flex-col w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]">
									{/* Image half */}
									<div className="relative h-48 bg-neutral-800">
										{project.image ? (
											<Image
												src={project.image}
												alt={
													project.imageAlt ??
													`${project.name} project screenshot`
												}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
												className="object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-neutral-600">
												No Image
											</div>
										)}
									</div>
									{/* Info half */}
									<div className="p-4 flex flex-col gap-3 flex-1">
										<div className="flex items-center gap-2">
											<span className="px-2 py-1 text-xs font-bold bg-orange-700 rounded-md">
												#2 Featured
											</span>
										</div>
										<h4 className="font-bold text-lg lg:text-xl">
											<Link
												href={`/projects/${project.slug}`}
												className="transition-colors hover:text-red-300">
												{project.name}
											</Link>
										</h4>
										<p className="text-neutral-300 text-sm flex-1">
											{project.description}
										</p>
										<div className="flex flex-wrap gap-1">
											{project.tags.map((tag, index) => (
												<span
													key={index}
													className="px-2 py-0.5 text-xs bg-neutral-800 rounded-md text-neutral-300">
													{tag}
												</span>
											))}
										</div>
										<div className="flex flex-wrap gap-2 mt-1">
											<Link
												href={`/projects/${project.slug}`}
												className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-700 hover:bg-red-600 rounded-lg transition-colors">
												<span>Case study</span>
												<FontAwesomeIcon icon={faArrowRight} />
											</Link>
											<Link
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
												<FontAwesomeIcon icon={faGithub} />
												<span>GitHub</span>
											</Link>
											{project.live && (
												<Link
													href={project.live}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
													<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
													<span>Live</span>
												</Link>
											)}
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* All Projects - No. 3 (Big list, no image) */}
				{featured3Projects.length > 0 && (
					<div>
						<h3 className="font-bold text-xl lg:text-2xl mb-4">All Projects</h3>
						<div className="flex flex-col gap-2">
							{featured3Projects.map((project) => (
								<Card key={project.id} className="w-full overflow-hidden p-0">
									<div className="px-4 py-2.5 flex flex-col gap-1.5 relative">
										<div className="flex flex-wrap items-center gap-2">
											<h4 className="font-bold text-base lg:text-lg">
												<Link
													href={`/projects/${project.slug}`}
													className="transition-colors hover:text-red-300">
													{project.name}
												</Link>
											</h4>
											<div className="flex flex-wrap gap-1">
												{project.tags.map((tag, index) => (
													<span
														key={index}
														className="px-2 py-0.5 text-xs bg-neutral-800 rounded-md text-neutral-300">
														{tag}
													</span>
												))}
											</div>
										</div>
										<p className="text-neutral-300 text-sm pr-24">
											{project.description}
										</p>
										<div className="absolute bottom-2 right-3 flex gap-1.5">
											<Link
												href={`/projects/${project.slug}`}
												className="flex items-center gap-1 px-2 py-0.5 text-xs bg-red-700 hover:bg-red-600 rounded-lg transition-colors">
												<span>Case study</span>
											</Link>
											<Link
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-1 px-2 py-0.5 text-xs bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
												<FontAwesomeIcon icon={faGithub} />
												<span>GitHub</span>
											</Link>
											{project.live && (
												<Link
													href={project.live}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-1 px-2 py-0.5 text-xs bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors">
													<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
													<span>Live</span>
												</Link>
											)}
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};
