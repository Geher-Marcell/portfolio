import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false, follow: true },
};

export default function NotFound() {
	return (
		<main className="flex h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
			<p className="text-sm font-bold uppercase tracking-widest text-red-400">
				404
			</p>
			<h1 className="text-4xl font-bold">Page not found</h1>
			<p className="max-w-md text-neutral-400">
				The page you are looking for does not exist or has moved.
			</p>
			<Link
				href="/"
				className="mt-4 rounded-lg bg-red-700 px-5 py-2.5 font-semibold transition-colors hover:bg-red-600">
				Back to home
			</Link>
		</main>
	);
}
