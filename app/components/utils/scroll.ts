/**
 * The element that actually scrolls when `element` is brought into view.
 * Falls back to the document when nothing in the tree scrolls vertically.
 */
export const findScrollParent = (element: HTMLElement): HTMLElement => {
	let node = element.parentElement;

	while (node) {
		const { overflowY } = getComputedStyle(node);
		if (
			(overflowY === "auto" || overflowY === "scroll") &&
			node.scrollHeight > node.clientHeight + 1
		) {
			return node;
		}
		node = node.parentElement;
	}

	return (
		(document.scrollingElement as HTMLElement | null) ??
		document.documentElement
	);
};
