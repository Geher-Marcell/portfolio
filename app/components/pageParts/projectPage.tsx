import { Card } from "../common/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Project {
	id: number;
	name: string;
	description: string;
	tags: string[];
	github: string;
	live: string | null;
	featured: 1 | 2 | 3; // there can be only 1 number 1 project, 2 number 2 projects and infinite number of number 3 projects. 1 is the most featured, 3 is not featured. This is used to determine the order of the projects on the projects page.
	image: string | null;
}

const Projects: Project[] = [
	{
		id: 1,
		name: "Jedligram",
		description:
			"Jedligram is a school project that is a social media platform for students. It is built with React, Laravel and MySql. It is a full-stack web application that allows students to connect with each other, share posts, and comment on posts.",
		tags: ["React", "Laravel", "MySql", "DevOps"],
		github: "https://github.com/jedligramkft",
		live: "https://jedligram.app",
		featured: 1,
		image: "./ProjectImages/Jedligram.png",
	},
	{
		id: 2,
		name: "Depot Dash",
		description:
			"An incremental train game built with phaser 3. The game is a simple train game where the player has to manage a train depot and deliver trains to different stations. The player can upgrade the depot and the trains to increase the efficiency of the depot.",
		tags: ["Typescript", "Phaser 3", "HTML"],
		github: "https://github.com/Geher-Marcell/train_game",
		live: "https://train.darkiex.dev",
		featured: 2,
		image: "./ProjectImages/DepotDash.png",
	},
	// {
	// 	id: 3,
	// 	name: "Project 3",
	// 	description:
	// 		"Description of project 3. This project was awesome so i wrote a long ahh description",
	// 	tags: ["React", "Next.js", "TailwindCSS"],
	// 	github: "https://github.com/Geher-Marcell/portfolio",
	// 	live: "https://darkiex.dev",
	// 	featured: 2,
	// 	image: "https://placehold.co/600x400",
	// },
	// {
	// 	id: 4,
	// 	name: "Project 4",
	// 	description:
	// 		"Description of project 3. This project was awesome so i wrote a long ahh description",
	// 	tags: ["React", "Next.js", "TailwindCSS"],
	// 	github: "https://github.com/Geher-Marcell/portfolio",
	// 	live: "https://darkiex.dev",
	// 	featured: 3,
	// 	image: "https://placehold.co/600x400",
	// },
];

const SectionHeader = ({ title }: { title: string }) => {
	return (
		<div className="flex items-center gap-2 mb-6">
			<div className="w-8 h-0.5 rounded-xl bg-red-500" />
			<h1 className="font-bold text-sm">{title}</h1>
		</div>
	);
};

export const ProjectsPage = () => {
	// Ensure only one number 1 project exists - take the first one if multiple exist
	const featured1Projects = Projects.filter((p) => p.featured === 1);
	const featured1 = featured1Projects.length > 0 ? featured1Projects[0] : null;

	// If somehow multiple featured 1 projects exist, we only take the first
	const featured2Projects = Projects.filter((p) => p.featured === 2).slice(
		0,
		2,
	);
	const featured3Projects = Projects.filter((p) => p.featured === 3);

	return (
		<>
			<div className="flex flex-col gap-8 w-full">
				<div>
					<SectionHeader title="Projects" />
					<h1 className="font-bold text-3xl lg:text-4xl mb-2">My Work</h1>
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
										<img
											loading="lazy"
											src={featured1.image}
											alt={featured1.name}
											className="w-full h-full object-cover"
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
									<h2 className="font-bold text-2xl lg:text-3xl">
										{featured1.name}
									</h2>
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
									<div className="flex gap-3 mt-2">
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
												className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors">
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
						<h2 className="font-bold text-xl lg:text-2xl mb-4">
							Other Featured
						</h2>
						<div className="flex flex-wrap justify-center gap-4">
							{featured2Projects.map((project) => (
								<Card
									key={project.id}
									className="overflow-hidden p-0 flex flex-col w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]">
									{/* Image half */}
									<div className="relative h-48 bg-neutral-800">
										{project.image ? (
											<img
												loading="lazy"
												src={project.image}
												alt={project.name}
												className="w-full h-full object-cover"
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
										<h3 className="font-bold text-lg lg:text-xl">
											{project.name}
										</h3>
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
										<div className="flex gap-2 mt-1">
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
													className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-700 hover:bg-red-600 rounded-lg transition-colors">
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
						<h2 className="font-bold text-xl lg:text-2xl mb-4">All Projects</h2>
						<div className="flex flex-col gap-2">
							{featured3Projects.map((project) => (
								<Card key={project.id} className="w-full overflow-hidden p-0">
									<div className="px-4 py-2.5 flex flex-col gap-1.5 relative">
										<div className="flex flex-wrap items-center gap-2">
											<h3 className="font-bold text-base lg:text-lg">
												{project.name}
											</h3>
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
