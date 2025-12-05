/* eslint-disable react-hooks/purity */
"use client";
import { motion, useAnimate } from "motion/react";
import { useEffect, useState } from "react";

const Circle: React.FC<{
	color?: string;
	backgroundGradient?: string;
	blurAmount: number;
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
	size: number;
}> = ({
	color = "transparent",
	backgroundGradient = "none",
	blurAmount,
	top,
	bottom,
	left,
	right,
	size,
}) => {
	const [scope, animate] = useAnimate();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mobileBreakpoint = parseInt(
			getComputedStyle(document.documentElement).getPropertyValue(
				"--tw-screen-sm"
			) || "639",
			10
		);

		const handleResize = () => {
			setIsMobile(window.innerWidth <= mobileBreakpoint);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const PosMultiplier = isMobile ? 0.2 : 1;
	const SizeMultiplier = isMobile ? 0.6 : 1;

	const translateX = top ? "-50%" : bottom ? "50%" : "0";
	const translateY = left ? "-50%" : right ? "50%" : "0";

	useEffect(() => {
		const wiggleAnimation = async () => {
			while (true) {
				const randBetween = (min: number, max: number) =>
					Math.random() * (max - min) + min;

				const x = randBetween(-50, 50);
				const y = randBetween(-50, 50);

				await animate(
					scope.current,
					{ x, y },
					{
						ease: "easeInOut",
						duration: 5,
					}
				);
			}
		};
		wiggleAnimation();
	}, [animate, scope]);

	return (
		<>
			<motion.div
				ref={scope}
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					ease: "easeInOut",
					duration: 0.6,
					delay: 1.6,
				}}
				className={`rounded-full absolute z-0`}
				style={{
					translateX: translateX,
					translateY: translateY,

					width: size * SizeMultiplier + "px",
					height: size * SizeMultiplier + "px",
					backgroundColor: color,
					backgroundImage: backgroundGradient,
					top: top ? top * PosMultiplier : undefined,
					bottom: bottom ? bottom * PosMultiplier : undefined,
					left: left ? left * PosMultiplier : undefined,
					right: right ? right * PosMultiplier : undefined,
					filter: `blur(${blurAmount}px)`,
				}}
			/>
		</>
	);
};

export default Circle;
