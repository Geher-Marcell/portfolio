import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";
import { projects } from "./data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
		url: `${SITE_URL}/projects/${project.slug}`,
		lastModified,
		changeFrequency: "yearly",
		priority: 0.7,
	}));

	return [
		{
			url: SITE_URL,
			lastModified,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/projects`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		...projectEntries,
	];
}
