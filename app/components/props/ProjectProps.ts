import { TechnologyProps } from "./TechnologyProps";

export type ProjectProps = {
	name: string;
	description: string;
	homepage?: string;
	imageUrl: string;
	stargazers_count: number;
	forks_count: number;
	technologies: TechnologyProps[];
};
