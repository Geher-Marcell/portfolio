export interface Project {
	id: number;
	slug: string;
	name: string;
	/** One-line summary used on cards and in metadata. */
	tagline: string;
	/** Longer summary shown on the homepage. */
	description: string;
	/** ~150 characters, used for meta description and social previews. */
	metaDescription: string;
	/** Case study body paragraphs. */
	overview: string[];
	/** Concrete things that were built. */
	highlights: string[];
	/** What you personally did on the project. */
	role: string;
	tags: string[];
	github: string;
	live: string | null;
	featured: 1 | 2 | 3; // there can be only 1 number 1 project, 2 number 2 projects and infinite number of number 3 projects. 1 is the most featured, 3 is not featured. This is used to determine the order of the projects on the projects page.
	image: string | null;
	imageAlt?: string;
}

export const projects: Project[] = [
	{
		id: 1,
		slug: "jedligram",
		name: "Jedligram",
		tagline: "A social media platform for students",
		description:
			"Jedligram is a school project that is a social media platform for students. It is built with React, Laravel and MySql. It is a full-stack web application that allows students to connect with each other, share posts, and comment on posts.",
		metaDescription:
			"Jedligram is a social media platform for students, built with React, Laravel and MySQL. A full-stack case study covering the architecture and the build.",
		overview: [
			"Jedligram is a social media platform built for students. It gives a school community a private place to connect, share posts and comment on each other's work, without the noise of a public social network.",
			"The application is a full-stack build. A React client talks to a Laravel API, and MySQL stores users, posts and comments. Splitting the client from the API kept the frontend free to evolve independently while the backend stayed responsible for authentication and data integrity.",
		],
		highlights: [
			"Student accounts and profiles",
			"A shared feed for posting updates",
			"Commenting on posts",
			"React frontend backed by a Laravel REST API",
			"MySQL schema for users, posts and comments",
		],
		role: "Full-stack development across the React client, the Laravel API and the MySQL database.",
		tags: ["React", "Laravel", "MySql", "DevOps"],
		github: "https://github.com/jedligramkft",
		live: "https://jedligram.app",
		featured: 1,
		image: "/ProjectImages/Jedligram.png",
		imageAlt:
			"Jedligram — a social media platform for students built with React, Laravel and MySQL",
	},
	{
		id: 2,
		slug: "depot-dash",
		name: "Depot Dash",
		tagline: "An incremental train depot game",
		description:
			"An incremental train game built with phaser 3. The game is a simple train game where the player has to manage a train depot and deliver trains to different stations. The player can upgrade the depot and the trains to increase the efficiency of the depot.",
		metaDescription:
			"Depot Dash is an incremental train depot game built with Phaser 3 and TypeScript. A case study of the gameplay loop, upgrades and browser build.",
		overview: [
			"Depot Dash is an incremental game about running a train depot. You deliver trains to different stations, then reinvest the rewards into upgrades that make the depot more efficient and unlock the next tier of progress.",
			"The game is built with Phaser 3 and TypeScript and runs entirely in the browser, so there is nothing to install. The incremental loop is the core of the design: every delivery feeds back into the depot, and every upgrade changes the pace of the next run.",
		],
		highlights: [
			"Deliver trains to multiple stations",
			"Upgrade the depot and the trains",
			"An incremental progression loop built around reinvestment",
			"Phaser 3 and TypeScript, running in the browser",
		],
		role: "Design and development — gameplay systems, the upgrade loop and the interface.",
		tags: ["Typescript", "Phaser 3", "HTML"],
		github: "https://github.com/Geher-Marcell/train_game",
		live: "https://train.darkiex.dev",
		featured: 2,
		image: "/ProjectImages/DepotDash.png",
		imageAlt:
			"Depot Dash — an incremental train management game built with Phaser 3 and TypeScript",
	},
];

export const getProject = (slug: string) =>
	projects.find((project) => project.slug === slug);

export const getProjectNeighbours = (slug: string) => {
	const index = projects.findIndex((project) => project.slug === slug);
	return {
		previous: index > 0 ? projects[index - 1] : null,
		next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
	};
};
