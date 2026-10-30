import type { RefObject } from "react";

/** One destination in the nav, read from a `[data-name]` element on the page. */
export interface NavSection {
	id: string;
	name: string;
}

/** Where the pill sits inside its track, in px. */
export interface Position {
	offset: number;
	size: number;
}

/** The imperative handle a pill exposes to whoever is driving it. */
export interface PillApi {
	/** Where an item sits, in track coordinates */
	measure: (id: string) => Position | null;
	/** Where the pill currently is */
	read: () => Position;
	/** Put the pill somewhere exactly, used while tracking a scroll */
	drive: (offset: number, size: number) => void;
	/** Hand control back to the spring, aimed at a known position */
	settle: (position: Position) => void;
}

export interface PillOptions {
	/** Travel axis: horizontal nav or vertical list */
	axis: "x" | "y";
	/** Extra size added around the active item, in px */
	inset?: number;
	/** Skip measuring while the element is unmounted/hidden */
	enabled?: boolean;
	/** Travel speed (px/s) that produces max stretch */
	speed?: number;
	/** Peak stretch factor along the travel axis */
	maxStretch?: number;
	/** While true the pill is driven externally (scroll tracking) */
	hold?: RefObject<boolean>;
}
