"use client";
import { AnimatePresence, hover, motion } from "motion/react";
import React, { useCallback, useState } from "react";
import { SECTIONS } from "./sections";

const Navbar: React.FC<{
	scrollRef: React.RefObject<HTMLDivElement | null>;
}> = ({ scrollRef }) => {
	const animDelay = 1.2;
	const animDuration = 0.6;

	const sections = SECTIONS;

	const [currentPage, setCurrentPage] = useState<string>(sections[0].id);

	const [isOpen, setIsOpen] = useState(false);

	const [scrollDir, setScrollDir] = useState<1 | -1>(1);
	const lastScrollPos = React.useRef<number>(0);

	React.useEffect(() => {
		// Use document.body if window scroll doesn't trigger
		const target = scrollRef.current || document.body;

		const handleScroll = () => {
			// console.log("scrolling", target.scrollTop, lastScrollPos.current);
			const dir = target.scrollTop > lastScrollPos.current;
			setScrollDir(dir ? 1 : -1);
			lastScrollPos.current = target.scrollTop;
		};
		target.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			target.removeEventListener("scroll", handleScroll);
		};
	}, []);

	React.useEffect(() => {
		const objects = sections
			.map((section) => document.querySelector(section.id))
			.filter((obj): obj is Element => obj !== null);

		const visible = new Map<string, boolean>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					visible.set("#" + entry.target.id, entry.isIntersecting);
				}
				const firstVisible = sections.find((s) => visible.get(s.id));
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
	}, [sections]);

	// Smooth scrolling to section and preventing default behavior
	const handleLinkClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		targetId: string,
	) => {
		event.preventDefault();
		if (sections.length > 0 && targetId === sections[0].id) {
			const scrollContainer = document.querySelector(
				".h-dvh.overflow-auto > main",
			)?.parentElement;
			scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				targetElement.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	return (
		<>
			<motion.nav
				onClick={() => {
					setScrollDir(-1);
				}}
				onHoverStart={() => {
					setScrollDir(-1);
				}}
				onHoverEnd={() => {
					setScrollDir(-1);
				}}
				id="navbar"
				aria-label="Primary"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: animDelay,
					duration: animDuration,
					ease: "easeOut",
				}}
				className="*:max-w-140 *:bg-neutral-900 *:absolute *:left-1/2 *:-translate-x-1/2 *:rounded-2xl *:shadow-lg *:z-50 *:border *:border-neutral-700">
				{/* Desktop View */}
				<div
					className={`transition-all duration-150 top-14 hidden sm:block py-1 px-2`}>
					<div className="flex justify-center items-center">
						<div className="gap-4 flex items-center justify-center relative">
							{sections.map((section) => (
								<React.Fragment key={section.id}>
									<a
										href={section.id}
										onClick={(event) => handleLinkClick(event, section.id)}
										className={`relative px-3 py-2`}
										style={{
											fontWeight:
												section.id === currentPage ? "bold" : "normal",
											color:
												section.id === currentPage
													? "var(--foreground-color)"
													: "var(--foreground-muted)",
											transition: "font-weight 0.3s",
										}}>
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
				<div
					className={`top-8 block sm:hidden px-2 w-5/6 p-2 transition-all duration-150 ${scrollDir === 1 && isOpen === false ? "scale-80" : "scale-100"} hover:scale-100`}>
					<div className="flex items-center justify-end">
						<motion.button
							onClick={() => setIsOpen(!isOpen)}
							className="space-y-2 *:w-7 *:h-0.5 p-2"
							style={{ color: "var(--foreground-color)" }}>
							<motion.div
								className="origin-right"
								animate={{ rotate: isOpen ? -45 : 0 }}
								transition={{
									ease: "easeInOut",
									duration: 0.3,
								}}
								style={{
									backgroundColor: "var(--foreground-color)",
								}}></motion.div>
							<motion.div
								animate={{ scaleX: isOpen ? 0 : 1 }}
								transition={{
									ease: "easeInOut",
									duration: 0.3,
								}}
								style={{
									backgroundColor: "var(--foreground-color)",
								}}></motion.div>
							<motion.div
								className="origin-right"
								animate={{ rotate: isOpen ? 45 : 0 }}
								transition={{
									ease: "easeInOut",
									duration: 0.3,
								}}
								style={{
									backgroundColor: "var(--foreground-color)",
								}}></motion.div>
						</motion.button>
					</div>
					<AnimatePresence>
						{isOpen && (
							<motion.div
								key="navMenu"
								className="w-full rounded-b-lg flex flex-col overflow-hidden bg-neutral-900"
								initial={{ height: 0 }}
								animate={{ height: "auto" }}
								exit={{ height: 0 }}
								transition={{ duration: 0.3 }}>
								{sections.map((section, index) => (
									<React.Fragment key={section.id}>
										<a
											href={section.id}
											onClick={(event) => handleLinkClick(event, section.id)}
											className="relative px-4 py-3 border-b border-neutral-800"
											style={{
												borderBottom:
													index === sections.length - 1 ? "none" : undefined,
												fontWeight:
													section.id === currentPage ? "bold" : "normal",
												color:
													section.id === currentPage
														? "var(--foreground-color)"
														: "var(--foreground-muted)",
												transition: "font-weight 0.3s",
											}}>
											{section.name}
											{section.id === currentPage && (
												<motion.div
													layoutId="underline-mobile"
													className="absolute top-0 bottom-0 left-0 w-1 bg-(--primary-color)/50 rounded-full"
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
				</div>
			</motion.nav>
		</>
	);
};
export default Navbar;
