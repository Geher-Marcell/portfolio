import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Card } from "@/app/components/common/Card";
import { projects } from "@/app/data/projects";
import { SITE_URL } from "@/app/seo";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Case studies of full-stack and game projects built by Gehér Marcell with Next.js, React, Laravel, TypeScript and Phaser 3.",
	alternates: { canonical: "/projects" },
	openGraph: {
		type: "website",
		title: "Projects | Gehér Marcell",
		description:
			"Case studies of full-stack and game projects built by Gehér Marcell with Next.js, React, Laravel, TypeScript and Phaser 3.",
		url: `${SITE_URL}/projects`,
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	name: "Projects | Gehér Marcell",
	url: `${SITE_URL}/projects`,
	description:
		"Case studies of full-stack and game projects built by Gehér Marcell.",
	isPartOf: { "@id": `${SITE_URL}/#website` },
	about: { "@id": `${SITE_URL}/#person` },
	mainEntity: {
		"@type": "ItemList",
		itemListElement: projects.map((project, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: project.name,
			url: `${SITE_URL}/projects/${project.slug}`,
		})),
	},
};

export default function ProjectsIndexPage() {
	return (
		<main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
				}}
			/>

			<header className="max-w-3xl">
				<div className="flex items-center gap-2">
					<div className="h-0.5 w-8 rounded-xl bg-red-500" />
					<p className="text-sm font-bold">Portfolio</p>
				</div>
				<h1 className="mt-4 text-4xl font-bold sm:text-5xl">Projects</h1>
				<p className="mt-4 text-lg text-neutral-400">
					Case studies of the things I&apos;ve built — the problem, the stack,
					and the decisions behind each one.
				</p>
			</header>

			<div className="mt-12 grid gap-6 md:grid-cols-2">
				{projects.map((project) => (
					<Card
						key={project.id}
						className="group flex flex-col overflow-hidden p-0">
						<Link
							href={`/projects/${project.slug}`}
							className="relative block aspect-[16/10] overflow-hidden bg-neutral-800">
							{project.image ? (
								<Image
									src={project.image}
									alt={
										project.imageAlt ??
										`${project.name} project screenshot`
									}
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center text-neutral-600">
									No Image
								</div>
							)}
						</Link>
						<div className="flex flex-1 flex-col gap-3 p-5">
							<div className="flex items-start justify-between gap-3">
								<h2 className="text-xl font-bold">
									<Link
										href={`/projects/${project.slug}`}
										className="transition-colors hover:text-red-300">
										{project.name}
									</Link>
								</h2>
								<span className="shrink-0 rounded-md bg-neutral-800 px-2 py-1 text-xs text-neutral-400">
									{project.live ? "Live" : "Open source"}
								</span>
							</div>
							<p className="flex-1 text-sm leading-relaxed text-neutral-400">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-1.5">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
										{tag}
									</span>
								))}
							</div>
							<div className="flex flex-wrap gap-2 pt-1">
								<Link
									href={`/projects/${project.slug}`}
									className="flex items-center gap-2 rounded-lg bg-red-700 px-3 py-1.5 text-sm transition-colors hover:bg-red-600">
									<span>Read case study</span>
									<FontAwesomeIcon
										icon={faArrowRight}
										className="text-xs"
									/>
								</Link>
								<Link
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-700">
									<FontAwesomeIcon icon={faGithub} />
									<span>GitHub</span>
								</Link>
								{project.live && (
									<Link
										href={project.live}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-700">
										<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
										<span>Live</span>
									</Link>
								)}
							</div>
						</div>
					</Card>
				))}
			</div>
		</main>
	);
}
