import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://darkiex.dev"),
	title: {
		default: "Gehér Marcell | Fullstack Web Developer",
		template: "%s | Gehér Marcell",
	},
	description:
		"Gehér Marcell, fullstack web developer. I build fast, modern, and accessible web applications.",
	keywords: [
		"Gehér Marcell",
		"fullstack developer",
		"web developer",
		"frontend",
		"backend",
		"react",
		"next.js",
	],
	authors: [{ name: "Gehér Marcell" }],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://darkiex.dev",
		siteName: "Gehér Marcell",
		title: "Gehér Marcell | Fullstack Web Developer",
		description:
			"Gehér Marcell, fullstack web developer. I build fast, modern, and accessible web applications.",
	},
	twitter: {
		card: "summary",
		title: "Gehér Marcell | Fullstack Web Developer",
		description:
			"Gehér Marcell, fullstack web developer. I build fast, modern, and accessible web applications.",
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: "/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="w-screen h-dvh">{children}</body>
		</html>
	);
}
