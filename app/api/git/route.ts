import techMeta from "@/app/components/utils/techMeta";
import { color } from "motion";
import { NextRequest, NextResponse } from "next/server";

const GithubReposUrl = "https://api.github.com/users/Geher-Marcell/repos";

let repos: string | unknown[] = [];

export async function GET(req: NextRequest) {
	if (repos.length > 0) {
		return NextResponse.json(repos);
	}

	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		return NextResponse.json(
			{ error: "GitHub token not set" },
			{ status: 500 }
		);
	}

	try {
		const response = await fetch(GithubReposUrl, {
			headers: {
				Authorization: `token ${token}`,
				Accept: "application/vnd.github+json",
			},
		});
		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch repos" },
				{ status: response.status }
			);
		}
		const data = await response.json();

		for (const repo of data) {
			repo.technologies = await fetchTechnologiesForRepo(repo.name, token); // Fill up the technologies used by fetching repo languages
			if (repo.homepage !== null) {
				// Generate image URL based on homepage if available
				if (repo.homepage.endsWith("/"))
					repo.homepage = repo.homepage.slice(0, -1);
				if (repo.homepage.startsWith("https://"))
					repo.homepage = repo.homepage.replace("https://", "");
				if (repo.homepage.startsWith("http://"))
					repo.homepage = repo.homepage.replace("http://", "");

				repo.imageUrl = `https://image.thum.io/get/https://${repo.homepage}`;
			} else {
				repo.imageUrl = `https://opengraph.githubassets.com/1/Geher-Marcell/${repo.name}`; // Fallback to GitHub Open Graph image
			}
		}

		repos = data;

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

async function fetchTechnologiesForRepo(repoName: string, token: string) {
	const response = await fetch(
		`https://api.github.com/repos/Geher-Marcell/${repoName}/languages`,
		{
			headers: {
				Authorization: `token ${token}`,
				Accept: "application/vnd.github+json",
			},
		}
	);
	const data = await response.json();

	const technologies = Object.keys(data).map((tech) => {
		const techNameFiltered = tech.replace(/\+/g, "Plus").replace(/#/g, "Sharp");
		return {
			name: tech,
			linesWritten: data[tech],
			icon: techMeta[techNameFiltered]?.icon || "faCircle",
			color: techMeta[techNameFiltered]?.color || "#fff",
		};
	});

	technologies.sort((a, b) => b.linesWritten - a.linesWritten);

	return technologies;
}
