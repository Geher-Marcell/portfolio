import { ProjectProps } from "../props/ProjectProps";
import { TechnologyProps } from "../props/TechnologyProps";
import { TypeProps } from "../props/TypeProps";

const TypesRecord: Record<string, TypeProps> = {
	web: {
		title: "Web",
		icon: "faCode",
	},
	mobile: {
		title: "Mobile",
		icon: "faMobileAlt",
	},
};

const TechnologiesRecord: Record<string, TechnologyProps> = {
	react: {
		name: "React",
		icon: "faReact",
		color: "#61DAFB",
	},
	git: {
		name: "Git",
		icon: "faGitAlt",
		color: "#F05032",
	},
	prisma: {
		name: "Prisma",
		icon: "faDatabase",
		color: "#0C344B",
	},
};

const ProjectList: ProjectProps[] = [
	{
		title: "Project One",
		description: "This is a brief description of Project One.",
		imageUrl: "https://placehold.co/200x100/222222/eeeeee",
		githubUrl: "",
		demoUrl: "",
		type: TypesRecord.web,
		technologies: [
			TechnologiesRecord.react,
			TechnologiesRecord.git,
			TechnologiesRecord.prisma,
		],
	},
	{
		title: "Project Two",
		description: "This is a brief description of Project Two.",
		imageUrl: "https://placehold.co/200x100/222/eeeeee",
		githubUrl: "",
		demoUrl: "",
		type: TypesRecord.mobile,
		technologies: [TechnologiesRecord.react],
	},
];

export { ProjectList, TypesRecord, TechnologiesRecord };
