import { motion } from "motion/react";
import { useEffect, useState, useCallback } from "react";

export const Border = () => {
	const fallbackPadding = 16;
	const getPaddingFromCSS = () => {
		if (typeof window === "undefined") return fallbackPadding;

		const root = getComputedStyle(document.documentElement);
		return parseFloat(root.getPropertyValue("--padding")) || fallbackPadding;
	};

	const [padding, setPadding] = useState(fallbackPadding); // Default value for SSR
	const [pathData, setPathData] = useState(`
		M ${padding} ${padding}
		L ${padding} ${padding}
		L ${padding} ${padding}
		L ${padding} ${padding}
		L ${padding} ${padding}
	`);

	const calculatePathData = useCallback(() => {
		const screenWidth = window.innerWidth ?? 0;
		const screenHeight = window.innerHeight ?? 0;

		return `
			M ${padding} ${padding}
			L ${screenWidth - padding} ${padding}
			L ${screenWidth - padding} ${screenHeight - padding}
			L ${padding} ${screenHeight - padding}
			L ${padding} ${padding}
		`;
	}, [padding]);

	useEffect(() => {
		const updatePathData = () => {
			setPadding(getPaddingFromCSS());
			setPathData(calculatePathData());
		};

		// Initial calculation
		updatePathData();

		// Recalculate on window resize
		window.addEventListener("resize", updatePathData);
		return () => {
			window.removeEventListener("resize", updatePathData);
		};
	}, [calculatePathData]); // Recalculate when padding changes

	return (
		<>
			<div className="border-element fixed inset-x-0 top-0 h-(--padding) backdrop-blur-xs" />
			<div className="border-element fixed left-0 top-(--padding) bottom-(--padding) w-(--padding) backdrop-blur-xs" />
			<div className="border-element fixed right-0 top-(--padding) bottom-(--padding) w-(--padding) backdrop-blur-xs" />
			<div className="border-element fixed inset-x-0 bottom-0 h-(--padding) backdrop-blur-xs" />

			<div className="pointer-events-none fixed inset-0 z-50">
				<svg
					width="100%"
					height="100%"
					preserveAspectRatio="none"
					className="svelte-zez15e"
				>
					<motion.path
						className="border-path stroke-(--foreground-muted) fill-none"
						strokeWidth="2"
						d={pathData}
						animate={{ pathLength: [0, 1] }}
						transition={{ duration: 2, ease: "easeInOut" }}
					/>
				</svg>
			</div>
		</>
	);
};
