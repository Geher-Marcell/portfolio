import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export const Card = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const defaultClassName =
		"p-4 rounded-lg bg-neutral-900 border border-neutral-50/10";

	return (
		<motion.div
			className={twMerge(defaultClassName, className)}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.6 }}
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	);
};
