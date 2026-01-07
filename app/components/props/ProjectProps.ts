import { TechnologyProps } from "./TechnologyProps";

export type ProjectProps = {
	name: string;
	html_url: string;
	description: string;
	homepage?: string;
	imageUrl: string;
	stargazers_count: number;
	forks_count: number;
	technologies: TechnologyProps[];
};
