/* eslint-disable react-hooks/purity */
"use client";
import { motion, useAnimate } from "motion/react";
import { useEffect } from "react";

const Circle: React.FC<{ color: string }> = ({ color = "red" }) => {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		const wiggleAnimation = async () => {
			while (true) {
				const randBetween = (min: number, max: number) =>
					Math.random() * (max - min) + min;

				const x = randBetween(-100, 100);
				const y = randBetween(-100, 100);

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
					scale: 0,
					top: `50%`,
					left: `50%`,
				}}
				animate={{
					scale: 1,
					left: [`50%`, `70%`],
				}}
				transition={{
					type: "spring",
					stiffness: 20,
					damping: 8,
					left: {
						delay: 1,
						type: "spring",
						stiffness: 50,
						damping: 10,
					},
				}}
				className={`w-80 h-80 rounded-full absolute -translate-x-1/2 -translate-y-1/2 no-scrollbar`}
				style={{ backgroundColor: color }}
			/>
		</>
	);
};

export default Circle;
