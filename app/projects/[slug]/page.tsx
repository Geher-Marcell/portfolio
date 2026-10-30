import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faArrowRight,
	faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Card } from "@/app/components/common/Card";
import { getProject, getProjectNeighbours, projects } from "@/app/data/projects";
import { SITE_URL } from "@/app/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		return { title: "Project not found" };
	}

	const title = `${project.name} — Case Study`;

	return {
		title,
		description: project.metaDescription,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: {
			type: "article",
			title,
			description: project.metaDescription,
			url: `${SITE_URL}/projects/${project.slug}`,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: project.metaDescription,
		},
	};
}

export default async function ProjectCaseStudyPage({ params }: Props) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		notFound();
	}

	const { previous, next } = getProjectNeighbours(slug);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: project.name,
		description: project.metaDescription,
		url: `${SITE_URL}/projects/${project.slug}`,
		image: project.image ? `${SITE_URL}${project.image}` : undefined,
		applicationCategory: project.tags.includes("Phaser 3")
			? "GameApplication"
			: "WebApplication",
		operatingSystem: "Web",
		author: { "@id": `${SITE_URL}/#person` },
		keywords: project.tags.join(", "),
		codeRepository: project.github,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
	};

	return (
		<main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
				}}
			/>

			<nav aria-label="Breadcrumb" className="mb-8 text-sm">
				<ol className="flex flex-wrap items-center gap-2 text-neutral-500">
					<li>
						<Link href="/" className="transition-colors hover:text-white">
							Home
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li>
						<Link
							href="/projects"
							className="transition-colors hover:text-white">
							Projects
						</Link>
					</li>
					<li aria-hidden="true">/</li>
					<li className="text-neutral-300" aria-current="page">
						{project.name}
					</li>
				</ol>
			</nav>

			<header className="max-w-3xl">
				<div className="flex items-center gap-2">
					<div className="h-0.5 w-8 rounded-xl bg-red-500" />
					<p className="text-sm font-bold">Case study</p>
				</div>
				<h1 className="mt-4 text-4xl font-bold sm:text-5xl">
					{project.name}
				</h1>
				<p className="mt-4 text-lg text-neutral-300">{project.tagline}</p>
				<div className="mt-6 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-md bg-neutral-800 px-2.5 py-1 text-xs text-neutral-300">
							{tag}
						</span>
					))}
				</div>
				<div className="mt-8 flex flex-wrap gap-3">
					{project.live && (
						<Link
							href={project.live}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 transition-colors hover:bg-red-600">
							<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
							<span>View live project</span>
						</Link>
					)}
					<Link
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 transition-colors hover:bg-neutral-700">
						<FontAwesomeIcon icon={faGithub} />
						<span>Source code</span>
					</Link>
				</div>
			</header>

			{project.image && (
				<div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
					<Image
						src={project.image}
						alt={
							project.imageAlt ?? `${project.name} project screenshot`
						}
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 1024px"
						className="object-cover"
					/>
				</div>
			)}

			<div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
				<article className="space-y-10">
					<section aria-labelledby="overview">
						<h2
							id="overview"
							className="text-2xl font-bold sm:text-3xl">
							Overview
						</h2>
						<div className="mt-4 space-y-4">
							{project.overview.map((paragraph) => (
								<p
									key={paragraph}
									className="leading-relaxed text-neutral-300">
									{paragraph}
								</p>
							))}
						</div>
					</section>

					<section aria-labelledby="what-i-built">
						<h2
							id="what-i-built"
							className="text-2xl font-bold sm:text-3xl">
							What I built
						</h2>
						<ul className="mt-4 space-y-3">
							{project.highlights.map((highlight) => (
								<li key={highlight} className="flex gap-3">
									<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
									<span className="leading-relaxed text-neutral-300">
										{highlight}
									</span>
								</li>
							))}
						</ul>
					</section>
				</article>

				<aside className="space-y-4">
					<Card className="space-y-2">
						<h2 className="text-sm font-bold text-neutral-400">My role</h2>
						<p className="text-sm leading-relaxed text-neutral-200">
							{project.role}
						</p>
					</Card>
					<Card className="space-y-3">
						<h2 className="text-sm font-bold text-neutral-400">Stack</h2>
						<div className="flex flex-wrap gap-1.5">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
									{tag}
								</span>
							))}
						</div>
					</Card>
					<Card className="space-y-3">
						<h2 className="text-sm font-bold text-neutral-400">Links</h2>
						<div className="flex flex-col gap-2 text-sm">
							{project.live && (
								<Link
									href={project.live}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-neutral-300 transition-colors hover:text-white">
									<FontAwesomeIcon
										icon={faArrowUpRightFromSquare}
										className="text-xs"
									/>
									Live project
								</Link>
							)}
							<Link
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-neutral-300 transition-colors hover:text-white">
								<FontAwesomeIcon icon={faGithub} className="text-xs" />
								Source code
							</Link>
						</div>
					</Card>
				</aside>
			</div>

			<nav
				aria-label="Project pagination"
				className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
				{previous ? (
					<Link
						href={`/projects/${previous.slug}`}
						className="group flex flex-col gap-1 rounded-lg border border-white/10 p-4 transition-colors hover:border-white/25">
						<span className="flex items-center gap-2 text-xs text-neutral-500">
							<FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
							Previous project
						</span>
						<span className="font-bold transition-colors group-hover:text-red-300">
							{previous.name}
						</span>
					</Link>
				) : (
					<div className="hidden sm:block" />
				)}
				{next && (
					<Link
						href={`/projects/${next.slug}`}
						className="group flex flex-col gap-1 rounded-lg border border-white/10 p-4 text-right transition-colors hover:border-white/25 sm:items-end">
						<span className="flex items-center gap-2 text-xs text-neutral-500">
							Next project
							<FontAwesomeIcon icon={faArrowRight} className="text-xs" />
						</span>
						<span className="font-bold transition-colors group-hover:text-red-300">
							{next.name}
						</span>
					</Link>
				)}
			</nav>
		</main>
	);
}
