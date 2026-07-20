"use client";

import { useEffect, useRef, useState } from "react";
import {
	useInView,
	useMotionValue,
	animate,
	useMotionValueEvent,
} from "motion/react";

interface CountUpProps {
	target: number;
	suffix?: string;
	duration?: number;
	delay?: number;
}

export default function CountUp({
	target,
	suffix = "",
	duration = 2,
	delay = 0.5,
}: CountUpProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const motionValue = useMotionValue(0);
	const [display, setDisplay] = useState(0);

	useMotionValueEvent(motionValue, "change", (v) => {
		setDisplay(Math.round(v));
	});

	useEffect(() => {
		if (isInView) {
			animate(motionValue, target, {
				duration,
				delay,
				ease: [0.2, 0.8, 0.2, 1],
			});
		}
	}, [isInView, motionValue, target, duration, delay]);

	return (
		<span ref={ref}>
			{display}
			{suffix}
		</span>
	);
}
