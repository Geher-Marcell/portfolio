"use client";

import { useEffect, type RefObject } from "react";

/**
 * Scrolls the inner page container to the URL hash on mount.
 *
 * The homepage scrolls a nested element rather than the window, so the
 * browser's native hash scrolling misses when arriving from another route
 * (for example /projects -> /#contactPage). Content above the target, such as
 * the GitHub calendar and images, can also load late and shift the section, so
 * keep re-aligning until the page settles or the user scrolls.
 */
export const useHashScroll = (containerRef: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const scrollToHash = () => {
			const hash = window.location.hash;
			if (!hash) return false;

			const target = document.getElementById(hash.slice(1));
			if (!target) return false;

			// Global CSS sets scroll-behavior: smooth, which would turn this into
			// an animation. Force an instant jump for the initial position.
			const previousBehavior = container.style.scrollBehavior;
			container.style.scrollBehavior = "auto";
			target.scrollIntoView({ block: "start" });
			container.style.scrollBehavior = previousBehavior;

			return true;
		};

		if (!window.location.hash) {
			window.addEventListener("hashchange", scrollToHash);
			return () => window.removeEventListener("hashchange", scrollToHash);
		}

		let userScrolled = false;

		const align = () => {
			if (userScrolled) return;
			scrollToHash();
		};

		const observer = new ResizeObserver(align);

		const stop = () => {
			observer.disconnect();
			window.clearTimeout(timeout);
			container.removeEventListener("wheel", onUserInput);
			container.removeEventListener("touchstart", onUserInput);
			window.removeEventListener("keydown", onKeyDown);
		};

		const onUserInput = () => {
			userScrolled = true;
			stop();
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (
				[
					"ArrowUp",
					"ArrowDown",
					"PageUp",
					"PageDown",
					"Home",
					"End",
					" ",
				].includes(event.key)
			) {
				onUserInput();
			}
		};

		const content = container.querySelector("main");
		if (content) observer.observe(content);

		const timeout = window.setTimeout(stop, 6000);
		const frame = requestAnimationFrame(() => {
			requestAnimationFrame(align);
		});

		// Scroll anchoring can change scrollTop on its own when content above
		// loads, so only real input counts as the user taking over.
		container.addEventListener("wheel", onUserInput, { passive: true });
		container.addEventListener("touchstart", onUserInput, { passive: true });
		window.addEventListener("keydown", onKeyDown);

		return () => {
			cancelAnimationFrame(frame);
			stop();
		};
	}, [containerRef]);
};
