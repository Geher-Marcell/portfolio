import { TechnologyProps } from "./TechnologyProps";
import { TypeProps } from "./TypeProps";

export type ProjectProps = {
	title: string;
	description: string;
	imageUrl: string;
	githubUrl: string;
	demoUrl: string;
	type: TypeProps;
	technologies: TechnologyProps[];
};
