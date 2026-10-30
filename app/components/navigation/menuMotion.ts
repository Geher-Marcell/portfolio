import type { Variants } from "motion/react";

/** Hamburger lines share one snappy spring so the X forms in one gesture. */
export const LINE_SPRING = {
	type: "spring",
	stiffness: 520,
	damping: 30,
} as const;

/** Deliberate unfold — the panel should be readable as it opens. */
const MENU_OPEN_EASE: [number, number, number, number] = [0.42, 0, 0.2, 1];
/** Closing is quicker and starts immediately so it never feels stuck. */
const MENU_CLOSE_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

export const MENU_VARIANTS: Variants = {
	open: {
		height: "auto",
		transition: {
			height: { duration: 0.45, ease: MENU_OPEN_EASE },
			delayChildren: 0.08,
			staggerChildren: 0.045,
		},
	},
	closed: {
		height: 0,
		// The panel itself stays opaque while it collapses — fading it out
		// made the close read as an instant disappearance.
		transition: {
			height: { duration: 0.26, ease: MENU_CLOSE_EASE },
			staggerChildren: 0.02,
			staggerDirection: -1,
		},
	},
};

export const MENU_ROW_VARIANTS: Variants = {
	open: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
	closed: { opacity: 0, transition: { duration: 0.22, ease: "easeIn" } },
};

/** Only the label lifts — moving the row itself would skew pill measurement. */
export const MENU_LABEL_VARIANTS: Variants = {
	open: { y: 0, transition: { type: "spring", stiffness: 460, damping: 32 } },
	closed: { y: -6, transition: { duration: 0.12, ease: "easeIn" } },
};
