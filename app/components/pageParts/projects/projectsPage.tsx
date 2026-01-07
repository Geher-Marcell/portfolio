/* eslint-disable @next/next/no-img-element */
"use client";
import React, { Fragment, useEffect, useState } from "react";
import { ProjectProps } from "../../props/ProjectProps";
import { ProjectWidget } from "./widget_project";

export const ProjectsPage = () => {
	const [githubProjects, setGithubProjects] = useState([]);

	useEffect(() => {
		async function fetchGithubProjects() {
			try {
				const response = await fetch("/api/git");
				if (!response.ok) throw new Error("Failed to fetch projects");
				const data = await response.json();
				setGithubProjects(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchGithubProjects();
	}, []);
	//TODO clean up the code, add loading state, error handling, more tech mappings, FIX NAVBAR
	return (
		<>
			<div className="text-lg space-y-4">
				<h1 className="text-4xl font-semibold mb-8">My Projects</h1>
				<div className="flex flex-wrap gap-10 justify-center">
					{githubProjects.map((project: ProjectProps) => (
						<Fragment key={project.name}>
							<ProjectWidget {...project} />
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
};
