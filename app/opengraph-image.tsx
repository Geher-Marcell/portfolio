import { ImageResponse } from "next/og";

export const alt = "Gehér Marcell — Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
				Portfolio
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 36,
					fontSize: 92,
					fontWeight: 700,
					lineHeight: 1.05,
				}}>
				Gehér Marcell
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 16,
					fontSize: 44,
					color: "#999999",
				}}>
				Full Stack Web Developer
			</div>
			<div
				style={{
					display: "flex",
					marginTop: 48,
					fontSize: 26,
					color: "#d4d4d4",
				}}>
				Next.js · React · TypeScript · C#
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
				darkiex.dev
			</div>
		</div>,
		{ ...size },
	);
}
