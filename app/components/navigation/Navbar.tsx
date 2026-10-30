"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import {
	LINE_SPRING,
	MENU_LABEL_VARIANTS,
	MENU_ROW_VARIANTS,
	MENU_VARIANTS,
} from "./menuMotion";
import type { NavSection } from "./types";
import { useNavScroll } from "./useNavScroll";
import { useSectionScroll } from "./useSectionScroll";
import { useTravelPill } from "./useTravelPill";

/** How far the desktop pill bleeds past each link (the old `-mx-1`) */
const PILL_INSET = 4;
/** The nav floats in once the page has settled. */
const NAV_INTRO_DELAY = 1.2;
const NAV_INTRO_DURATION = 0.6;
/** How small the nav gets while the page is scrolling away from the top. */
const NAV_CONDENSED_SCALE = 0.84;
const NAV_SHRINK_SPRING = {
	type: "spring",
	stiffness: 320,
	damping: 30,
} as const;

const Navbar = () => {
	const [currentPage, setCurrentPage] = useState("#homePage");
	const [opened, setIsOpen] = useState(false);
	const [sections, setSections] = useState<NavSection[]>([]);

	// While a click-scroll is running the pill is driven by the scroll instead
	// of its spring, so both finish at the same moment.
	const holdPillRef = React.useRef(false);
	// The menu trigger, so taps around it count as "outside".
	const menuButtonRef = React.useRef<HTMLButtonElement>(null);

	const [desktopStyle, desktopTrackRef, desktopLinks, desktopPill] =
		useTravelPill(currentPage, {
			axis: "x",
			inset: PILL_INSET,
			hold: holdPillRef,
		});

	const [mobileStyle, mobileTrackRef, mobileLinks, mobilePill] = useTravelPill(
		currentPage,
		{
			axis: "y",
			enabled: opened,
			hold: holdPillRef,
			// Rows are only ~50px apart, so a much lower speed reads the same.
			speed: 450,
			maxStretch: 1.45,
		},
	);

	const { scrollTarget, scrollToSection } = useSectionScroll({
		sections,
		pills: [desktopPill, mobilePill],
		holdPillRef,
		onSectionChange: setCurrentPage,
	});

	// Dismissing the menu from a scroll also shrinks the nav, so this has to be
	// stable — the listener below re-subscribes whenever it changes.
	const closeMenu = React.useCallback(() => setIsOpen(false), []);

	// Scroll down: the nav tucks away. Scroll up or touch it: back to full size.
	const { condensed, expand } = useNavScroll({
		// A click-scroll isn't the user scrolling, so it shouldn't shrink the nav.
		ignoreRef: scrollTarget,
		onScrollDown: closeMenu,
	});

	// Collect the nav destinations straight from the page.
	React.useEffect(() => {
		const elements = document.querySelectorAll<HTMLElement>("[data-name]");
		const collected: NavSection[] = [];

		for (const element of elements) {
			collected.push({
				id: `#${element.id}`,
				name: element.getAttribute("data-name") || "Unknown",
			});
		}

		setSections(collected);

		const visible = new Map<string, boolean>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					visible.set(`#${entry.target.id}`, entry.isIntersecting);
				}

				// While a click-scroll runs, the scroll position drives the
				// pill instead of section changes.
				if (scrollTarget.current) return;

				const firstVisible = collected.find((section) =>
					visible.get(section.id),
				);
				if (firstVisible) setCurrentPage(firstVisible.id);
			},
			{ rootMargin: "-50% 0px -50% 0px" },
		);

		for (const element of elements) observer.observe(element);

		return () => observer.disconnect();
	}, [scrollTarget]);

	// Tapping anywhere outside the menu, or pressing Escape, dismisses it.
	React.useEffect(() => {
		if (!opened) return;

		const onPointerDown = (event: PointerEvent) => {
			const target = event.target;
			if (!(target instanceof Node)) return;
			// Anything that isn't the menu or its trigger dismisses it — that
			// includes the empty strip of the nav bar around the trigger.
			if (mobileTrackRef.current?.contains(target)) return;
			if (menuButtonRef.current?.contains(target)) return;
			closeMenu();
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeMenu();
		};

		document.addEventListener("pointerdown", onPointerDown, true);
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.removeEventListener("pointerdown", onPointerDown, true);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [opened, mobileTrackRef, closeMenu]);

	const linkStyle = (section: NavSection): React.CSSProperties => ({
		fontWeight: section.id === currentPage ? "bold" : "normal",
		color:
			section.id === currentPage
				? "var(--foreground-color)"
				: "var(--foreground-muted)",
		transition: "font-weight 0.3s",
	});

	return (
		<>
			<motion.div
				id="navbar"
				onPointerDown={expand}
				initial={{ opacity: 0, y: -20 }}
				animate={{
					opacity: 1,
					y: 0,
					scale: condensed ? NAV_CONDENSED_SCALE : 1,
				}}
				transition={{
					opacity: {
						delay: NAV_INTRO_DELAY,
						duration: NAV_INTRO_DURATION,
						ease: "easeOut",
					},
					y: {
						delay: NAV_INTRO_DELAY,
						duration: NAV_INTRO_DURATION,
						ease: "easeOut",
					},
					scale: NAV_SHRINK_SPRING,
				}}
				style={{ transformOrigin: "top center" }}
				className="relative z-50 *:max-w-140  *:bg-neutral-900 *:absolute *:left-1/2 *:-translate-x-1/2 *:rounded-2xl *:shadow-lg *:z-50 *:border *:border-neutral-700">
				{/* Desktop View */}
				<div className="top-14 hidden sm:block py-1 px-2">
					<div className="flex justify-center items-center">
						<div
							ref={desktopTrackRef}
							className="gap-4 flex items-center justify-center relative">
							{/* Travelling pill — squashes & stretches with its own velocity */}
							<motion.div
								aria-hidden
								className="pointer-events-none absolute inset-y-0 left-0 rounded-xl bg-(--primary-color)/50"
								style={desktopStyle}
							/>
							{sections.map((section) => (
								<a
									key={section.id}
									ref={(element) => {
										if (element) desktopLinks.current.set(section.id, element);
										else desktopLinks.current.delete(section.id);
									}}
									href={section.id}
									onClick={(event) => {
										event.preventDefault();
										scrollToSection(section.id);
									}}
									className="relative px-3 py-2"
									style={linkStyle(section)}>
									{/* A hidden bold copy reserves the width so bolding a
									    link never nudges the rest of the nav around. */}
									<span className="grid justify-items-center">
										<span className="col-start-1 row-start-1">
											{section.name}
										</span>
										<span
											aria-hidden
											className="col-start-1 row-start-1 invisible font-bold">
											{section.name}
										</span>
									</span>
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Mobile View */}
				<div className="top-8 block sm:hidden px-2 w-5/6 p-2">
					<div className="flex items-center justify-end">
						<motion.button
							ref={menuButtonRef}
							onClick={() => setIsOpen(!opened)}
							aria-label={opened ? "Close menu" : "Open menu"}
							aria-expanded={opened}
							className="flex h-10 w-11 items-center justify-center">
							<span className="relative block h-5 w-7">
								<motion.span
									className="absolute left-0 top-0 h-0.5 w-7 rounded-full bg-(--foreground-color)"
									animate={{ y: opened ? 9 : 0, rotate: opened ? 45 : 0 }}
									transition={LINE_SPRING}
								/>
								<motion.span
									className="absolute left-0 top-[9px] h-0.5 w-7 rounded-full bg-(--foreground-color)"
									animate={{
										opacity: opened ? 0 : 1,
										scaleX: opened ? 0.3 : 1,
									}}
									transition={{ duration: 0.16, ease: "easeOut" }}
								/>
								<motion.span
									className="absolute left-0 top-[18px] h-0.5 w-7 rounded-full bg-(--foreground-color)"
									animate={{ y: opened ? -9 : 0, rotate: opened ? -45 : 0 }}
									transition={LINE_SPRING}
								/>
							</span>
						</motion.button>
					</div>
					<AnimatePresence>
						{opened && (
							<motion.div
								key="navMenu"
								ref={mobileTrackRef}
								variants={MENU_VARIANTS}
								initial="closed"
								animate="open"
								exit="closed"
								className="relative w-full rounded-b-lg flex flex-col overflow-hidden bg-neutral-900">
								{/* Same pill, travelling vertically */}
								<motion.div
									aria-hidden
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.24, delay: 0.12 }}
									className="pointer-events-none absolute left-0 top-0 w-1 rounded-full bg-(--primary-color)/50"
									style={mobileStyle}
								/>
								{sections.map((section, index) => (
									<motion.a
										key={section.id}
										ref={(element) => {
											if (element) mobileLinks.current.set(section.id, element);
											else mobileLinks.current.delete(section.id);
										}}
										href={section.id}
										onClick={(event) => {
											event.preventDefault();
											scrollToSection(section.id);
										}}
										variants={MENU_ROW_VARIANTS}
										className="relative px-4 py-3 border-b border-neutral-800"
										style={{
											...linkStyle(section),
											borderBottom:
												index === sections.length - 1 ? "none" : undefined,
										}}>
										<motion.span
											variants={MENU_LABEL_VARIANTS}
											className="block">
											{section.name}
										</motion.span>
									</motion.a>
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
