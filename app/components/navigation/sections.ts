export interface NavSection {
	id: string;
	name: string;
}

/**
 * Static list of page sections. Kept outside the client component so the
 * navigation links are rendered in the server HTML and remain crawlable.
 */
export const SECTIONS: NavSection[] = [
	{ id: "#homePage", name: "Home" },
	{ id: "#aboutPage", name: "About" },
	{ id: "#projectsPage", name: "Projects" },
	{ id: "#contactPage", name: "Contact" },
];
