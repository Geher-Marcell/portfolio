"use client";

import React from "react";
import type { RefObject } from "react";
import { clamp } from "../utils/clamp";
import { easeInOutCubic } from "../utils/easing";
import { findScrollParent } from "../utils/scroll";
import type { NavSection, PillApi, Position } from "./types";

/**
 * How fast a click-scroll travels, in px per second. This sets the duration of
 * the scroll, and the pill is driven by the same progress value, so the two
 * always take exactly as long as each other.
 */
const SCROLL_SPEED = 4000;
/** Bounds for a single click-scroll, in ms */
const SCROLL_MIN_MS = 320;
const SCROLL_MAX_MS = 4000;

interface ScrollSync {
	scroller: HTMLElement;
	fromScroll: number;
	toScroll: number;
	pills: { api: PillApi; from: Position; to: Position }[];
	/** requestAnimationFrame handle for the running scroll */
	raf: number;
	/** First frame timestamp, used to derive progress */
	startedAt: number;
	durationMs: number;
}

interface UseSectionScrollOptions {
	/** Nav destinations, in page order — the first one is the top. */
	sections: NavSection[];
	/** Pills that should travel with the scroll. */
	pills: PillApi[];
	/** Lets the pills know a scroll is driving them right now. */
	holdPillRef: RefObject<boolean>;
	/** Called when the active section should change. */
	onSectionChange: (id: string) => void;
}

/**
 * Click-to-section scrolling that owns the page scroll itself, so the pill and
 * the scroll can be driven by one progress value. Returns the scroll target
 * (so the observer can pause while it runs) and the scroll trigger.
 */
export const useSectionScroll = ({
	sections,
	pills,
	holdPillRef,
	onSectionChange,
}: UseSectionScrollOptions) => {
	const scrollSync = React.useRef<ScrollSync | null>(null);
	// Section we're scrolling to, used to pause observer-driven updates.
	const scrollTarget = React.useRef<string | null>(null);

	const finishScrollSync = React.useCallback(() => {
		const sync = scrollSync.current;
		if (!sync) return;

		scrollSync.current = null;
		cancelAnimationFrame(sync.raf);

		holdPillRef.current = false;
		scrollTarget.current = null;

		// Land exactly on the target, including when the scroll was cut short
		// by user input.
		for (const { api, to } of sync.pills) api.settle(to);
	}, [holdPillRef]);

	React.useEffect(() => {
		return () => finishScrollSync();
	}, [finishScrollSync]);

	// Taking over the wheel, a touch or a key cancels the animated scroll so the
	// user is never fought for control of the page.
	React.useEffect(() => {
		const interrupt = () => {
			if (!scrollSync.current) return;
			finishScrollSync();

			// The page is now wherever the user left it, so read back which
			// section is actually in view instead of trusting the click target.
			const middle = window.innerHeight / 2;
			for (const section of sections) {
				const element = document.querySelector<HTMLElement>(section.id);
				if (!element) continue;
				const rect = element.getBoundingClientRect();
				if (rect.top <= middle && rect.bottom >= middle) {
					onSectionChange(section.id);
					break;
				}
			}
		};

		window.addEventListener("wheel", interrupt, { passive: true });
		window.addEventListener("touchstart", interrupt, { passive: true });
		window.addEventListener("keydown", interrupt);

		return () => {
			window.removeEventListener("wheel", interrupt);
			window.removeEventListener("touchstart", interrupt);
			window.removeEventListener("keydown", interrupt);
		};
	}, [finishScrollSync, onSectionChange, sections]);

	const scrollToSection = (targetId: string) => {
		finishScrollSync();

		const target = document.querySelector<HTMLElement>(targetId);
		if (!target) return;

		scrollTarget.current = targetId;
		onSectionChange(targetId);

		const scroller = findScrollParent(target);
		const maxScroll = Math.max(
			0,
			scroller.scrollHeight - scroller.clientHeight,
		);
		const fromScroll = scroller.scrollTop;
		const isFirst = sections.length > 0 && targetId === sections[0].id;
		const toScroll = clamp(
			isFirst
				? 0
				: fromScroll +
						target.getBoundingClientRect().top -
						scroller.getBoundingClientRect().top,
			0,
			maxScroll,
		);

		// Snapshot the pill at both ends of the trip.
		const travelling: ScrollSync["pills"] = [];
		for (const api of pills) {
			const to = api.measure(targetId);
			if (to) travelling.push({ api, from: api.read(), to });
		}

		const distance = Math.abs(toScroll - fromScroll);

		// No pill to travel with (nav hidden at this breakpoint): hand the
		// scroll back to the browser.
		if (travelling.length === 0) {
			scrollTarget.current = null;
			if (distance >= 1) {
				scroller.scrollTo({ top: toScroll, behavior: "smooth" });
			}
			return;
		}

		// Already at the section: nothing to sync, let the spring carry it.
		if (distance < 1) {
			scrollTarget.current = null;
			return;
		}

		holdPillRef.current = true;

		const sync: ScrollSync = {
			scroller,
			fromScroll,
			toScroll,
			pills: travelling,
			raf: 0,
			startedAt: 0,
			durationMs: clamp(
				(distance / SCROLL_SPEED) * 1000,
				SCROLL_MIN_MS,
				SCROLL_MAX_MS,
			),
		};
		scrollSync.current = sync;

		// One progress value drives both the page and the pill, so the pill
		// takes exactly as long as the scroll does.
		const tick = (now: number) => {
			if (scrollSync.current !== sync) return;
			if (!sync.startedAt) sync.startedAt = now;

			const t = clamp((now - sync.startedAt) / sync.durationMs, 0, 1);
			const progress = easeInOutCubic(t);

			scroller.scrollTo({
				top: fromScroll + (toScroll - fromScroll) * progress,
				behavior: "instant",
			});

			for (const { api, from, to } of travelling) {
				api.drive(
					from.offset + (to.offset - from.offset) * progress,
					from.size + (to.size - from.size) * progress,
				);
			}

			if (t >= 1) {
				finishScrollSync();
				return;
			}

			sync.raf = requestAnimationFrame(tick);
		};

		sync.raf = requestAnimationFrame(tick);
	};

	return { scrollTarget, scrollToSection };
};
