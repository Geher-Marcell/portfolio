"use client";

import React from "react";

/** How far the page must move before the nav reacts, so it doesn't flicker. */
const SCROLL_THRESHOLD = 8;

interface UseNavScrollOptions {
	/** Set while a click-scroll runs, so it isn't read as user scrolling. */
	ignoreRef?: { readonly current: unknown };
	/** Called when the page starts scrolling away from the top. */
	onScrollDown?: () => void;
}

/**
 * Condenses the nav while the page scrolls down and restores it on the way
 * back up. `expand` lets the user force it back to full size at any time.
 */
export const useNavScroll = ({
	ignoreRef,
	onScrollDown,
}: UseNavScrollOptions = {}) => {
	const [condensed, setCondensed] = React.useState(false);
	const condensedRef = React.useRef(false);
	const anchorRef = React.useRef(0);
	const anchorHeightRef = React.useRef(0);

	const setCondensedState = React.useCallback(
		(next: boolean) => {
			if (condensedRef.current === next) return;
			condensedRef.current = next;
			setCondensed(next);
			if (next) onScrollDown?.();
		},
		[onScrollDown],
	);

	React.useEffect(() => {
		const onScroll = (event: Event) => {
			const scroller =
				event.target instanceof HTMLElement
					? event.target
					: document.scrollingElement;
			if (!scroller) return;

			const top = Math.max(0, scroller.scrollTop);
			const height = scroller.scrollHeight;

			// A click-scroll isn't the user scrolling — leave the nav alone, but
			// move the baseline so the next real scroll is judged from here.
			if (ignoreRef?.current) {
				anchorRef.current = top;
				anchorHeightRef.current = height;
				return;
			}

			// Content that shrinks above the viewport drags scrollTop up without
			// the user scrolling (it happens at the very end of this page), so
			// credit that movement to the layout change instead of a direction.
			const shrink = Math.max(0, anchorHeightRef.current - height);

			// Only commit after a real move, so trackpad noise can't toggle it.
			const delta = top - anchorRef.current;

			if (delta > SCROLL_THRESHOLD) {
				anchorRef.current = top;
				anchorHeightRef.current = height;
				setCondensedState(true);
			} else if (delta < -SCROLL_THRESHOLD - shrink) {
				anchorRef.current = top;
				anchorHeightRef.current = height;
				setCondensedState(false);
			}

			// At the very top the nav is always full size.
			if (top <= 0) {
				anchorRef.current = 0;
				anchorHeightRef.current = height;
				setCondensedState(false);
			}
		};

		document.addEventListener("scroll", onScroll, {
			capture: true,
			passive: true,
		});

		return () =>
			document.removeEventListener("scroll", onScroll, { capture: true });
	}, [ignoreRef, setCondensedState]);

	const expand = React.useCallback(
		() => setCondensedState(false),
		[setCondensedState],
	);

	return { condensed, expand };
};
