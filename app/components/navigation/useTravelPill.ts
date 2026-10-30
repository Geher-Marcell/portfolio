"use client";

import {
	animate,
	useMotionValue,
	useSpring,
	useTransform,
	useVelocity,
	type MotionStyle,
} from "motion/react";
import React from "react";
import type { PillApi, PillOptions, Position } from "./types";

const PILL_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const;

/**
 * A pill that measures itself against the active item and follows it with a
 * spring. The spring's own velocity drives scaleX/scaleY, so the pill squashes
 * and stretches while it travels and relaxes back to 1 when it lands.
 */
export const useTravelPill = (
	activeId: string,
	{
		axis,
		inset = 0,
		enabled = true,
		speed = 1600,
		maxStretch = 1.3,
		hold,
	}: PillOptions,
) => {
	const trackRef = React.useRef<HTMLDivElement>(null);
	const itemRefs = React.useRef(new Map<string, HTMLElement>());

	const offset = useMotionValue(0);
	const size = useMotionValue(0);

	const springTo = React.useCallback(
		(nextOffset: number, nextSize: number) => {
			animate(offset, nextOffset, {
				...PILL_SPRING,
				velocity: offset.getVelocity(),
			});
			animate(size, nextSize, {
				...PILL_SPRING,
				velocity: size.getVelocity(),
			});
		},
		[offset, size],
	);

	const jumpTo = React.useCallback(
		(nextOffset: number, nextSize: number) => {
			offset.jump(nextOffset);
			size.jump(nextSize);
		},
		[offset, size],
	);

	const drive = React.useCallback(
		(nextOffset: number, nextSize: number) => {
			// `stop()` first so no leftover spring fights the scroll, then
			// `set()` (not `jump()`) so velocity tracking survives and the
			// stretch keeps reacting to the scroll speed.
			offset.stop();
			size.stop();
			offset.set(nextOffset);
			size.set(nextSize);
		},
		[offset, size],
	);

	const measureItem = React.useCallback(
		(id: string): Position | null => {
			const track = trackRef.current;
			const item = itemRefs.current.get(id);
			if (!track || !item) return null;

			const trackBox = track.getBoundingClientRect();
			const itemBox = item.getBoundingClientRect();
			// Rects include any transform above the track (the nav shrinks
			// while scrolling), so divide it back out to get layout pixels.
			const scale = track.offsetWidth ? trackBox.width / track.offsetWidth : 1;
			const itemSize = (axis === "x" ? itemBox.width : itemBox.height) / scale;
			// 0 while this nav is hidden at the current breakpoint
			if (!itemSize) return null;

			const rawOffset =
				axis === "x"
					? itemBox.left - trackBox.left
					: itemBox.top - trackBox.top;

			return {
				offset: rawOffset / scale - inset,
				size: itemSize + inset * 2,
			};
		},
		[axis, inset],
	);

	const measureActive = React.useCallback(
		() => measureItem(activeId),
		[measureItem, activeId],
	);

	const velocity = useVelocity(offset);
	// tanh keeps the stretch proportional at first, then saturates instead of
	// ballooning on long jumps (clamp:false would extrapolate without limit).
	const stretch = useSpring(
		useTransform(
			velocity,
			(value) => 1 + (maxStretch - 1) * Math.tanh(Math.abs(value) / speed),
		),
		{ stiffness: 800, damping: 40, mass: 0.5 },
	);
	// Keep the visual mass roughly constant by squashing the other axis.
	const squash = useTransform(stretch, (value) => 1 - (value - 1) * 0.55);

	// The first measurement should place the pill, not fly it in from 0.
	const placed = React.useRef(false);

	React.useLayoutEffect(() => {
		if (!enabled) {
			placed.current = false;
			return;
		}

		const track = trackRef.current;
		if (!track) return;

		const sync = () => {
			// A scroll is driving the pill right now — don't fight it.
			if (hold?.current) return;

			const next = measureActive();
			if (!next) return;

			if (!placed.current) {
				jumpTo(next.offset, next.size);
				placed.current = true;
				return;
			}

			springTo(next.offset, next.size);
		};

		sync();

		const observer = new ResizeObserver(sync);
		observer.observe(track);
		for (const item of itemRefs.current.values()) observer.observe(item);
		window.addEventListener("resize", sync);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", sync);
		};
	}, [enabled, hold, jumpTo, measureActive, springTo]);

	const api: PillApi = {
		measure: measureItem,
		read: () => ({ offset: offset.get(), size: size.get() }),
		drive,
		settle: (position) => {
			placed.current = true;
			springTo(position.offset, position.size);
		},
	};

	const style: MotionStyle =
		axis === "x"
			? { x: offset, width: size, scaleX: stretch, scaleY: squash }
			: { y: offset, height: size, scaleX: squash, scaleY: stretch };

	return [style, trackRef, itemRefs, api] as const;
};
