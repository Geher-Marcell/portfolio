import type { Metadata, Viewport } from "next";
import { Montserrat, Quicksand } from "next/font/google";
import "./globals.css";
import { PersonJsonLd } from "./components/seo/PersonJsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./seo";

const quicksand = Quicksand({
	subsets: ["latin"],
	variable: "--font-quicksand",
	display: "swap",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE,
		template: "%s | Gehér Marcell",
	},
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	category: "technology",
	keywords: [
		"Gehér Marcell",
		"Marcell Gehér",
		"full stack developer",
		"fullstack web developer",
		"web developer Budapest",
		"Next.js developer",
		"React developer",
		"TypeScript developer",
		"freelance web developer Hungary",
		"junior developer",
		"web developer portfolio",
	],
	authors: [{ name: "Gehér Marcell", url: SITE_URL }],
	creator: "Gehér Marcell",
	publisher: "Gehér Marcell",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "profile",
		firstName: "Marcell",
		lastName: "Gehér",
		username: "Geher-Marcell",
		gender: "male",
		locale: "en_US",
		url: SITE_URL,
		siteName: SITE_NAME,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#111111",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${quicksand.variable} ${montserrat.variable}`}>
			<body className="w-screen h-dvh">
				<PersonJsonLd />
				{children}
			</body>
		</html>
	);
}
