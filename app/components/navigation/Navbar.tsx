"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";

const links = [
	{ href: "#welcomePage", label: "Home" },
	{ href: "#aboutPage", label: "About" },
	{ href: "#projectsPage", label: "Projects" },
	{ href: "#contactPage", label: "Contacts" },
];

const Navbar: React.FC = () => {
	const animDelay = 1.2;
	const animDuration = 0.6;
	const autoScrollThreshold = 0.1;

	const [currentPage, setCurrentPage] = useState<string>("#welcomePage");
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

	const [opened, setIsOpen] = useState(false);

	React.useEffect(() => {
		sectionRefs.current["#welcomePage"] =
			document.getElementById("welcomePage");
		sectionRefs.current["#aboutPage"] = document.getElementById("aboutPage");
		sectionRefs.current["#projectsPage"] =
			document.getElementById("projectsPage");
		sectionRefs.current["#contactPage"] =
			document.getElementById("contactPage");
	}, []);

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setCurrentPage(`#${entry.target.id}`);
					}
				});
			},
			{ threshold: autoScrollThreshold }
		);

		Object.values(sectionRefs.current).forEach((section) => {
			if (section) observer.observe(section);
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	// Smooth scrolling to section and preventing default behavior
	const handleLinkClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		targetId: string
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
				className="*:max-w-140 *:h-10 *:bg-neutral-900 *:absolute *:left-1/2 *:-translate-x-1/2 *:rounded-lg *:shadow-lg *:z-50"
			>
				{/* Desktop View */}
				<div className="w-5/6 top-14 hidden sm:block overflow-hidden">
					<div className="flex justify-center items-center h-full">
						<div className="w-fit gap-4 text-center justify-center h-full flex items-center px-4 relative">
							{links.map((link) => (
								<React.Fragment key={link.href}>
									<a
										href={link.href}
										onClick={(event) => handleLinkClick(event, link.href)}
										className={`relative px-3 py-2 text-(--foreground-color)`}
									>
										{link.label}
										{link.href === currentPage && (
											<motion.div
												layoutId="underline-desktop"
												className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--primary-color) rounded-full"
												// transition={{ type: "spring", stiffness: 500, damping: 30 }}
												transition={{ ease: "easeOut", duration: 0.2 }}
											/>
										)}
									</a>
								</React.Fragment>
							))}
						</div>
					</div>
				</div>
				{/* Mobile View */}
				<div className="w-5/6 top-8 block sm:hidden">
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
											onClick={(event) => handleLinkClick(event, link.href)}
											className={`relative px-3 py-2 text-(--foreground-color)`}
										>
											{link.label}
											{link.href === currentPage && (
												<motion.div
													layoutId="underline-mobile"
													className="absolute top-0 bottom-0 left-0 w-1 bg-(--primary-color) rounded-full"
													transition={{ ease: "easeOut", duration: 0.2 }}
												/>
											)}
										</a>
									</React.Fragment>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</>
	);
};
export default Navbar;
