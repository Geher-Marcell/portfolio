"use client";
import { motion } from "motion/react";

export const WelcomePage = () => {
	const startDelay = 1.2;

	const namesDuration = 0.5;

	const seperatorDuration = namesDuration * 3;
	const seperatorEase = "easeInOut";

	const namesDelay = 0.5 * seperatorDuration + startDelay;
	const namesEase = "easeOut";

	const subtitleDelay = startDelay + seperatorDuration;
	const subtitleDuration = 0.6;
	const subtitleEase = "easeOut";

	return (
		<>
			<div className="text-5xl sm:text-6xl font-bold *:inline-block flex items-center justify-center w-full h-full">
				{/* Vezetéknév */}
				<div className="h-min w-min overflow-hidden">
					<motion.h1
						initial={{ x: 180 }}
						animate={{ x: 0 }}
						transition={{
							duration: namesDuration,
							delay: namesDelay,
							ease: namesEase,
						}}
					>
						Gehér
					</motion.h1>
				</div>
				{/* Elválasztó */}
				<motion.div
					className="w-0.5 bg-(--foreground-color) mx-1.5"
					initial={{
						height: "0px",
					}}
					animate={{
						height: ["0px", "80px", "80px", "0px"],
					}}
					transition={{
						delay: startDelay,
						duration: seperatorDuration, // total animation time
						times: [0, 0.2, 0.9, 1],
						ease: seperatorEase,
					}}
				/>
				{/* Keresztnév */}
				<div className="h-min w-min overflow-hidden">
					<motion.h1
						initial={{ x: -220 }}
						animate={{ x: 0 }}
						transition={{
							duration: namesDuration,
							delay: namesDelay,
							ease: namesEase,
						}}
					>
						Marcell
					</motion.h1>
				</div>
			</div>
			{/* Subtitle */}
			<div className="overflow-hidden pb-2">
				<motion.p
					className="text-2xl text-(--foreground-muted)"
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					transition={{
						delay: subtitleDelay,
						duration: subtitleDuration,
						ease: subtitleEase,
					}}
				>
					Full Stack Developer
				</motion.p>
			</div>
		</>
	);
};
