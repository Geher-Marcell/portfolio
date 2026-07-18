"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";

interface NavbarProps {
	id: string;
	name: string;
}

const Navbar: React.FC = () => {
	const animDelay = 1.2;
	const animDuration = 0.6;
	const autoScrollThreshold = 0.1;

	const [currentPage, setCurrentPage] = useState<string>("#homePage");

	const [opened, setIsOpen] = useState(false);

	const [sections, setSections] = useState<NavbarProps[]>([]);

	React.useEffect(() => {
		const objects = document.querySelectorAll("[data-name]");
		const collected: NavbarProps[] = [];
		for (const obj of objects) {
			const name = obj.getAttribute("data-name") || "Unknown";
			const id = "#" + obj.getAttribute("id");
			collected.push({ id, name });
		}
		setSections(collected);

		const visible = new Map<string, boolean>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					visible.set("#" + entry.target.id, entry.isIntersecting);
				}
				const firstVisible = collected.find((s) => visible.get(s.id));
				if (firstVisible) {
					setCurrentPage(firstVisible.id);
				}
			},
			{ rootMargin: "-50% 0px -50% 0px" },
		);

		for (const obj of objects) {
			observer.observe(obj);
		}

		return () => observer.disconnect();
	}, []);

	// Smooth scrolling to section and preventing default behavior
	const handleLinkClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		targetId: string,
	) => {
		event.preventDefault();
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<motion.div
				id="navbar"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: animDelay,
					duration: animDuration,
					ease: "easeOut",
				}}
				className="*:max-w-140  *:bg-neutral-900 *:absolute *:left-1/2 *:-translate-x-1/2 *:rounded-2xl *:shadow-lg *:z-50 *:border *:border-neutral-700"
			>
				{/* Desktop View */}
				<div className="top-14 hidden sm:block py-1 px-2">
					<div className="flex justify-center items-center">
						<div className="gap-4 flex items-center justify-center relative">
							{sections.map((section) => (
								<React.Fragment key={section.id}>
									<a
										href={section.id}
										onClick={(event) =>
											handleLinkClick(event, section.id)
										}
										className={`relative px-3 py-2 text-(--foreground-color)`}
										style={{
											opacity:
												section.id === currentPage
													? 1
													: 0.4,
											fontWeight:
												section.id === currentPage
													? "bold"
													: "normal",
											transition:
												"opacity 0.3s, font-weight 0.3s",
										}}
									>
										{section.name}
										{section.id === currentPage && (
											<motion.div
												layoutId="underline-desktop"
												className="absolute top-0 bottom-0 left-0 right-0 bg-(--primary-color)/50 rounded-xl -mx-1 z-[-1]"
												transition={{
													ease: "easeOut",
													duration: 0.2,
												}}
											/>
										)}
									</a>
								</React.Fragment>
							))}
						</div>
					</div>
				</div>
				{/* Mobile View */}
				{/* <div className="w-5/6 top-8 block sm:hidden">
					<div className="flex sm:hidden items-center justify-end h-full">
						<motion.button
							onClick={() => setIsOpen(!opened)}
							className="space-y-2 *:w-7 *:h-0.5 *:bg-white p-2"
						>
							<motion.div
								className="origin-right"
								animate={{ rotate: opened ? -45 : 0 }}
								transition={{
									ease: "easeInOut",
									duration: 0.3,
								}}
							></motion.div>
							<motion.div
								animate={{ scaleX: opened ? 0 : 1 }}
								transition={{
									ease: "easeInOut",
									duration: 0.3,
								}}
							></motion.div>
							<motion.div
								className="origin-right"
								animate={{ rotate: opened ? 45 : 0 }}
								transition={{
									ease: "easeInOut",
									duration: 0.3,
								}}
							></motion.div>
						</motion.button>
					</div>
					<AnimatePresence>
						{opened && (
							<motion.div
								key="navMenu"
								className="bg-inherit w-full -translate-y-2 -z-10 rounded-b-lg flex flex-col overflow-hidden"
								initial={{ height: 0 }} // Initial state for the animation
								animate={{ height: "10rem" }} // Animation when entering
								exit={{ height: 0 }} // Animation when exiting
								transition={{ duration: 0.3 }} // Add a transition for smooth animation
							>
								{links.map((link) => (
									<React.Fragment key={link.href}>
										<a
											href={link.href}
											onClick={(event) =>
												handleLinkClick(
													event,
													link.href,
												)
											}
											className={`relative px-3 py-2 text-(--foreground-color)`}
										>
											{link.label}
											{link.href === currentPage && (
												<motion.div
													layoutId="underline-mobile"
													className="absolute top-0 bottom-0 left-0 w-1 bg-(--primary-color) rounded-full"
													transition={{
														ease: "easeOut",
														duration: 0.2,
													}}
												/>
											)}
										</a>
									</React.Fragment>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div> */}
			</motion.div>
		</>
	);
};
export default Navbar;
