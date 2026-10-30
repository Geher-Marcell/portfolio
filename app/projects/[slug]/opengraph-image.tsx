import { ImageResponse } from "next/og";
import { getProject } from "@/app/data/projects";

export const alt = "Project case study by Gehér Marcell";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = getProject(slug);

	const name = project?.name ?? "Project";
	const tagline = project?.tagline ?? "Case study";
	const tags = project?.tags.slice(0, 4).join("  ·  ") ?? "";

	return new ImageResponse(
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "80px",
				backgroundColor: "#111111",
				color: "#eeeeee",
				fontFamily: "sans-serif",
			}}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 20,
					color: "#f87171",
					fontSize: 26,
					letterSpacing: 8,
					textTransform: "uppercase",
				}}>
				<div
					style={{
						width: 64,
						height: 6,
						borderRadius: 999,
						backgroundColor: "#b41313",
					}}
				/>
				Case study
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 36,
					fontSize: 88,
					fontWeight: 700,
					lineHeight: 1.05,
				}}>
				{name}
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 16,
					fontSize: 38,
					color: "#999999",
				}}>
				{tagline}
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 48,
					fontSize: 26,
					color: "#d4d4d4",
				}}>
				{tags}
			</div>
			<div
				style={{
					position: "absolute",
					right: 80,
					bottom: 72,
					display: "flex",
					fontSize: 28,
					color: "#999999",
				}}>
				darkiex.dev/projects
			</div>
		</div>,
		{ ...size },
	);
}
