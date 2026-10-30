/** Constrain `value` to the inclusive range [min, max]. */
export const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));
